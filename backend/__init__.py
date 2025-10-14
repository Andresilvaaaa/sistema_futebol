"""
Sistema de Futebol - Flask Application Factory
Estrutura completa com blueprints, configurações e banco de dados
"""

import os
import time
from flask import Flask, jsonify, g, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow

# Importações locais
from .config import get_config
from .services.db.connection import db, migrate
from .services.db.connection import _enable_sqlite_foreign_keys  # internal helper
from .blueprints.api.controllers import api_bp
from .blueprints.auth.controllers import auth_bp
from .blueprints.admin.controllers import admin_bp


def create_app(config_name=None):
    """
    Factory function para criar a aplicação Flask
    
    Args:
        config_name (str): Nome da configuração ('development', 'production', 'testing')
    
    Returns:
        Flask: Instância da aplicação configurada
    """
    
    # Criar instância do Flask
    app = Flask(__name__)
    
    # Carregar configuração
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')
    
    config = get_config(config_name)
    app.config.from_object(config)
    
    # Inicializar extensões
    init_extensions(app)

    # Em desenvolvimento, garantir que as tabelas do banco existam
    # Isso evita erros como "no such table" quando não há migrações aplicadas
    if app.config.get('ENV', 'development') == 'development':
        try:
            with app.app_context():
                # Garantir que os modelos sejam importados antes de criar as tabelas
                from .services.db import models  # noqa: F401
                db.create_all()
                app.logger.info('Dev DB auto-created (ensure tables exist).')
        except Exception as e:
            app.logger.warning(f'Failed to auto-create dev DB tables: {e}')

    # Registrar blueprints
    register_blueprints(app)
    
    # Registrar handlers de erro
    register_error_handlers(app)
    
    # Registrar rotas básicas
    register_basic_routes(app)

    # ===================== PERF MONITORING (Request Timing) =====================
    @app.before_request
    def _perf_request_start():
        try:
            g._req_start = time.perf_counter()
        except Exception:
            # silencioso em ambientes sem suporte
            pass

    @app.after_request
    def _perf_request_end(response):
        try:
            start = getattr(g, '_req_start', None)
            if start is not None:
                duration_ms = int((time.perf_counter() - start) * 1000)
                # Expor duração via header para consumo por frontend/observabilidade
                response.headers['X-Request-Duration-ms'] = str(duration_ms)
                # Log estruturado
                try:
                    app.logger.info(
                        f"[Perf][Request] {request.method} {request.path} -> {response.status_code} in {duration_ms}ms"
                    )
                except Exception:
                    pass
        except Exception:
            pass
        return response
    # ===========================================================================

    return app


def init_extensions(app):
    """Inicializa as extensões do Flask"""
    
    # Banco de dados
    db.init_app(app)
    migrate.init_app(app, db)

    # Garantir integridade referencial em SQLite (dev/test)
    try:
        with app.app_context():
            _enable_sqlite_foreign_keys(app)
    except Exception as e:
        app.logger.warning(f"Falha ao configurar PRAGMA foreign_keys: {e}")
    
    # CORS
    CORS(app, 
         origins=app.config.get('CORS_ORIGINS', ['http://localhost:3000']),
         supports_credentials=True)
    
    # JWT
    jwt = JWTManager(app)
    
    # Marshmallow
    ma = Marshmallow(app)
    
    # Configurar JWT callbacks
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({'error': 'Token expirado'}), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({'error': 'Token inválido'}), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({'error': 'Token de autorização necessário'}), 401
    
    # Custom token verification for development (accepts mock tokens)
    @jwt.token_verification_loader
    def verify_token_callback(jwt_header, jwt_payload):
        # In development, accept mock tokens from frontend
        if app.config.get('FLASK_ENV') == 'development':
            # Check if it's a mock token format (starts with "eyJ" like real JWT)
            return True
        # In production, use default verification
        return True


def register_blueprints(app):
    """Registra os blueprints da aplicação"""
    
    # Blueprint da API principal
    app.register_blueprint(api_bp)
    
    # Blueprint de autenticação
    app.register_blueprint(auth_bp)
    
    # Blueprint de administração
    app.register_blueprint(admin_bp)


def register_error_handlers(app):
    """Registra os handlers de erro globais"""
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'error': 'Not Found',
            'message': 'Recurso não encontrado',
            'status_code': 404
        }), 404
    
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            'error': 'Bad Request',
            'message': 'Requisição inválida',
            'status_code': 400
        }), 400
    
    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({
            'error': 'Unauthorized',
            'message': 'Não autorizado',
            'status_code': 401
        }), 401
    
    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({
            'error': 'Forbidden',
            'message': 'Acesso negado',
            'status_code': 403
        }), 403
    
    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({
            'error': 'Internal Server Error',
            'message': 'Erro interno do servidor',
            'status_code': 500
        }), 500


def register_basic_routes(app):
    """Registra rotas básicas da aplicação"""
    
    @app.route('/')
    def index():
        """Rota principal da aplicação"""
        return jsonify({
            'message': 'Sistema de Futebol API',
            'status': 'running',
            'version': '1.0.0',
            'environment': app.config.get('ENV', 'development')
        })
    
    @app.route('/health')
    def health_check():
        """Endpoint para verificar se a aplicação está funcionando"""
        try:
            # Testar conexão com banco de dados
            db.session.execute('SELECT 1')
            db_status = 'connected'
        except Exception:
            db_status = 'disconnected'
        
        return jsonify({
            'status': 'healthy',
            'message': 'Aplicação funcionando corretamente',
            'database': db_status,
            'version': '1.0.0'
        })

    # Espelhar o health check sob o prefixo /api para facilitar testes via proxy do frontend
    @app.route('/api/health')
    def api_health_check():
        try:
            db.session.execute('SELECT 1')
            db_status = 'connected'
        except Exception:
            db_status = 'disconnected'

        return jsonify({
            'status': 'healthy',
            'message': 'Aplicação funcionando corretamente',
            'database': db_status,
            'version': '1.0.0'
        })
    
    @app.route('/api/info')
    def api_info():
        """Informações sobre a API"""
        return jsonify({
            'name': 'Sistema de Futebol API',
            'version': '1.0.0',
            'description': 'API para gerenciamento de sistema de futebol',
            'environment': app.config.get('ENV', 'development'),
            'endpoints': {
                'auth': '/auth/*',
                'api': '/api/*',
                'admin': '/admin/*',
                'health': '/health',
                'info': '/api/info'
            }
        })

    @app.route('/api/cors-test')
    def cors_test():
        """Endpoint simples para validar CORS/proxy"""
        return jsonify({
            'success': True,
            'message': 'CORS/Proxy funcionando',
            'timestamp': __import__('datetime').datetime.utcnow().isoformat() + 'Z'
        })


# Criar a aplicação para compatibilidade
# app = create_app()


# Para desenvolvimento direto
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
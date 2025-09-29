init.py 
"""Backend TMS - Inicialização da aplicação Flask.

Este módulo configura e inicializa a aplicação Flask com todas as
extensões necessárias e blueprints.
"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_caching import Cache
import os
from datetime import timedelta

# Instâncias globais das extensões
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cache = Cache()


def create_app(config_name=None):
    """Factory function para criar a aplicação Flask.
    
    Args:
        config_name: Nome da configuração a ser usada
        
    Returns:
        Flask: Instância da aplicação configurada
    """
    app = Flask(__name__)
    
    # Configuração da aplicação
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    # Configurações básicas
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    app.config['SQLALCHEMY_DATABASE_URI'] = get_database_url()
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
        'pool_timeout': 20,
        'max_overflow': 0
    }
    
    # Configurações JWT
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', app.config['SECRET_KEY'])
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
    app.config['JWT_ALGORITHM'] = 'HS256'
    
    # Configurações de Cache
    app.config['CACHE_TYPE'] = 'simple'
    app.config['CACHE_DEFAULT_TIMEOUT'] = 300
    
    # Configurações de Upload
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB
    
    # Configurações de Documentação
    app.config['ENABLE_SWAGGER'] = os.getenv('ENABLE_SWAGGER', 'true').lower() == 'true'
    app.config['SWAGGER_UI_DOC_EXPANSION'] = 'list'
    app.config['SWAGGER_UI_OPERATION_ID'] = True
    app.config['SWAGGER_UI_REQUEST_DURATION'] = True
    
    # Inicializar extensões
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cache.init_app(app)
    
    # Configurar CORS
    CORS(app, 
         origins=[
             "http://localhost:3000",
             "http://127.0.0.1:3000",
             "http://localhost:5000",
             "http://127.0.0.1:5000"
         ],
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )
    
    # Adicionar rota de teste
    @app.route('/api/test')
    def test_route():
        return {'message': 'Backend funcionando!', 'status': 'ok'}
    
    # Rota de login temporária
    @app.route('/api/v1/auth/login', methods=['POST', 'OPTIONS'])
    def login_temp():
        from flask import request
        
        if request.method == 'OPTIONS':
            return '', 200
        
        data = request.get_json() or {}
        
        # Login temporário para teste
        if data.get('email') == 'admin@tms.com' and data.get('password') == 'admin123':
            return {
                'message': 'Login realizado com sucesso',
                'user': {
                    'id': 1,
                    'email': 'admin@tms.com',
                    'name': 'Administrador',
                    'role': 'admin'
                },
                'token': 'temp-token-123'
            }
        else:
            return {'error': 'Credenciais inválidas'}, 401
    
    # Registrar blueprints
    register_blueprints(app)
    
    # Configurar handlers de erro
    register_error_handlers(app)
    
    # Configurar hooks
    register_hooks(app)
    
    # Criar diretórios necessários
    create_directories(app)
    
    return app


def get_database_url():
    """Constrói a URL do banco de dados a partir das variáveis de ambiente.
    
    Returns:
        str: URL de conexão com o banco de dados
    """
    # Usar SQLite para desenvolvimento se PostgreSQL não estiver disponível
    env = os.getenv('FLASK_ENV', 'development')
    if env == 'development':
        db_path = os.path.join(os.path.dirname(__file__), 'tms_development.db')
        return f"sqlite:///{db_path}"
    
    # PostgreSQL para produção
    user = os.getenv('DB_USER', 'postgres')
    password = os.getenv('DB_PASSWORD', '')
    host = os.getenv('DB_HOST', 'localhost')
    port = os.getenv('DB_PORT', '5432')
    database = os.getenv('DB_NAME', 'tms_db')
    
    return f"postgresql://{user}:{password}@{host}:{port}/{database}"


def register_blueprints(app):
    """Registra todos os blueprints da aplicação.
    
    Args:
        app: Instância da aplicação Flask
    """
    # Importar blueprints
    try:
        from .blueprints.auth import auth_bp
        app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
        app.logger.info("Blueprint auth registrado com sucesso")
    except ImportError as e:
        app.logger.warning(f"Falha ao importar blueprint auth: {e}")
    
    try:
        from .blueprints.profile import profile_bp
        app.register_blueprint(profile_bp, url_prefix='/api/profile')
        app.logger.info("Blueprint profile registrado com sucesso")
    except ImportError as e:
        app.logger.warning(f"Falha ao importar blueprint profile: {e}")
    
    try:
        from .blueprints.admin import admin_bp
        app.register_blueprint(admin_bp, url_prefix='/api/admin')
        app.logger.info("Blueprint admin registrado com sucesso")
    except ImportError as e:
        app.logger.warning(f"Falha ao importar blueprint admin: {e}")
    
    try:
        from .blueprints.audit import audit_bp
        app.register_blueprint(audit_bp, url_prefix='/api/audit')
        app.logger.info("Blueprint audit registrado com sucesso")
    except ImportError as e:
        app.logger.warning(f"Falha ao importar blueprint audit: {e}")
    
    try:
        from .blueprints.operational import operational_bp
        app.register_blueprint(operational_bp, url_prefix='/api/operational')
        app.logger.info("Blueprint operational registrado com sucesso")
    except ImportError as e:
        app.logger.warning(f"Falha ao importar blueprint operational: {e}")
    
    try:
        from .blueprints.financial import financial_bp
        app.register_blueprint(financial_bp, url_prefix='/api/financial')
    except ImportError:
        pass
    
    try:
        from .blueprints.reports import reports_bp
        app.register_blueprint(reports_bp, url_prefix='/api/reports')
    except ImportError:
        pass
    
    try:
        from .blueprints.health import health_bp
        app.register_blueprint(health_bp, url_prefix='/api/health')
    except ImportError:
        pass


def register_error_handlers(app):
    """Registra handlers de erro personalizados.
    
    Args:
        app: Instância da aplicação Flask
    """
    from flask import jsonify
    
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
            'message': 'Acesso não autorizado',
            'status_code': 401
        }), 401
    
    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({
            'error': 'Forbidden',
            'message': 'Acesso proibido',
            'status_code': 403
        }), 403
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'error': 'Not Found',
            'message': 'Recurso não encontrado',
            'status_code': 404
        }), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            'error': 'Internal Server Error',
            'message': 'Erro interno do servidor',
            'status_code': 500
        }), 500


def register_hooks(app):
    """Registra hooks da aplicação.
    
    Args:
        app: Instância da aplicação Flask
    """
    from flask import request, g
    from datetime import datetime
    
    @app.before_request
    def before_request():
        """Executado antes de cada requisição."""
        g.start_time = datetime.utcnow()
        g.request_id = os.urandom(16).hex()
    
    @app.after_request
    def after_request(response):
        """Executado após cada requisição."""
        # Adicionar headers de segurança
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        
        # Log da requisição
        if hasattr(g, 'start_time'):
            duration = (datetime.utcnow() - g.start_time).total_seconds()
            app.logger.info(
                f"Request {g.request_id}: {request.method} {request.path} "
                f"- {response.status_code} - {duration:.3f}s"
            )
        
        return response


def create_directories(app):
    """Cria diretórios necessários para a aplicação.
    
    Args:
        app: Instância da aplicação Flask
    """
    directories = [
        app.config.get('UPLOAD_FOLDER', 'uploads'),
        'logs',
        'temp'
    ]
    
    for directory in directories:
        if not os.path.isabs(directory):
            directory = os.path.join(os.path.dirname(__file__), directory)
        
        os.makedirs(directory, exist_ok=True)


# Importar modelos para que sejam registrados
try:
    from . import models
except ImportError:
    import models

####################### app.py 

#!/usr/bin/env python3
"""
TMS - Sistema de Gestão Logística
Arquivo principal da aplicação Flask

Autor: Sistema TMS
Versão: 1.0.0
Data: Janeiro 2025
"""

import os
from backend import create_app
from backend.models import *  # Importar todos os models para migrations

# Criar instância da aplicação
app = create_app()

if __name__ == '__main__':
    # Configurações para desenvolvimento
    debug_mode = os.getenv('FLASK_DEBUG', '1') == '1'
    host = os.getenv('FLASK_HOST', '0.0.0.0')
    port = int(os.getenv('FLASK_PORT', 5000))
    
    print(f"🚀 Iniciando TMS Backend em {host}:{port}")
    print(f"📊 Modo Debug: {debug_mode}")
    print(f"🗄️ Database: {os.getenv('POSTGRES_DB', 'tms_development')}")
    
    app.run(
        host=host,
        port=port,
        debug=debug_mode,
        threaded=True
    )
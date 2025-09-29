import os
import logging
from flask import Flask, jsonify

# Configurar logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s:%(name)s:%(message)s')
logger = logging.getLogger(__name__)

def create_app():
    """Factory function para criar a aplicação Flask"""
    app = Flask(__name__)
    
    # Configurações do ambiente
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
    app.config['DEBUG'] = os.environ.get('FLASK_DEBUG', '1') == '1'
    app.config['ENV'] = os.environ.get('FLASK_ENV', 'development')
    
    @app.route('/')
    def home():
        return jsonify({
            'message': 'Sistema de Futebol API',
            'status': 'running',
            'version': '1.0.0',
            'environment': app.config['ENV']
        })

    @app.route('/api/health')
    def health():
        return jsonify({
            'status': 'healthy',
            'message': 'API funcionando',
            'environment': app.config['ENV'],
            'debug': app.config['DEBUG']
        })

    @app.route('/api/info')
    def info():
        return jsonify({
            'name': 'Sistema de Futebol',
            'version': '1.0.0',
            'environment': app.config['ENV'],
            'endpoints': ['/', '/api/health', '/api/info']
        })
    
    # Log das informações de startup (executado sempre que a app é criada)
    log_startup_info(app)
    
    return app

def log_startup_info(app):
    """Log informações detalhadas do startup"""
    logger.info("=" * 60)
    logger.info("🚀 INICIANDO SISTEMA DE FUTEBOL API")
    logger.info("=" * 60)
    
    # Informações do ambiente
    logger.info(f"📍 Ambiente: {app.config['ENV'].upper()}")
    logger.info(f"🐛 Debug Mode: {'ATIVADO' if app.config['DEBUG'] else 'DESATIVADO'}")
    logger.info(f"🔑 Secret Key: {'CONFIGURADA' if app.config['SECRET_KEY'] != 'dev-secret-key' else 'USANDO CHAVE DE DESENVOLVIMENTO'}")
    
    # Informações das rotas
    logger.info("🛣️  ROTAS REGISTRADAS:")
    logger.info("-" * 40)
    
    routes_count = 0
    for rule in app.url_map.iter_rules():
        methods = ', '.join(sorted(rule.methods - {'HEAD', 'OPTIONS'}))
        logger.info(f"   {rule.rule:<20} [{methods}] -> {rule.endpoint}")
        routes_count += 1
    
    logger.info("-" * 40)
    logger.info(f"✅ Total de {routes_count} rotas registradas com sucesso!")
    logger.info("=" * 60)

# Criar a instância da aplicação
app = create_app()

if __name__ == '__main__':
    # Iniciar o servidor
    logger.info("🌐 Servidor Flask iniciando...")
    app.run(debug=True, host='127.0.0.1', port=5000)
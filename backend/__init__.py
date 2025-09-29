"""
Sistema de Futebol - Flask Application
Estrutura básica e simples para desenvolvimento
"""

from flask import Flask, jsonify


def create_app():
    """Factory function para criar a aplicação Flask"""
    
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'dev-secret-key'
    app.config['DEBUG'] = True
    
    return app


# Criar a aplicação
app = create_app()


# Rotas principais
@app.route('/')
def index():
    """Rota principal da aplicação"""
    return jsonify({
        'message': 'Sistema de Futebol API',
        'status': 'running',
        'version': '1.0.0'
    })


@app.route('/api/health')
def health_check():
    """Endpoint para verificar se a aplicação está funcionando"""
    return jsonify({
        'status': 'healthy',
        'message': 'Aplicação funcionando corretamente'
    })


@app.route('/api/info')
def api_info():
    """Informações sobre a API"""
    return jsonify({
        'name': 'Sistema de Futebol API',
        'version': '1.0.0',
        'description': 'API para gerenciamento de sistema de futebol',
        'endpoints': [
            {'path': '/', 'method': 'GET', 'description': 'Página inicial'},
            {'path': '/api/health', 'method': 'GET', 'description': 'Health check'},
            {'path': '/api/info', 'method': 'GET', 'description': 'Informações da API'}
        ]
    })


# Handlers de erro
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


# Para desenvolvimento direto
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
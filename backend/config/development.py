"""
Configuração de Desenvolvimento - Simples
"""


class DevelopmentConfig:
    """Configuração para ambiente de desenvolvimento"""

    # Ambiente
    DEBUG = True
    TESTING = False

    # Segurança
    SECRET_KEY = 'dev-secret-key'

    # Banco de dados
    SQLALCHEMY_DATABASE_URI = 'sqlite:///futebol_dev.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True  # Mostra SQL no console

    # CORS - permite frontend local
    CORS_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']

    # Upload de arquivos
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    UPLOAD_FOLDER = 'uploads'

    @staticmethod
    def init_app(app):
        """Initialize application with development configuration"""
        import logging
        logging.basicConfig(
            level=logging.DEBUG,
            format='%(asctime)s %(levelname)s: %(message)s '
                   '[in %(pathname)s:%(lineno)d]'
        )

        # Enable SQL query logging
        logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

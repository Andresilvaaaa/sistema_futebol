"""
Configurações Aprimoradas para o Sistema de Futebol
Baseado na estrutura apresentada com melhorias
"""
import os
from datetime import timedelta


class BaseConfig:
    """Configuração base compartilhada entre ambientes"""

    # Security
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')

    # Database
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_RECORD_QUERIES = True
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
    }

    # JWT (suporte a APIs)
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)

    # CORS
    CORS_ORIGINS = os.environ.get(
        'CORS_ORIGINS', 'http://localhost:3000'
    ).split(',')

    # Upload
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    UPLOAD_FOLDER = 'uploads'
    ALLOWED_EXTENSIONS = {
        'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'doc', 'docx'
    }

    # Pagination
    DEFAULT_PAGE_SIZE = 20
    MAX_PAGE_SIZE = 100

    # Logging
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'INFO')

    # Configurações específicas do domínio (futebol)
    MAX_PLAYERS_PER_TEAM = 25
    MIN_PLAYERS_PER_TEAM = 11
    SEASON_START_MONTH = 8  # Agosto
    SEASON_END_MONTH = 5    # Maio

    @staticmethod
    def init_app(app):
        """Base application initialization"""
        # Criar diretórios necessários
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        os.makedirs('logs', exist_ok=True)


class DevelopmentConfig(BaseConfig):
    """Configuração para desenvolvimento"""

    DEBUG = True
    TESTING = False

    # Database
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL', 'sqlite:///futebol_dev.db'
    )
    SQLALCHEMY_ECHO = True  # SQL logging

    # Security (relaxed for development)
    WTF_CSRF_ENABLED = False

    # Logging
    LOG_LEVEL = 'DEBUG'

    @staticmethod
    def init_app(app):
        """Development specific initialization"""
        BaseConfig.init_app(app)

        import logging
        logging.basicConfig(
            level=logging.DEBUG,
            format='%(asctime)s %(levelname)s: %(message)s '
                   '[in %(pathname)s:%(lineno)d]'
        )


class ProductionConfig(BaseConfig):
    """Configuração para produção"""

    DEBUG = False
    TESTING = False

    # Database (obrigatório via env var)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

    # Security
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    PERMANENT_SESSION_LIFETIME = timedelta(hours=1)

    # HTTPS enforcement
    PREFERRED_URL_SCHEME = 'https'

    @classmethod
    def validate(cls):
        """Validate production configuration"""
        required_vars = ['SECRET_KEY', 'DATABASE_URL']
        for var in required_vars:
            if not os.environ.get(var):
                raise ValueError(
                    f"{var} environment variable is required in production"
                )

    @staticmethod
    def init_app(app):
        """Production specific initialization"""
        BaseConfig.init_app(app)

        # Validate configuration
        ProductionConfig.validate()

        import logging
        from logging.handlers import RotatingFileHandler

        # File logging
        file_handler = RotatingFileHandler(
            'logs/futebol.log', maxBytes=10240000, backupCount=10
        )
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s '
            '[in %(pathname)s:%(lineno)d]'
        ))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        app.logger.setLevel(logging.INFO)


class TestingConfig(BaseConfig):
    """Configuração para testes"""

    TESTING = True
    DEBUG = True

    # Database em memória para testes rápidos
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

    # Security (disabled for easier testing)
    WTF_CSRF_ENABLED = False

    # Smaller limits for tests
    MAX_CONTENT_LENGTH = 1 * 1024 * 1024  # 1MB
    DEFAULT_PAGE_SIZE = 5

    @staticmethod
    def init_app(app):
        """Testing specific initialization"""
        BaseConfig.init_app(app)

        import logging
        logging.disable(logging.CRITICAL)  # Disable logging in tests


class HomologConfig(BaseConfig):
    """Configuração para homologação/staging"""

    DEBUG = False
    TESTING = False

    # Database
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL', 'sqlite:///futebol_homolog.db'
    )
    SQLALCHEMY_ECHO = True  # Keep SQL logging for debugging

    # Less strict security for testing
    SESSION_COOKIE_SECURE = False

    @staticmethod
    def init_app(app):
        """Homolog specific initialization"""
        BaseConfig.init_app(app)

        import logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s %(levelname)s: %(message)s '
                   '[in %(pathname)s:%(lineno)d]'
        )


# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'homolog': HomologConfig,
    'default': DevelopmentConfig
}

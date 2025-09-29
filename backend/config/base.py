"""
Configuração Base Melhorada
Todas as configurações comuns do sistema
"""
import os
from datetime import timedelta


class BaseConfig:
    """Configuração base com todas as configurações comuns"""

    # Flask Core
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')

    # Database
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_RECORD_QUERIES = True
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,      # Testa conexão antes de usar
        'pool_recycle': 300,        # Recria conexões a cada 5min
        'pool_timeout': 20,         # Timeout para obter conexão
        'max_overflow': 0,          # Não permite conexões extras
    }

    # JWT Authentication
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    JWT_TOKEN_LOCATION = ['headers', 'cookies']
    JWT_HEADER_NAME = 'Authorization'
    JWT_HEADER_TYPE = 'Bearer'

    # CORS
    CORS_ORIGINS = os.environ.get(
        'CORS_ORIGINS', 'http://localhost:3000'
    ).split(',')
    CORS_ALLOW_HEADERS = ['Content-Type', 'Authorization']
    CORS_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']

    # File Upload
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'uploads')
    ALLOWED_EXTENSIONS = {
        'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'doc', 'docx', 'xls', 'xlsx'
    }

    # Pagination
    DEFAULT_PAGE_SIZE = 20
    MAX_PAGE_SIZE = 100

    # Logging
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'INFO')
    LOG_FILE = 'logs/futebol.log'

    # Cache
    CACHE_TYPE = 'simple'
    CACHE_DEFAULT_TIMEOUT = 300  # 5 minutos

    # Email (se necessário)
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', 587))
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() == 'true'
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')

    # Rate Limiting
    RATELIMIT_STORAGE_URL = 'memory://'
    RATELIMIT_DEFAULT = "1000 per hour"

    # Configurações específicas do domínio (futebol)
    MAX_PLAYERS_PER_TEAM = int(os.environ.get('MAX_PLAYERS_PER_TEAM', 25))
    MIN_PLAYERS_PER_TEAM = int(os.environ.get('MIN_PLAYERS_PER_TEAM', 11))
    SEASON_START_MONTH = int(os.environ.get('SEASON_START_MONTH', 8))  # Agosto
    SEASON_END_MONTH = int(os.environ.get('SEASON_END_MONTH', 5))      # Maio

    @classmethod
    def get_db_uri(cls, db_name='futebol'):
        """Generate database URI based on environment"""
        return os.environ.get('DATABASE_URL') or f'sqlite:///{db_name}.db'

    @staticmethod
    def init_app(app):
        """Initialize application with base configuration"""
        # Create upload directory if it doesn't exist
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

        # Create logs directory if it doesn't exist
        os.makedirs('logs', exist_ok=True)

"""
Configuração de Produção - Simples
"""
import os


class ProductionConfig:
    """Configuração para ambiente de produção"""

    # Ambiente
    DEBUG = False
    TESTING = False

    # Segurança (obrigatório definir via variáveis de ambiente)
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'CHANGE-ME-IN-PRODUCTION'

    # Banco de dados - PostgreSQL
    SQLALCHEMY_DATABASE_URI = (
        os.environ.get('DATABASE_URL') or
        'postgresql://postgres:password@localhost:5432/futebol_prod'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Configurações específicas do PostgreSQL para produção
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,      # Testa conexão antes de usar
        'pool_recycle': 3600,       # Recria conexões a cada 1h
        'pool_timeout': 30,         # Timeout para obter conexão
        'pool_size': 10,            # Tamanho do pool de conexões
        'max_overflow': 20,         # Conexões extras permitidas
        'echo': False,              # Não mostrar SQL em produção
    }

    # Upload de arquivos
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    UPLOAD_FOLDER = 'uploads'

    # CORS - apenas domínios autorizados
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '').split(',')

    # Sessão segura
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'

    @staticmethod
    def init_app(app):
        """Initialize application with production configuration"""
        import logging
        from logging.handlers import RotatingFileHandler, SMTPHandler

        # Configure file logging
        if not os.path.exists('logs'):
            os.mkdir('logs')

        file_handler = RotatingFileHandler(
            'logs/football_system.log',
            maxBytes=10240000,
            backupCount=10
        )
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s '
            '[in %(pathname)s:%(lineno)d]'
        ))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        # Configure email logging for errors
        mail_handler = None
        if (app.config.get('MAIL_SERVER') and
                app.config.get('MAIL_USERNAME') and
                app.config.get('MAIL_PASSWORD')):

            auth = (app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
            secure = ()
            if app.config.get('MAIL_USE_TLS'):
                secure = ()

            mail_handler = SMTPHandler(
                mailhost=(app.config['MAIL_SERVER'], app.config['MAIL_PORT']),
                fromaddr=app.config['MAIL_DEFAULT_SENDER'],
                toaddrs=[
                    app.config.get('ADMIN_EMAIL', 'admin@footballsystem.com')
                ],
                subject='Football System Error',
                credentials=auth,
                secure=secure
            )
            mail_handler.setLevel(logging.ERROR)
            mail_handler.setFormatter(logging.Formatter(
                '%(asctime)s %(levelname)s: %(message)s '
                '[in %(pathname)s:%(lineno)d]'
            ))
            app.logger.addHandler(mail_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('Football System Production Startup')

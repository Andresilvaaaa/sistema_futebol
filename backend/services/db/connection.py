"""
Configuração de conexão com banco de dados
"""
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Instâncias globais
db = SQLAlchemy()
migrate = Migrate()


def init_db(app):
    """
    Inicializa o banco de dados com a aplicação Flask
    
    Args:
        app: Instância da aplicação Flask
    """
    db.init_app(app)
    migrate.init_app(app, db)
    
    return db
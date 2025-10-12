"""
Configuração de conexão com banco de dados
"""
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import event

# Instâncias globais
db = SQLAlchemy()
migrate = Migrate()


def _enable_sqlite_foreign_keys(app):
    """Habilita PRAGMA foreign_keys=ON para conexões SQLite.

    Sem efeito em PostgreSQL/MySQL. Garante integridade referencial local.
    """
    try:
        # Apenas aplica para SQLite
        if db.engine and db.engine.url and db.engine.url.drivername.startswith('sqlite'):
            @event.listens_for(db.engine, "connect")
            def _set_sqlite_pragma(dbapi_connection, connection_record):
                cursor = dbapi_connection.cursor()
                cursor.execute("PRAGMA foreign_keys=ON")
                cursor.close()
            app.logger.info("SQLite PRAGMA foreign_keys=ON habilitado")
    except Exception as e:
        # Evitar quebrar produção por qualquer erro nesse hook
        if hasattr(app, 'logger'):
            app.logger.warning(f"Falha ao habilitar PRAGMA foreign_keys: {e}")


def init_db(app):
    """
    Inicializa o banco de dados com a aplicação Flask
    
    Args:
        app: Instância da aplicação Flask
    """
    db.init_app(app)
    migrate.init_app(app, db)

    # Habilitar integridade referencial em SQLite (dev/test)
    with app.app_context():
        _enable_sqlite_foreign_keys(app)
    
    return db
"""
Reset do banco de dados SQLite de desenvolvimento.
Remove o arquivo e recria todas as tabelas via Application Factory.
"""
import os
import sys
import time

# Garantir que o projeto raiz esteja no path
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from backend import create_app
from backend.config import get_config


def get_dev_db_path():
    cfg = get_config('development')
    uri = getattr(cfg, 'SQLALCHEMY_DATABASE_URI', 'sqlite:///backend/instance/futebol_dev.db')
    if uri.startswith('sqlite:///'):
        return uri.split('sqlite:///')[1]
    # Fallback
    return os.path.join('backend', 'instance', 'futebol_dev.db')


def reset():
    db_path = get_dev_db_path()
    db_path = db_path.replace('/', os.sep)
    abs_path = db_path if os.path.isabs(db_path) else os.path.join(PROJECT_ROOT, db_path)
    instance_dir = os.path.dirname(abs_path)
    os.makedirs(instance_dir, exist_ok=True)

    deleted = False
    if os.path.exists(abs_path):
        print(f"🗑️  Tentando remover banco de dados: {abs_path}")
        try:
            os.remove(abs_path)
            deleted = True
            print("✅ Arquivo removido.")
        except PermissionError:
            print("⚠️  Arquivo bloqueado por outro processo. Fallback para drop_all/create_all.")
    else:
        print(f"ℹ️  Banco não existe, será criado: {abs_path}")

    print("🔧 Recriando tabelas...")
    app = create_app('development')
    with app.app_context():
        from backend.services.db import models  # noqa: F401
        from backend.services.db.connection import db
        if not deleted:
            try:
                db.drop_all()
                print("🧹 Tabelas antigas removidas (drop_all).")
            except Exception as e:
                print(f"⚠️  Falha no drop_all: {e}")
        db.create_all()
        print("✅ Tabelas recriadas com sucesso.")
    time.sleep(0.5)


if __name__ == '__main__':
    reset()
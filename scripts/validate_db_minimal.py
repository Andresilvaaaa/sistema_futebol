"""
Validação mínima do banco de dados para CI/Pre-deploy

Objetivos:
- Conectar ao banco via Flask app
- Confirmar PRAGMA foreign_keys=ON em SQLite
- Listar tabelas existentes e garantir que DB responde
"""
import os
import sys
from typing import List

# Garantir que o pacote backend esteja no path
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from backend import create_app  # type: ignore
from backend.services.db.connection import db  # type: ignore


def get_tables() -> List[str]:
    # SQL padrão para listar tabelas conforme dialect
    driver = db.engine.url.drivername
    if driver.startswith('sqlite'):
        sql = "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"
    elif driver.startswith('postgres'):
        sql = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';"
    else:
        # fallback genérico
        sql = ""
    result = db.session.execute(db.text(sql))
    return [row[0] for row in result]


def check_sqlite_foreign_keys() -> bool:
    try:
        driver = db.engine.url.drivername
        if driver.startswith('sqlite'):
            res = db.session.execute(db.text('PRAGMA foreign_keys;')).scalar()
            return int(res) == 1
        return True
    except Exception:
        return False


def main():
    env = os.environ.get('FLASK_ENV', 'development')
    app = create_app(env)
    with app.app_context():
        # Verificar conexão básica
        ping = db.session.execute(db.text('SELECT 1')).scalar()
        assert ping == 1, 'Falha ao executar SELECT 1'

        # Verificar PRAGMA em SQLite
        assert check_sqlite_foreign_keys(), 'foreign_keys não está ON em SQLite'

        # Obter tabelas (não falhar se vazio, apenas reportar)
        try:
            tables = get_tables()
            print(f"Tabelas detectadas ({len(tables)}): {tables}")
        except Exception as e:
            print(f"Aviso: falha ao listar tabelas: {e}")

        print('✅ Validação mínima do DB concluída com sucesso')


if __name__ == '__main__':
    main()
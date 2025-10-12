"""
Verificação rápida do banco de dados (smoke check)

Executa:
- Conexão ao banco via Flask app factory
- Ativa PRAGMA foreign_keys (SQLite)
- Lista tabelas e conta registros básicos

Saída amigável para inspeção manual.
"""

import os
import sys
from typing import List

# Garantir que o diretório raiz do projeto esteja no sys.path
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from backend import create_app
from backend.services.db.connection import db, _enable_sqlite_foreign_keys


def list_tables() -> List[str]:
    inspector = db.inspect(db.engine)
    return inspector.get_table_names()


def main() -> int:
    print("\n🔎 Verificando banco de dados...")
    app = create_app()
    with app.app_context():
        # Forçar criação de tabelas em dev se não houver migrações aplicadas
        try:
            from backend.services.db import models  # noqa
            db.create_all()
        except Exception:
            pass

        # Ativar PRAGMA foreign_keys para SQLite
        try:
            _enable_sqlite_foreign_keys(app)
            print("✅ PRAGMA foreign_keys=ON (SQLite)")
        except Exception as e:
            print(f"⚠️ Não foi possível aplicar PRAGMA: {e}")

        # Testar conexão
        try:
            result = db.session.execute(db.text("SELECT 1")).scalar()
            assert result == 1
            print("✅ Conexão ao DB funcionando (SELECT 1)")
        except Exception as e:
            print(f"❌ Falha na conexão com o DB: {e}")
            return 1

        # Listar tabelas
        try:
            tables = list_tables()
            print(f"📦 Tabelas detectadas ({len(tables)}): {', '.join(tables) if tables else 'nenhuma'}")
        except Exception as e:
            print(f"❌ Falha ao listar tabelas: {e}")
            return 1

        # Consultas simples por tabela chave
        def count(table: str) -> int:
            try:
                return db.session.execute(db.text(f"SELECT COUNT(*) FROM {table}")).scalar() or 0
            except Exception:
                return -1

        for table in [
            "users", "players", "monthly_periods", "monthly_players", "casual_players", "expenses"
        ]:
            c = count(table)
            flag = "✅" if c >= 0 else "❌"
            print(f"{flag} {table}: {'n/a' if c < 0 else c} registros")

    print("\n🏁 Verificação concluída.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
import sqlite3
import sys


def main(db_path: str):
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '_alembic_tmp_%'")
    tmp_tables = [r[0] for r in cur.fetchall()]
    if not tmp_tables:
        print("No _alembic_tmp_ tables found.")
        conn.close()
        return
    print("Dropping temp tables:", tmp_tables)
    for tbl in tmp_tables:
        cur.execute(f"DROP TABLE IF EXISTS {tbl}")
    conn.commit()
    conn.close()
    print("Cleanup done.")


if __name__ == '__main__':
    # Default path to dev DB used by app config
    default_db = 'c:/Users/ANDREE/Desktop/sistema_futebol/backend/instance/futebol_dev.db'
    db_path = sys.argv[1] if len(sys.argv) > 1 else default_db
    main(db_path)
import sqlite3
import os

DB_PATHS = [
    os.path.abspath(os.path.join('backend', 'instance', 'futebol_dev.db')),
    os.path.abspath(os.path.join('instance', 'futebol_dev.db')),
]

def inspect_db(path: str):
    print(f"\n=== Inspecting DB: {path} ===")
    if not os.path.exists(path):
        print("Status: NOT FOUND")
        return
    try:
        conn = sqlite3.connect(path)
        cur = conn.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
        tables = [row[0] for row in cur.fetchall()]
        print(f"Tables ({len(tables)}): {tables}")

        for table in ("players", "oplayers"):
            if table in tables:
                cur.execute(f"SELECT COUNT(*) FROM {table}")
                total = cur.fetchone()[0]
                print(f"{table} total: {total}")
                cur.execute(f"SELECT id, name, status, is_active FROM {table} ORDER BY id LIMIT 20")
                rows = cur.fetchall()
                if rows:
                    print(f"Sample rows from {table}:")
                    for r in rows:
                        print("  ", r)
                else:
                    print(f"No rows found in {table}.")
            else:
                print(f"Table '{table}' not present.")
    finally:
        try:
            conn.close()
        except Exception:
            pass

if __name__ == "__main__":
    for p in DB_PATHS:
        inspect_db(p)
import sqlite3
import os


def main():
    # Preferir o banco na raiz do projeto (instance/futebol_dev.db)
    root_db = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'instance', 'futebol_dev.db')
    backend_db = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'backend', 'instance', 'futebol_dev.db')

    db_path = root_db if os.path.exists(root_db) else backend_db
    print(f"Using DB: {db_path}")

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    # Listar colunas de monthly_players
    try:
        cur.execute("PRAGMA table_info('monthly_players')")
        cols = cur.fetchall()
        print('monthly_players columns:', [c[1] for c in cols])
    except Exception as e:
        print('Error reading monthly_players columns:', e)

    # Listar colunas de casual_players
    try:
        cur.execute("PRAGMA table_info('casual_players')")
        cols = cur.fetchall()
        print('casual_players columns:', [c[1] for c in cols])
    except Exception as e:
        print('Error reading casual_players columns:', e)

    # Contar user_id nulos
    for tbl in ('monthly_players', 'casual_players'):
        try:
            cur.execute(f"SELECT COUNT(*) FROM {tbl} WHERE user_id IS NULL")
            count = cur.fetchone()[0]
            print(f"{tbl} null user_id:", count)
        except Exception as e:
            print(f"Error counting NULL user_id in {tbl}:", e)

    conn.close()


if __name__ == '__main__':
    main()
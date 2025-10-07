import sqlite3
import os

DB_PATH = os.path.join('backend', 'instance', 'dev.db')

def column_exists(cursor, table, column):
    cursor.execute(f"PRAGMA table_info({table})")
    return any(row[1] == column for row in cursor.fetchall())

def add_custom_monthly_fee(cursor):
    cursor.execute(
        "ALTER TABLE monthly_players ADD COLUMN custom_monthly_fee NUMERIC(10, 2) NULL;"
    )

def main():
    if not os.path.exists(DB_PATH):
        print(f"Database not found at {DB_PATH}")
        return
    conn = sqlite3.connect(DB_PATH)
    try:
        cursor = conn.cursor()
        print("Checking table structure for monthly_players...")
        has_column = column_exists(cursor, 'monthly_players', 'custom_monthly_fee')
        print(f"custom_monthly_fee exists: {has_column}")
        if not has_column:
            print("Adding custom_monthly_fee column...")
            add_custom_monthly_fee(cursor)
            conn.commit()
            print("Column added successfully.")
        else:
            print("No changes required.")
    finally:
        conn.close()

if __name__ == '__main__':
    main()
import sys
import sqlite3
sys.path.append('.')

from app import create_app

app = create_app()

# Conectar ao banco SQLite
conn = sqlite3.connect('instance/futebol_dev.db')
cursor = conn.cursor()

# Verificar schema da tabela players
cursor.execute("PRAGMA table_info(players)")
columns = cursor.fetchall()

print("Schema atual da tabela players:")
for col in columns:
    print(f"  {col[1]}: {col[2]}, NOT NULL: {col[3] == 1}, DEFAULT: {col[4]}")

# Verificar dados existentes
cursor.execute("SELECT id, name, email, join_date FROM players LIMIT 5")
players = cursor.fetchall()

print("\nDados existentes na tabela players:")
for player in players:
    print(f"  ID: {player[0]}, Nome: {player[1]}, Email: {player[2]}, Join Date: {player[3]}")

conn.close()
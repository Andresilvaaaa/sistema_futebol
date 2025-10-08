import sys
import sqlite3
from datetime import date
import json

# Conectar ao banco SQLite
conn = sqlite3.connect('instance/futebol_dev.db')
cursor = conn.cursor()

# Buscar dados do jogador
cursor.execute("SELECT id, name, email, join_date FROM players LIMIT 1")
player = cursor.fetchone()

if player:
    print("Dados do jogador no banco:")
    print(f"  ID: {player[0]}")
    print(f"  Nome: {player[1]}")
    print(f"  Email: {player[2]}")
    print(f"  Join Date (raw): {player[3]}")
    print(f"  Join Date Type: {type(player[3])}")
    
    # Simular como o Marshmallow serializa a data
    join_date_str = player[3]
    print(f"  Join Date String: '{join_date_str}'")
    
    # Testar conversão no JavaScript
    print("\nTestando conversão JavaScript:")
    print(f"  new Date('{join_date_str}') seria válido?")
    
    # Verificar se é uma data válida
    try:
        from datetime import datetime
        parsed_date = datetime.strptime(join_date_str, '%Y-%m-%d')
        print(f"  Data parseada: {parsed_date}")
        print(f"  ISO format: {parsed_date.date().isoformat()}")
    except ValueError as e:
        print(f"  Erro ao parsear data: {e}")

conn.close()
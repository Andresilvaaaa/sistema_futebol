import sys
import requests
import json
sys.path.append('.')

from app import create_app
from services.db.models import Player
from services.db.connection import db

app = create_app()

with app.app_context():
    # Buscar um jogador do banco
    player = Player.query.first()
    if player:
        print("Dados do jogador no banco:")
        print(f"  ID: {player.id}")
        print(f"  Nome: {player.name}")
        print(f"  Email: {player.email}")
        print(f"  Join Date: {player.join_date}")
        print(f"  Join Date Type: {type(player.join_date)}")
        print(f"  Join Date String: {str(player.join_date)}")
        
        # Simular serialização JSON
        from datetime import date
        if isinstance(player.join_date, date):
            print(f"  Join Date ISO: {player.join_date.isoformat()}")
    else:
        print("Nenhum jogador encontrado no banco")

# Testar a API
try:
    response = requests.get('http://localhost:5000/api/players')
    print(f"\nResposta da API (status: {response.status_code}):")
    if response.status_code == 401:
        print("  Erro de autorização - precisa de token")
    else:
        print(f"  {response.text}")
except Exception as e:
    print(f"Erro ao chamar API: {e}")
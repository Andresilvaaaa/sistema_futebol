import sys
import os
from datetime import datetime

# Adicionar o diretório backend ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from services.db.models import Player

def check_null_dates():
    """Verificar jogadores com join_date nulo"""
    app = create_app()
    
    with app.app_context():
        # Buscar todos os jogadores
        all_players = Player.query.all()
        print(f"📊 Total de jogadores: {len(all_players)}")
        
        # Verificar jogadores com join_date nulo
        null_date_players = Player.query.filter(Player.join_date.is_(None)).all()
        print(f"❌ Jogadores com join_date nulo: {len(null_date_players)}")
        
        if null_date_players:
            print("\n🔍 Jogadores com join_date nulo:")
            for player in null_date_players:
                print(f"  - ID: {player.id}")
                print(f"    Nome: {player.name}")
                print(f"    Join Date: {player.join_date}")
                print(f"    Created At: {player.created_at}")
                print()
        
        # Verificar jogadores com join_date vazio ou inválido
        print("\n🔍 Verificando todos os jogadores:")
        for player in all_players[:10]:  # Mostrar apenas os primeiros 10
            print(f"  - {player.name}: join_date = {player.join_date} (tipo: {type(player.join_date)})")
        
        # Tentar criar um jogador diretamente no banco com join_date nulo
        print("\n🧪 Tentando criar jogador com join_date nulo diretamente no banco...")
        try:
            from services.db import db
            
            test_player = Player(
                name="TESTE DIRETO NULL",
                position="Atacante",
                phone="11777777777",
                email="teste.direto@example.com",
                monthly_fee=100.0,
                status="active",
                join_date=None  # Explicitamente nulo
            )
            
            db.session.add(test_player)
            db.session.commit()
            
            print(f"✅ Jogador criado com join_date nulo!")
            print(f"ID: {test_player.id}")
            print(f"Join Date: {test_player.join_date}")
            
        except Exception as e:
            print(f"❌ Erro ao criar jogador com join_date nulo: {e}")
            db.session.rollback()

if __name__ == "__main__":
    check_null_dates()
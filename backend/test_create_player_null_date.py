import requests
import json
import sys
import os

# Adicionar o diretório backend ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

BASE_URL = "http://localhost:5000/api"

def login():
    """Fazer login e obter token"""
    login_data = {
        "username": "admin",
        "password": "admin123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        print(f"Erro no login: {response.status_code} - {response.text}")
        return None

def create_player_with_null_date(token):
    """Criar jogador com join_date nulo"""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    # Dados do jogador sem join_date
    player_data = {
        "name": "TESTE NULL DATE 2",
        "position": "Atacante",
        "phone": "11888888888",  # Telefone diferente
        "email": "teste.null2@example.com",
        "monthly_fee": 100.0,
        "status": "active"
        # join_date não incluído propositalmente
    }
    
    print("Criando jogador sem join_date...")
    response = requests.post(f"{BASE_URL}/players", json=player_data, headers=headers)
    
    if response.status_code == 201:
        player = response.json()
        print(f"✅ Jogador criado com sucesso!")
        print(f"Resposta completa: {json.dumps(player, indent=2)}")
        
        # Verificar se a resposta tem a estrutura esperada
        if 'player' in player:
            player_data = player['player']
            print(f"ID: {player_data.get('id', 'N/A')}")
            print(f"Nome: {player_data.get('name', 'N/A')}")
            print(f"Join Date: {player_data.get('join_date', 'None')}")
            return player_data.get('id')
        else:
            print(f"ID: {player.get('id', 'N/A')}")
            print(f"Nome: {player.get('name', 'N/A')}")
            print(f"Join Date: {player.get('join_date', 'None')}")
            return player.get('id')
    else:
        print(f"❌ Erro ao criar jogador: {response.status_code}")
        print(f"Resposta: {response.text}")
        return None

def get_player(token, player_id):
    """Buscar jogador específico"""
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    response = requests.get(f"{BASE_URL}/players/{player_id}", headers=headers)
    
    if response.status_code == 200:
        player = response.json()
        print(f"\n📋 Dados do jogador {player_id}:")
        print(f"Nome: {player['name']}")
        print(f"Join Date: {player.get('join_date', 'None')}")
        print(f"Tipo do join_date: {type(player.get('join_date'))}")
        return player
    else:
        print(f"❌ Erro ao buscar jogador: {response.status_code}")
        return None

if __name__ == "__main__":
    print("🔐 Fazendo login...")
    token = login()
    
    if token:
        print("✅ Login realizado com sucesso!")
        
        # Criar jogador com join_date nulo
        player_id = create_player_with_null_date(token)
        
        if player_id:
            # Buscar o jogador criado para verificar os dados
            get_player(token, player_id)
    else:
        print("❌ Falha no login")
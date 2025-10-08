#!/usr/bin/env python3
"""
Script para testar a importação de jogadores para períodos mensais
"""
import requests
import json

# Configurações
BASE_URL = "http://localhost:5000"
LOGIN_URL = f"{BASE_URL}/api/auth/login"

def get_auth_token():
    """Obter token de autenticação"""
    login_data = {
        "username": "admin",
        "password": "admin123"
    }
    
    response = requests.post(LOGIN_URL, json=login_data)
    if response.status_code == 200:
        data = response.json()
        return data.get('access_token')
    else:
        print(f"Erro ao fazer login: {response.status_code}")
        print(response.text)
        return None

def get_players():
    """Obter lista de jogadores"""
    token = get_auth_token()
    if not token:
        return []
    
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/api/players", headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        return data.get('data', [])  # Extrair a lista de jogadores do campo 'data'
    else:
        print(f"Erro ao obter jogadores: {response.status_code}")
        return []

def test_import_players():
    """Testar importação de jogadores"""
    token = get_auth_token()
    if not token:
        print("Não foi possível obter token de autenticação")
        return
    
    # Obter jogadores disponíveis
    players_response = get_players()
    print(f"Resposta dos jogadores: {players_response}")
    
    if not players_response or not isinstance(players_response, list) or len(players_response) == 0:
        print("Nenhum jogador encontrado ou formato inválido")
        return
    
    # Pegar o quinto jogador para teste (TESTE NULL DATE 2)
    player = players_response[4]
    player_id = player['id']
    player_name = player['name']
    print(f"Testando importação do jogador: {player_name} (ID: {player_id})")
    
    # ID do período mensal (do erro original)
    period_id = "49798b95-eda3-4421-9705-d8ef94f1284c"
    
    # Dados para importação
    import_data = {
        "player_ids": [player_id]
    }
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    # Fazer requisição POST
    response = requests.post(
        f"{BASE_URL}/api/monthly-periods/{period_id}/players",
        headers=headers,
        json=import_data
    )
    
    print(f"Status da resposta: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print("Importação bem-sucedida!")
        print(f"Jogadores adicionados: {len(data.get('added_players', []))}")
        print(f"Total esperado atualizado: {data.get('total_expected')}")
    else:
        print("Erro na importação:")
        try:
            error_data = response.json()
            print(json.dumps(error_data, indent=2, ensure_ascii=False))
        except:
            print(response.text)

if __name__ == "__main__":
    test_import_players()
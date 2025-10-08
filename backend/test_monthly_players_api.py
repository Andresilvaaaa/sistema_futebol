#!/usr/bin/env python3
"""
Script para testar o endpoint GET /api/monthly-periods/{id}/players
e reproduzir o erro HTTP 500
"""

import requests
import json

def get_auth_token():
    """Faz login e obtém o token de autenticação"""
    login_url = "http://localhost:5000/api/auth/login"
    login_data = {
        "username": "admin",
        "password": "admin123"
    }
    
    try:
        response = requests.post(login_url, json=login_data)
        if response.status_code == 200:
            data = response.json()
            return data.get('access_token')
        else:
            print(f"Erro no login: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"Erro ao fazer login: {e}")
        return None

def test_monthly_players_endpoint():
    """Testa o endpoint de jogadores mensais"""
    # Obter token de autenticação
    token = get_auth_token()
    if not token:
        print("❌ Não foi possível obter token de autenticação")
        return
    
    print(f"✅ Token obtido: {token[:50]}...")
    
    # Testar o endpoint que está causando erro HTTP 500
    period_id = "49798b95-eda3-4421-9705-d8ef94f1284c"
    url = f"http://localhost:5000/api/monthly-periods/{period_id}/players"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    params = {
        "page": 1,
        "per_page": 100
    }
    
    print(f"\n🔍 Testando endpoint: {url}")
    print(f"📋 Parâmetros: {params}")
    
    try:
        response = requests.get(url, headers=headers, params=params)
        
        print(f"\n📊 Status Code: {response.status_code}")
        print(f"📄 Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Sucesso! Retornados {len(data)} jogadores")
            
            # Mostrar alguns dados dos jogadores
            for i, player in enumerate(data[:3]):  # Mostrar apenas os 3 primeiros
                print(f"\n👤 Jogador {i+1}:")
                print(f"   ID: {player.get('id')}")
                print(f"   Nome: {player.get('player_name')}")
                print(f"   Email: {player.get('email')}")
                print(f"   Join Date: {player.get('join_date')}")
                print(f"   Status: {player.get('status')}")
        else:
            print(f"❌ Erro HTTP {response.status_code}")
            try:
                error_data = response.json()
                print(f"📄 Resposta: {json.dumps(error_data, indent=2)}")
            except:
                print(f"📄 Resposta (texto): {response.text}")
                
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")

if __name__ == "__main__":
    print("🧪 Testando endpoint de jogadores mensais...")
    test_monthly_players_endpoint()
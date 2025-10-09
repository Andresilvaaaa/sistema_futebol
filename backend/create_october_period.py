#!/usr/bin/env python3
"""
Script para criar um período mensal para outubro/2025 para testar as APIs
"""

import requests
import json
import sys
from datetime import datetime

# Configurações da API
BASE_URL = "http://localhost:5000"
LOGIN_URL = f"{BASE_URL}/api/auth/login"
MONTHLY_PERIODS_URL = f"{BASE_URL}/api/monthly-payments"

def get_auth_token():
    """Obtém token de autenticação"""
    login_data = {
        "username": "admin",
        "password": "admin123"
    }
    
    try:
        response = requests.post(LOGIN_URL, json=login_data)
        if response.status_code == 200:
            data = response.json()
            return data.get('access_token')
        else:
            print(f"Erro no login: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"Erro ao fazer login: {e}")
        return None

def create_october_period(token):
    """Cria período mensal para outubro/2025"""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    period_data = {
        "year": 2025,
        "month": 10
    }
    
    try:
        print(f"Criando período mensal para outubro/2025...")
        print(f"Dados: {json.dumps(period_data, indent=2)}")
        
        response = requests.post(MONTHLY_PERIODS_URL, json=period_data, headers=headers)
        
        print(f"Status: {response.status_code}")
        print(f"Resposta: {response.text}")
        
        if response.status_code == 201:
            data = response.json()
            print("✅ Período criado com sucesso!")
            print(f"ID do período: {data.get('data', {}).get('id')}")
            return data.get('data')
        else:
            print(f"❌ Erro ao criar período: {response.status_code}")
            return None
            
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")
        return None

def add_players_to_period(token, period_id):
    """Adiciona alguns jogadores ao período para ter dados de teste"""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    # Primeiro, vamos buscar jogadores disponíveis
    players_url = f"{BASE_URL}/api/players"
    try:
        response = requests.get(players_url, headers=headers)
        if response.status_code == 200:
            players_data = response.json()
            players = players_data.get('data', [])
            
            if not players:
                print("⚠️ Nenhum jogador encontrado para adicionar ao período")
                return
            
            # Pegar os primeiros 3 jogadores
            selected_players = players[:3]
            
            # Adicionar jogadores ao período
            add_players_url = f"{BASE_URL}/api/monthly-periods/{period_id}/players"
            players_payload = {
                "players": [
                    {
                        "player_id": player['id'],
                        "monthly_fee": 85.0,
                        "status": "pending"
                    }
                    for player in selected_players
                ]
            }
            
            print(f"Adicionando {len(selected_players)} jogadores ao período...")
            response = requests.post(add_players_url, json=players_payload, headers=headers)
            
            print(f"Status: {response.status_code}")
            print(f"Resposta: {response.text}")
            
            if response.status_code == 201:
                print("✅ Jogadores adicionados com sucesso!")
            else:
                print(f"❌ Erro ao adicionar jogadores: {response.status_code}")
                
        else:
            print(f"❌ Erro ao buscar jogadores: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Erro ao adicionar jogadores: {e}")

def main():
    print("🚀 Criando período mensal para outubro/2025...")
    
    # 1. Fazer login
    token = get_auth_token()
    if not token:
        print("❌ Falha na autenticação")
        sys.exit(1)
    
    print("✅ Login realizado com sucesso")
    
    # 2. Criar período
    period = create_october_period(token)
    if not period:
        print("❌ Falha ao criar período")
        sys.exit(1)
    
    # 3. Adicionar jogadores ao período
    period_id = period.get('id')
    if period_id:
        add_players_to_period(token, period_id)
    
    print("\n🎉 Script concluído!")

if __name__ == "__main__":
    main()
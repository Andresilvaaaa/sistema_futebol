#!/usr/bin/env python3
"""
Script para testar as APIs relacionadas aos contadores da página mensal
"""

import requests
import json
from datetime import datetime

def get_auth_token():
    """Faz login e obtém o token de autenticação"""
    login_data = {
        "username": "admin",
        "password": "admin123"
    }
    
    try:
        response = requests.post('http://localhost:5000/api/auth/login', json=login_data)
        if response.status_code == 200:
            data = response.json()
            return data.get('access_token')
        else:
            print(f"❌ Erro no login: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Erro ao fazer login: {e}")
        return None

def test_api_with_token(token):
    """Testa as APIs relacionadas aos contadores"""
    headers = {'Authorization': f'Bearer {token}'}
    
    print("🔍 Testando APIs dos contadores...")
    print("=" * 50)
    
    # Teste 1: Períodos mensais
    print("\n1️⃣ Testando API de períodos mensais...")
    try:
        response = requests.get('http://localhost:5000/api/monthly-periods', headers=headers)
        print(f"   Status: {response.status_code}")
        
        if response.ok:
            data = response.json()
            print(f"   ✅ Períodos encontrados: {len(data.get('data', []))}")
            
            if data.get('data'):
                for period in data['data']:
                    print(f"      - {period.get('month')}/{period.get('year')} (ID: {period.get('id')})")
        else:
            print(f"   ❌ Erro: {response.text}")
    except Exception as e:
        print(f"   💥 Erro na requisição: {e}")
    
    # Teste 2: Estatísticas de pagamento
    print("\n2️⃣ Testando API de estatísticas de pagamento...")
    try:
        response = requests.get('http://localhost:5000/api/payment-stats', headers=headers)
        print(f"   Status: {response.status_code}")
        
        if response.ok:
            data = response.json()
            print(f"   ✅ Estatísticas obtidas:")
            print(f"      - Recebido: R$ {data.get('received', 0)}")
            print(f"      - Esperado: R$ {data.get('expected', 0)}")
            print(f"      - Pendente: R$ {data.get('pending', 0)}")
            print(f"      - Pagaram: {data.get('paid_count', 0)}")
            print(f"      - Pendentes: {data.get('pending_count', 0)}")
        else:
            print(f"   ❌ Erro: {response.text}")
    except Exception as e:
        print(f"   💥 Erro na requisição: {e}")
    
    # Teste 3: Período atual (outubro/2025)
    current_month = 10
    current_year = 2025
    
    print(f"\n3️⃣ Testando período atual ({current_month}/{current_year})...")
    try:
        response = requests.get(f'http://localhost:5000/api/monthly-periods/{current_year}/{current_month}', headers=headers)
        print(f"   Status: {response.status_code}")
        
        if response.ok:
            data = response.json()
            print(f"   ✅ Período encontrado:")
            print(f"      - ID: {data.get('id')}")
            print(f"      - Mês/Ano: {data.get('month')}/{data.get('year')}")
            print(f"      - Mensalidade: R$ {data.get('monthly_fee')}")
            
            # Teste 3.1: Jogadores do período atual
            period_id = data.get('id')
            if period_id:
                print(f"\n   3.1️⃣ Testando jogadores do período {period_id}...")
                players_response = requests.get(f'http://localhost:5000/api/monthly-periods/{period_id}/players', headers=headers)
                print(f"      Status: {players_response.status_code}")
                
                if players_response.ok:
                    players_data = players_response.json()
                    print(f"      ✅ Jogadores encontrados: {len(players_data.get('data', []))}")
                    
                    paid_count = sum(1 for p in players_data.get('data', []) if p.get('payment_status') == 'paid')
                    pending_count = len(players_data.get('data', [])) - paid_count
                    
                    print(f"      - Pagaram: {paid_count}")
                    print(f"      - Pendentes: {pending_count}")
                else:
                    print(f"      ❌ Erro nos jogadores: {players_response.text}")
        else:
            print(f"   ❌ Período não encontrado: {response.text}")
    except Exception as e:
        print(f"   💥 Erro na requisição: {e}")
    
    # Teste 4: Despesas do período atual
    print(f"\n4️⃣ Testando despesas do período atual...")
    try:
        response = requests.get(f'http://localhost:5000/api/monthly-periods/{current_year}/{current_month}/expenses', headers=headers)
        print(f"   Status: {response.status_code}")
        
        if response.ok:
            data = response.json()
            print(f"   ✅ Despesas encontradas: {len(data.get('data', []))}")
            
            total_expenses = sum(float(expense.get('amount', 0)) for expense in data.get('data', []))
            print(f"      - Total de despesas: R$ {total_expenses}")
        else:
            print(f"   ❌ Erro: {response.text}")
    except Exception as e:
        print(f"   💥 Erro na requisição: {e}")

def main():
    print("🚀 Iniciando teste dos contadores da página mensal")
    print("=" * 60)
    
    # Obter token
    token = get_auth_token()
    if not token:
        print("❌ Não foi possível obter token de autenticação")
        return
    
    print(f"✅ Token obtido: {token[:50]}...")
    
    # Testar APIs
    test_api_with_token(token)
    
    print("\n" + "=" * 60)
    print("✅ Teste concluído!")

if __name__ == "__main__":
    main()
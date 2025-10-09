#!/usr/bin/env python3
"""
Script para debugar a API de períodos mensais
"""

import requests
import json
import sys

# Configurações da API
BASE_URL = "http://localhost:5000"
LOGIN_URL = f"{BASE_URL}/api/auth/login"

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

def test_monthly_periods_api(token):
    """Testa a API de períodos mensais"""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    print("🔍 Testando API de períodos mensais...")
    
    # Testar GET /api/monthly-periods
    try:
        url = f"{BASE_URL}/api/monthly-periods"
        print(f"URL: {url}")
        
        response = requests.get(url, headers=headers)
        print(f"Status: {response.status_code}")
        print(f"Headers da resposta: {dict(response.headers)}")
        
        if response.status_code == 200:
            try:
                data = response.json()
                print(f"Tipo da resposta: {type(data)}")
                print(f"Resposta completa: {json.dumps(data, indent=2, ensure_ascii=False)}")
                
                if isinstance(data, list):
                    print(f"✅ Lista com {len(data)} itens")
                    for i, item in enumerate(data):
                        print(f"  Item {i}: {type(item)} - {item}")
                elif isinstance(data, dict):
                    print(f"✅ Dicionário com chaves: {list(data.keys())}")
                    if 'data' in data:
                        print(f"  data: {type(data['data'])} - {data['data']}")
                else:
                    print(f"❓ Tipo inesperado: {type(data)}")
                    
            except json.JSONDecodeError as e:
                print(f"❌ Erro ao decodificar JSON: {e}")
                print(f"Texto da resposta: {response.text}")
        else:
            print(f"❌ Erro HTTP: {response.text}")
            
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")

def test_payment_stats_api(token):
    """Testa a API de estatísticas de pagamento"""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    print("\n🔍 Testando API de estatísticas de pagamento...")
    
    # Testar GET /api/stats/payments/2025/10
    try:
        url = f"{BASE_URL}/api/stats/payments/2025/10"
        print(f"URL: {url}")
        
        response = requests.get(url, headers=headers)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Estatísticas: {json.dumps(data, indent=2, ensure_ascii=False)}")
        else:
            print(f"❌ Erro: {response.text}")
            
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")

def main():
    print("🚀 Debugando APIs dos contadores...")
    
    # 1. Fazer login
    token = get_auth_token()
    if not token:
        print("❌ Falha na autenticação")
        sys.exit(1)
    
    print("✅ Login realizado com sucesso")
    
    # 2. Testar API de períodos mensais
    test_monthly_periods_api(token)
    
    # 3. Testar API de estatísticas
    test_payment_stats_api(token)
    
    print("\n🎉 Debug concluído!")

if __name__ == "__main__":
    main()
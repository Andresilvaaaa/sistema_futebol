#!/usr/bin/env python3
"""
Script para testar diretamente os endpoints da API
"""

import requests
import json

API_BASE = "http://localhost:5000/api"

def test_login_and_periods():
    """Testa login e busca de períodos mensais"""
    
    # Credenciais dos usuários
    user1_credentials = {"email": "admin@example.com", "password": "admin123"}
    user2_credentials = {"email": "user2@example.com", "password": "user123"}
    
    print("🔍 Testando endpoints da API diretamente...")
    print("=" * 60)
    
    # Teste de login do usuário 1
    print("1. Testando login do usuário 1...")
    response = requests.post(f"{API_BASE}/auth/login", json=user1_credentials)
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.text[:200]}...")
    
    if response.status_code == 200:
        token1 = response.json().get('access_token')
        print(f"   Token obtido: {token1[:50]}...")
        
        # Teste de busca de períodos
        print("\n2. Testando busca de períodos mensais...")
        headers = {"Authorization": f"Bearer {token1}", "Content-Type": "application/json"}
        response = requests.get(f"{API_BASE}/monthly-payments", headers=headers)
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.text[:500]}...")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Estrutura da resposta: {list(data.keys()) if isinstance(data, dict) else 'Lista'}")
            
            # Verificar se há períodos
            if isinstance(data, dict) and 'periods' in data:
                periods = data['periods']
                print(f"   Número de períodos: {len(periods)}")
            elif isinstance(data, list):
                print(f"   Número de períodos: {len(data)}")
            else:
                print(f"   Estrutura inesperada: {type(data)}")
    
    print("\n" + "=" * 60)
    print("🏁 Teste concluído!")

if __name__ == "__main__":
    test_login_and_periods()
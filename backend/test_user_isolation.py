#!/usr/bin/env python3
"""
Script para testar o isolamento de dados por user_id nos endpoints atualizados.
"""

import requests
import json
from datetime import datetime, date

# Configuração da API
BASE_URL = "http://localhost:5000"
API_BASE = f"{BASE_URL}/api"

def test_user_isolation():
    """Testa se o isolamento de dados por user_id está funcionando corretamente."""
    
    print("🔍 Testando isolamento de dados por user_id...")
    print("=" * 60)
    
    # Dados de teste para dois usuários diferentes
    user1_credentials = {
        "email": "admin@example.com",
        "password": "admin123"
    }
    
    user2_credentials = {
        "email": "user2@example.com", 
        "password": "user123"
    }
    
    # Função para fazer login e obter token
    def login_user(credentials):
        response = requests.post(f"{API_BASE}/auth/login", json=credentials)
        if response.status_code == 200:
            return response.json().get('access_token')
        else:
            print(f"❌ Erro no login: {response.status_code} - {response.text}")
            return None
    
    # Função para criar headers com token
    def get_headers(token):
        return {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
    
    # Login dos usuários
    print("1. Fazendo login dos usuários...")
    token1 = login_user(user1_credentials)
    token2 = login_user(user2_credentials)
    
    if not token1:
        print("❌ Não foi possível fazer login do usuário 1")
        return
    
    if not token2:
        print("❌ Não foi possível fazer login do usuário 2")
        return
    
    print("✅ Login realizado com sucesso para ambos os usuários")
    
    # Headers para cada usuário
    headers1 = get_headers(token1)
    headers2 = get_headers(token2)
    
    # Teste 1: Verificar períodos mensais
    print("\n2. Testando isolamento de períodos mensais...")
    
    response1 = requests.get(f"{API_BASE}/monthly-payments", headers=headers1)
    response2 = requests.get(f"{API_BASE}/monthly-payments", headers=headers2)
    
    if response1.status_code == 200 and response2.status_code == 200:
        data1 = response1.json()
        data2 = response2.json()
        
        # Verificar se a resposta tem a estrutura esperada (API retorna 'data' em vez de 'periods')
        periods1 = data1.get('data', []) if isinstance(data1, dict) else data1
        periods2 = data2.get('data', []) if isinstance(data2, dict) else data2
        
        print(f"   Usuário 1: {len(periods1)} períodos")
        print(f"   Usuário 2: {len(periods2)} períodos")
        
        # Verificar se não há sobreposição de IDs
        if periods1 and periods2:
            try:
                # A estrutura da API retorna objetos com 'period' contendo o ID
                ids1 = {p['period']['id'] for p in periods1 if isinstance(p, dict) and 'period' in p and 'id' in p['period']}
                ids2 = {p['period']['id'] for p in periods2 if isinstance(p, dict) and 'period' in p and 'id' in p['period']}
                overlap = ids1.intersection(ids2)
                
                if overlap:
                    print(f"❌ PROBLEMA: Períodos compartilhados entre usuários: {overlap}")
                else:
                    print("✅ Períodos isolados corretamente")
            except Exception as e:
                print(f"❌ Erro inesperado: {e}")
                print(f"   Estrutura período 1: {periods1[0] if periods1 else 'Vazio'}")
                print(f"   Estrutura período 2: {periods2[0] if periods2 else 'Vazio'}")
        else:
            print("ℹ️  Um ou ambos usuários não têm períodos para comparar")
    else:
        print(f"❌ Erro ao buscar períodos: User1={response1.status_code}, User2={response2.status_code}")
    
    # Teste 2: Verificar jogadores de um período específico
    print("\n3. Testando isolamento de jogadores em períodos...")
    
    # Pegar o primeiro período de cada usuário (se existir)
    if response1.status_code == 200 and len(periods1) > 0:
        try:
            period1_id = periods1[0]['period']['id']
            
            # Usuário 1 tenta acessar seus próprios jogadores
            response = requests.get(f"{API_BASE}/monthly-periods/{period1_id}/players", headers=headers1)
            if response.status_code == 200:
                print("✅ Usuário 1 consegue acessar jogadores do seu período")
            else:
                print(f"❌ Usuário 1 não consegue acessar seus jogadores: {response.status_code}")
            
            # Usuário 2 tenta acessar jogadores do período do usuário 1
            response = requests.get(f"{API_BASE}/monthly-periods/{period1_id}/players", headers=headers2)
            if response.status_code == 404:
                print("✅ Usuário 2 não consegue acessar jogadores do período do usuário 1 (isolamento OK)")
            elif response.status_code == 200:
                print("❌ PROBLEMA: Usuário 2 consegue acessar jogadores do período do usuário 1")
            else:
                print(f"⚠️  Resposta inesperada: {response.status_code}")
        except Exception as e:
            print(f"❌ Erro inesperado: {e}")
            print(f"   Estrutura período: {periods1[0] if periods1 else 'Vazio'}")
    else:
        print("ℹ️  Usuário 1 não tem períodos para testar")
    
    # Teste 3: Verificar jogadores casuais
    print("\n4. Testando isolamento de jogadores casuais...")
    
    if response1.status_code == 200 and len(periods1) > 0:
        period1_id = periods1[0]['period']['id']
        
        # Usuário 1 tenta acessar seus próprios jogadores casuais
        response = requests.get(f"{API_BASE}/monthly-periods/{period1_id}/casual-players", headers=headers1)
        if response.status_code == 200:
            print("✅ Usuário 1 consegue acessar jogadores casuais do seu período")
        else:
            print(f"❌ Usuário 1 não consegue acessar seus jogadores casuais: {response.status_code}")
        
        # Usuário 2 tenta acessar jogadores casuais do período do usuário 1
        response = requests.get(f"{API_BASE}/monthly-periods/{period1_id}/casual-players", headers=headers2)
        if response.status_code == 404:
            print("✅ Usuário 2 não consegue acessar jogadores casuais do período do usuário 1 (isolamento OK)")
        elif response.status_code == 200:
            print("❌ PROBLEMA: Usuário 2 consegue acessar jogadores casuais do período do usuário 1")
        else:
            print(f"⚠️  Resposta inesperada: {response.status_code}")
    else:
        print("ℹ️  Usuário 1 não tem períodos para testar")
    
    # Teste 4: Testar criação de jogador casual
    print("\n5. Testando criação de jogador casual com isolamento...")
    
    if response1.status_code == 200 and len(periods1) > 0:
        period1_id = periods1[0]['period']['id']
        
        # Dados do jogador casual
        casual_player_data = {
            "name": "Jogador Teste",
            "value": 50.0,
            "payment_status": "pending"
        }
        
        # Usuário 1 cria jogador casual no seu período
        response = requests.post(
            f"{API_BASE}/monthly-periods/{period1_id}/casual-players",
            headers=headers1,
            json=casual_player_data
        )
        
        if response.status_code == 201:
            print("✅ Usuário 1 consegue criar jogador casual no seu período")
            casual_player_id = response.json().get('id')
        else:
            print(f"❌ Usuário 1 não consegue criar jogador casual: {response.status_code} - {response.text}")
            casual_player_id = None
        
        # Usuário 2 tenta criar jogador casual no período do usuário 1
        response = requests.post(
            f"{API_BASE}/monthly-periods/{period1_id}/casual-players",
            headers=headers2,
            json=casual_player_data
        )
        
        if response.status_code == 404:
            print("✅ Usuário 2 não consegue criar jogador casual no período do usuário 1 (isolamento OK)")
        elif response.status_code == 201:
            print("❌ PROBLEMA: Usuário 2 consegue criar jogador casual no período do usuário 1")
        else:
            print(f"⚠️  Resposta inesperada: {response.status_code}")
    else:
        print("ℹ️  Usuário 1 não tem períodos para testar")
    
    print("\n" + "=" * 60)
    print("🏁 Teste de isolamento concluído!")

if __name__ == "__main__":
    try:
        test_user_isolation()
    except requests.exceptions.ConnectionError:
        print("❌ Erro: Não foi possível conectar ao servidor. Certifique-se de que o backend está rodando em http://localhost:5000")
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
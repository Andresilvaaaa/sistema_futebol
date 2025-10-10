#!/usr/bin/env python3
"""
Script para criar usuários de teste via API
"""

import requests
import json
import time

# Configuração da API
BASE_URL = "http://localhost:5000"
API_BASE = f"{BASE_URL}/api"

def create_users_via_api():
    """Cria usuários de teste via API de registro."""
    
    print("🔧 Criando usuários de teste via API...")
    print("=" * 50)
    
    # Dados dos usuários
    users_data = [
        {
            "username": "admin",
            "email": "admin@example.com",
            "password": "admin123",
            "name": "Admin User"
        },
        {
            "username": "user2",
            "email": "user2@example.com", 
            "password": "user123",
            "name": "Test User 2"
        }
    ]
    
    for i, user_data in enumerate(users_data, 1):
        print(f"\n{i}. Criando usuário: {user_data['email']}")
        
        try:
            # Tentar registrar o usuário
            response = requests.post(f"{API_BASE}/auth/register", json=user_data)
            
            if response.status_code == 201:
                print(f"✅ Usuário {user_data['email']} criado com sucesso!")
            elif response.status_code == 400:
                # Usuário já existe
                error_data = response.json()
                if "já existe" in error_data.get('error', '').lower():
                    print(f"ℹ️  Usuário {user_data['email']} já existe")
                else:
                    print(f"❌ Erro ao criar usuário: {error_data}")
            else:
                print(f"❌ Erro inesperado: {response.status_code} - {response.text}")
                
        except requests.exceptions.ConnectionError:
            print("❌ Erro: Servidor não está rodando. Certifique-se de que o Flask está ativo.")
            return
        except Exception as e:
            print(f"❌ Erro inesperado: {e}")
    
    print("\n🎉 Processo de criação de usuários concluído!")
    print("\nCredenciais para teste:")
    print("Usuário 1: admin@example.com / admin123")
    print("Usuário 2: user2@example.com / user123")

if __name__ == "__main__":
    create_users_via_api()
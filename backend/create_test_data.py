#!/usr/bin/env python3
"""
Script para criar dados de teste para verificar o isolamento por user_id
"""

import requests
import json
from datetime import datetime, timedelta

API_BASE = "http://localhost:5000/api"

def login_user(email, password):
    """Faz login e retorna o token"""
    response = requests.post(f"{API_BASE}/auth/login", json={
        "email": email,
        "password": password
    })
    
    if response.status_code == 200:
        return response.json().get('access_token')
    else:
        print(f"Erro no login para {email}: {response.status_code} - {response.text}")
        return None

def create_monthly_period(token, month, year):
    """Cria um período mensal"""
    headers = {"Authorization": f"Bearer {token}"}
    
    data = {
        "month": month,
        "year": year
    }
    
    response = requests.post(f"{API_BASE}/monthly-payments", headers=headers, json=data)
    
    if response.status_code == 201:
        period_data = response.json()
        print(f"✅ Período '{month:02d}/{year}' criado com sucesso (ID: {period_data.get('id')})")
        return period_data
    else:
        print(f"❌ Erro ao criar período '{month:02d}/{year}': {response.status_code} - {response.text}")
        return None

def create_player(token, name, position="Meio-campo", phone_suffix="", email_suffix=""):
    """Cria um jogador"""
    headers = {"Authorization": f"Bearer {token}"}
    
    # Gerar telefone único baseado no nome e sufixo
    phone_base = "11" + str(hash(name + phone_suffix))[-8:]
    
    # Gerar email único baseado no nome e sufixo
    email_name = name.lower().replace(' ', '.')
    email = f"{email_name}{email_suffix}@example.com"
    
    data = {
        "name": name,
        "position": position,
        "phone": phone_base,
        "email": email
    }
    
    response = requests.post(f"{API_BASE}/players", headers=headers, json=data)
    
    if response.status_code == 201:
        player_data = response.json()
        print(f"✅ Jogador '{name}' criado com sucesso (ID: {player_data.get('id')})")
        return player_data
    else:
        print(f"❌ Erro ao criar jogador '{name}': {response.status_code} - {response.text}")
        return None

def main():
    print("🏗️  Criando dados de teste...")
    print("=" * 60)
    
    # Fazer login dos usuários
    print("1. Fazendo login dos usuários...")
    token1 = login_user("admin@example.com", "admin123")
    token2 = login_user("user2@example.com", "user123")
    
    if not token1 or not token2:
        print("❌ Falha no login. Verifique se os usuários existem.")
        return
    
    print("✅ Login realizado com sucesso para ambos os usuários")
    
    # Criar períodos para o usuário 1
    print("\n2. Criando períodos para admin@example.com...")
    
    period1_user1 = create_monthly_period(token1, 1, 2024)  # Janeiro 2024
    period2_user1 = create_monthly_period(token1, 12, 2023)  # Dezembro 2023
    
    # Criar períodos para o usuário 2
    print("\n3. Criando períodos para user2@example.com...")
    
    period1_user2 = create_monthly_period(token2, 2, 2024)  # Fevereiro 2024
    period2_user2 = create_monthly_period(token2, 11, 2023)  # Novembro 2023
    
    # Criar alguns jogadores para cada usuário
    print("\n4. Criando jogadores para admin@example.com...")
    player1_user1 = create_player(token1, "João Silva", "Atacante", phone_suffix="1", email_suffix="1")
    player2_user1 = create_player(token1, "Pedro Santos", "Goleiro", phone_suffix="2", email_suffix="2")
    
    print("\n5. Criando jogadores para user2@example.com...")
    player1_user2 = create_player(token2, "Carlos Oliveira", "Zagueiro", phone_suffix="3", email_suffix="3")
    player2_user2 = create_player(token2, "Lucas Costa", "Meio-campo", phone_suffix="4", email_suffix="4")
    
    print("\n" + "=" * 60)
    print("🏁 Dados de teste criados com sucesso!")
    print("\nResumo:")
    print("- 2 períodos mensais para cada usuário")
    print("- 2 jogadores para cada usuário")
    print("- Dados isolados por user_id")

if __name__ == "__main__":
    main()
#!/usr/bin/env python3
"""
Script para testar a importação de jogadores
"""
import requests
import json

def test_import():
    # Obter token
    login_data = {'username': 'admin', 'password': 'admin123'}
    response = requests.post('http://localhost:5000/api/auth/login', json=login_data)
    token = response.json()['access_token']

    # Testar importação com jogador disponível
    period_id = '49798b95-eda3-4421-9705-d8ef94f1284c'
    import_data = {'player_ids': ['7e21d6e6-2021-4f5d-b0a4-f4bd686ad9af']}  # TESTE NULL DATE
    headers = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}

    print('🧪 Testando importação do jogador TESTE NULL DATE...')
    response = requests.post(f'http://localhost:5000/api/monthly-periods/{period_id}/players', headers=headers, json=import_data)
    print(f'Status: {response.status_code}')
    if response.status_code == 200:
        data = response.json()
        print('✅ Importação bem-sucedida!')
        print(f'Mensagem: {data.get("message")}')
        print(f'Jogadores adicionados: {len(data.get("data", []))}')
    else:
        print('❌ Erro na importação:')
        print(response.text)

if __name__ == "__main__":
    test_import()
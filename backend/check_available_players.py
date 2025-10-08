#!/usr/bin/env python3
"""
Script para verificar jogadores disponíveis para importação
"""
import requests
import json

def check_available_players():
    # Obter token
    login_data = {'username': 'admin', 'password': 'admin123'}
    response = requests.post('http://localhost:5000/api/auth/login', json=login_data)
    token = response.json()['access_token']
    headers = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}

    # Listar todos os jogadores
    print('=== TODOS OS JOGADORES ===')
    response = requests.get('http://localhost:5000/api/players', headers=headers)
    all_players = response.json()['data']
    for p in all_players:
        print(f'ID: {p["id"]}, Nome: {p["name"]}, Status: {p["status"]}')

    # Listar jogadores do período atual
    period_id = '49798b95-eda3-4421-9705-d8ef94f1284c'
    print(f'\n=== JOGADORES NO PERÍODO {period_id} ===')
    response = requests.get(f'http://localhost:5000/api/monthly-periods/{period_id}/players', headers=headers)
    if response.status_code == 200:
        period_players = response.json()
        for p in period_players:
            print(f'ID: {p["player_id"]}, Nome: {p["player_name"]}, Status: {p["status"]}')
    else:
        print(f'Erro: {response.status_code} - {response.text}')

    # Identificar jogadores disponíveis
    period_player_ids = set()
    if response.status_code == 200:
        period_player_ids = {p['player_id'] for p in period_players}

    available_players = [p for p in all_players if p['id'] not in period_player_ids and p['status'] == 'active']
    print(f'\n=== JOGADORES DISPONÍVEIS PARA IMPORTAÇÃO ({len(available_players)}) ===')
    for p in available_players:
        print(f'ID: {p["id"]}, Nome: {p["name"]}')
    
    return available_players

if __name__ == "__main__":
    check_available_players()
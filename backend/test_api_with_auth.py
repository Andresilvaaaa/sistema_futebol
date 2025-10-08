import requests
import json

# Primeiro fazer login para obter o token
login_data = {
    "username": "admin",
    "password": "admin123"
}

try:
    # Login
    login_response = requests.post('http://localhost:5000/api/auth/login', json=login_data)
    print(f"Login Status Code: {login_response.status_code}")
    
    if login_response.status_code == 200:
        login_result = login_response.json()
        token = login_result.get('access_token')
        print(f"Token obtido: {token[:50]}...")
        
        # Testar API de jogadores com token
        headers = {'Authorization': f'Bearer {token}'}
        response = requests.get('http://localhost:5000/api/players', headers=headers)
        print(f"\nPlayers API Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response keys: {data.keys()}")
            
            if 'data' in data and len(data['data']) > 0:
                player = data['data'][0]
                print(f"\nPrimeiro jogador:")
                print(f"  ID: {player.get('id')}")
                print(f"  Nome: {player.get('name')}")
                print(f"  Email: {player.get('email')}")
                print(f"  Join Date: {player.get('join_date')}")
                print(f"  Join Date Type: {type(player.get('join_date'))}")
                
                # Verificar se join_date é None ou string vazia
                join_date = player.get('join_date')
                if join_date is None:
                    print("  ⚠️  join_date é None!")
                elif join_date == "":
                    print("  ⚠️  join_date é string vazia!")
                elif not isinstance(join_date, str):
                    print(f"  ⚠️  join_date não é string: {type(join_date)}")
                else:
                    print(f"  ✅ join_date é string válida: '{join_date}'")
                    
                # Mostrar todos os campos do jogador
                print(f"\nTodos os campos do jogador:")
                for key, value in player.items():
                    print(f"  {key}: {value} ({type(value).__name__})")
            else:
                print("Nenhum jogador encontrado")
        else:
            print(f"Erro na API de jogadores: {response.text}")
    else:
        print(f"Erro no login: {login_response.text}")
        
except requests.exceptions.ConnectionError:
    print("Erro: Não foi possível conectar à API. Certifique-se de que o servidor está rodando.")
except Exception as e:
    print(f"Erro: {e}")
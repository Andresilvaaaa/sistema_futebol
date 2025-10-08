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
        
        # Testar criação de jogador SEM email
        headers = {'Authorization': f'Bearer {token}'}
        player_data = {
            "name": "João Rodrigues",
            "position": "atacante",
            "phone": "19999999999",
            # Não incluindo email propositalmente
            "monthly_fee": 150
        }
        
        print(f"\nTentando criar jogador sem email:")
        print(f"Dados: {json.dumps(player_data, indent=2)}")
        
        response = requests.post('http://localhost:5000/api/players', 
                               headers=headers, 
                               json=player_data)
        
        print(f"\nStatus Code: {response.status_code}")
        
        if response.status_code == 201:
            result = response.json()
            print("✅ Jogador criado com sucesso!")
            print(f"ID: {result['data']['id']}")
            print(f"Nome: {result['data']['name']}")
            print(f"Email: {result['data']['email']}")
            print(f"Join Date: {result['data']['join_date']}")
        else:
            print("❌ Erro ao criar jogador:")
            try:
                error_data = response.json()
                print(json.dumps(error_data, indent=2))
            except:
                print(response.text)
                
        # Testar criação de jogador COM email vazio
        player_data_empty_email = {
            "name": "Maria Silva",
            "position": "meio-campo",
            "phone": "19888888888",
            "email": "",  # Email vazio
            "monthly_fee": 150
        }
        
        print(f"\n\nTentando criar jogador com email vazio:")
        print(f"Dados: {json.dumps(player_data_empty_email, indent=2)}")
        
        response2 = requests.post('http://localhost:5000/api/players', 
                                headers=headers, 
                                json=player_data_empty_email)
        
        print(f"\nStatus Code: {response2.status_code}")
        
        if response2.status_code == 201:
            result2 = response2.json()
            print("✅ Jogador criado com sucesso!")
            print(f"ID: {result2['data']['id']}")
            print(f"Nome: {result2['data']['name']}")
            print(f"Email: {result2['data']['email']}")
            print(f"Join Date: {result2['data']['join_date']}")
        else:
            print("❌ Erro ao criar jogador:")
            try:
                error_data2 = response2.json()
                print(json.dumps(error_data2, indent=2))
            except:
                print(response2.text)
                
    else:
        print(f"Erro no login: {login_response.text}")
        
except requests.exceptions.ConnectionError:
    print("Erro: Não foi possível conectar à API. Certifique-se de que o servidor está rodando.")
except Exception as e:
    print(f"Erro: {e}")
import requests
import json

# Testar a API real
try:
    response = requests.get('http://localhost:5000/api/players')
    print(f"Status Code: {response.status_code}")
    
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
        else:
            print("Nenhum jogador encontrado")
    else:
        print(f"Erro na API: {response.text}")
        
except requests.exceptions.ConnectionError:
    print("Erro: Não foi possível conectar à API. Certifique-se de que o servidor está rodando.")
except Exception as e:
    print(f"Erro: {e}")
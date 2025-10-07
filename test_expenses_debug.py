import requests
import json

# Login
login_response = requests.post('http://localhost:5000/api/auth/login', json={'username': 'admin', 'password': 'admin123'})
token = login_response.json()['access_token']

# Buscar períodos
periods_response = requests.get('http://localhost:5000/api/monthly-periods', headers={'Authorization': f'Bearer {token}'})
periods = periods_response.json()

if periods:
    period_id = periods[0]['id']
    print(f'Buscando despesas para período: {period_id}')
    
    # Buscar despesas
    expenses_response = requests.get(f'http://localhost:5000/api/monthly-periods/{period_id}/expenses', headers={'Authorization': f'Bearer {token}'})
    expenses = expenses_response.json()
    
    print(f'Total de despesas: {len(expenses)}')
    for i, expense in enumerate(expenses):
        print(f'Despesa {i+1}:')
        print(f'  ID: {expense.get("id", "MISSING")}')
        print(f'  Description: {expense.get("description", "MISSING")}')
        print(f'  Amount: {expense.get("amount", "MISSING")}')
        print(f'  Category: {expense.get("category", "MISSING")}')
        print(f'  Keys: {list(expense.keys())}')
        print()
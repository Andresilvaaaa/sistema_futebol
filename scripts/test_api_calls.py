import json
import uuid
import sys
import requests

BASE_URL = 'http://127.0.0.1:5000/api'

# Headers base sem Authorization; será preenchido após login
HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}


def login(email: str, password: str) -> str:
    # Backend auth expects 'username' field currently; accept email and map to username for compatibility
    payload = { 'username': email, 'password': password }
    print('Logging in...')
    r = requests.post(f'{BASE_URL}/auth/login', headers=HEADERS, json=payload)
    print('Status:', r.status_code)
    try:
        data = r.json()
    except Exception:
        print('Failed to parse JSON:', r.text)
        sys.exit(1)
    print(json.dumps(data, indent=2, ensure_ascii=False))
    if r.status_code >= 300 or 'access_token' not in data:
        print('Login failed')
        sys.exit(1)
    return data['access_token']


def create_player():
    unique = uuid.uuid4().hex[:8]
    payload = {
        'name': f'Teste Jogador API {unique}',
        'email': f'teste_api_{unique}@example.com',
        'phone': f'11{unique}99',  # garante >= 10 dígitos
        'position': 'forward',
        'monthly_fee': 100.00,
    }
    print('Creating player...')
    r = requests.post(f'{BASE_URL}/players', headers=HEADERS, json=payload)
    print('Status:', r.status_code)
    try:
        data = r.json()
    except Exception:
        print('Failed to parse JSON:', r.text)
        sys.exit(1)
    print(json.dumps(data, indent=2, ensure_ascii=False))
    if r.status_code >= 300 or not data.get('success'):
        print('Player creation failed')
        sys.exit(1)
    return data['data']['id']


def create_monthly_period(year: int, month: int):
    payload = {
        'year': year,
        'month': month,
    }
    print('\nCreating monthly period...')
    r = requests.post(f'{BASE_URL}/monthly-payments', headers=HEADERS, json=payload)
    print('Status:', r.status_code)
    try:
        data = r.json()
    except Exception:
        print('Failed to parse JSON:', r.text)
        sys.exit(1)
    print(json.dumps(data, indent=2, ensure_ascii=False))
    if r.status_code >= 300 or not data.get('success'):
        print('Monthly period creation failed')
        sys.exit(1)
    return data


def validate_monthly_period_response(resp: dict):
    assert isinstance(resp, dict) and resp.get('success') is True, 'Expected success true'
    assert 'data' in resp, 'Missing data in response'
    mp = resp['data']
    for key in ['id', 'month', 'year', 'name', 'is_active', 'total_expected', 'total_received', 'players_count']:
        assert key in mp, f"Missing key in period data: {key}"
    print('\nValidation passed.')


def main():
    # Use the email credential as provided by the user
    token = login('admin@futebol.com', 'admin123')
    HEADERS['Authorization'] = f'Bearer {token}'

    _ = create_player()
    resp = create_monthly_period(2025, 10)
    validate_monthly_period_response(resp)


if __name__ == '__main__':
    main()
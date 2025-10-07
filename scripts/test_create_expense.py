import json
import sys
from datetime import datetime, timedelta
import requests

BASE_URL = 'http://127.0.0.1:5000/api'


def pretty(obj):
    try:
        return json.dumps(obj, indent=2, ensure_ascii=False)
    except Exception:
        return str(obj)


def main():
    print('== Backend create expense integration test ==')

    # 1) Login
    print('\n[1] Login...')
    login_payload = {'username': 'admin', 'password': 'admin123'}
    r = requests.post(f'{BASE_URL}/auth/login', json=login_payload)
    print('Status:', r.status_code)
    try:
        login_data = r.json()
    except Exception:
        print('Response text:', r.text)
        sys.exit(1)
    if r.status_code >= 300 or 'access_token' not in login_data:
        print('Login failed:', pretty(login_data))
        sys.exit(1)
    token = login_data['access_token']
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    print('Token acquired.')

    # 2) Get monthly periods
    print('\n[2] List monthly periods...')
    r = requests.get(f'{BASE_URL}/monthly-periods', headers=headers)
    print('Status:', r.status_code)
    try:
        periods = r.json()
    except Exception:
        print('Response text:', r.text)
        sys.exit(1)
    if r.status_code >= 300:
        print('List periods failed:', pretty(periods))
        sys.exit(1)
    if not isinstance(periods, list) or len(periods) == 0:
        print('No monthly periods available. Please create one first.')
        sys.exit(1)
    period = periods[0]
    print('Using period:', pretty(period))

    period_id = period['id']

    # 3) Create expense
    print('\n[3] Create expense...')
    # Use yesterday to avoid future date issues
    expense_dt = (datetime.utcnow() - timedelta(days=1)).replace(microsecond=0)
    payload = {
        'description': 'Compra de equipamentos',
        'amount': 120.5,
        'category': 'equipment',
        'expense_date': expense_dt.isoformat() + 'Z',
        'notes': 'Teste integração despesa'
    }
    r = requests.post(f'{BASE_URL}/monthly-periods/{period_id}/expenses', headers=headers, json=payload)
    print('Status:', r.status_code)
    try:
        create_resp = r.json()
    except Exception:
        print('Response text:', r.text)
        sys.exit(1)
    print(pretty(create_resp))
    if r.status_code >= 300 or not create_resp.get('success'):
        print('Create expense failed.')
        sys.exit(1)
    expense = create_resp['data']

    # 4) List expenses for period
    print('\n[4] List expenses for period...')
    r = requests.get(f'{BASE_URL}/monthly-periods/{period_id}/expenses', headers=headers)
    print('Status:', r.status_code)
    try:
        expenses = r.json()
    except Exception:
        print('Response text:', r.text)
        sys.exit(1)
    print('Expenses count:', len(expenses) if isinstance(expenses, list) else 'n/a')
    print(pretty(expenses))
    if r.status_code >= 300:
        print('List expenses failed.')
        sys.exit(1)

    print('\n== OK: Expense creation and listing succeeded ==')


if __name__ == '__main__':
    main()
import json
import uuid
import sys
from datetime import datetime
import requests

BASE_URL = 'http://127.0.0.1:5000/api'


def pretty(obj):
    try:
        return json.dumps(obj, indent=2, ensure_ascii=False)
    except Exception:
        return str(obj)


def main():
    print('== Backend PATCH payment status integration test ==')

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

    # 2) Create player
    print('\n[2] Create player...')
    suffix = str(uuid.uuid4())[:8]
    player_payload = {
        'name': f'Teste PATCH {suffix}',
        'position': 'Meio-campo',
        'email': f'patch-{suffix}@example.com',
        'phone': f'11988{suffix[:4]}777',
        'monthly_fee': 100.0,
    }
    r = requests.post(f'{BASE_URL}/players', headers=headers, json=player_payload)
    print('Status:', r.status_code)
    try:
        player_resp = r.json()
    except Exception:
        print('Response text:', r.text)
        sys.exit(1)
    if r.status_code >= 300 or not player_resp.get('success'):
        print('Create player failed:', pretty(player_resp))
        sys.exit(1)
    player = player_resp['data']
    print('Player:', pretty(player))

    # 3) Create monthly period (or fetch existing)
    print('\n[3] Create monthly period...')
    now = datetime.utcnow()
    period_payload = {'year': now.year, 'month': now.month}
    r = requests.post(f'{BASE_URL}/monthly-payments', headers=headers, json=period_payload)
    print('Status:', r.status_code)
    period = None
    if r.status_code < 300:
        # Expected APIResponse.success shape
        try:
            period_resp = r.json()
        except Exception:
            print('Response text:', r.text)
            sys.exit(1)
        period = period_resp.get('data')
        if not period:
            print('Unexpected create response:', pretty(period_resp))
            sys.exit(1)
        print('Period:', pretty(period))
    else:
        # If period already exists for current month/year, fetch it
        try:
            err_resp = r.json()
        except Exception:
            err_resp = {'text': r.text}
        print('Create period failed, trying to fetch existing:', pretty(err_resp))
        # Fetch all periods and pick matching month/year
        r2 = requests.get(f'{BASE_URL}/monthly-periods', headers=headers)
        print('Fetch periods status:', r2.status_code)
        if r2.status_code >= 300:
            try:
                print('Failed to list periods:', pretty(r2.json()))
            except Exception:
                print('Response text:', r2.text)
            sys.exit(1)
        try:
            periods_list = r2.json()
        except Exception:
            print('Response text:', r2.text)
            sys.exit(1)
        match = next((p for p in periods_list if int(p.get('year')) == now.year and int(p.get('month')) == now.month), None)
        if not match:
            print('No existing period found for current month/year. Aborting.')
            sys.exit(1)
        period = match
        print('Using existing period:', pretty(period))

    # 4) Ensure player is in period (add only if missing)
    print('\n[4] Ensure player is in period...')
    r_list = requests.get(f"{BASE_URL}/monthly-periods/{period['id']}/players", headers=headers)
    print('List players status:', r_list.status_code)
    if r_list.status_code >= 300:
        try:
            print('List players failed:', pretty(r_list.json()))
        except Exception:
            print('Response text:', r_list.text)
        sys.exit(1)
    try:
        players_list = r_list.json()
    except Exception:
        print('Response text:', r_list.text)
        sys.exit(1)
    already = next((mp for mp in players_list if str(mp.get('player_id')) == str(player['id'])), None)
    if already:
        print('Player already in period. Skipping add.')
    else:
        add_payload = {'player_ids': [player['id']]}
        r_add = requests.post(f"{BASE_URL}/monthly-periods/{period['id']}/players", headers=headers, json=add_payload)
        print('Add players status:', r_add.status_code)
        if r_add.status_code >= 300:
            try:
                print('Add players failed:', pretty(r_add.json()))
            except Exception:
                print('Response text:', r_add.text)
            sys.exit(1)
        try:
            added_resp = r_add.json()
        except Exception:
            print('Response text:', r_add.text)
            sys.exit(1)
        print('Add result:', pretty(added_resp))

    # 5) List period players to confirm linkage
    print('\n[5] List monthly players for period...')
    r = requests.get(f"{BASE_URL}/monthly-periods/{period['id']}/players", headers=headers)
    print('Status:', r.status_code)
    try:
        players_list = r.json()
    except Exception:
        print('Response text:', r.text)
        sys.exit(1)
    if r.status_code >= 300:
        print('List players failed:', pretty(players_list))
        sys.exit(1)
    print(f'Total players in period: {len(players_list)}')
    target = next((mp for mp in players_list if str(mp.get('player_id')) == str(player['id'])), None)
    if not target:
        print('Target player not found in period list.')
        sys.exit(1)
    print('MonthlyPlayer entry:', pretty(target))

    # 6) PATCH payment status to paid
    print('\n[6] PATCH payment status to paid...')
    patch_payload = {'status': 'paid'}
    r = requests.patch(
        f"{BASE_URL}/monthly-periods/{period['id']}/players/{player['id']}/payment",
        headers=headers,
        json=patch_payload,
    )
    print('Status:', r.status_code)
    try:
        patch_resp = r.json()
    except Exception:
        print('Response text:', r.text)
        sys.exit(1)
    print('PATCH response:', pretty(patch_resp))
    if r.status_code >= 300 or not patch_resp.get('success'):
        print('PATCH failed')
        sys.exit(1)

    # 7) Fetch period to confirm totals
    print('\n[7] Fetch period after update...')
    r = requests.get(f"{BASE_URL}/monthly-periods/{period['id']}", headers=headers)
    print('Status:', r.status_code)
    try:
        period_after = r.json()
    except Exception:
        print('Response text:', r.text)
        sys.exit(1)
    print('Period after:', pretty(period_after))

    print('\n== DONE ==')


if __name__ == '__main__':
    main()
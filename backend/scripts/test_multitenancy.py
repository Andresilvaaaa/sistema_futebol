import requests
import json

BASE = 'http://127.0.0.1:5000/api'


def post(path: str, data: dict, token: str | None = None) -> requests.Response:
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = f'Bearer {token}'
    return requests.post(BASE + path, headers=headers, data=json.dumps(data))


def get(path: str, token: str) -> requests.Response:
    headers = {'Authorization': f'Bearer {token}'}
    return requests.get(BASE + path, headers=headers)


def register_or_login(username: str, email: str, password: str) -> str | None:
    r = post('/auth/register', {'username': username, 'email': email, 'password': password})
    if r.status_code == 201:
        print(f"register {username}: {r.status_code}")
        return r.json().get('access_token')
    print(f"register {username} failed: {r.status_code} {r.text}")
    r = post('/auth/login', {'username': username, 'password': password})
    print(f"login {username}: {r.status_code}")
    if r.status_code == 200:
        return r.json().get('access_token')
    print(f"login {username} failed: {r.status_code} {r.text}")
    return None


def create_player(token: str, name: str, phone: str, position: str) -> dict | None:
    r = post('/players', {'name': name, 'phone': phone, 'position': position}, token=token)
    print(f"create_player status: {r.status_code}")
    try:
        print(r.text[:300])
    except Exception:
        pass
    if r.status_code == 201:
        return r.json().get('data')
    return None


def list_players(token: str) -> dict:
    r = get('/players', token)
    print(f"list_players status: {r.status_code}")
    try:
        print(r.text[:300])
    except Exception:
        pass
    if r.status_code == 200:
        return r.json()
    return {}


def cross_access_get_player(token: str, player_id: str) -> requests.Response:
    return get(f'/players/{player_id}', token)


def main():
    # Users
    a_user = ('userA3', 'userA3@example.com', 'Password123')
    b_user = ('userB3', 'userB3@example.com', 'Password123')

    # Register/Login
    a_token = register_or_login(*a_user)
    b_token = register_or_login(*b_user)

    print('A3 token?', bool(a_token))
    print('B3 token?', bool(b_token))

    if not a_token or not b_token:
        print('Could not obtain tokens; aborting.')
        return

    # Create players
    a_player = create_player(a_token, 'Jogador A3', '555-0001', 'forward')
    b_player = create_player(b_token, 'Jogador B3', '555-1001', 'defender')

    # List players
    a_list = list_players(a_token)
    b_list = list_players(b_token)

    # Cross-access: B3 tries to GET A3 player
    if a_player and a_player.get('id'):
        cross = cross_access_get_player(b_token, a_player['id'])
        print('cross_access status:', cross.status_code)
        try:
            print(cross.text[:300])
        except Exception:
            pass


if __name__ == '__main__':
    main()
import json
import uuid
import requests

BASE_URL = 'http://127.0.0.1:5000/api/auth'


def pretty(obj):
    try:
        return json.dumps(obj, indent=2, ensure_ascii=False)
    except Exception:
        return str(obj)


def main():
    suffix = str(uuid.uuid4())[:8]
    username = f"user_{suffix}"
    email = f"{username}@example.com"
    password = "Secret123!"

    print("[1] Register...")
    r = requests.post(f"{BASE_URL}/register", json={
        "username": username,
        "email": email,
        "password": password,
    })
    print("Status:", r.status_code)
    try:
        reg = r.json()
    except Exception:
        print("Response:", r.text)
        return
    print(pretty(reg))
    if r.status_code >= 300:
        print("Register failed.")
        return

    print("\n[2] Login...")
    l = requests.post(f"{BASE_URL}/login", json={
        "username": username,
        "password": password,
    })
    print("Status:", l.status_code)
    try:
        login = l.json()
    except Exception:
        print("Response:", l.text)
        return
    print(pretty(login))
    if l.status_code >= 300 or 'access_token' not in login:
        print("Login failed.")
        return
    token = login['access_token']

    print("\n[3] Profile...")
    p = requests.get(f"{BASE_URL}/profile", headers={
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
    })
    print("Status:", p.status_code)
    try:
        prof = p.json()
    except Exception:
        print("Response:", p.text)
        return
    print(pretty(prof))


if __name__ == "__main__":
    main()
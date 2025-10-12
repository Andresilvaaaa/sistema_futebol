"""
Register a unique test user and validate login using username and email.
Talks to the Flask backend at http://localhost:5000.
"""
import time
import uuid
import requests


BASE_URL = "http://localhost:5000"


def register_user(username: str, email: str, password: str):
    url = f"{BASE_URL}/api/auth/register"
    payload = {"username": username, "email": email, "password": password}
    r = requests.post(url, json=payload, timeout=10)
    return r.status_code, r.json() if r.headers.get("Content-Type", "").startswith("application/json") else r.text


def login(identifier: str, password: str):
    url = f"{BASE_URL}/api/auth/login"
    payload = {"username": identifier, "password": password}
    r = requests.post(url, json=payload, timeout=10)
    return r.status_code, r.json() if r.headers.get("Content-Type", "").startswith("application/json") else r.text


def main():
    suffix = int(time.time())
    unique = f"user_qa_{suffix}_{uuid.uuid4().hex[:6]}"
    username = unique
    email = f"{unique}@example.com"
    password = "Passw0rd!test"

    print(f"Registering user: username={username} email={email}")
    status, data = register_user(username, email, password)
    print(f"Register status={status} response={data}")

    if status == 201:
        print("Attempting login with username...")
        s1, d1 = login(username, password)
        print(f"Login(username) status={s1} response={d1}")

        print("Attempting login with email...")
        s2, d2 = login(email, password)
        print(f"Login(email) status={s2} response={d2}")
    else:
        print("Registration failed; skipping login attempts.")


if __name__ == "__main__":
    main()
import os
import sys
import json

# Garantir que o pacote 'backend' esteja no sys.path ao executar o script
ROOT = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(ROOT, '..'))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from backend import create_app
from backend.services.db.connection import db
from backend.services.db.models import User


def pretty(obj):
    try:
        return json.dumps(obj, indent=2, ensure_ascii=False)
    except Exception:
        return str(obj)


def main():
    app = create_app('development')
    with app.app_context():
        # Garantir usuário alvo existe
        email = 'admin@futebol.com'
        username = 'admin'
        password = 'admin123'

        user = db.session.query(User).filter_by(email=email).first()
        if not user:
            user = User(username=username, email=email)
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
            print('Criado usuário admin para teste.')

        client = app.test_client()

        # Testar login por email
        resp = client.post('/api/auth/login', json={
            'email': email,
            'password': password,
        })
        print('Status login por email:', resp.status_code)
        try:
            data = resp.get_json()
        except Exception:
            data = {'raw': resp.data.decode('utf-8', errors='ignore')}
        print(pretty(data))

        assert resp.status_code == 200, 'Login por email deve retornar 200'
        assert 'access_token' in data, 'Resposta deve conter access_token'


if __name__ == '__main__':
    main()
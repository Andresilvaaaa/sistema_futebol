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
        users = db.session.query(User).order_by(User.created_at.asc()).all()
        print(f"Total de usuários: {len(users)}")
        for u in users:
            print(pretty(u.to_dict()))


if __name__ == "__main__":
    main()
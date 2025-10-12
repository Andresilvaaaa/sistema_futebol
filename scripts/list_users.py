"""
List existing users from the configured database.
Uses the Flask app context to query the User model.
"""
import sys
from pathlib import Path

# Ensure project root and backend are importable
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from backend import create_app
from backend.services.db.connection import db
from backend.services.db.models import User


def list_users():
    app = create_app()
    with app.app_context():
        users = User.query.order_by(User.created_at.asc()).all()
        if not users:
            print("No users found.")
            return
        print(f"Found {len(users)} user(s):")
        for u in users:
            print(f"- id={u.id} username={u.username} email={u.email} created_at={u.created_at}")


if __name__ == "__main__":
    list_users()
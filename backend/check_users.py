import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from services.db.connection import db
from services.db.models import User
from app import create_app

# Criar aplicação Flask
app = create_app()

with app.app_context():
    # Verificar usuários existentes
    users = User.query.all()
    print(f"Total de usuários: {len(users)}")
    
    for user in users:
        print(f"ID: {user.id}")
        print(f"Username: {user.username}")
        print(f"Email: {user.email}")
        print(f"Is Active: {user.is_active}")
        print("---")
    
    # Se não há usuários, criar um usuário admin
    if not users:
        print("Criando usuário admin...")
        admin_user = User(
            username='admin',
            email='admin@admin.com',
            is_active=True
        )
        admin_user.set_password('admin123')
        
        db.session.add(admin_user)
        db.session.commit()
        print("Usuário admin criado com sucesso!")
        print("Username: admin")
        print("Email: admin@admin.com")
        print("Password: admin123")
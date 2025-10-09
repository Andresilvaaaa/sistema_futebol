#!/usr/bin/env python3
"""
Script para criar usuário admin no banco de dados
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from services.db.connection import db
from services.db.models import User

def create_admin_user():
    """Cria usuário admin se não existir"""
    app = create_app()
    
    with app.app_context():
        # Verificar se já existe usuário admin
        admin_user = User.query.filter_by(username='admin').first()
        
        if admin_user:
            print("✅ Usuário admin já existe!")
            print(f"   Username: {admin_user.username}")
            print(f"   Email: {admin_user.email}")
            print(f"   Ativo: {admin_user.is_active}")
            return
        
        # Criar usuário admin
        print("🔧 Criando usuário admin...")
        admin_user = User(
            username='admin',
            email='admin@admin.com',
            is_active=True
        )
        admin_user.set_password('admin123')
        
        db.session.add(admin_user)
        db.session.commit()
        
        print("✅ Usuário admin criado com sucesso!")
        print("   Username: admin")
        print("   Email: admin@admin.com")
        print("   Password: admin123")

if __name__ == '__main__':
    create_admin_user()
#!/usr/bin/env python3
"""
Script para criar usuários de teste para verificar isolamento de dados
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from services.db.connection import db
from services.db.models import User

def create_test_users():
    """Cria usuários de teste se não existirem"""
    app = create_app()
    
    with app.app_context():
        print("🔧 Criando usuários de teste...")
        print("=" * 50)
        
        # Usuário 1 - Admin
        user1 = User.query.filter_by(email='admin@example.com').first()
        if not user1:
            user1 = User(
                username='admin',
                email='admin@example.com',
                is_active=True
            )
            user1.set_password('admin123')
            db.session.add(user1)
            print("✅ Usuário 1 criado:")
            print("   Email: admin@example.com")
            print("   Senha: admin123")
        else:
            print("✅ Usuário 1 já existe:")
            print(f"   Email: {user1.email}")
        
        # Usuário 2 - Teste
        user2 = User.query.filter_by(email='user2@example.com').first()
        if not user2:
            user2 = User(
                username='user2',
                email='user2@example.com',
                is_active=True
            )
            user2.set_password('user123')
            db.session.add(user2)
            print("✅ Usuário 2 criado:")
            print("   Email: user2@example.com")
            print("   Senha: user123")
        else:
            print("✅ Usuário 2 já existe:")
            print(f"   Email: {user2.email}")
        
        db.session.commit()
        print("\n🎉 Usuários de teste prontos para uso!")

if __name__ == '__main__':
    create_test_users()
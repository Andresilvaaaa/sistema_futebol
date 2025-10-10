#!/usr/bin/env python3
"""
Script simples para verificar usuários no banco de dados.
"""

from app import create_app
from services.db.models import User

def check_users():
    """Verifica os usuários existentes no banco de dados."""
    app = create_app()
    
    with app.app_context():
        print("🔍 Verificando usuários no banco de dados...")
        print("=" * 50)
        
        users = User.query.all()
        
        if not users:
            print("❌ Nenhum usuário encontrado no banco de dados")
            print("\n💡 Criando usuário admin padrão...")
            
            # Criar usuário admin padrão
            admin_user = User(
                email="admin@example.com",
                name="Admin User",
                profile="admin"
            )
            admin_user.set_password("admin123")
            
            from services.db import db
            db.session.add(admin_user)
            db.session.commit()
            
            print("✅ Usuário admin criado com sucesso!")
            print("   Email: admin@example.com")
            print("   Senha: admin123")
            
        else:
            print(f"✅ Encontrados {len(users)} usuários:")
            for user in users:
                print(f"   - ID: {user.id}")
                print(f"     Email: {user.email}")
                print(f"     Nome: {user.name}")
                print(f"     Perfil: {user.profile}")
                print(f"     Ativo: {user.is_active}")
                print()

if __name__ == "__main__":
    check_users()
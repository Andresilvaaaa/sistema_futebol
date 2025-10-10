import os
import sys

# Garantir que o pacote backend esteja no path
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from backend import create_app
from backend.services.db.connection import db
from backend.services.db.models import User


def update_admin_email(new_email: str, password: str = None):
    """Atualiza o e-mail do usuário admin e opcionalmente redefine a senha."""
    app = create_app()
    with app.app_context():
        # Procurar usuário admin por username case-insensitive
        from sqlalchemy import func

        admin = db.session.query(User).filter(func.lower(User.username) == 'admin').first()
        if not admin:
            print("❌ Usuário 'admin' não encontrado. Criando novo...")
            admin = User(username='admin', email=new_email)
            if password:
                admin.set_password(password)
            else:
                admin.set_password('admin123')
            db.session.add(admin)
            db.session.commit()
            print(f"✅ Usuário 'admin' criado com email {admin.email}")
            return

        # Verificar conflito de e-mail
        email_norm = new_email.lower()
        conflict = (
            db.session.query(User)
            .filter(func.lower(User.email) == email_norm, User.id != admin.id)
            .first()
        )
        if conflict:
            print(f"❌ Já existe outro usuário com o email {new_email}")
            return

        # Atualizar email e senha se fornecida
        admin.email = email_norm
        if password:
            admin.set_password(password)
        db.session.commit()
        print(f"✅ Email do admin atualizado para {admin.email}")


if __name__ == "__main__":
    target_email = os.environ.get('ADMIN_TARGET_EMAIL', 'admin@futebol.com')
    target_password = os.environ.get('ADMIN_TARGET_PASSWORD')
    update_admin_email(target_email, target_password)
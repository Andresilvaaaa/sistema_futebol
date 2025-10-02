"""
Teste simples para verificar a criação da aplicação Flask
"""

import pytest


def test_app_creation(app):
    """Testa se a aplicação Flask é criada corretamente"""
    assert app is not None
    assert app.config['TESTING'] is True


def test_app_context(app):
    """Testa se o contexto da aplicação funciona"""
    with app.app_context():
        from flask import current_app
        assert current_app is app


def test_database_connection(app, db_session):
    """Testa se a conexão com o banco de dados funciona"""
    from backend.services.db.connection import db
    
    with app.app_context():
        # Verificar se o banco está conectado
        assert db is not None
        
        # Testar uma query simples
        result = db.session.execute(db.text("SELECT 1"))
        assert result.scalar() == 1


def test_basic_model_import(app):
    """Testa se conseguimos importar modelos dentro do contexto da aplicação"""
    with app.app_context():
        try:
            from backend.services.db.models import User, Player
            assert User is not None
            assert Player is not None
        except Exception as e:
            pytest.fail(f"Falha ao importar modelos: {e}")
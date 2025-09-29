"""
Configuração de Testes - Simples
"""


class TestingConfig:
    """Configuração para ambiente de testes"""

    # Ambiente
    DEBUG = True
    TESTING = True

    # Segurança
    SECRET_KEY = 'test-secret-key'

    # Banco de dados em memória para testes rápidos
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Desabilita CSRF para facilitar testes
    WTF_CSRF_ENABLED = False

    # Upload de arquivos - menor para testes
    MAX_CONTENT_LENGTH = 1 * 1024 * 1024  # 1MB

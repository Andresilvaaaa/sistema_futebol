"""
WSGI Entry Point - Sistema Futebol
Ponto de entrada para servidores WSGI (Gunicorn, uWSGI, etc.)
"""

import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# Importar a aplicação Flask
from backend import create_app

# Criar instância da aplicação
app = create_app()

if __name__ == "__main__":
    app.run()
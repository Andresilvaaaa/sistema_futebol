"""
Sistema de Futebol - Aplicação Principal
Importa e executa o backend completo
"""

import os
import sys

# Adicionar o diretório backend ao path
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_path)

# Importar a aplicação do backend
from backend import create_app

# Criar a aplicação
app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
"""
Script para executar Flask na porta 5000 (ignorando variável PORT do sistema)
"""
import os
import sys
from pathlib import Path

# Adicionar path do backend
sys.path.insert(0, str(Path(__file__).parent.parent))

# Forçar porta 5000 (ignorar variável PORT do sistema)
os.environ['PORT'] = '5000'

# Importar e executar app
from backend.app import app

if __name__ == '__main__':
    print("Executando Flask na porta 5000 (forçado)...")
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        use_reloader=True
    )

#!/usr/bin/env python3
"""
Script profissional para desenvolvimento Flask
- Configuração otimizada
- Debug ativo
- Reload automático
- Logs estruturados
"""
import os
import sys
from pathlib import Path

# Configurações de desenvolvimento
os.environ['FLASK_ENV'] = 'development'
os.environ['FLASK_DEBUG'] = '1'
os.environ['FLASK_APP'] = 'backend.app'

# Adicionar paths necessários
PROJECT_ROOT = Path(__file__).parent
sys.path.insert(0, str(PROJECT_ROOT))

def main():
    """Executa Flask em modo desenvolvimento otimizado"""
    print("🚀 Iniciando Flask em modo DESENVOLVIMENTO")
    print("=" * 50)
    print("📁 Diretório:", PROJECT_ROOT)
    print("🌐 URL: http://127.0.0.1:5000")
    print("🔧 Debug: ATIVO")
    print("🔄 Reload: ATIVO")
    print("=" * 50)
    
    # Importar app
    from backend import create_app
    
    # Criar app
    app = create_app('development')
    
    # Executar com configurações otimizadas
    app.run(
        host='127.0.0.1',  # Apenas localhost (mais seguro)
        port=5000,         # Porta padrão
        debug=True,        # Debug ativo
        use_reloader=True, # Reload automático
        threaded=True,     # Threading para melhor performance
        use_debugger=True  # Debugger integrado
    )

if __name__ == '__main__':
    main()

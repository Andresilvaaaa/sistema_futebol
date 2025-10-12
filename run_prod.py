#!/usr/bin/env python3
"""
Script profissional para produção Flask
- Configuração otimizada para produção
- Sem debug
- Performance otimizada
"""
import os
import sys
from pathlib import Path

# Configurações de produção
os.environ['FLASK_ENV'] = 'production'
os.environ['FLASK_DEBUG'] = '0'

# Adicionar paths necessários
PROJECT_ROOT = Path(__file__).parent
sys.path.insert(0, str(PROJECT_ROOT))

def main():
    """Executa Flask em modo produção otimizado"""
    print("🚀 Iniciando Flask em modo PRODUÇÃO")
    print("=" * 50)
    print("📁 Diretório:", PROJECT_ROOT)
    print("🌐 URL: http://0.0.0.0:5000")
    print("🔧 Debug: DESATIVADO")
    print("🔄 Reload: DESATIVADO")
    print("⚡ Performance: OTIMIZADA")
    print("=" * 50)
    
    # Importar app
    from backend import create_app
    
    # Criar app
    app = create_app('production')
    
    # Executar com configurações de produção
    app.run(
        host='0.0.0.0',    # Aceita conexões externas
        port=int(os.environ.get('PORT', 5000)),  # Porta configurável
        debug=False,       # Debug desativado
        use_reloader=False, # Sem reload
        threaded=True,     # Threading ativo
        use_debugger=False # Sem debugger
    )

if __name__ == '__main__':
    main()

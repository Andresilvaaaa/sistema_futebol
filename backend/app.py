"""
Flask Application - Sistema Futebol
Arquivo de execução seguindo padrão do projeto legado
"""

import os
import sys

# Adicionar o diretório atual ao path para importações
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Garantir que o diretório raiz do projeto esteja no sys.path
# Isso permite importar o pacote 'backend' quando executado diretamente
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

# Importar create_app do pacote backend
# Usamos import absoluto para funcionar quando o módulo é carregado como 'backend.app'
from backend import create_app

# Carregar variáveis de ambiente se disponível
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Criar aplicação usando Application Factory
env = os.environ.get('FLASK_ENV', 'development')
app = create_app(env)

if __name__ == '__main__':
    """Execução direta para desenvolvimento"""

    # Informações de inicialização no console
    print("\n" + "🚀 " + "="*50)
    print("   FLASK APPLICATION STARTING")
    print("="*54)
    print(f"🔧 Environment: {env}")
    print(f"🌐 Server: http://127.0.0.1:5000")
    print(f"🏥 Health Check: http://127.0.0.1:5000/api/health")
    print(f"📋 API Info: http://127.0.0.1:5000/api/info")
    print(f"🧪 CORS Test: http://127.0.0.1:5000/api/cors-test")
    print(
        f"🔐 JWT: {'Configured' if app.config.get('JWT_SECRET_KEY') else 'Not configured'}")
    print("="*54)

    # Executar servidor de desenvolvimento
    app.run(
        host='0.0.0.0',
        port=int(os.environ.get('PORT', 5000)),
        debug=(env == 'development'),
        use_reloader=(env == 'development')
    )

#!/usr/bin/env python3
"""
Script de inicialização para o Sistema de Futebol
Uso: python run.py [environment]
"""
import sys
import os

# Adicionar diretório atual ao path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    # Importar usando app.py diretamente para compatibilidade
    from app import create_app
    from config.utils import get_database_info

    # Determinar ambiente
    env = (
        sys.argv[1] if len(sys.argv) > 1
        else os.environ.get('FLASK_ENV', 'development')
    )

    # Criar aplicação
    app = create_app(env)

    # Informações de inicialização
    print("🚀 Sistema de Futebol - Inicializando...")
    print(f"🔧 Ambiente: {env}")
    print(f"💾 Banco: {get_database_info()['type']}")
    print(f"🌐 CORS Origins: {', '.join(app.config['CORS_ORIGINS'])}")

    jwt_configured = (
        "✅ Configurado" if app.config.get('JWT_SECRET_KEY')
        else "❌ Não configurado"
    )
    print(f"🔑 JWT: {jwt_configured}")

    if env == 'development':
        print("\n📡 Servidor rodando em: http://localhost:5000")
        print("📚 Endpoints disponíveis:")
        print("   GET  /           - Informações do sistema")
        print("   GET  /health     - Health check")
        print("   POST /auth/login - Login (admin/admin123)")
        print("   GET  /auth/profile - Perfil do usuário (JWT required)")
        print("   GET  /teams      - Listar times")
        print("   POST /teams      - Criar time (JWT required)")
        print("\n🔄 Use Ctrl+C para parar o servidor")

        app.run(
            host='0.0.0.0',
            port=5000,
            debug=True,
            use_reloader=True
        )
    else:
        print(f"\n⚠️  Ambiente '{env}' detectado.")
        print("   Para produção, use um servidor WSGI como Gunicorn:")
        print("   gunicorn -w 4 -b 0.0.0.0:5000 app:app")
        print("\nPara testar manualmente, execute:")
        print('   python -c "from app import create_app; '
              'app = create_app(); print(\'App criado!\')"')

except ImportError as e:
    print("❌ Erro: Dependências não instaladas")
    print("📋 Para instalar as dependências:")
    print("   pip install -r requirements.txt")
    print(f"\nDetalhes do erro: {e}")
    sys.exit(1)

except Exception as e:
    print(f"❌ Erro ao inicializar aplicação: {e}")
    sys.exit(1)

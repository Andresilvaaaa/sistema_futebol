#!/usr/bin/env python3
"""
Script para executar Flask com Gunicorn (Produção Avançada)
- Múltiplos workers
- Performance máxima
- Processo supervisor
"""
import os
import sys
import subprocess
from pathlib import Path

# Configurações
PROJECT_ROOT = Path(__file__).parent
sys.path.insert(0, str(PROJECT_ROOT))

def main():
    """Executa Flask com Gunicorn"""
    print("🚀 Iniciando Flask com GUNICORN (Produção Avançada)")
    print("=" * 60)
    print("📁 Diretório:", PROJECT_ROOT)
    print("🌐 URL: http://0.0.0.0:5000")
    print("👥 Workers: 4")
    print("⚡ Performance: MÁXIMA")
    print("=" * 60)
    
    # Comando Gunicorn
    cmd = [
        'gunicorn',
        '--bind', '0.0.0.0:5000',
        '--workers', '4',
        '--worker-class', 'sync',
        '--worker-connections', '1000',
        '--max-requests', '1000',
        '--max-requests-jitter', '100',
        '--timeout', '30',
        '--keep-alive', '2',
        '--preload-app',
        '--access-logfile', '-',
        '--error-logfile', '-',
        '--log-level', 'info',
        'backend.app:app'
    ]
    
    try:
        # Executar Gunicorn
        subprocess.run(cmd, cwd=str(PROJECT_ROOT))
    except KeyboardInterrupt:
        print("\n🛑 Parando Gunicorn...")
    except Exception as e:
        print(f"❌ Erro ao executar Gunicorn: {e}")
        print("💡 Instale com: pip install gunicorn")

if __name__ == '__main__':
    main()

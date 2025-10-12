"""
Script para verificar se Flask está funcionando corretamente
"""
import requests
import sys
import time

def check_flask_health():
    """Verifica saúde do Flask"""
    print("🔍 Verificando saúde do Flask...")
    print("-" * 40)
    
    endpoints = [
        ("/api/health", "Health Check"),
        ("/api/info", "API Info"),
        ("/api/cors-test", "CORS Test")
    ]
    
    base_url = "http://127.0.0.1:5000"
    all_ok = True
    
    for endpoint, name in endpoints:
        try:
            response = requests.get(f"{base_url}{endpoint}", timeout=5)
            if response.status_code == 200:
                print(f"✅ {name}: OK")
            else:
                print(f"⚠️ {name}: Status {response.status_code}")
                all_ok = False
        except requests.exceptions.ConnectionError:
            print(f"❌ {name}: Flask não está rodando")
            all_ok = False
        except Exception as e:
            print(f"❌ {name}: Erro - {e}")
            all_ok = False
    
    print("-" * 40)
    if all_ok:
        print("🎉 Flask está funcionando perfeitamente!")
    else:
        print("⚠️ Flask tem problemas - verifique os logs")
    
    return all_ok

if __name__ == '__main__':
    success = check_flask_health()
    sys.exit(0 if success else 1)

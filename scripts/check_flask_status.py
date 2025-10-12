"""
Script simples para verificar se o Flask está rodando na porta 5000
"""
import requests
import sys

def check_flask_status():
    """Verifica se o Flask está rodando e respondendo"""
    print("Verificando status do Flask...")
    print("-" * 40)
    
    try:
        # Testar health check
        response = requests.get("http://127.0.0.1:5000/api/health", timeout=5)
        print(f"OK - Flask está rodando na porta 5000")
        print(f"OK - Status Code: {response.status_code}")
        print(f"OK - Response: {response.text}")
        return True
        
    except requests.exceptions.ConnectionError:
        print("ERRO - Flask NÃO está rodando na porta 5000")
        print("   Execute: flask run")
        return False
        
    except requests.exceptions.Timeout:
        print("AVISO - Flask pode estar rodando mas não está respondendo")
        return False
        
    except Exception as e:
        print(f"ERRO - Erro ao verificar Flask: {e}")
        return False

if __name__ == '__main__':
    success = check_flask_status()
    sys.exit(0 if success else 1)

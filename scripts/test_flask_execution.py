"""
Script para testar todas as formas de executar o Flask
e verificar se está funcionando corretamente na porta 5000
"""
import subprocess
import time
import requests
import sys
from pathlib import Path

def test_flask_execution():
    """Testa todas as formas de executar o Flask"""
    print("=" * 70)
    print("TESTE DE EXECUÇÃO DO FLASK")
    print("=" * 70)
    print()
    
    # Lista de comandos para testar
    commands = [
        {
            "name": "flask run",
            "cmd": ["flask", "run"],
            "description": "Comando Flask padrão"
        },
        {
            "name": "python app.py",
            "cmd": ["python", "app.py"],
            "description": "Execução direta do app.py"
        },
        {
            "name": "python -m flask run",
            "cmd": ["python", "-m", "flask", "run"],
            "description": "Módulo Flask via Python"
        }
    ]
    
    results = []
    
    for command in commands:
        print(f"TESTANDO: {command['name']}")
        print(f"Descrição: {command['description']}")
        print("-" * 50)
        
        try:
            # Iniciar processo em background
            process = subprocess.Popen(
                command['cmd'],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                cwd=str(Path(__file__).parent.parent)
            )
            
            # Aguardar um pouco para o Flask inicializar
            time.sleep(3)
            
            # Verificar se o processo ainda está rodando
            if process.poll() is None:
                print("✅ Processo iniciado com sucesso")
                
                # Testar se está respondendo na porta 5000
                try:
                    response = requests.get("http://127.0.0.1:5000/api/health", timeout=5)
                    if response.status_code == 200:
                        print("✅ Flask respondendo na porta 5000")
                        print("✅ Health check funcionando")
                        results.append({
                            "command": command['name'],
                            "status": "SUCCESS",
                            "port": "5000",
                            "health": "OK"
                        })
                    else:
                        print(f"⚠️ Flask rodando mas health check falhou: {response.status_code}")
                        results.append({
                            "command": command['name'],
                            "status": "PARTIAL",
                            "port": "5000",
                            "health": "FAILED"
                        })
                except requests.exceptions.RequestException as e:
                    print(f"❌ Flask não está respondendo: {e}")
                    results.append({
                        "command": command['name'],
                        "status": "FAILED",
                        "port": "5000",
                        "health": "FAILED"
                    })
                
                # Parar o processo
                process.terminate()
                process.wait(timeout=5)
                
            else:
                print("❌ Processo falhou ao iniciar")
                stdout, stderr = process.communicate()
                print(f"STDOUT: {stdout}")
                print(f"STDERR: {stderr}")
                results.append({
                    "command": command['name'],
                    "status": "FAILED",
                    "port": "N/A",
                    "health": "N/A"
                })
                
        except Exception as e:
            print(f"❌ Erro ao executar {command['name']}: {e}")
            results.append({
                "command": command['name'],
                "status": "ERROR",
                "port": "N/A",
                "health": "N/A"
            })
        
        print()
        time.sleep(2)  # Pausa entre testes
    
    # Resultado final
    print("=" * 70)
    print("RESULTADO FINAL")
    print("=" * 70)
    print()
    
    for result in results:
        status_icon = "✅" if result['status'] == "SUCCESS" else "⚠️" if result['status'] == "PARTIAL" else "❌"
        print(f"{status_icon} {result['command']}: {result['status']}")
        if result['port'] != "N/A":
            print(f"   Porta: {result['port']}")
        if result['health'] != "N/A":
            print(f"   Health: {result['health']}")
        print()
    
    # Verificar qual é a melhor forma
    successful_commands = [r for r in results if r['status'] == 'SUCCESS']
    
    if successful_commands:
        print("🎉 COMANDOS FUNCIONANDO:")
        for cmd in successful_commands:
            print(f"   ✅ {cmd['command']}")
        print()
        print("💡 RECOMENDAÇÃO:")
        print("   Use 'flask run' para desenvolvimento")
        print("   Use 'python app.py' para produção")
    else:
        print("❌ NENHUM COMANDO FUNCIONANDO")
        print("   Verifique se as dependências estão instaladas")
        print("   Verifique se o banco de dados está configurado")

if __name__ == '__main__':
    test_flask_execution()

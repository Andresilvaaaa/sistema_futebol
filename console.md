root@srv866884:~/sistema_futebol# # Verificar quando a imagem foi criada
docker image inspect ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest | grep -A 5 "Created"

# Forçar pull da imagem mais recente
docker pull ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest

# Parar e remover container atual
docker stop sistema_futebol_frontend_1
docker rm sistema_futebol_frontend_1

# Recriar com nova imagem
cd /root/sistema_futebol
docker-compose -f docker-compose.prod.yml up -d frontend

# Verificar logs
docker logs sistema_futebol_frontend_1 --tail 10
        "Created": "2025-10-17T02:17:50.279854531Z",
        "DockerVersion": "",
        "Author": "",
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 312421973,
latest: Pulling from andresilvaaaa/sistema-futebol-frontend
Digest: sha256:c1483cbba0e5e874b71133c314646742836e543f6e3063bd8405c3a3a583026a
Status: Image is up to date for ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest
ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest
sistema_futebol_frontend_1
sistema_futebol_frontend_1
WARNING: The Docker Engine you're using is running in swarm mode.

Compose does not use swarm mode to deploy services to multiple nodes in a swarm. All containers will be scheduled on the current node.

To deploy your application across the swarm, use `docker stack deploy`.

sistema_futebol_backend_1 is up-to-date
Creating sistema_futebol_frontend_1 ... done
Error: Cannot find module '/app/server.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1207:15)
    at Module._load (node:internal/modules/cjs/loader:1038:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:164:12)
    at node:internal/main/run_main_module:28:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v20.19.5
root@srv866884:~/sistema_futebol#

root@srv866884:~/sistema_futebol# # Clonar repositório no VPS
cd /tmp
git clone https://github.com/andresilvaaaa/sistema-futebol.git
cd sistema-futebol

# Build local da imagem
docker build -t sistema-futebol-frontend:local ./frontend

# Atualizar docker-compose para usar imagem local
cd /root/sistema_futebol
# Editar docker-compose.prod.yml para usar 'sistema-futebol-frontend:local'
Cloning into 'sistema-futebol'...
Username for 'https://github.com': Andresilvaaaa
Password for 'https://Andresilvaaaa@github.com':
remote: Invalid username or token. Password authentication is not supported for Git operations.
fatal: Authentication failed for 'https://github.com/andresilvaaaa/sistema-futebol.git/'
-bash: cd: sistema-futebol: No such file or directory
[+] Building 0.0s (0/0)                                                                docker:default
ERROR: failed to build: unable to prepare context: path "./frontend" not found
root@srv866884:~/sistema_futebol#



root@srv866884:~/sistema_futebol# echo "=== VERIFICANDO IMAGEM ATUAL ===" && \
docker image inspect ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest | grep -A 5 "Created" && \
echo "=== FORÇANDO PULL DA IMAGEM ===" && \
docker pull ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest && \
echo "=== RECRIANDO CONTAINER ===" && \
docker stop sistema_futebol_frontend_1 && \
docker rm sistema_futebol_frontend_1 && \
cd /root/sistema_futebol && \
docker-compose -f docker-compose.prod.yml up -d frontend && \
sleep 5 && \
echo "=== VERIFICANDO LOGS ===" && \
docker logs sistema_futebol_frontend_1 --tail 10
=== VERIFICANDO IMAGEM ATUAL ===
        "Created": "2025-10-17T02:17:50.279854531Z",
        "DockerVersion": "",
        "Author": "",
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 312421973,
=== FORÇANDO PULL DA IMAGEM ===
latest: Pulling from andresilvaaaa/sistema-futebol-frontend
Digest: sha256:c1483cbba0e5e874b71133c314646742836e543f6e3063bd8405c3a3a583026a
Status: Image is up to date for ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest
ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest
=== RECRIANDO CONTAINER ===
sistema_futebol_frontend_1
sistema_futebol_frontend_1
WARNING: The Docker Engine you're using is running in swarm mode.

Compose does not use swarm mode to deploy services to multiple nodes in a swarm. All containers will be scheduled on the current node.

To deploy your application across the swarm, use `docker stack deploy`.

sistema_futebol_backend_1 is up-to-date
Creating sistema_futebol_frontend_1 ... done
=== VERIFICANDO LOGS ===
Error: Cannot find module '/app/server.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1207:15)
    at Module._load (node:internal/modules/cjs/loader:1038:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:164:12)
    at node:internal/main/run_main_module:28:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v20.19.5
root@srv866884:~/sistema_futebol#




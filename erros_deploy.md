Run appleboy/ssh-action@master
Run echo "$GITHUB_ACTION_PATH" >> $GITHUB_PATH
Run entrypoint.sh
Downloading drone-ssh-1.8.1-linux-amd64 from https://github.com/appleboy/drone-ssh/releases/download/v1.8.1
======= CLI Version Information =======
Drone SSH version 1.8.1
=======================================
main.Plugin {
   Config: main.Config {
      Key: "***
***
***
***
***
***
***",
      Passphrase: "",
      KeyPath: "",
      Username: "***",
      Password: "",
      Host: []string:1:1 {
         "***",
      },
      Port: ***,
      Protocol: "tcp",
      Fingerprint: "",
      Timeout: 30s,
      CommandTimeout: 30m0s,
      Script: []string:1:1 {
         "set -e
echo "✅ Deploy iniciado!"
echo "📍 Servidor: $(hostname)"
echo "👤 Usuário: $(whoami)"

# Verificar Docker
docker --version
docker compose version

# Criar diretório do projeto
mkdir -p ~/TMS_FLASK_REACT
cd ~/TMS_FLASK_REACT

# Clone ou atualize repositório
if [ -d ".git" ]; then
  echo "📂 Atualizando repositório..."
  git fetch --all
  git reset --hard origin/main
else
  echo "📥 Clonando repositório..."
  git clone https://github.com/${GITHUB_REPOSITORY}.git .
fi

# Criar/atualizar .env para docker compose (variáveis de produção)
echo "🔐 Atualizando .env..."
cat > .env <<EOF
DATABASE_URL=${PROD_DATABASE_URL}
SECRET_KEY=${PROD_SECRET_KEY}
JWT_SECRET_KEY=${PROD_JWT_SECRET_KEY}
CORS_ORIGINS=${PROD_CORS_ORIGINS}
EOF

# Verificar se os Dockerfiles existem e subir com build
if [ -f "docker-compose.yml" ]; then
  echo "🐳 Docker Compose encontrado!"
  # Parar containers antigos
  docker compose down || true
  # Construir e iniciar containers
  docker compose up -d --build
  # Verificar status
  docker compose ps
else
  echo "⚠️ docker-compose.yml não encontrado"
  echo "📁 Estrutura do projeto:"
  ls -la
fi

echo "🎉 Deploy concluído!"
echo "📅 $(date)"
fi

# Login no GHCR para pull
echo "${GHCR_TOKEN}" | docker login ${REGISTRY} -u "${GHCR_USER}" --password-stdin

# Criar/atualizar .env para o docker-compose
cat > .env <<ENVFILE
IMAGE_NAMESPACE=${REGISTRY}/${OWNER_LC}
DATABASE_URL=${PROD_DATABASE_URL}
SECRET_KEY=${PROD_SECRET_KEY}
JWT_SECRET_KEY=${PROD_JWT_SECRET_KEY}
CORS_ORIGINS=${PROD_CORS_ORIGINS}
ENVFILE

# Docker Compose
docker compose pull
docker compose down
docker compose up -d

# Aplicar migrações Alembic automaticamente no backend
docker compose exec -T -e FLASK_APP=wsgi.py backend flask db upgrade",
      },
      ScriptStop: false,
      Envs: []string:5:8 {
         "PROD_DATABASE_URL",
         "PROD_SECRET_KEY",
         "PROD_JWT_SECRET_KEY",
         "PROD_CORS_ORIGINS",
         "GITHUB_REPOSITORY",
      },
      Proxy: easyssh.DefaultConfig {
         User: "",
         Server: "",
         Key: "",
         KeyPath: "",
         Port: "***",
         Protocol: "tcp",
         Passphrase: "",
         Password: "",
         Timeout: 30s,
         Ciphers: []string(nil),
         KeyExchanges: []string(nil),
         Fingerprint: "",
         UseInsecureCipher: false,
      },
      Debug: true,
      Sync: false,
      Ciphers: []string(nil),
      UseInsecureCipher: false,
      EnvsFormat: "",
      AllEnvs: false,
      RequireTty: false,
   },
   Writer: &os.File {#1
      file: &os.file {#2
         pfd: poll.FD {
            fdmu: poll.fdMutex {
               state: 0,
               rsema: 0,
               wsema: 0,
            },
            Sysfd: 1,
            SysFile: poll.SysFile {
               iovecs: *[]syscall.Iovec(nil),
            },
            pd: poll.pollDesc {
               runtimeCtx: 0x0,
            },
            csema: 0,
            isBlocking: 1,
            IsStream: true,
            ZeroReadIsEOF: true,
            isFile: true,
         },
         name: "/dev/stdout",
         dirinfo: atomic.Pointer[os.dirInfo] {
            _: [0]*os.dirInfo {},
            _: atomic.noCopy {},
            v: unsafe.Pointer(0x0),
         },
         nonblock: false,
         stdoutOrErr: true,
         appendMode: false,
      },
   },
}
======CMD======
set -e
echo "✅ Deploy iniciado!"
echo "📍 Servidor: $(hostname)"
echo "👤 Usuário: $(whoami)"

# Verificar Docker
docker --version
docker compose version

# Criar diretório do projeto
mkdir -p ~/TMS_FLASK_REACT
cd ~/TMS_FLASK_REACT

# Clone ou atualize repositório
if [ -d ".git" ]; then
  echo "📂 Atualizando repositório..."
  git fetch --all
  git reset --hard origin/main
else
  echo "📥 Clonando repositório..."
  git clone https://github.com/${GITHUB_REPOSITORY}.git .
fi

# Criar/atualizar .env para docker compose (variáveis de produção)
echo "🔐 Atualizando .env..."
cat > .env <<EOF
DATABASE_URL=${PROD_DATABASE_URL}
SECRET_KEY=${PROD_SECRET_KEY}
JWT_SECRET_KEY=${PROD_JWT_SECRET_KEY}
CORS_ORIGINS=${PROD_CORS_ORIGINS}
EOF

# Verificar se os Dockerfiles existem e subir com build
if [ -f "docker-compose.yml" ]; then
  echo "🐳 Docker Compose encontrado!"
  # Parar containers antigos
  docker compose down || true
  # Construir e iniciar containers
  docker compose up -d --build
  # Verificar status
  docker compose ps
else
  echo "⚠️ docker-compose.yml não encontrado"
  echo "📁 Estrutura do projeto:"
  ls -la
fi

echo "🎉 Deploy concluído!"
echo "📅 $(date)"
fi

# Login no GHCR para pull
echo "${GHCR_TOKEN}" | docker login ${REGISTRY} -u "${GHCR_USER}" --password-stdin

# Criar/atualizar .env para o docker-compose
cat > .env <<ENVFILE
IMAGE_NAMESPACE=${REGISTRY}/${OWNER_LC}
DATABASE_URL=${PROD_DATABASE_URL}
SECRET_KEY=${PROD_SECRET_KEY}
JWT_SECRET_KEY=${PROD_JWT_SECRET_KEY}
CORS_ORIGINS=${PROD_CORS_ORIGINS}
ENVFILE

# Docker Compose
docker compose pull
docker compose down
docker compose up -d

# Aplicar migrações Alembic automaticamente no backend
docker compose exec -T -e FLASK_APP=wsgi.py backend flask db upgrade
======END======
======ENV======
export PROD_DATABASE_URL='***
'
export PROD_SECRET_KEY='***'
export PROD_JWT_SECRET_KEY='***'
export PROD_CORS_ORIGINS='***
'
export GITHUB_REPOSITORY='Andresilvaaaa/sistema_futebol'
======END======
2025/10/16 ***:36:28 ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey], no supported methods remain
Error: Process completed with exit code 1.


possivel sugestão para novo arquivo deploy! 

name: Deploy TMS System

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    name: 🚀 Deploy to VPS
    runs-on: ubuntu-latest

    steps:
      - name: 📦 Checkout
        uses: actions/checkout@v4

      - name: 📡 Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          port: ${{ secrets.VPS_PORT }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            set -e
            echo "✅ Deploy iniciado!"
            echo "📍 Servidor: $(hostname)"
            echo "👤 Usuário: $(whoami)"
            
            # Verificar Docker
            docker --version || echo "Docker não instalado"
            docker compose version || echo "Docker Compose não instalado"
            
            # Criar diretório do projeto
            mkdir -p ~/sistema_futebol
            cd ~/sistema_futebol
            
            # Clone ou atualize repositório
            if [ -d ".git" ]; then
              echo "📂 Atualizando repositório..."
              git fetch --all
              git reset --hard origin/main
            else
              echo "📥 Clonando repositório..."
              git clone https://github.com/Andresilvaaaa/sistema_futebol.git .
            fi
            
            # Verificar estrutura
            echo "📁 Estrutura do projeto:"
            ls -la
            
            # Verificar docker-compose.yml
            if [ -f "docker-compose.yml" ]; then
              echo "🐳 Docker Compose encontrado!"
              
              # Criar .env se não existir
              if [ ! -f ".env" ]; then
                echo "🔐 Criando .env..."
                cat > .env <<EOF
            DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sistema_futebol
            SECRET_KEY=your-secret-key-here-32-characters
            JWT_SECRET_KEY=your-jwt-secret-key-32-characters
            CORS_ORIGINS=http://31.97.166.28:3000
            EOF
              fi
              
              # Construir e iniciar
              docker compose up -d --build
              docker compose ps
            else
              echo "⚠️ docker-compose.yml não encontrado"
            fi
            
            echo "🎉 Deploy concluído!"
            echo "📅 $(date)"
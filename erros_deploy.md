un appleboy/ssh-action@master
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

# Criar diretório do projeto (usa nome do repo)
mkdir -p ~/sistema_futebol
cd ~/sistema_futebol

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
IMAGE_NAMESPACE=ghcr.io/${GITHUB_REPOSITORY%/*}
NEXT_PUBLIC_API_URL=http://$(hostname -I | awk '{print $1}'):5001
EOF

# Verificar se os Dockerfiles existem e subir com build
if [ -f "docker-compose.prod.yml" ]; then
  echo "🐳 Docker Compose (produção) encontrado!"
  # Parar containers antigos
  docker compose -f docker-compose.prod.yml down || true
  # Fazer pull das imagens mais recentes
  docker compose -f docker-compose.prod.yml pull
  # Iniciar containers
  docker compose -f docker-compose.prod.yml up -d
  # Verificar status
  docker compose -f docker-compose.prod.yml ps
elif [ -f "docker-compose.yml" ]; then
  echo "🐳 Docker Compose (desenvolvimento) encontrado!"
  # Parar containers antigos
  docker compose down || true
  # Construir e iniciar containers
  docker compose up -d --build
  # Verificar status
  docker compose ps
else
  echo "⚠️ Nenhum docker-compose.yml encontrado"
  echo "📁 Estrutura do projeto:"
  ls -la
fi

echo "🎉 Deploy concluído!"
echo "📅 $(date)"",
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

# Criar diretório do projeto (usa nome do repo)
mkdir -p ~/sistema_futebol
cd ~/sistema_futebol

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
IMAGE_NAMESPACE=ghcr.io/${GITHUB_REPOSITORY%/*}
NEXT_PUBLIC_API_URL=http://$(hostname -I | awk '{print $1}'):5001
EOF

# Verificar se os Dockerfiles existem e subir com build
if [ -f "docker-compose.prod.yml" ]; then
  echo "🐳 Docker Compose (produção) encontrado!"
  # Parar containers antigos
  docker compose -f docker-compose.prod.yml down || true
  # Fazer pull das imagens mais recentes
  docker compose -f docker-compose.prod.yml pull
  # Iniciar containers
  docker compose -f docker-compose.prod.yml up -d
  # Verificar status
  docker compose -f docker-compose.prod.yml ps
elif [ -f "docker-compose.yml" ]; then
  echo "🐳 Docker Compose (desenvolvimento) encontrado!"
  # Parar containers antigos
  docker compose down || true
  # Construir e iniciar containers
  docker compose up -d --build
  # Verificar status
  docker compose ps
else
  echo "⚠️ Nenhum docker-compose.yml encontrado"
  echo "📁 Estrutura do projeto:"
  ls -la
fi

echo "🎉 Deploy concluído!"
echo "📅 $(date)"
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
✅ Deploy iniciado!
📍 Servidor: srv866884
👤 Usuário: ***
Docker version 28.5.1, build e180ab8
Docker Compose version v2.40.0
📂 Atualizando repositório...
From https://github.com/Andresilvaaaa/sistema_futebol
   5095d59..2f295ef  main       -> origin/main
HEAD is now at 2f295ef testando pos atualizacoes - #6
🔐 Atualizando .env...
🐳 Docker Compose (produção) encontrado!
time="2025-10-16T23:32:17Z" level=warning msg="/***/sistema_futebol/docker-compose.prod.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
 Container sistema_futebol-frontend-1  Stopping
 Container sistema_futebol-frontend-1  Stopped
 Container sistema_futebol-frontend-1  Removing
 Container sistema_futebol-frontend-1  Removed
 Container sistema_futebol-backend-1  Stopping
 Container sistema_futebol-backend-1  Stopped
 Container sistema_futebol-backend-1  Removing
 Container sistema_futebol-backend-1  Removed
time="2025-10-16T23:32:18Z" level=warning msg="/***/sistema_futebol/docker-compose.prod.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
unable to get image 'ghcr.io/Andresilvaaaa/sistema-futebol-backend:latest': Error response from daemon: invalid reference format: repository name (Andresilvaaaa/sistema-futebol-backend) must be lowercase
2025/10/16 23:32:19 Process exited with status 1
Error: Process completed with exit code 1.
# 🚀 Instruções de Deploy - Sistema Futebol

## 📋 Pré-requisitos no VPS

### 1. Verificar Portas Disponíveis
```bash
# Verificar quais portas estão em uso
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :5000
sudo netstat -tlnp | grep :8080

# Se a porta 80 estiver ocupada pelo Easypanel, use as portas alternativas:
# - Frontend: 8080
# - Backend: 5001
```

### 2. Configurar PostgreSQL
```bash
# Instalar PostgreSQL (se não estiver instalado)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Criar banco de dados
sudo -u postgres psql
CREATE DATABASE futebol_prod;
CREATE USER futebol_user WITH PASSWORD 'sua_senha_segura';
GRANT ALL PRIVILEGES ON DATABASE futebol_prod TO futebol_user;
\q
```

### 3. Configurar Nginx (Opcional - se não usar Easypanel)
```bash
# Instalar Nginx
sudo apt install nginx

# Copiar configuração
sudo cp nginx.conf /etc/nginx/sites-available/sistema_futebol
sudo ln -s /etc/nginx/sites-available/sistema_futebol /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔧 Configuração dos Secrets no GitHub

Vá em **Settings > Secrets and variables > Actions** e configure:

```
VPS_HOST=seu_ip_do_vps
VPS_PORT=22
VPS_USERNAME=seu_usuario
VPS_SSH_KEY=sua_chave_privada_ssh

PROD_DATABASE_URL=postgresql://futebol_user:sua_senha@localhost:5432/futebol_prod
PROD_SECRET_KEY=sua_chave_secreta_muito_segura
PROD_JWT_SECRET_KEY=sua_chave_jwt_muito_segura
PROD_CORS_ORIGINS=http://seu_dominio.com,https://seu_dominio.com
```

## 🐳 Opções de Deploy

### Opção 1: Deploy Automático (GitHub Actions)
1. Faça push para a branch `main`
2. O workflow será executado automaticamente
3. Acesse: `http://seu_ip:8080`

### Opção 2: Deploy Manual no VPS
```bash
# Clonar repositório
git clone https://github.com/seu_usuario/sistema_futebol.git
cd sistema_futebol

# Criar arquivo .env
cat > .env <<EOF
DATABASE_URL=postgresql://futebol_user:sua_senha@localhost:5432/futebol_prod
SECRET_KEY=sua_chave_secreta
JWT_SECRET_KEY=sua_chave_jwt
CORS_ORIGINS=http://seu_dominio.com
IMAGE_NAMESPACE=ghcr.io/seu_usuario
NEXT_PUBLIC_API_URL=http://seu_ip:5001
EOF

# Deploy com Docker Compose
docker compose -f docker-compose.prod.yml up -d
```

### Opção 3: Integração com Easypanel

Se você tem o Easypanel instalado, pode criar um novo projeto:

1. **Acesse o Easypanel**: `http://seu_ip:3000`
2. **Criar Novo Projeto**: "sistema-futebol"
3. **Configurar Serviços**:

#### Backend Service:
```yaml
name: backend
image: ghcr.io/seu_usuario/sistema-futebol-backend:latest
port: 5000
env:
  - FLASK_ENV=production
  - DATABASE_URL=postgresql://futebol_user:senha@localhost:5432/futebol_prod
  - SECRET_KEY=sua_chave
  - JWT_SECRET_KEY=sua_chave_jwt
  - CORS_ORIGINS=https://seu_dominio.com
```

#### Frontend Service:
```yaml
name: frontend
image: ghcr.io/seu_usuario/sistema-futebol-frontend:latest
port: 3000
env:
  - NEXT_PUBLIC_API_URL=https://seu_dominio.com/api
domains:
  - seu_dominio.com
```

## 🔍 Verificação do Deploy

### Verificar Containers
```bash
docker ps
docker logs sistema_futebol-backend-1
docker logs sistema_futebol-frontend-1
```

### Verificar Conectividade
```bash
# Testar backend
curl http://localhost:5001/health

# Testar frontend
curl http://localhost:8080
```

### Verificar Banco de Dados
```bash
# Conectar ao PostgreSQL
psql -h localhost -U futebol_user -d futebol_prod

# Verificar tabelas
\dt
```

## 🚨 Troubleshooting

### Erro: "Port already allocated"
- Verifique se o Easypanel está usando a porta 80
- Use as portas alternativas (8080 para frontend, 5001 para backend)
- Configure proxy reverso no Nginx ou Easypanel

### Erro: "Connection refused"
- Verifique se o PostgreSQL está rodando: `sudo systemctl status postgresql`
- Verifique se o firewall permite as portas: `sudo ufw status`
- Teste conectividade: `telnet localhost 5432`

### Erro: "Permission denied"
- Verifique permissões SSH: `chmod 600 ~/.ssh/id_rsa`
- Verifique se o usuário tem permissões Docker: `sudo usermod -aG docker $USER`

### Logs Úteis
```bash
# Logs do sistema
sudo journalctl -u docker
sudo journalctl -u nginx

# Logs da aplicação
docker logs -f sistema_futebol-backend-1
docker logs -f sistema_futebol-frontend-1
```

## 📱 Acesso à Aplicação

Após o deploy bem-sucedido:

- **Frontend**: `http://seu_ip:8080`
- **Backend API**: `http://seu_ip:5001`
- **Com Nginx**: `http://seu_dominio.com`
- **Com Easypanel**: `https://seu_dominio.com`

## 🔄 Atualizações

Para atualizar a aplicação:

```bash
# Método 1: GitHub Actions (automático)
git push origin main

# Método 2: Manual
cd ~/sistema_futebol
git pull
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```


root@srv866884:~# # Ir para o projeto
cd ~/sistema_futebol

# ==========================================
# PASSO 1: Atualizar código e imagens
# ==========================================
echo "📥 Atualizando código e imagens..."
git pull origin main
docker compose -f docker-compose.prod.yml pull

# ==========================================
# PASSO 2: Recriar backend
# ==========================================
echo "🔄 Recriando backend..."
docker compose -f docker-compose.prod.yml up -d --force-recreate backend

# ==========================================
# PASSO 3: Aguardar inicialização
# ==========================================
echo "⏳ Aguardando 30 segundos..."
sleep 30

# ==========================================
# PASSO 4: VALIDAÇÃO COMPLETA
# ==========================================
echo ""
echo "=========================================="
echo "🧪 VALIDAÇÃO COMPLETA DO SISTEMA"
echo "=========================================="
echo ""

# Teste 1: Status dos containers
echo "📋 1. STATUS DOS CONTAINERS:"
docker compose -f docker-compose.prod.yml ps
echo ""

# Teste 2: Health Check Backend
echo "🔧 2. HEALTH CHECK BACKEND:"
curl -s http://localhost:5001/api/health | jq '.'
echo ""

# Teste 3: Health Check alternativo
echo "🔧 3. HEALTH CHECK /health:"
curl -s http://localhost:5001/health | jq '.'
echo ""

# Teste 4: Tabelas no banco
echo "💾 4. TABELAS NO BANCO DE DADOS:"
docker compose -f docker-compose.prod.yml exec postgres psql -U sistema_futebol -d sistema_futebol_prod -c "\dt"
echo "=========================================="".br"pi/health"hen
📥 Atualizando código e imagens...
From https://github.com/Andresilvaaaa/sistema_futebol
 * branch            main       -> FETCH_HEAD
Already up to date.
[+] Pulling 3/3
 ✔ frontend Pulled                                                                               0.7s
 ✔ postgres Pulled                                                                               1.1s
 ✔ backend Pulled                                                                                0.7s
🔄 Recriando backend...
[+] Running 2/2
 ✔ Container sistema_futebol_postgres  Healthy                                                   2.4s
 ✔ Container sistema_futebol_backend   Started                                                   2.6s
⏳ Aguardando 30 segundos...

==========================================
🧪 VALIDAÇÃO COMPLETA DO SISTEMA
==========================================

📋 1. STATUS DOS CONTAINERS:
NAME                       IMAGE                                                   COMMAND                  SERVICE    CREATED          STATUS                             PORTS
sistema_futebol_backend    ghcr.io/andresilvaaaa/sistema-futebol-backend:latest    "gunicorn -w 4 -b 0.…"   backend    33 seconds ago   Up 30 seconds (health: starting)   0.0.0.0:5001->5000/tcp, [::]:5001->5000/tcp
sistema_futebol_frontend   ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest   "docker-entrypoint.s…"   frontend   3 minutes ago    Up 3 minutes (healthy)             0.0.0.0:8080->3000/tcp, [::]:8080->3000/tcp
sistema_futebol_postgres   postgres:15-alpine                                      "docker-entrypoint.s…"   postgres   3 minutes ago    Up 3 minutes (healthy)             0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp

🔧 2. HEALTH CHECK BACKEND:
{
  "database": "connected",
  "message": "Aplicação funcionando corretamente",
  "status": "healthy",
  "version": "1.0.0"
}

🔧 3. HEALTH CHECK /health:
{
  "database": "connected",
  "message": "Aplicação funcionando corretamente",
  "status": "healthy",
  "version": "1.0.0"
}

💾 4. TABELAS NO BANCO DE DADOS:
                 List of relations
 Schema |      Name       | Type  |      Owner
--------+-----------------+-------+-----------------
 public | alembic_version | table | sistema_futebol
 public | casual_players  | table | sistema_futebol
 public | expenses        | table | sistema_futebol
 public | monthly_periods | table | sistema_futebol
 public | monthly_players | table | sistema_futebol
 public | players         | table | sistema_futebol
 public | users           | table | sistema_futebol
(7 rows)


⚛️  5. TESTE FRONTEND:
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0  6936    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
HTTP/1.1 200 OK

📝 6. LOGS DO BACKEND (últimas 20 linhas):
sistema_futebol_backend  | [2025-10-21 04:16:29 +0000] [1] [INFO] Starting gunicorn 23.0.0
sistema_futebol_backend  | [2025-10-21 04:16:29 +0000] [1] [INFO] Listening at: http://0.0.0.0:5000 (1)
sistema_futebol_backend  | [2025-10-21 04:16:29 +0000] [1] [INFO] Using worker: sync
sistema_futebol_backend  | [2025-10-21 04:16:29 +0000] [7] [INFO] Booting worker with pid: 7
sistema_futebol_backend  | [2025-10-21 04:16:29 +0000] [8] [INFO] Booting worker with pid: 8
sistema_futebol_backend  | [2025-10-21 04:16:30 +0000] [9] [INFO] Booting worker with pid: 9
sistema_futebol_backend  | [2025-10-21 04:16:30 +0000] [10] [INFO] Booting worker with pid: 10

==========================================
📊 RESUMO FINAL
==========================================

✅ SUCESSO! Backend conectado ao PostgreSQL!

🎉 MIGRAÇÃO PARA POSTGRESQL COMPLETA!

🌐 URLs de acesso:
   - Frontend: http://31.97.166.28:8080
   - Backend API: http://31.97.166.28:5001/api/health
   - Domínio: https://esporteflowpro.com.br

==========================================
root@srv866884:~/sistema_futebol#



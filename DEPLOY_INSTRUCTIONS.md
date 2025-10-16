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
# 🌐 Guia de Configuração do Domínio - esporteflowpro.com.br

## 🎉 **PARABÉNS! Deploy Realizado com Sucesso!**

Agora vamos configurar seu domínio personalizado e finalizar a produção.

---

## 📋 **PRÓXIMOS PASSOS - ROADMAP COMPLETO**

### **FASE 1: VALIDAÇÃO INICIAL** ⚡ (5-10 min)

#### 1.1 Testar Aplicação no VPS
```bash
# Verificar se containers estão rodando
docker ps

# Testar frontend (deve retornar HTML)
curl -I http://SEU_IP_VPS:8080

# Testar backend (deve retornar JSON)
curl http://SEU_IP_VPS:5001/api/health
```

#### 1.2 Verificar Logs
```bash
# Logs do frontend
docker logs sistema-futebol-frontend-1

# Logs do backend
docker logs sistema-futebol-backend-1
```

---

### **FASE 2: CONFIGURAÇÃO DO DOMÍNIO** 🌐 (15-20 min)

#### 2.1 Configurar DNS no Provedor do Domínio

**No painel do seu provedor de domínio (onde comprou esporteflowpro.com.br):**

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| A | @ | `SEU_IP_VPS` | 3600 |
| A | www | `SEU_IP_VPS` | 3600 |
| CNAME | api | esporteflowpro.com.br | 3600 |

#### 2.2 Atualizar Nginx para Domínio

**Criar novo arquivo de configuração:**
```bash
# No VPS
sudo nano /etc/nginx/sites-available/esporteflowpro.com.br
```

**Conteúdo do arquivo:**
```nginx
server {
    listen 80;
    server_name esporteflowpro.com.br www.esporteflowpro.com.br;

    # Frontend
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5001/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files
    location /static/ {
        proxy_pass http://localhost:5001/static/;
    }

    # Uploads
    location /uploads/ {
        proxy_pass http://localhost:5001/uploads/;
    }
}
```

#### 2.3 Ativar Configuração
```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/esporteflowpro.com.br /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Recarregar Nginx
sudo systemctl reload nginx
```

---

### **FASE 3: MIGRAÇÃO POSTGRESQL** 🐘 (20-30 min)

#### 3.1 Instalar PostgreSQL no VPS
```bash
# Atualizar sistema
sudo apt update

# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Iniciar serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### 3.2 Configurar Banco de Dados
```bash
# Acessar PostgreSQL
sudo -u postgres psql

# Criar banco e usuário
CREATE DATABASE futebol_prod;
CREATE USER futebol_user WITH PASSWORD 'sua_senha_segura_aqui';
GRANT ALL PRIVILEGES ON DATABASE futebol_prod TO futebol_user;
\q
```

#### 3.3 Atualizar docker-compose.prod.yml
```yaml
# Adicionar serviço PostgreSQL
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: futebol_prod
      POSTGRES_USER: futebol_user
      POSTGRES_PASSWORD: sua_senha_segura_aqui
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

volumes:
  postgres_data:
```

#### 3.4 Atualizar Variáveis de Ambiente
```bash
# No VPS, editar .env
DATABASE_URL=postgresql://futebol_user:sua_senha_segura_aqui@localhost:5432/futebol_prod
```

---

### **FASE 4: SSL/HTTPS** 🔒 (10-15 min)

#### 4.1 Instalar Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

#### 4.2 Obter Certificado SSL
```bash
sudo certbot --nginx -d esporteflowpro.com.br -d www.esporteflowpro.com.br
```

#### 4.3 Configurar Renovação Automática
```bash
# Testar renovação
sudo certbot renew --dry-run

# Adicionar ao crontab (já configurado automaticamente)
```

---

### **FASE 5: ATUALIZAR FRONTEND** ⚛️ (5 min)

#### 5.1 Atualizar Variável de Ambiente
```bash
# No GitHub Secrets, atualizar:
NEXT_PUBLIC_API_URL=https://esporteflowpro.com.br/api
```

#### 5.2 Fazer Deploy Atualizado
```bash
git commit -m "feat: update API URL for production domain"
git push origin main
```

---

## 🔍 **VALIDAÇÕES FINAIS**

### ✅ **Checklist de Produção**

- [ ] **DNS**: `nslookup esporteflowpro.com.br` retorna seu IP
- [ ] **HTTP**: `http://esporteflowpro.com.br` carrega o frontend
- [ ] **HTTPS**: `https://esporteflowpro.com.br` funciona com SSL
- [ ] **API**: `https://esporteflowpro.com.br/api/health` retorna JSON
- [ ] **Database**: PostgreSQL conectando corretamente
- [ ] **Containers**: Todos rodando sem erros

### 🧪 **Testes de Funcionalidade**

1. **Registro de usuário** ✅
2. **Login/Logout** ✅
3. **Cadastro de jogadores** ✅
4. **Gestão financeira** ✅
5. **Relatórios mensais** ✅

---

## 🚨 **COMANDOS DE EMERGÊNCIA**

### Verificar Status Geral
```bash
# Status dos containers
docker ps -a

# Logs em tempo real
docker logs -f sistema-futebol-frontend-1
docker logs -f sistema-futebol-backend-1

# Status do Nginx
sudo systemctl status nginx

# Status do PostgreSQL
sudo systemctl status postgresql
```

### Reiniciar Serviços
```bash
# Reiniciar containers
docker-compose -f docker-compose.prod.yml restart

# Reiniciar Nginx
sudo systemctl restart nginx

# Reiniciar PostgreSQL
sudo systemctl restart postgresql
```

---

## 📊 **MONITORAMENTO RECOMENDADO**

### Ferramentas Sugeridas:
1. **Uptime Robot** - Monitoramento de disponibilidade
2. **Google Analytics** - Análise de tráfego
3. **Sentry** - Monitoramento de erros
4. **Grafana + Prometheus** - Métricas avançadas

---

## 🎯 **PRÓXIMAS MELHORIAS**

1. **Backup Automático** do PostgreSQL
2. **CDN** para assets estáticos
3. **Load Balancer** para alta disponibilidade
4. **CI/CD** com testes automatizados
5. **Monitoring** com alertas

---

**🚀 Seu sistema está quase pronto para produção!**

Precisa de ajuda com alguma dessas etapas?
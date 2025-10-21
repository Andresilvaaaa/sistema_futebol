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



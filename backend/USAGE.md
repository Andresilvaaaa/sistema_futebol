# 🚀 Como Usar o Sistema de Futebol

## 📋 Pré-requisitos

1. **Python 3.8+** instalado
2. **pip** para gerenciar dependências

## 🔧 Instalação

### 1. Instalar dependências
```bash
pip install -r requirements.txt
```

### 2. Configurar ambiente (opcional)
```bash
# Copiar arquivo de exemplo
cp config/.env.example .env

# Editar .env com suas configurações
# FLASK_ENV=development
# SECRET_KEY=sua-chave-secreta
# JWT_SECRET_KEY=sua-chave-jwt
```

## 🏃‍♂️ Executar Aplicação

### Método 1: Script de inicialização (Recomendado)
```bash
# Desenvolvimento
python run.py

# Ou especificar ambiente
python run.py development
python run.py production
python run.py testing
```

### Método 2: Diretamente via app.py
```bash
python app.py
```

### Método 3: Via Flask CLI
```bash
export FLASK_APP=app.py
export FLASK_ENV=development
flask run
```

## 📡 Endpoints Disponíveis

### Base URL (desenvolvimento)

- `http://127.0.0.1:5000`

### 🔓 Endpoints Públicos

- `GET /` — Informações do sistema
```bash
curl http://127.0.0.1:5000/
```

- `GET /health` — Health check
```bash
curl http://127.0.0.1:5000/health
```

- `GET /api/info` — Informações da API
```bash
curl http://127.0.0.1:5000/api/info
```

- `GET /api/admin/system/health` — Saúde do sistema administrativo
```bash
curl http://127.0.0.1:5000/api/admin/system/health
```

- `POST /api/auth/login` — Login
```bash
curl -X POST http://127.0.0.1:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### 🔒 Endpoints Protegidos (requer JWT)

- `GET /api/auth/profile` — Perfil do usuário autenticado
```bash
# Obter token
TOKEN=$(curl -s -X POST http://127.0.0.1:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' | \
  python -c "import sys, json; print(json.load(sys.stdin)['access_token'])")

# Usar token
curl http://127.0.0.1:5000/api/auth/profile \
  -H "Authorization: Bearer $TOKEN"
```

- `POST /api/auth/logout` — Logout
```bash
curl -X POST http://127.0.0.1:5000/api/auth/logout \
  -H "Authorization: Bearer $TOKEN"
```

#### Jogadores (`/api/players`)

- `GET /api/players` — Lista com filtros e paginação
```bash
curl "http://127.0.0.1:5000/api/players?page=1&per_page=10&search=joao" \
  -H "Authorization: Bearer $TOKEN"
```

- `POST /api/players` — Criar jogador
```bash
curl -X POST http://127.0.0.1:5000/api/players \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "+55 11 99999-0000",
    "position": "Atacante",
    "monthly_fee": 100.0
  }'
```

- `GET /api/players/{player_id}` — Obter jogador
```bash
curl http://127.0.0.1:5000/api/players/PLAYER_ID \
  -H "Authorization: Bearer $TOKEN"
```

- `PUT /api/players/{player_id}` — Atualizar jogador
```bash
curl -X PUT http://127.0.0.1:5000/api/players/PLAYER_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "João S.",
    "monthly_fee": 120.0
  }'
```

- `PATCH /api/players/{player_id}/activate` — Ativar
```bash
curl -X PATCH http://127.0.0.1:5000/api/players/PLAYER_ID/activate \
  -H "Authorization: Bearer $TOKEN"
```

- `PATCH /api/players/{player_id}/deactivate` — Desativar
```bash
curl -X PATCH http://127.0.0.1:5000/api/players/PLAYER_ID/deactivate \
  -H "Authorization: Bearer $TOKEN"
```

- `DELETE /api/players/{player_id}` — Remover
```bash
curl -X DELETE http://127.0.0.1:5000/api/players/PLAYER_ID \
  -H "Authorization: Bearer $TOKEN"
```

#### Pagamentos Mensais

- `GET /api/monthly-payments` — Lista agregada por período
```bash
curl http://127.0.0.1:5000/api/monthly-payments \
  -H "Authorization: Bearer $TOKEN"
```

- `POST /api/monthly-payments` — Registrar pagamento mensal
```bash
# Corpo depende do esquema definido; exemplo genérico
curl -X POST http://127.0.0.1:5000/api/monthly-payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"monthly_period_id": "PERIOD_ID", "player_id": "PLAYER_ID", "amount": 100.0}'
```

- `PUT /api/monthly-payments/{payment_id}/pay` — Marcar como pago
```bash
curl -X PUT http://127.0.0.1:5000/api/monthly-payments/PAYMENT_ID/pay \
  -H "Authorization: Bearer $TOKEN"
```

- `PUT /api/monthly-players/{monthly_player_id}/custom-fee` — Ajustar taxa
```bash
curl -X PUT http://127.0.0.1:5000/api/monthly-players/MONTHLY_PLAYER_ID/custom-fee \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"custom_monthly_fee": 120.0}'
```

#### Estatísticas

- `GET /api/stats/players` — Estatísticas de jogadores
```bash
curl http://127.0.0.1:5000/api/stats/players \
  -H "Authorization: Bearer $TOKEN"
```

- `GET /api/stats/payments/{year}/{month}` — Estatísticas de pagamentos
```bash
curl http://127.0.0.1:5000/api/stats/payments/2024/10 \
  -H "Authorization: Bearer $TOKEN"
```

#### Períodos Mensais

- `GET /api/monthly-periods` — Listar períodos
```bash
curl http://127.0.0.1:5000/api/monthly-periods \
  -H "Authorization: Bearer $TOKEN"
```

- `GET /api/monthly-periods/{period_id}` — Detalhes do período
```bash
curl http://127.0.0.1:5000/api/monthly-periods/PERIOD_ID \
  -H "Authorization: Bearer $TOKEN"
```

- `POST /api/monthly-periods/{period_id}/players` — Adicionar jogadores ao período
```bash
# Corpo depende do esquema definido; exemplo genérico
curl -X POST http://127.0.0.1:5000/api/monthly-periods/PERIOD_ID/players \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"player_id": "PLAYER_ID"}'
```

- `GET /api/monthly-periods/{period_id}/players` — Jogadores do período
```bash
curl http://127.0.0.1:5000/api/monthly-periods/PERIOD_ID/players \
  -H "Authorization: Bearer $TOKEN"
```

- `GET /api/monthly-periods/{period_id}/casual-players` — Jogadores avulsos
```bash
curl http://127.0.0.1:5000/api/monthly-periods/PERIOD_ID/casual-players \
  -H "Authorization: Bearer $TOKEN"
```

- `GET /api/monthly-periods/{period_id}/expenses` — Despesas do período
```bash
curl http://127.0.0.1:5000/api/monthly-periods/PERIOD_ID/expenses \
  -H "Authorization: Bearer $TOKEN"
```

## 🌐 CORS

O CORS está configurado para permitir:
- **Desenvolvimento**: `http://localhost:3000`, `http://127.0.0.1:3000`
- **Produção**: Configurável via `CORS_ORIGINS` no `.env`

## 🔑 JWT Authentication

### Headers suportados:
- `Authorization: Bearer <token>`

### Tokens:
- **Access Token**: Expira em 1 hora
- **Refresh Token**: Expira em 30 dias

## 🗄️ Banco de Dados

### Desenvolvimento:
- **SQLite**: `futebol_dev.db` (criado automaticamente)

### Produção:
- **PostgreSQL**: Configure via `DATABASE_URL`

### Testes:
- **SQLite em memória**: Sem persistência

## ⚙️ Configurações Avançadas

### Variáveis de Ambiente Opcionais:
```env
# Configurações do futebol
MAX_PLAYERS_PER_TEAM=25
MIN_PLAYERS_PER_TEAM=11
SEASON_START_MONTH=8
SEASON_END_MONTH=5

# Logging
LOG_LEVEL=DEBUG

# Cache (produção)
CACHE_TYPE=redis
CACHE_REDIS_URL=redis://localhost:6379/0
```

## 🐳 Deploy com Docker (Opcional)

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:create_app()"]
```

## 🔍 Troubleshooting

### Erro: "Dependências não instaladas"
```bash
pip install -r requirements.txt
```

### Erro: "Token inválido"
- Verifique se o header `Authorization: Bearer <token>` está correto
- Faça login novamente para obter um novo token

### Erro: "Variável obrigatória em produção"
- Configure `SECRET_KEY` e `DATABASE_URL` no ambiente de produção

### Erro de CORS
- Verifique se seu frontend está na lista `CORS_ORIGINS`
- Para desenvolvimento, adicione `http://localhost:3000`

## 📚 Próximos Passos

1. **Implementar modelos de banco** (Times, Jogadores, Partidas)
2. **Adicionar validação de dados** com marshmallow ou pydantic
3. **Implementar autenticação real** com hash de senhas
4. **Adicionar testes unitários**
5. **Configurar CI/CD**

## 🛠️ Migrations

- As migrations canônicas ficam na pasta `migrations/` na raiz do projeto.
- A pasta `backend/migrations` é legada e não deve ser usada.
- Execute `flask db init`, `flask db migrate` e `flask db upgrade` no diretório raiz.
- Se houver erro por tabelas temporárias `_alembic_tmp_*` no SQLite, rode `python scripts/cleanup_alembic_tmp.py` e tente novamente.
- A coluna `custom_monthly_fee` existe em `monthly_players` e é `nullable`.
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

### 🔓 Endpoints Públicos

**GET /** - Informações do sistema
```bash
curl http://localhost:5000/
```

**GET /health** - Health check
```bash
curl http://localhost:5000/health
```

**POST /auth/login** - Login
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

**GET /teams** - Listar times
```bash
curl http://localhost:5000/teams
```

### 🔒 Endpoints Protegidos (Requer JWT)

**GET /auth/profile** - Perfil do usuário
```bash
# Primeiro faça login para obter o token
TOKEN=$(curl -s -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' | \
  python -c "import sys, json; print(json.load(sys.stdin)['access_token'])")

# Use o token para acessar
curl http://localhost:5000/auth/profile \
  -H "Authorization: Bearer $TOKEN"
```

**POST /teams** - Criar time
```bash
curl -X POST http://localhost:5000/teams \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name": "Novo Time", "city": "São Paulo"}'
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
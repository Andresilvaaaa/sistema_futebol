# Configurações Aprimoradas do Sistema de Futebol

## 🚀 Características Principais

✅ **JWT Support** - Autenticação com tokens JWT
✅ **Validação de Configuração** - Verifica variáveis obrigatórias
✅ **CORS Configurável** - Suporte a múltiplos domínios
✅ **Logging Avançado** - Logs rotativos em produção
✅ **Upload de Arquivos** - Configuração flexível
✅ **Paginação** - Configurações de página
✅ **Rate Limiting** - Controle de taxa de requisições

## 📁 Arquivos de Configuração

### `__init__.py` - Configuração Principal
Configurações aprimoradas com:
- `BaseConfig`: Configuração base compartilhada
- `DevelopmentConfig`: Para desenvolvimento local
- `ProductionConfig`: Para produção (com validação)
- `TestingConfig`: Para testes automatizados
- `HomologConfig`: Para ambiente de homologação

### `base.py` - Configurações Avançadas
Configurações detalhadas incluindo:
- JWT Authentication
- CORS Headers
- File Upload
- Email
- Rate Limiting

### `utils.py` - Utilitários
Helpers para facilitar o uso:
- Carregamento automático de `.env`
- Validação de variáveis obrigatórias
- Setup simplificado da aplicação

## 🛠️ Como Usar

### Configuração Básica
```python
from config import config
from config.utils import setup_app_config

# Método simples
app.config.from_object(config['development'])

# Método com helpers
setup_app_config(app, 'development')
```

### Configuração com JWT
```python
from flask_jwt_extended import JWTManager

app.config.from_object(config['production'])
jwt = JWTManager(app)
```

### Validação de Produção
```python
from config.utils import validate_required_env_vars

# Valida variáveis obrigatórias
validate_required_env_vars(['SECRET_KEY', 'DATABASE_URL'], 'production')
```

## 🔧 Configuração de Variáveis

### 1. Copie o arquivo exemplo
```bash
cp config/.env.example .env
```

### 2. Configure suas variáveis
```env
# Básico
FLASK_ENV=development
SECRET_KEY=sua-chave-secreta
JWT_SECRET_KEY=sua-chave-jwt
DATABASE_URL=sqlite:///futebol.db

# CORS
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Logging
LOG_LEVEL=DEBUG
```

## 🌍 Configurações por Ambiente

### 🔧 Desenvolvimento
- Debug ativado
- SQLite local
- CORS liberado
- SQL logging ativo
- CSRF desabilitado

### 🚀 Produção
- Debug desativado
- Validação de variáveis obrigatórias
- HTTPS enforcement
- Logs rotativos
- Sessões seguras

### 🧪 Testes
- Banco em memória
- CSRF desabilitado
- Logs suprimidos
- Configurações otimizadas

### 🎯 Homologação
- Similar à produção
- SQL logging para debug
- Segurança relaxada para testes

## 🔐 Configurações JWT

```python
# Tempo de expiração dos tokens
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)

# Localização dos tokens
JWT_TOKEN_LOCATION = ['headers', 'cookies']
JWT_HEADER_NAME = 'Authorization'
JWT_HEADER_TYPE = 'Bearer'
```

## 📊 Configurações do Domínio (Futebol)

```python
# Configurações específicas do futebol
MAX_PLAYERS_PER_TEAM = 25
MIN_PLAYERS_PER_TEAM = 11
SEASON_START_MONTH = 8  # Agosto
SEASON_END_MONTH = 5    # Maio
```

## 🔍 Utilitários Disponíveis

### Informações do Banco
```python
from config.utils import get_database_info

db_info = get_database_info()
print(f"Banco: {db_info['type']} em {db_info['location']}")
```

### Carregamento de .env
```python
from config.utils import load_env_file

load_env_file('.env.local')  # Carrega arquivo específico
```

## 🎯 Vantagens desta Versão

- **✅ Completa**: Suporte a JWT, CORS, validação, logging
- **✅ Flexível**: Configurações via variáveis de ambiente
- **✅ Segura**: Validação obrigatória em produção
- **✅ Evolutiva**: Fácil de expandir e modificar
- **✅ Documentada**: Exemplos e helpers incluídos
- **✅ Testável**: Configurações otimizadas para testes
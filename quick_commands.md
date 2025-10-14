# ⚡ COMANDOS RÁPIDOS - Fix Migration

## 🚀 Solução Automática (RECOMENDADO)

```bash
# Executar script automático que tenta todos os métodos
python auto_fix_migration.py
```

Este script:
- ✅ Verifica se o problema existe
- ✅ Tenta aplicar migration com Flask
- ✅ Se falhar, aplica fix manual
- ✅ Cria backup automático
- ✅ Valida o resultado

---

## 🛠️ Solução Manual - Passo a Passo

### **Opção 1: Flask DB Upgrade (Preferível)**

```bash
# 1. Verificar estado
flask db current

# 2. Ver migrations disponíveis
flask db history

# 3. Aplicar migration
flask db upgrade head

# 4. Verificar resultado
sqlite3 instance/futebol_dev.db "PRAGMA table_info(monthly_players);" | grep custom_monthly_fee

# 5. Reiniciar Flask
python app.py
```

### **Opção 2: Fix Manual (se Opção 1 falhar)**

```bash
# 1. Diagnosticar problema
python 2_verificar_banco.py

# 2. Aplicar fix manual
python 3_fix_manual.py

# 3. Reiniciar Flask
python app.py
```

---

## 🧪 Testar a Correção

### **Teste 1: Via cURL**

```bash
# Obter token (ajuste credenciais)
TOKEN=$(curl -s -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' | \
  python -c "import sys, json; print(json.load(sys.stdin)['access_token'])")

# Criar período mensal
curl -X POST http://localhost:5000/api/monthly-payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"year": 2025, "month": 10}'
```

### **Teste 2: Via Python**

```python
import requests

# Login
response = requests.post('http://localhost:5000/auth/login', json={
    'username': 'admin',
    'password': 'admin123'
})
token = response.json()['access_token']

# Criar período
response = requests.post(
    'http://localhost:5000/api/monthly-payments',
    headers={'Authorization': f'Bearer {token}'},
    json={'year': 2025, 'month': 10}
)

print(response.json())
# Esperado: {'message': 'Período mensal criado com sucesso', ...}
```

---

## 🔧 Troubleshooting Rápido

### **Erro: "No such table: alembic_version"**

```bash
flask db stamp head
flask db upgrade head
```

### **Erro: "Table _alembic_tmp_* already exists"**

```bash
# Limpar tabelas temporárias
sqlite3 instance/futebol_dev.db "SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%alembic%';"

# Dropar manualmente se necessário
sqlite3 instance/futebol_dev.db "DROP TABLE IF EXISTS _alembic_tmp_monthly_players;"
```

### **Erro: "Cannot add column - duplicate"**

```bash
# Verificar se coluna já existe
sqlite3 instance/futebol_dev.db "PRAGMA table_info(monthly_players);" | grep custom_monthly_fee

# Se existir, apenas atualizar alembic
flask db stamp head
```

### **Erro: "Unable to locate alembic.ini"**

```bash
# Ir para raiz do projeto
cd /caminho/para/sistema_futebol

# Verificar se arquivo existe
ls migrations/alembic.ini  # ✅ Correto
ls backend/migrations/alembic.ini  # ❌ Não usar
```

---

## 📊 Verificar Estado do Banco

```bash
# Ver todas as tabelas
sqlite3 instance/futebol_dev.db ".tables"

# Ver estrutura de monthly_players
sqlite3 instance/futebol_dev.db "PRAGMA table_info(monthly_players);"

# Ver versão do Alembic
sqlite3 instance/futebol_dev.db "SELECT * FROM alembic_version;"

# Contar registros
sqlite3 instance/futebol_dev.db "SELECT COUNT(*) FROM monthly_players;"
```

---

## 🔄 Resetar Completamente (CUIDADO: Apaga dados)

```bash
# Backup primeiro
cp instance/futebol_dev.db instance/futebol_dev.db.backup

# Deletar banco
rm instance/futebol_dev.db

# Recriar do zero
flask db upgrade head

# Reiniciar Flask
python app.py
```

---

## 📦 Criar Backup Manual

```bash
# Backup com timestamp
cp instance/futebol_dev.db "instance/futebol_dev.db.backup_$(date +%Y%m%d_%H%M%S)"

# Verificar backups
ls -lh instance/*.backup*
```

---

## 🎯 Checklist Final

Após executar a correção:

```bash
# ✅ 1. Coluna existe?
sqlite3 instance/futebol_dev.db "PRAGMA table_info(monthly_players);" | grep custom_monthly_fee

# ✅ 2. Migration aplicada?
flask db current

# ✅ 3. Flask inicia sem erros?
python app.py

# ✅ 4. Consegue criar período?
curl -X POST http://localhost:5000/api/monthly-payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"year": 2025, "month": 10}'
```

---

## 💡 Dicas

### **Desenvolvimento**
- Sempre faça backup antes de migrations
- Use `flask db upgrade` ao invés de modificar diretamente
- Rode migrations em ordem sequencial

### **Produção**
- Migre para PostgreSQL (mais robusto que SQLite)
- Configure backups automáticos
- Teste migrations em staging primeiro

### **Debug**
- Ative logs do SQLAlchemy: `SQLALCHEMY_ECHO=True`
- Use `flask db show` para ver detalhes da migration
- Verifique `migrations/versions/` para ver histórico

---

## 📞 Ainda com Problemas?

Execute e compartilhe o output:

```bash
# 1. Diagnóstico completo
python 2_verificar_banco.py > diagnostico.txt

# 2. Estado do Alembic
flask db current >> diagnostico.txt
flask db history >> diagnostico.txt

# 3. Estrutura da tabela
sqlite3 instance/futebol_dev.db "PRAGMA table_info(monthly_players);" >> diagnostico.txt

# 4. Enviar diagnostico.txt para análise
```

---

**⚡ Comando Único para Tudo:**

```bash
python auto_fix_migration.py && python app.py
```

Este comando:
1. Corrige automaticamente
2. Se der tudo certo, inicia o Flask

✅ **Pronto!**

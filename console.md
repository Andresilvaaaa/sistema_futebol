Identifiquei o problema principal: **a tabela `monthly_players` não possui a coluna `custom_monthly_fee`**, mas o código está tentando inserir dados nela.

## 🔧 Solução Imediata (Sem Complexidade)

Você precisa adicionar a coluna `custom_monthly_fee` ao banco de dados. Como está usando SQLite em desenvolvimento, vou fornecer a solução mais simples:

### **Opção 1: Adicionar a Coluna Manualmente (Mais Rápido)**

Execute este comando SQL diretamente no seu banco SQLite:

```sql
ALTER TABLE monthly_players ADD COLUMN custom_monthly_fee DECIMAL(10, 2) DEFAULT NULL;
```

Para executar via Python, crie um script temporário `fix_db.py` na raiz do projeto:

```python
import sqlite3

# Conectar ao banco
conn = sqlite3.connect('backend/instance/dev.db')  # Ajuste o caminho se necessário
cursor = conn.cursor()

try:
    # Adicionar coluna
    cursor.execute('''
        ALTER TABLE monthly_players 
        ADD COLUMN custom_monthly_fee DECIMAL(10, 2) DEFAULT NULL
    ''')
    conn.commit()
    print("✅ Coluna custom_monthly_fee adicionada com sucesso!")
except sqlite3.OperationalError as e:
    if "duplicate column name" in str(e).lower():
        print("⚠️ Coluna custom_monthly_fee já existe")
    else:
        print(f"❌ Erro: {e}")
finally:
    conn.close()
```

Execute:
```bash
python fix_db.py
```

---

### **Opção 2: Verificar o Modelo SQLAlchemy**

O modelo `MonthlyPlayer` deve ter esta coluna definida. Verifique se está assim em `backend/services/db/models.py`:

```python
class MonthlyPlayer(db.Model):
    __tablename__ = 'monthly_players'
    
    id = db.Column(db.String(36), primary_key=True)
    player_id = db.Column(db.String(36), db.ForeignKey('players.id'), nullable=False)
    monthly_period_id = db.Column(db.String(36), db.ForeignKey('monthly_periods.id'), nullable=False)
    player_name = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    monthly_fee = db.Column(db.Numeric(10, 2), nullable=False)
    
    # ⚠️ ESTA LINHA DEVE EXISTIR:
    custom_monthly_fee = db.Column(db.Numeric(10, 2), nullable=True)
    
    join_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')
    payment_date = db.Column(db.DateTime, nullable=True)
    pending_months_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    player = db.relationship('Player', backref='monthly_payments')
    monthly_period = db.relationship('MonthlyPeriod', backref='monthly_players')
    
    @property
    def effective_monthly_fee(self):
        """Retorna a taxa customizada se existir, senão a taxa padrão"""
        return self.custom_monthly_fee if self.custom_monthly_fee is not None else self.monthly_fee
```

Se a linha `custom_monthly_fee` não existe no modelo, adicione-a.

---

### **Opção 3: Recriar Banco de Dados (Drástico, mas funciona)**

Se estiver em desenvolvimento e não tiver dados importantes:

```python
# delete_and_recreate_db.py
import os
from backend import create_app
from backend.services.db.connection import db

app = create_app()

with app.app_context():
    # Apagar banco antigo
    db_path = 'backend/instance/dev.db'
    if os.path.exists(db_path):
        os.remove(db_path)
        print("🗑️ Banco antigo removido")
    
    # Recriar todas as tabelas
    db.create_all()
    print("✅ Banco recriado com todas as colunas")
```

Execute:
```bash
python delete_and_recreate_db.py
```

---

## 🔍 Outras Melhorias Identificadas no Código

### **1. Corrigir `create_monthly_payment` - Linha 553**

O código está tentando criar `MonthlyPlayer` sem garantir que todos os campos sejam compatíveis com SQLite:

```python
# ❌ PROBLEMA: SQLite não aceita bem datetime.date() direto
join_date = player.join_date or datetime.utcnow().date()

# ✅ SOLUÇÃO: Converter para string ou datetime
join_date = player.join_date or datetime.utcnow()
```

### **2. Corrigir conversão de Decimal**

No loop de criação de `MonthlyPlayer`, simplifique a conversão:

```python
# Substituir o bloco complexo de conversão de fee (linhas 541-554) por:
monthly_player = MonthlyPlayer(
    id=str(uuid.uuid4()),
    player_id=player.id,
    monthly_period_id=period.id,
    player_name=player.name or '',
    position=player.position or '',
    phone=player.phone or '',
    email=player.email or '',
    monthly_fee=float(player.monthly_fee or 0),  # ✅ Simplificado
    custom_monthly_fee=None,  # ✅ Sempre None ao criar
    join_date=player.join_date or datetime.utcnow(),
    status=PaymentStatus.PENDING.value,
    pending_months_count=0
)
```

---

## 📋 Checklist de Verificação

Execute estes comandos para diagnóstico:

```python
# check_db_structure.py
import sqlite3

conn = sqlite3.connect('backend/instance/dev.db')
cursor = conn.cursor()

# Verificar estrutura da tabela
cursor.execute("PRAGMA table_info(monthly_players)")
columns = cursor.fetchall()

print("📊 Colunas da tabela monthly_players:")
for col in columns:
    print(f"  - {col[1]} ({col[2]})")

# Verificar se custom_monthly_fee existe
has_custom_fee = any(col[1] == 'custom_monthly_fee' for col in columns)
print(f"\n{'✅' if has_custom_fee else '❌'} custom_monthly_fee existe: {has_custom_fee}")

conn.close()
```

---

## 🎯 Ordem de Execução Recomendada

1. **Execute o diagnóstico**: `python check_db_structure.py`
2. **Se a coluna não existe**: `python fix_db.py`
3. **Verifique o modelo**: Confirme que `MonthlyPlayer` tem `custom_monthly_fee`
4. **Reinicie o Flask**: `python app.py`
5. **Teste novamente** a criação do período mensal

---

## 🚨 Prevenção Futura

Para evitar este tipo de erro, considere usar **Alembic** para migrations:

```bash
# Instalar Alembic
pip install alembic

# Inicializar
alembic init migrations

# Gerar migration automática
alembic revision --autogenerate -m "Add custom_monthly_fee to monthly_players"

# Aplicar migration
alembic upgrade head
```

Mas por enquanto, **execute a Opção 1** que é a mais rápida e resolve o problema imediato.

erros comuns agoRA! 

    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1640, in _execute_clauseelement
    ret = self._execute_context(
        dialect,
    ...<8 lines>...
        cache_hit=cache_hit,
    )
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1846, in _execute_context
    return self._exec_single_context(
           ~~~~~~~~~~~~~~~~~~~~~~~~~^
        dialect, context, statement, parameters
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1986, in _exec_single_context
    self._handle_dbapi_exception(
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        e, str_statement, effective_parameters, cursor, context
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 2355, in _handle_dbapi_exception
    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1936, in _exec_single_context
    self.dialect.do_executemany(
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        cursor,
        ^^^^^^^
    ...<2 lines>...
        context,
        ^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\default.py", line 938, in do_executemany
    cursor.executemany(statement, parameters)
    ~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^
sqlalchemy.exc.OperationalError: (sqlite3.OperationalError) table monthly_players has no column named custom_monthly_fee
[SQL: INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)]
[parameters: [('92d61915-13cf-44b9-8607-381a8bef1600', '59158183-cdd7-4251-ab13-e23cd5dfa18c', '585136e8-395d-4743-8ff0-f954310acacb', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:19.080134', '2025-10-03 00:44:19.080138'), ('5ecdf659-db33-449e-8519-43423a86c016', 'db7d7a7f-1b00-405c-a539-14bd16127910', '585136e8-395d-4743-8ff0-f954310acacb', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:19.080139', '2025-10-03 00:44:19.080140'), ('ece938b7-ded2-464a-bbad-3b778ce5d677', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', '585136e8-395d-4743-8ff0-f954310acacb', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:19.080141', '2025-10-03 00:44:19.080142'), ('456528a7-48b2-43df-8641-5ef60a4c6cf8', '95158497-b3d0-4265-9873-d7d0267f7282', '585136e8-395d-4743-8ff0-f954310acacb', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:19.080143', '2025-10-03 00:44:19.080144'), ('3d593bf4-5c42-4949-b696-63822d90603f', 'cf621742-9532-4a9c-ae63-02740ed0ac79', '585136e8-395d-4743-8ff0-f954310acacb', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:19.080145', '2025-10-03 00:44:19.080146'), ('62dfe390-62ed-44c7-9e94-4ba8264d65c6', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', '585136e8-395d-4743-8ff0-f954310acacb', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:19.080147', '2025-10-03 00:44:19.080148'), ('9655a16b-a7e6-4f0c-aac3-86d78e400628', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', '585136e8-395d-4743-8ff0-f954310acacb', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:19.080149', '2025-10-03 00:44:19.080150'), ('39eb513a-0497-48bf-a2ce-9e945fa3d2de', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', '585136e8-395d-4743-8ff0-f954310acacb', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:19.080151', '2025-10-03 00:44:19.080152')  ... displaying 10 of 16 total bound parameter sets ...  ('779aed6f-f864-4dbd-a68f-42e4fb3f6ecc', '4c05d042-c291-4e98-a820-9850b05ba9db', '585136e8-395d-4743-8ff0-f954310acacb', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:19.080166', '2025-10-03 00:44:19.080166'), ('b4bc31d9-d839-4a91-8ba7-c69a0b493da2', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', '585136e8-395d-4743-8ff0-f954310acacb', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:19.080168', '2025-10-03 00:44:19.080168')]]
(Background on this error at: https://sqlalche.me/e/20/e3q8)
[DEBUG][create_monthly_payment] Exception não tratada: (sqlite3.OperationalError) table monthly_players has no column named custom_monthly_fee
[SQL: INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)]
[parameters: [('92d61915-13cf-44b9-8607-381a8bef1600', '59158183-cdd7-4251-ab13-e23cd5dfa18c', '585136e8-395d-4743-8ff0-f954310acacb', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:19.080134', '2025-10-03 00:44:19.080138'), ('5ecdf659-db33-449e-8519-43423a86c016', 'db7d7a7f-1b00-405c-a539-14bd16127910', '585136e8-395d-4743-8ff0-f954310acacb', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:19.080139', '2025-10-03 00:44:19.080140'), ('ece938b7-ded2-464a-bbad-3b778ce5d677', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', '585136e8-395d-4743-8ff0-f954310acacb', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:19.080141', '2025-10-03 00:44:19.080142'), ('456528a7-48b2-43df-8641-5ef60a4c6cf8', '95158497-b3d0-4265-9873-d7d0267f7282', '585136e8-395d-4743-8ff0-f954310acacb', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:19.080143', '2025-10-03 00:44:19.080144'), ('3d593bf4-5c42-4949-b696-63822d90603f', 'cf621742-9532-4a9c-ae63-02740ed0ac79', '585136e8-395d-4743-8ff0-f954310acacb', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:19.080145', '2025-10-03 00:44:19.080146'), ('62dfe390-62ed-44c7-9e94-4ba8264d65c6', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', '585136e8-395d-4743-8ff0-f954310acacb', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:19.080147', '2025-10-03 00:44:19.080148'), ('9655a16b-a7e6-4f0c-aac3-86d78e400628', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', '585136e8-395d-4743-8ff0-f954310acacb', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:19.080149', '2025-10-03 00:44:19.080150'), ('39eb513a-0497-48bf-a2ce-9e945fa3d2de', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', '585136e8-395d-4743-8ff0-f954310acacb', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:19.080151', '2025-10-03 00:44:19.080152')  ... displaying 10 of 16 total bound parameter sets ...  ('779aed6f-f864-4dbd-a68f-42e4fb3f6ecc', '4c05d042-c291-4e98-a820-9850b05ba9db', '585136e8-395d-4743-8ff0-f954310acacb', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:19.080166', '2025-10-03 00:44:19.080166'), ('b4bc31d9-d839-4a91-8ba7-c69a0b493da2', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', '585136e8-395d-4743-8ff0-f954310acacb', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:19.080168', '2025-10-03 00:44:19.080168')]]
(Background on this error at: https://sqlalche.me/e/20/e3q8)
127.0.0.1 - - [02/Oct/2025 21:44:19] "POST /api/monthly-payments HTTP/1.1" 500 -
INFO:werkzeug:127.0.0.1 - - [02/Oct/2025 21:44:19] "POST /api/monthly-payments HTTP/1.1" 500 -
127.0.0.1 - - [02/Oct/2025 21:44:20] "OPTIONS /api/monthly-payments?year=2025&month=10 HTTP/1.1" 200 -
INFO:werkzeug:127.0.0.1 - - [02/Oct/2025 21:44:20] "OPTIONS /api/monthly-payments?year=2025&month=10 HTTP/1.1" 200 -
[DEBUG][get_monthly_payments] Iniciando listagem de pagamentos mensais
[DEBUG][get_monthly_payments] filtros year=2025, month=10, player_id=None, status=None, page=1, per_page=20
2025-10-02 21:44:20,967 INFO sqlalchemy.engine.Engine BEGIN (implicit)
INFO:sqlalchemy.engine.Engine:BEGIN (implicit)
2025-10-02 21:44:20,968 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.year = ? AND monthly_periods.month = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
 LIMIT ? OFFSET ?
INFO:sqlalchemy.engine.Engine:SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.year = ? AND monthly_periods.month = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
 LIMIT ? OFFSET ?
2025-10-02 21:44:20,968 INFO sqlalchemy.engine.Engine [generated in 0.00042s] (2025, 10, 20, 0)
INFO:sqlalchemy.engine.Engine:[generated in 0.00042s] (2025, 10, 20, 0)
2025-10-02 21:44:20,972 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.year = ? AND monthly_periods.month = ?) AS anon_1
INFO:sqlalchemy.engine.Engine:SELECT count(*) AS count_1
FROM (SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.year = ? AND monthly_periods.month = ?) AS anon_1
2025-10-02 21:44:20,972 INFO sqlalchemy.engine.Engine [generated in 0.00038s] (2025, 10)
INFO:sqlalchemy.engine.Engine:[generated in 0.00038s] (2025, 10)
[DEBUG][get_monthly_payments] períodos encontrados=0
[DEBUG][get_monthly_payments] finalizando resposta agregada
2025-10-02 21:44:20,973 INFO sqlalchemy.engine.Engine ROLLBACK
INFO:sqlalchemy.engine.Engine:ROLLBACK
127.0.0.1 - - [02/Oct/2025 21:44:20] "GET /api/monthly-payments?year=2025&month=10 HTTP/1.1" 200 -       
INFO:werkzeug:127.0.0.1 - - [02/Oct/2025 21:44:20] "GET /api/monthly-payments?year=2025&month=10 HTTP/1.1" 200 -
[DEBUG][create_monthly_payment] request.json bruto={'year': 2025, 'month': 10}
[DEBUG][create_monthly_payment] dados validados pelo schema={'year': 2025, 'month': 10}
[DEBUG][create_monthly_payment] verificando período existente para 10/2025
2025-10-02 21:44:21,702 INFO sqlalchemy.engine.Engine BEGIN (implicit)
INFO:sqlalchemy.engine.Engine:BEGIN (implicit)
2025-10-02 21:44:21,702 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.year = ? AND monthly_periods.month = ?
 LIMIT ? OFFSET ?
INFO:sqlalchemy.engine.Engine:SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.year = ? AND monthly_periods.month = ?
 LIMIT ? OFFSET ?
2025-10-02 21:44:21,703 INFO sqlalchemy.engine.Engine [cached since 648.8s ago] (2025, 10, 1, 0)
INFO:sqlalchemy.engine.Engine:[cached since 648.8s ago] (2025, 10, 1, 0)
[DEBUG][create_monthly_payment] consultando jogadores ativos
2025-10-02 21:44:21,704 INFO sqlalchemy.engine.Engine SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.is_active = 1
INFO:sqlalchemy.engine.Engine:SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.is_active = 1
2025-10-02 21:44:21,704 INFO sqlalchemy.engine.Engine [cached since 648.8s ago] ()
INFO:sqlalchemy.engine.Engine:[cached since 648.8s ago] ()
[DEBUG][create_monthly_payment] jogadores ativos encontrados=16
[DEBUG][create_monthly_payment] total_expected computado=1520.50
2025-10-02 21:44:21,705 INFO sqlalchemy.engine.Engine INSERT INTO monthly_periods (id, month, year, name, is_active, total_expected, total_received, players_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
INFO:sqlalchemy.engine.Engine:INSERT INTO monthly_periods (id, month, year, name, is_active, total_expected, total_received, players_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
2025-10-02 21:44:21,706 INFO sqlalchemy.engine.Engine [cached since 648.8s ago] ('b2ce8ee9-7713-4867-8022-bccd438bb9c6', 10, 2025, '10/2025', 1, 1520.5, 0.0, 16, '2025-10-03 00:44:21.705772', '2025-10-03 00:44:21.705775')
INFO:sqlalchemy.engine.Engine:[cached since 648.8s ago] ('b2ce8ee9-7713-4867-8022-bccd438bb9c6', 10, 2025, '10/2025', 1, 1520.5, 0.0, 16, '2025-10-03 00:44:21.705772', '2025-10-03 00:44:21.705775')
[DEBUG][create_monthly_payment] período criado id=b2ce8ee9-7713-4867-8022-bccd438bb9c6
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=59158183-cdd7-4251-ab13-e23cd5dfa18c fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=db7d7a7f-1b00-405c-a539-14bd16127910 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=acc4ea78-e7a9-408d-8a26-1b5c154c9931 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=95158497-b3d0-4265-9873-d7d0267f7282 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=cf621742-9532-4a9c-ae63-02740ed0ac79 fee=50.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=dfc8f191-6b3d-458f-b114-d39d134bba0c fee=50.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=7f9e938e-8baa-4f56-89f0-0d6e3df84b18 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=7edf5796-48b6-436c-a7f7-dcf86dcb0f59 fee=120.50
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=46f5e358-5519-467a-959f-3fae8303f68a fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=ff16cc91-a120-489d-b479-02484fd5ecbc fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=569eea4b-0652-44b5-b899-e94ec7372fa4 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=3ff4f33a-c38b-47bb-8b8a-5a4d84fc3d70 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=b3644b7e-864c-4ec4-9b33-e0c4cf4b2cf9 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=586d84d1-b726-46cf-a129-774ceeee526a fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=4c05d042-c291-4e98-a820-9850b05ba9db fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=6adc87c2-c71f-40b4-8517-18f7e35ee9eb fee=100.00
2025-10-02 21:44:21,714 INFO sqlalchemy.engine.Engine INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
INFO:sqlalchemy.engine.Engine:INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
2025-10-02 21:44:21,714 INFO sqlalchemy.engine.Engine [cached since 648.8s ago] [('e80570ae-de85-4f48-8142-36a36aafcf02', '59158183-cdd7-4251-ab13-e23cd5dfa18c', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714237', '2025-10-03 00:44:21.714242'), ('fe5c0558-ec50-41d8-b60b-c2a3d139b52c', 'db7d7a7f-1b00-405c-a539-14bd16127910', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714244', '2025-10-03 00:44:21.714245'), ('32821222-cf0e-4cd3-a5a8-622095860d56', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714247', '2025-10-03 00:44:21.714249'), ('c4575192-47f3-4e81-b50e-57261bf9c559', '95158497-b3d0-4265-9873-d7d0267f7282', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714251', '2025-10-03 00:44:21.714252'), ('ac22265a-03a0-4a03-8fbf-045903521b9a', 'cf621742-9532-4a9c-ae63-02740ed0ac79', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714254', '2025-10-03 00:44:21.714256'), ('396f1940-40a7-4b9b-9d19-042928b85185', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714258', '2025-10-03 00:44:21.714260'), ('134d7ba1-fc72-4196-b05a-45944b386c17', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:21.714261', '2025-10-03 00:44:21.714263'), ('1073e1ef-bd91-41bc-9cd4-e90140a5aaca', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:21.714265', '2025-10-03 00:44:21.714266')  ... displaying 10 of 16 total bound parameter sets ...  ('21ae270a-3ac4-4155-8ce6-d8bf9446294f', '4c05d042-c291-4e98-a820-9850b05ba9db', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:21.714288', '2025-10-03 00:44:21.714290'), ('93cb8d2a-7ad4-4ff6-b323-d663f8135af3', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:21.714291', '2025-10-03 00:44:21.714293')]   
INFO:sqlalchemy.engine.Engine:[cached since 648.8s ago] [('e80570ae-de85-4f48-8142-36a36aafcf02', '59158183-cdd7-4251-ab13-e23cd5dfa18c', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714237', '2025-10-03 00:44:21.714242'), ('fe5c0558-ec50-41d8-b60b-c2a3d139b52c', 'db7d7a7f-1b00-405c-a539-14bd16127910', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714244', '2025-10-03 00:44:21.714245'), ('32821222-cf0e-4cd3-a5a8-622095860d56', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714247', '2025-10-03 00:44:21.714249'), ('c4575192-47f3-4e81-b50e-57261bf9c559', '95158497-b3d0-4265-9873-d7d0267f7282', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714251', '2025-10-03 00:44:21.714252'), ('ac22265a-03a0-4a03-8fbf-045903521b9a', 'cf621742-9532-4a9c-ae63-02740ed0ac79', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714254', '2025-10-03 00:44:21.714256'), ('396f1940-40a7-4b9b-9d19-042928b85185', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714258', '2025-10-03 00:44:21.714260'), ('134d7ba1-fc72-4196-b05a-45944b386c17', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:21.714261', '2025-10-03 00:44:21.714263'), ('1073e1ef-bd91-41bc-9cd4-e90140a5aaca', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:21.714265', '2025-10-03 00:44:21.714266')  ... displaying 10 of 16 total bound parameter sets ...  ('21ae270a-3ac4-4155-8ce6-d8bf9446294f', '4c05d042-c291-4e98-a820-9850b05ba9db', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:21.714288', '2025-10-03 00:44:21.714290'), ('93cb8d2a-7ad4-4ff6-b323-d663f8135af3', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:21.714291', '2025-10-03 00:44:21.714293')]
2025-10-02 21:44:21,715 INFO sqlalchemy.engine.Engine ROLLBACK
INFO:sqlalchemy.engine.Engine:ROLLBACK
ERROR:root:Erro não tratado ao criar período mensal: (sqlite3.OperationalError) table monthly_players has no column named custom_monthly_fee
[SQL: INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)]
[parameters: [('e80570ae-de85-4f48-8142-36a36aafcf02', '59158183-cdd7-4251-ab13-e23cd5dfa18c', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714237', '2025-10-03 00:44:21.714242'), ('fe5c0558-ec50-41d8-b60b-c2a3d139b52c', 'db7d7a7f-1b00-405c-a539-14bd16127910', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714244', '2025-10-03 00:44:21.714245'), ('32821222-cf0e-4cd3-a5a8-622095860d56', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714247', '2025-10-03 00:44:21.714249'), ('c4575192-47f3-4e81-b50e-57261bf9c559', '95158497-b3d0-4265-9873-d7d0267f7282', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714251', '2025-10-03 00:44:21.714252'), ('ac22265a-03a0-4a03-8fbf-045903521b9a', 'cf621742-9532-4a9c-ae63-02740ed0ac79', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714254', '2025-10-03 00:44:21.714256'), ('396f1940-40a7-4b9b-9d19-042928b85185', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714258', '2025-10-03 00:44:21.714260'), ('134d7ba1-fc72-4196-b05a-45944b386c17', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:21.714261', '2025-10-03 00:44:21.714263'), ('1073e1ef-bd91-41bc-9cd4-e90140a5aaca', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:21.714265', '2025-10-03 00:44:21.714266')  ... displaying 10 of 16 total bound parameter sets ...  ('21ae270a-3ac4-4155-8ce6-d8bf9446294f', '4c05d042-c291-4e98-a820-9850b05ba9db', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:21.714288', '2025-10-03 00:44:21.714290'), ('93cb8d2a-7ad4-4ff6-b323-d663f8135af3', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:21.714291', '2025-10-03 00:44:21.714293')]]
(Background on this error at: https://sqlalche.me/e/20/e3q8)
Traceback (most recent call last):
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1936, in _exec_single_context
    self.dialect.do_executemany(
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        cursor,
        ^^^^^^^
    ...<2 lines>...
        context,
        ^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\default.py", line 938, in do_executemany
    cursor.executemany(statement, parameters)
    ~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^
sqlite3.OperationalError: table monthly_players has no column named custom_monthly_fee

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "C:\Users\ANDREE\Desktop\sistema_futebol\backend\blueprints\api\controllers.py", line 569, in create_monthly_payment
    db.session.commit()
    ~~~~~~~~~~~~~~~~~^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\scoping.py", line 597, in commit
    return self._proxied.commit()
           ~~~~~~~~~~~~~~~~~~~~^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\session.py", line 2028, in commit
    trans.commit(_to_root=True)
    ~~~~~~~~~~~~^^^^^^^^^^^^^^^
  File "<string>", line 2, in commit
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\state_changes.py", line 139, in _go
    ret_value = fn(self, *arg, **kw)
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\session.py", line 1313, in commit
    self._prepare_impl()
    ~~~~~~~~~~~~~~~~~~^^
  File "<string>", line 2, in _prepare_impl
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\state_changes.py", line 139, in _go
    ret_value = fn(self, *arg, **kw)
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\session.py", line 1288, in _prepare_impl
    self.session.flush()
    ~~~~~~~~~~~~~~~~~~^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\session.py", line 4352, in flush
    self._flush(objects)
    ~~~~~~~~~~~^^^^^^^^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\session.py", line 4487, in _flush
    with util.safe_reraise():
         ~~~~~~~~~~~~~~~~~^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\util\langhelpers.py", line 146, in __exit__
    raise exc_value.with_traceback(exc_tb)
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\session.py", line 4448, in _flush
    flush_context.execute()
    ~~~~~~~~~~~~~~~~~~~~~^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\unitofwork.py", line 466, in execute
    rec.execute(self)
    ~~~~~~~~~~~^^^^^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\unitofwork.py", line 642, in execute
    util.preloaded.orm_persistence.save_obj(
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        self.mapper,
        ^^^^^^^^^^^^
        uow.states_for_mapper_hierarchy(self.mapper, False, False),
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        uow,
        ^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\persistence.py", line 93, in save_obj
    _emit_insert_statements(
    ~~~~~~~~~~~~~~~~~~~~~~~^
        base_mapper,
        ^^^^^^^^^^^^
    ...<3 lines>...
        insert,
        ^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\persistence.py", line 1048, in _emit_insert_statements
    result = connection.execute(
        statement, multiparams, execution_options=execution_options
    )
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1418, in execute
    return meth(
        self,
        distilled_parameters,
        execution_options or NO_OPTIONS,
    )
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\sql\elements.py", line 515, in _execute_on_connection
    return connection._execute_clauseelement(
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        self, distilled_params, execution_options
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1640, in _execute_clauseelement
    ret = self._execute_context(
        dialect,
    ...<8 lines>...
        cache_hit=cache_hit,
    )
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1846, in _execute_context
    return self._exec_single_context(
           ~~~~~~~~~~~~~~~~~~~~~~~~~^
        dialect, context, statement, parameters
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1986, in _exec_single_context
    self._handle_dbapi_exception(
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        e, str_statement, effective_parameters, cursor, context
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 2355, in _handle_dbapi_exception
    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1936, in _exec_single_context
    self.dialect.do_executemany(
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        cursor,
        ^^^^^^^
    ...<2 lines>...
        context,
        ^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\default.py", line 938, in do_executemany
    cursor.executemany(statement, parameters)
    ~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^
sqlalchemy.exc.OperationalError: (sqlite3.OperationalError) table monthly_players has no column named custom_monthly_fee
[SQL: INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)]
[parameters: [('e80570ae-de85-4f48-8142-36a36aafcf02', '59158183-cdd7-4251-ab13-e23cd5dfa18c', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714237', '2025-10-03 00:44:21.714242'), ('fe5c0558-ec50-41d8-b60b-c2a3d139b52c', 'db7d7a7f-1b00-405c-a539-14bd16127910', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714244', '2025-10-03 00:44:21.714245'), ('32821222-cf0e-4cd3-a5a8-622095860d56', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714247', '2025-10-03 00:44:21.714249'), ('c4575192-47f3-4e81-b50e-57261bf9c559', '95158497-b3d0-4265-9873-d7d0267f7282', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714251', '2025-10-03 00:44:21.714252'), ('ac22265a-03a0-4a03-8fbf-045903521b9a', 'cf621742-9532-4a9c-ae63-02740ed0ac79', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714254', '2025-10-03 00:44:21.714256'), ('396f1940-40a7-4b9b-9d19-042928b85185', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714258', '2025-10-03 00:44:21.714260'), ('134d7ba1-fc72-4196-b05a-45944b386c17', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:21.714261', '2025-10-03 00:44:21.714263'), ('1073e1ef-bd91-41bc-9cd4-e90140a5aaca', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:21.714265', '2025-10-03 00:44:21.714266')  ... displaying 10 of 16 total bound parameter sets ...  ('21ae270a-3ac4-4155-8ce6-d8bf9446294f', '4c05d042-c291-4e98-a820-9850b05ba9db', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:21.714288', '2025-10-03 00:44:21.714290'), ('93cb8d2a-7ad4-4ff6-b323-d663f8135af3', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:21.714291', '2025-10-03 00:44:21.714293')]]
(Background on this error at: https://sqlalche.me/e/20/e3q8)
[DEBUG][create_monthly_payment] Exception não tratada: (sqlite3.OperationalError) table monthly_players has no column named custom_monthly_fee
[SQL: INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)]
[parameters: [('e80570ae-de85-4f48-8142-36a36aafcf02', '59158183-cdd7-4251-ab13-e23cd5dfa18c', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714237', '2025-10-03 00:44:21.714242'), ('fe5c0558-ec50-41d8-b60b-c2a3d139b52c', 'db7d7a7f-1b00-405c-a539-14bd16127910', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714244', '2025-10-03 00:44:21.714245'), ('32821222-cf0e-4cd3-a5a8-622095860d56', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714247', '2025-10-03 00:44:21.714249'), ('c4575192-47f3-4e81-b50e-57261bf9c559', '95158497-b3d0-4265-9873-d7d0267f7282', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714251', '2025-10-03 00:44:21.714252'), ('ac22265a-03a0-4a03-8fbf-045903521b9a', 'cf621742-9532-4a9c-ae63-02740ed0ac79', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714254', '2025-10-03 00:44:21.714256'), ('396f1940-40a7-4b9b-9d19-042928b85185', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:21.714258', '2025-10-03 00:44:21.714260'), ('134d7ba1-fc72-4196-b05a-45944b386c17', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:21.714261', '2025-10-03 00:44:21.714263'), ('1073e1ef-bd91-41bc-9cd4-e90140a5aaca', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:21.714265', '2025-10-03 00:44:21.714266')  ... displaying 10 of 16 total bound parameter sets ...  ('21ae270a-3ac4-4155-8ce6-d8bf9446294f', '4c05d042-c291-4e98-a820-9850b05ba9db', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:21.714288', '2025-10-03 00:44:21.714290'), ('93cb8d2a-7ad4-4ff6-b323-d663f8135af3', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', 'b2ce8ee9-7713-4867-8022-bccd438bb9c6', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:21.714291', '2025-10-03 00:44:21.714293')]]
(Background on this error at: https://sqlalche.me/e/20/e3q8)
127.0.0.1 - - [02/Oct/2025 21:44:21] "POST /api/monthly-payments HTTP/1.1" 500 -
INFO:werkzeug:127.0.0.1 - - [02/Oct/2025 21:44:21] "POST /api/monthly-payments HTTP/1.1" 500 -
127.0.0.1 - - [02/Oct/2025 21:44:26] "OPTIONS /api/monthly-payments HTTP/1.1" 200 -
INFO:werkzeug:127.0.0.1 - - [02/Oct/2025 21:44:26] "OPTIONS /api/monthly-payments HTTP/1.1" 200 -
[DEBUG][create_monthly_payment] request.json bruto={'year': 2025, 'month': 10}
[DEBUG][create_monthly_payment] dados validados pelo schema={'year': 2025, 'month': 10}
[DEBUG][create_monthly_payment] verificando período existente para 10/2025
2025-10-02 21:44:26,767 INFO sqlalchemy.engine.Engine BEGIN (implicit)
INFO:sqlalchemy.engine.Engine:BEGIN (implicit)
2025-10-02 21:44:26,767 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.year = ? AND monthly_periods.month = ?
 LIMIT ? OFFSET ?
INFO:sqlalchemy.engine.Engine:SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.year = ? AND monthly_periods.month = ?
 LIMIT ? OFFSET ?
2025-10-02 21:44:26,768 INFO sqlalchemy.engine.Engine [cached since 653.8s ago] (2025, 10, 1, 0)
INFO:sqlalchemy.engine.Engine:[cached since 653.8s ago] (2025, 10, 1, 0)
[DEBUG][create_monthly_payment] consultando jogadores ativos
2025-10-02 21:44:26,768 INFO sqlalchemy.engine.Engine SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.is_active = 1
INFO:sqlalchemy.engine.Engine:SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.is_active = 1
2025-10-02 21:44:26,769 INFO sqlalchemy.engine.Engine [cached since 653.8s ago] ()
INFO:sqlalchemy.engine.Engine:[cached since 653.8s ago] ()
[DEBUG][create_monthly_payment] jogadores ativos encontrados=16
[DEBUG][create_monthly_payment] total_expected computado=1520.50
2025-10-02 21:44:26,770 INFO sqlalchemy.engine.Engine INSERT INTO monthly_periods (id, month, year, name, is_active, total_expected, total_received, players_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
INFO:sqlalchemy.engine.Engine:INSERT INTO monthly_periods (id, month, year, name, is_active, total_expected, total_received, players_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
2025-10-02 21:44:26,770 INFO sqlalchemy.engine.Engine [cached since 653.8s ago] ('c8910258-0777-4be4-a2ce-f786675a540d', 10, 2025, '10/2025', 1, 1520.5, 0.0, 16, '2025-10-03 00:44:26.770017', '2025-10-03 00:44:26.770019')
INFO:sqlalchemy.engine.Engine:[cached since 653.8s ago] ('c8910258-0777-4be4-a2ce-f786675a540d', 10, 2025, '10/2025', 1, 1520.5, 0.0, 16, '2025-10-03 00:44:26.770017', '2025-10-03 00:44:26.770019')
[DEBUG][create_monthly_payment] período criado id=c8910258-0777-4be4-a2ce-f786675a540d
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=59158183-cdd7-4251-ab13-e23cd5dfa18c fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=db7d7a7f-1b00-405c-a539-14bd16127910 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=acc4ea78-e7a9-408d-8a26-1b5c154c9931 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=95158497-b3d0-4265-9873-d7d0267f7282 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=cf621742-9532-4a9c-ae63-02740ed0ac79 fee=50.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=dfc8f191-6b3d-458f-b114-d39d134bba0c fee=50.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=7f9e938e-8baa-4f56-89f0-0d6e3df84b18 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=7edf5796-48b6-436c-a7f7-dcf86dcb0f59 fee=120.50
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=46f5e358-5519-467a-959f-3fae8303f68a fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=ff16cc91-a120-489d-b479-02484fd5ecbc fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=569eea4b-0652-44b5-b899-e94ec7372fa4 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=3ff4f33a-c38b-47bb-8b8a-5a4d84fc3d70 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=b3644b7e-864c-4ec4-9b33-e0c4cf4b2cf9 fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=586d84d1-b726-46cf-a129-774ceeee526a fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=4c05d042-c291-4e98-a820-9850b05ba9db fee=100.00
[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id=6adc87c2-c71f-40b4-8517-18f7e35ee9eb fee=100.00
2025-10-02 21:44:26,776 INFO sqlalchemy.engine.Engine INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
INFO:sqlalchemy.engine.Engine:INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
2025-10-02 21:44:26,777 INFO sqlalchemy.engine.Engine [cached since 653.8s ago] [('1b3a7a07-5bf3-4437-86a7-2eb5ab72a927', '59158183-cdd7-4251-ab13-e23cd5dfa18c', 'c8910258-0777-4be4-a2ce-f786675a540d', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776471', '2025-10-03 00:44:26.776475'), ('fa4915c3-a4d2-466a-9419-1d086c35d557', 'db7d7a7f-1b00-405c-a539-14bd16127910', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776476', '2025-10-03 00:44:26.776477'), ('dbff4caa-af1d-4aff-9650-f1fd8dc82500', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776478', '2025-10-03 00:44:26.776479'), ('75591a5c-0f7c-4db7-bf06-d2890722ac5b', '95158497-b3d0-4265-9873-d7d0267f7282', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776481', '2025-10-03 00:44:26.776482'), ('2499467d-5202-43f5-89d8-d6c35b682de8', 'cf621742-9532-4a9c-ae63-02740ed0ac79', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776483', '2025-10-03 00:44:26.776483'), ('7c79a6ba-9ec8-4985-8f99-955bc4c4469a', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776485', '2025-10-03 00:44:26.776485'), ('974b56ee-fee9-438c-8946-a304dee50597', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', 'c8910258-0777-4be4-a2ce-f786675a540d', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:26.776486', '2025-10-03 00:44:26.776487'), ('72de980a-fd03-4638-af5a-78ac14284d7c', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:26.776488', '2025-10-03 00:44:26.776489')  ... displaying 10 of 16 total bound parameter sets ...  ('6f298b69-72bc-4bbe-97e8-d0ab4c75dc52', '4c05d042-c291-4e98-a820-9850b05ba9db', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:26.776501', '2025-10-03 00:44:26.776502'), ('1de84b5b-d593-4e85-8e75-d4bdfa70bebb', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:26.776503', '2025-10-03 00:44:26.776504')]   
INFO:sqlalchemy.engine.Engine:[cached since 653.8s ago] [('1b3a7a07-5bf3-4437-86a7-2eb5ab72a927', '59158183-cdd7-4251-ab13-e23cd5dfa18c', 'c8910258-0777-4be4-a2ce-f786675a540d', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776471', '2025-10-03 00:44:26.776475'), ('fa4915c3-a4d2-466a-9419-1d086c35d557', 'db7d7a7f-1b00-405c-a539-14bd16127910', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776476', '2025-10-03 00:44:26.776477'), ('dbff4caa-af1d-4aff-9650-f1fd8dc82500', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776478', '2025-10-03 00:44:26.776479'), ('75591a5c-0f7c-4db7-bf06-d2890722ac5b', '95158497-b3d0-4265-9873-d7d0267f7282', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776481', '2025-10-03 00:44:26.776482'), ('2499467d-5202-43f5-89d8-d6c35b682de8', 'cf621742-9532-4a9c-ae63-02740ed0ac79', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776483', '2025-10-03 00:44:26.776483'), ('7c79a6ba-9ec8-4985-8f99-955bc4c4469a', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776485', '2025-10-03 00:44:26.776485'), ('974b56ee-fee9-438c-8946-a304dee50597', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', 'c8910258-0777-4be4-a2ce-f786675a540d', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:26.776486', '2025-10-03 00:44:26.776487'), ('72de980a-fd03-4638-af5a-78ac14284d7c', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:26.776488', '2025-10-03 00:44:26.776489')  ... displaying 10 of 16 total bound parameter sets ...  ('6f298b69-72bc-4bbe-97e8-d0ab4c75dc52', '4c05d042-c291-4e98-a820-9850b05ba9db', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:26.776501', '2025-10-03 00:44:26.776502'), ('1de84b5b-d593-4e85-8e75-d4bdfa70bebb', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:26.776503', '2025-10-03 00:44:26.776504')]
2025-10-02 21:44:26,777 INFO sqlalchemy.engine.Engine ROLLBACK
INFO:sqlalchemy.engine.Engine:ROLLBACK
ERROR:root:Erro não tratado ao criar período mensal: (sqlite3.OperationalError) table monthly_players has no column named custom_monthly_fee
[SQL: INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)]
[parameters: [('1b3a7a07-5bf3-4437-86a7-2eb5ab72a927', '59158183-cdd7-4251-ab13-e23cd5dfa18c', 'c8910258-0777-4be4-a2ce-f786675a540d', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776471', '2025-10-03 00:44:26.776475'), ('fa4915c3-a4d2-466a-9419-1d086c35d557', 'db7d7a7f-1b00-405c-a539-14bd16127910', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776476', '2025-10-03 00:44:26.776477'), ('dbff4caa-af1d-4aff-9650-f1fd8dc82500', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776478', '2025-10-03 00:44:26.776479'), ('75591a5c-0f7c-4db7-bf06-d2890722ac5b', '95158497-b3d0-4265-9873-d7d0267f7282', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776481', '2025-10-03 00:44:26.776482'), ('2499467d-5202-43f5-89d8-d6c35b682de8', 'cf621742-9532-4a9c-ae63-02740ed0ac79', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776483', '2025-10-03 00:44:26.776483'), ('7c79a6ba-9ec8-4985-8f99-955bc4c4469a', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776485', '2025-10-03 00:44:26.776485'), ('974b56ee-fee9-438c-8946-a304dee50597', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', 'c8910258-0777-4be4-a2ce-f786675a540d', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:26.776486', '2025-10-03 00:44:26.776487'), ('72de980a-fd03-4638-af5a-78ac14284d7c', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:26.776488', '2025-10-03 00:44:26.776489')  ... displaying 10 of 16 total bound parameter sets ...  ('6f298b69-72bc-4bbe-97e8-d0ab4c75dc52', '4c05d042-c291-4e98-a820-9850b05ba9db', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:26.776501', '2025-10-03 00:44:26.776502'), ('1de84b5b-d593-4e85-8e75-d4bdfa70bebb', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:26.776503', '2025-10-03 00:44:26.776504')]]
(Background on this error at: https://sqlalche.me/e/20/e3q8)
Traceback (most recent call last):
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1936, in _exec_single_context
    self.dialect.do_executemany(
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        cursor,
        ^^^^^^^
    ...<2 lines>...
        context,
        ^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\default.py", line 938, in do_executemany
    cursor.executemany(statement, parameters)
    ~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^
sqlite3.OperationalError: table monthly_players has no column named custom_monthly_fee

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "C:\Users\ANDREE\Desktop\sistema_futebol\backend\blueprints\api\controllers.py", line 569, in create_monthly_payment
    db.session.commit()
    ~~~~~~~~~~~~~~~~~^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\scoping.py", line 597, in commit
    return self._proxied.commit()
           ~~~~~~~~~~~~~~~~~~~~^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\session.py", line 2028, in commit
    trans.commit(_to_root=True)
    ~~~~~~~~~~~~^^^^^^^^^^^^^^^
  File "<string>", line 2, in commit
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\state_changes.py", line 139, in _go
    ret_value = fn(self, *arg, **kw)
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\session.py", line 1313, in commit
    self._prepare_impl()
    ~~~~~~~~~~~~~~~~~~^^
  File "<string>", line 2, in _prepare_impl
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\state_changes.py", line 139, in _go
    ret_value = fn(self, *arg, **kw)
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\session.py", line 1288, in _prepare_impl
    self.session.flush()
    ~~~~~~~~~~~~~~~~~~^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\session.py", line 4352, in flush
    self._flush(objects)
    ~~~~~~~~~~~^^^^^^^^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\session.py", line 4487, in _flush
    with util.safe_reraise():
         ~~~~~~~~~~~~~~~~~^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\util\langhelpers.py", line 146, in __exit__
    raise exc_value.with_traceback(exc_tb)
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\session.py", line 4448, in _flush
    flush_context.execute()
    ~~~~~~~~~~~~~~~~~~~~~^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\unitofwork.py", line 466, in execute
    rec.execute(self)
    ~~~~~~~~~~~^^^^^^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\unitofwork.py", line 642, in execute
    util.preloaded.orm_persistence.save_obj(
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        self.mapper,
        ^^^^^^^^^^^^
        uow.states_for_mapper_hierarchy(self.mapper, False, False),
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        uow,
        ^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\persistence.py", line 93, in save_obj
    _emit_insert_statements(
    ~~~~~~~~~~~~~~~~~~~~~~~^
        base_mapper,
        ^^^^^^^^^^^^
    ...<3 lines>...
        insert,
        ^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\orm\persistence.py", line 1048, in _emit_insert_statements
    result = connection.execute(
        statement, multiparams, execution_options=execution_options
    )
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1418, in execute
    return meth(
        self,
        distilled_parameters,
        execution_options or NO_OPTIONS,
    )
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\sql\elements.py", line 515, in _execute_on_connection
    return connection._execute_clauseelement(
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        self, distilled_params, execution_options
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1640, in _execute_clauseelement
    ret = self._execute_context(
        dialect,
    ...<8 lines>...
        cache_hit=cache_hit,
    )
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1846, in _execute_context
    return self._exec_single_context(
           ~~~~~~~~~~~~~~~~~~~~~~~~~^
        dialect, context, statement, parameters
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1986, in _exec_single_context
    self._handle_dbapi_exception(
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        e, str_statement, effective_parameters, cursor, context
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 2355, in _handle_dbapi_exception
    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\base.py", line 1936, in _exec_single_context
    self.dialect.do_executemany(
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        cursor,
        ^^^^^^^
    ...<2 lines>...
        context,
        ^^^^^^^^
    )
    ^
  File "C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\sqlalchemy\engine\default.py", line 938, in do_executemany
    cursor.executemany(statement, parameters)
    ~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^
sqlalchemy.exc.OperationalError: (sqlite3.OperationalError) table monthly_players has no column named custom_monthly_fee
[SQL: INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)]
[parameters: [('1b3a7a07-5bf3-4437-86a7-2eb5ab72a927', '59158183-cdd7-4251-ab13-e23cd5dfa18c', 'c8910258-0777-4be4-a2ce-f786675a540d', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776471', '2025-10-03 00:44:26.776475'), ('fa4915c3-a4d2-466a-9419-1d086c35d557', 'db7d7a7f-1b00-405c-a539-14bd16127910', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776476', '2025-10-03 00:44:26.776477'), ('dbff4caa-af1d-4aff-9650-f1fd8dc82500', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776478', '2025-10-03 00:44:26.776479'), ('75591a5c-0f7c-4db7-bf06-d2890722ac5b', '95158497-b3d0-4265-9873-d7d0267f7282', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776481', '2025-10-03 00:44:26.776482'), ('2499467d-5202-43f5-89d8-d6c35b682de8', 'cf621742-9532-4a9c-ae63-02740ed0ac79', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776483', '2025-10-03 00:44:26.776483'), ('7c79a6ba-9ec8-4985-8f99-955bc4c4469a', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776485', '2025-10-03 00:44:26.776485'), ('974b56ee-fee9-438c-8946-a304dee50597', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', 'c8910258-0777-4be4-a2ce-f786675a540d', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:26.776486', '2025-10-03 00:44:26.776487'), ('72de980a-fd03-4638-af5a-78ac14284d7c', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:26.776488', '2025-10-03 00:44:26.776489')  ... displaying 10 of 16 total bound parameter sets ...  ('6f298b69-72bc-4bbe-97e8-d0ab4c75dc52', '4c05d042-c291-4e98-a820-9850b05ba9db', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:26.776501', '2025-10-03 00:44:26.776502'), ('1de84b5b-d593-4e85-8e75-d4bdfa70bebb', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:26.776503', '2025-10-03 00:44:26.776504')]]
(Background on this error at: https://sqlalche.me/e/20/e3q8)
[DEBUG][create_monthly_payment] Exception não tratada: (sqlite3.OperationalError) table monthly_players has no column named custom_monthly_fee
[SQL: INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)]
[parameters: [('1b3a7a07-5bf3-4437-86a7-2eb5ab72a927', '59158183-cdd7-4251-ab13-e23cd5dfa18c', 'c8910258-0777-4be4-a2ce-f786675a540d', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776471', '2025-10-03 00:44:26.776475'), ('fa4915c3-a4d2-466a-9419-1d086c35d557', 'db7d7a7f-1b00-405c-a539-14bd16127910', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776476', '2025-10-03 00:44:26.776477'), ('dbff4caa-af1d-4aff-9650-f1fd8dc82500', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776478', '2025-10-03 00:44:26.776479'), ('75591a5c-0f7c-4db7-bf06-d2890722ac5b', '95158497-b3d0-4265-9873-d7d0267f7282', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776481', '2025-10-03 00:44:26.776482'), ('2499467d-5202-43f5-89d8-d6c35b682de8', 'cf621742-9532-4a9c-ae63-02740ed0ac79', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776483', '2025-10-03 00:44:26.776483'), ('7c79a6ba-9ec8-4985-8f99-955bc4c4469a', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776485', '2025-10-03 00:44:26.776485'), ('974b56ee-fee9-438c-8946-a304dee50597', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', 'c8910258-0777-4be4-a2ce-f786675a540d', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:26.776486', '2025-10-03 00:44:26.776487'), ('72de980a-fd03-4638-af5a-78ac14284d7c', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:26.776488', '2025-10-03 00:44:26.776489')  ... displaying 10 of 16 total bound parameter sets ...  ('6f298b69-72bc-4bbe-97e8-d0ab4c75dc52', '4c05d042-c291-4e98-a820-9850b05ba9db', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:26.776501', '2025-10-03 00:44:26.776502'), ('1de84b5b-d593-4e85-8e75-d4bdfa70bebb', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:26.776503', '2025-10-03 00:44:26.776504')]]
(Background on this error at: https://sqlalche.me/e/20/e3q8)
127.0.0.1 - - [02/Oct/2025 21:44:26] "POST /api/monthly-payments HTTP/1.1" 500 -
INFO:werkzeug:127.0.0.1 - - [02/Oct/2025 21:44:26] "POST /api/monthly-payments HTTP/1.1" 500 -



C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:168  POST http://localhost:5000/api/monthly-payments 500 (INTERNAL SERVER ERROR)
post @ C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:168
post @ C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:268
createMonthlyPeriod @ C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:76
handleCreateMonth @ C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:148
executeDispatch @ react-dom-client.development.js:16971
runWithFiberInDEV @ react-dom-client.development.js:872
processDispatchQueue @ react-dom-client.development.js:17021
eval @ react-dom-client.development.js:17622
batchedUpdates$1 @ react-dom-client.development.js:3312
dispatchEventForPluginEventSystem @ react-dom-client.development.js:17175
dispatchEvent @ react-dom-client.development.js:21358
dispatchDiscreteEvent @ react-dom-client.development.js:21326
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:164 Erro ao criar período mensal: ApiException: Erro interno do servidor: (sqlite3.OperationalError) table monthly_players has no column named custom_monthly_fee
[SQL: INSERT INTO monthly_players (id, player_id, monthly_period_id, player_name, position, phone, email, monthly_fee, custom_monthly_fee, join_date, status, payment_date, pending_months_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)]
[parameters: [('1b3a7a07-5bf3-4437-86a7-2eb5ab72a927', '59158183-cdd7-4251-ab13-e23cd5dfa18c', 'c8910258-0777-4be4-a2ce-f786675a540d', 'João Silva', 'Atacante', '(11) 99999-1111', 'joao@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776471', '2025-10-03 00:44:26.776475'), ('fa4915c3-a4d2-466a-9419-1d086c35d557', 'db7d7a7f-1b00-405c-a539-14bd16127910', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Pedro Santos', 'Meio-campo', '(11) 99999-2222', 'pedro@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776476', '2025-10-03 00:44:26.776477'), ('dbff4caa-af1d-4aff-9650-f1fd8dc82500', 'acc4ea78-e7a9-408d-8a26-1b5c154c9931', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Carlos Oliveira', 'Defensor', '(11) 99999-3333', 'carlos@email.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776478', '2025-10-03 00:44:26.776479'), ('75591a5c-0f7c-4db7-bf06-d2890722ac5b', '95158497-b3d0-4265-9873-d7d0267f7282', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Test Player 100', 'forward', '11999999999', 'test2@test.com', 100.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776481', '2025-10-03 00:44:26.776482'), ('2499467d-5202-43f5-89d8-d6c35b682de8', 'cf621742-9532-4a9c-ae63-02740ed0ac79', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Lucas Moura', 'forward', '12999999999', 'lucas@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776483', '2025-10-03 00:44:26.776483'), ('7c79a6ba-9ec8-4985-8f99-955bc4c4469a', 'dfc8f191-6b3d-458f-b114-d39d134bba0c', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Oliveira Miguel Test Update', 'defender', '12999999911', 'oliveira@gmail.com', 50.0, None, '2025-10-01', 'pending', None, 0, '2025-10-03 00:44:26.776485', '2025-10-03 00:44:26.776485'), ('974b56ee-fee9-438c-8946-a304dee50597', '7f9e938e-8baa-4f56-89f0-0d6e3df84b18', 'c8910258-0777-4be4-a2ce-f786675a540d', 'John Doe', 'forward', '+5511999999999', 'john.doe@example.com', 100.0, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:26.776486', '2025-10-03 00:44:26.776487'), ('72de980a-fd03-4638-af5a-78ac14284d7c', '7edf5796-48b6-436c-a7f7-dcf86dcb0f59', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Jane Smith', 'midfielder', '+5511988888888', 'jane.smith@example.com', 120.5, None, '2025-10-02', 'pending', None, 0, '2025-10-03 00:44:26.776488', '2025-10-03 00:44:26.776489')  ... displaying 10 of 16 total bound parameter sets ...  ('6f298b69-72bc-4bbe-97e8-d0ab4c75dc52', '4c05d042-c291-4e98-a820-9850b05ba9db', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Teste Jogador API 7da44a33', 'forward', '117da44a3399', 'teste_api_7da44a33@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:26.776501', '2025-10-03 00:44:26.776502'), ('1de84b5b-d593-4e85-8e75-d4bdfa70bebb', '6adc87c2-c71f-40b4-8517-18f7e35ee9eb', 'c8910258-0777-4be4-a2ce-f786675a540d', 'Teste Jogador API f0256ce9', 'forward', '11f0256ce999', 'teste_api_f0256ce9@example.com', 100.0, None, '2025-10-03', 'pending', None, 0, '2025-10-03 00:44:26.776503', '2025-10-03 00:44:26.776504')]]
(Background on this error at: https://sqlalche.me/e/20/e3q8)
    at ApiClient.handleResponse (C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:104:13)
    at async PaymentsService.createMonthlyPeriod (C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:76:24)
    at async handleCreateMonth (C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:148:24)
error @ intercept-console-error.js:57
handleCreateMonth @ C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:164
await in handleCreateMonth
executeDispatch @ react-dom-client.development.js:16971
runWithFiberInDEV @ react-dom-client.development.js:872
processDispatchQueue @ react-dom-client.development.js:17021
eval @ react-dom-client.development.js:17622
batchedUpdates$1 @ react-dom-client.development.js:3312
dispatchEventForPluginEventSystem @ react-dom-client.development.js:17175
dispatchEvent @ react-dom-client.development.js:21358
dispatchDiscreteEvent @ react-dom-client.development.js:21326

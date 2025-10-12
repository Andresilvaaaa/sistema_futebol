# 🔥 PLANO DE EXECUÇÃO IMEDIATA - FASE 1 (BLOQUEADORES CRÍTICOS)

Baseado na auditoria técnica completa, vou fornecer **todos os arquivos prontos para copiar e colar** para resolver os bloqueadores críticos nas próximas 4 horas.

---

## 📋 CHECKLIST DE EXECUÇÃO

```bash
✅ 1. Habilitar PRAGMA foreign_keys (15min)
✅ 2. Criar script de limpeza Alembic (10min)
✅ 3. Aplicar migrations pendentes (30min)
✅ 4. Criar script de validação completo (20min)
✅ 5. Remover pasta migrations legada (5min)
✅ 6. Validar funcionamento end-to-end (30min)
```

---

## 🔧 ARQUIVO 1: Habilitar Foreign Keys

**Caminho:** `backend/services/db/connection.py`

```python
# backend/services/db/connection.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event, create_engine
from sqlalchemy.pool import StaticPool
import os

db = SQLAlchemy()

def init_db(app):
    """Inicializa o banco de dados com configurações otimizadas"""
    
    # Configuração do engine
    if 'sqlite' in app.config['SQLALCHEMY_DATABASE_URI']:
        # SQLite específico - usar StaticPool para evitar problemas de concorrência
        app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
            'connect_args': {
                'check_same_thread': False,
            },
            'poolclass': StaticPool,
        }
    
    db.init_app(app)
    
    # ✅ CRÍTICO: Habilitar foreign keys no SQLite
    @event.listens_for(db.engine, "connect")
    def set_sqlite_pragma(dbapi_conn, connection_record):
        """
        Habilita foreign keys e otimizações para SQLite.
        DEVE ser executado em TODA conexão.
        """
        if 'sqlite' in str(db.engine.url):
            cursor = dbapi_conn.cursor()
            
            # Habilitar foreign keys (CRÍTICO para integridade)
            cursor.execute("PRAGMA foreign_keys=ON")
            
            # Otimizações de performance
            cursor.execute("PRAGMA journal_mode=WAL")  # Write-Ahead Logging
            cursor.execute("PRAGMA synchronous=NORMAL")  # Balance entre segurança e performance
            cursor.execute("PRAGMA cache_size=-64000")  # Cache de 64MB
            cursor.execute("PRAGMA temp_store=MEMORY")  # Temp em memória
            
            cursor.close()
            
            # Log para confirmar
            app.logger.info("✅ SQLite PRAGMA foreign_keys habilitado")
    
    return db


def get_db_session():
    """
    Context manager para operações de banco fora do request context.
    Uso: with get_db_session() as session: ...
    """
    return db.session
```

---

## 🧹 ARQUIVO 2: Script de Limpeza Alembic

**Caminho:** `scripts/cleanup_alembic_tmp.py`

```python
# scripts/cleanup_alembic_tmp.py
"""
Remove tabelas temporárias do Alembic que podem causar conflitos.
Executar ANTES de aplicar migrations.
"""
import sqlite3
import sys
from pathlib import Path

def cleanup_alembic_tmp():
    """Remove tabelas temporárias _alembic_tmp_*"""
    db_path = Path(__file__).parent.parent / 'instance' / 'futebol_dev.db'
    
    if not db_path.exists():
        print(f"❌ Banco não encontrado: {db_path}")
        sys.exit(1)
    
    print(f"🔍 Conectando ao banco: {db_path}")
    conn = sqlite3.connect(str(db_path))
    cursor = conn.cursor()
    
    # Buscar tabelas temporárias
    cursor.execute("""
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name LIKE '_alembic_tmp_%'
    """)
    tmp_tables = cursor.fetchall()
    
    if not tmp_tables:
        print("✅ Nenhuma tabela temporária encontrada")
        conn.close()
        return
    
    print(f"🧹 Encontradas {len(tmp_tables)} tabelas temporárias:")
    for table in tmp_tables:
        print(f"  - {table[0]}")
    
    # Remover tabelas temporárias
    for table in tmp_tables:
        table_name = table[0]
        try:
            cursor.execute(f"DROP TABLE IF EXISTS {table_name}")
            print(f"  ✅ Removida: {table_name}")
        except Exception as e:
            print(f"  ❌ Erro ao remover {table_name}: {e}")
    
    conn.commit()
    conn.close()
    print("\n🎉 Limpeza concluída!")

if __name__ == '__main__':
    cleanup_alembic_tmp()
```

---

## ✅ ARQUIVO 3: Script de Validação Completo

**Caminho:** `scripts/validate_production_readiness.py`

```python
# scripts/validate_production_readiness.py
"""
Valida se o banco de dados está pronto para produção.
Verifica: FKs, migrations, colunas, índices e constraints.
"""
import sys
from pathlib import Path

# Adicionar path do backend
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend import create_app
from backend.services.db.connection import db
from sqlalchemy import inspect, text


def validate_database():
    """Executa todas as validações necessárias"""
    print("=" * 70)
    print("🔍 VALIDAÇÃO DE BANCO DE DADOS PARA PRODUÇÃO")
    print("=" * 70)
    print()
    
    app = create_app('development')
    errors = []
    warnings = []
    success_checks = []
    
    with app.app_context():
        
        # ==================== CHECK 1: PRAGMA foreign_keys ====================
        print("📌 CHECK 1: PRAGMA foreign_keys")
        try:
            result = db.session.execute(text("PRAGMA foreign_keys")).fetchone()
            if result and result[0] == 1:
                print("   ✅ Foreign keys HABILITADAS")
                success_checks.append("Foreign keys habilitadas")
            else:
                error_msg = "❌ PRAGMA foreign_keys NÃO está habilitado!"
                print(f"   {error_msg}")
                errors.append(error_msg)
        except Exception as e:
            error_msg = f"❌ Erro ao verificar PRAGMA: {e}"
            print(f"   {error_msg}")
            errors.append(error_msg)
        print()
        
        # ==================== CHECK 2: Coluna custom_monthly_fee ====================
        print("📌 CHECK 2: Coluna custom_monthly_fee")
        try:
            cols_result = db.session.execute(
                text("PRAGMA table_info('monthly_players')")
            ).fetchall()
            cols = [row[1] for row in cols_result]
            
            if 'custom_monthly_fee' in cols:
                print("   ✅ Coluna custom_monthly_fee EXISTE")
                success_checks.append("Coluna custom_monthly_fee presente")
            else:
                error_msg = "❌ Coluna custom_monthly_fee AUSENTE em monthly_players"
                print(f"   {error_msg}")
                print(f"   📋 Colunas existentes: {', '.join(cols)}")
                errors.append(error_msg)
        except Exception as e:
            error_msg = f"❌ Erro ao verificar colunas: {e}"
            print(f"   {error_msg}")
            errors.append(error_msg)
        print()
        
        # ==================== CHECK 3: Foreign Keys ====================
        print("📌 CHECK 3: Foreign Keys em monthly_players")
        try:
            fks_result = db.session.execute(
                text("PRAGMA foreign_key_list('monthly_players')")
            ).fetchall()
            fk_tables = [row[2] for row in fks_result]
            
            if 'users' in fk_tables:
                print("   ✅ FK para users EXISTE")
                success_checks.append("FK users em monthly_players")
            else:
                error_msg = "❌ FK para users AUSENTE em monthly_players"
                print(f"   {error_msg}")
                print(f"   📋 FKs existentes: {', '.join(fk_tables) if fk_tables else 'Nenhuma'}")
                errors.append(error_msg)
                
            # Verificar monthly_periods também
            if 'monthly_periods' in fk_tables:
                print("   ✅ FK para monthly_periods EXISTE")
                success_checks.append("FK monthly_periods em monthly_players")
            else:
                warning_msg = "⚠️  FK para monthly_periods pode estar ausente"
                print(f"   {warning_msg}")
                warnings.append(warning_msg)
                
        except Exception as e:
            error_msg = f"❌ Erro ao verificar FKs: {e}"
            print(f"   {error_msg}")
            errors.append(error_msg)
        print()
        
        # ==================== CHECK 4: Índices ====================
        print("📌 CHECK 4: Índices de Performance")
        try:
            indexes_result = db.session.execute(
                text("PRAGMA index_list('monthly_players')")
            ).fetchall()
            index_names = [row[1] for row in indexes_result]
            
            expected_indexes = {
                'idx_monthly_players_period': '⚠️  Performance',
                'idx_monthly_players_user': '⚠️  Performance',
            }
            
            for idx_name, idx_type in expected_indexes.items():
                if idx_name in index_names:
                    print(f"   ✅ Índice {idx_name} existe")
                    success_checks.append(f"Índice {idx_name}")
                else:
                    warning_msg = f"{idx_type} Índice {idx_name} ausente"
                    print(f"   {warning_msg}")
                    warnings.append(warning_msg)
                    
        except Exception as e:
            warning_msg = f"⚠️  Erro ao verificar índices: {e}"
            print(f"   {warning_msg}")
            warnings.append(warning_msg)
        print()
        
        # ==================== CHECK 5: Migration Atual ====================
        print("📌 CHECK 5: Versão da Migration")
        try:
            migration_result = db.session.execute(
                text("SELECT version_num FROM alembic_version")
            ).fetchone()
            
            if migration_result:
                current_version = migration_result[0]
                print(f"   ℹ️  Versão atual: {current_version}")
                
                # Verificar se é a versão esperada
                if current_version in ['4f7d0e32f0cd', '32bca4f380be']:
                    print("   ✅ Migration atualizada")
                    success_checks.append(f"Migration {current_version}")
                else:
                    warning_msg = f"⚠️  Migration {current_version} pode estar desatualizada"
                    print(f"   {warning_msg}")
                    warnings.append(warning_msg)
            else:
                error_msg = "❌ Nenhuma migration aplicada!"
                print(f"   {error_msg}")
                errors.append(error_msg)
                
        except Exception as e:
            error_msg = f"❌ Erro ao verificar migrations: {e}"
            print(f"   {error_msg}")
            errors.append(error_msg)
        print()
        
        # ==================== CHECK 6: Integridade de Tabelas ====================
        print("📌 CHECK 6: Integridade de Tabelas")
        try:
            inspector = inspect(db.engine)
            required_tables = [
                'users', 'monthly_periods', 'monthly_players', 
                'casual_players', 'expenses', 'alembic_version'
            ]
            
            existing_tables = inspector.get_table_names()
            
            for table in required_tables:
                if table in existing_tables:
                    print(f"   ✅ Tabela {table} existe")
                else:
                    error_msg = f"❌ Tabela {table} AUSENTE"
                    print(f"   {error_msg}")
                    errors.append(error_msg)
                    
        except Exception as e:
            error_msg = f"❌ Erro ao verificar tabelas: {e}"
            print(f"   {error_msg}")
            errors.append(error_msg)
        print()
    
    # ==================== RESULTADO FINAL ====================
    print("=" * 70)
    print("📊 RESULTADO DA VALIDAÇÃO")
    print("=" * 70)
    print()
    
    if errors:
        print("❌ ERROS BLOQUEADORES ENCONTRADOS:")
        for i, error in enumerate(errors, 1):
            print(f"   {i}. {error}")
        print()
        print("🚨 Banco NÃO está pronto para produção!")
        print("📝 Execute as correções da Fase 1 antes de prosseguir.")
        return False
        
    elif warnings:
        print("⚠️  AVISOS (não bloqueiam produção):")
        for i, warning in enumerate(warnings, 1):
            print(f"   {i}. {warning}")
        print()
        print("✅ Banco está FUNCIONAL, mas recomenda-se resolver avisos")
        print("📝 Considere executar Fase 2 para otimizações.")
        return True
        
    else:
        print("🎉 BANCO 100% PRONTO PARA PRODUÇÃO!")
        print()
        print("✅ Checks bem-sucedidos:")
        for i, check in enumerate(success_checks, 1):
            print(f"   {i}. {check}")
        return True


if __name__ == '__main__':
    try:
        success = validate_database()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\n💥 Erro fatal durante validação: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
```

---

## 🔍 ARQUIVO 4: Script de Verificação Rápida

**Caminho:** `scripts/verify_db.py`

```python
# scripts/verify_db.py
"""
Verificação rápida do estado do banco.
Uso: python scripts/verify_db.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from backend import create_app
from backend.services.db.connection import db
from sqlalchemy import text

def quick_verify():
    """Verificação rápida de 3 itens críticos"""
    app = create_app('development')
    
    with app.app_context():
        print("\n🔍 Verificação Rápida do Banco\n")
        
        # 1. Foreign Keys
        result = db.session.execute(text("PRAGMA foreign_keys")).fetchone()
        fk_status = "✅ HABILITADO" if result and result[0] == 1 else "❌ DESABILITADO"
        print(f"1. Foreign Keys: {fk_status}")
        
        # 2. Coluna custom_monthly_fee
        cols = db.session.execute(text("PRAGMA table_info('monthly_players')")).fetchall()
        col_names = [row[1] for row in cols]
        col_status = "✅ EXISTE" if 'custom_monthly_fee' in col_names else "❌ AUSENTE"
        print(f"2. Coluna custom_monthly_fee: {col_status}")
        
        # 3. Migration
        try:
            version = db.session.execute(text("SELECT version_num FROM alembic_version")).fetchone()
            version_status = f"✅ {version[0]}" if version else "❌ NENHUMA"
        except:
            version_status = "❌ ERRO"
        print(f"3. Migration: {version_status}")
        
        print()

if __name__ == '__main__':
    quick_verify()
```

---

## 🗑️ ARQUIVO 5: Script para Remover Pasta Legada

**Caminho:** `scripts/remove_legacy_migrations.py`

```python
# scripts/remove_legacy_migrations.py
"""
Remove a pasta backend/migrations/ legada de forma segura.
Faz backup antes de remover.
"""
import shutil
from pathlib import Path
from datetime import datetime

def remove_legacy_migrations():
    """Remove pasta legada com backup"""
    legacy_path = Path(__file__).parent.parent / 'backend' / 'migrations'
    
    if not legacy_path.exists():
        print("✅ Pasta legada já foi removida ou não existe")
        return
    
    # Criar backup
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = legacy_path.parent / f'migrations.LEGACY.backup.{timestamp}'
    
    print(f"📦 Criando backup: {backup_path.name}")
    shutil.move(str(legacy_path), str(backup_path))
    
    print(f"✅ Pasta legada movida para: {backup_path}")
    print(f"ℹ️  Use apenas migrations/ na raiz do projeto")
    
    # Atualizar .gitignore
    gitignore_path = Path(__file__).parent.parent / '.gitignore'
    gitignore_entry = 'backend/migrations.LEGACY.backup.*/'
    
    if gitignore_path.exists():
        with open(gitignore_path, 'r') as f:
            content = f.read()
        
        if gitignore_entry not in content:
            with open(gitignore_path, 'a') as f:
                f.write(f'\n# Legacy migrations backup\n{gitignore_entry}\n')
            print(f"✅ .gitignore atualizado")
    
    print("\n🎉 Concluído! Pasta legada removida com segurança.")

if __name__ == '__main__':
    remove_legacy_migrations()
```

---

## 🚀 ARQUIVO 6: Script de Aplicação Segura de Migrations

**Caminho:** `scripts/apply_migrations_safely.py`

```python
# scripts/apply_migrations_safely.py
"""
Aplica migrations de forma segura com backup automático.
Uso: python scripts/apply_migrations_safely.py
"""
import shutil
import subprocess
import sys
from pathlib import Path
from datetime import datetime

def apply_migrations_safely():
    """Aplica migrations com segurança e validações"""
    print("=" * 70)
    print("🔧 APLICAÇÃO SEGURA DE MIGRATIONS")
    print("=" * 70)
    print()
    
    # Caminhos
    db_path = Path(__file__).parent.parent / 'instance' / 'futebol_dev.db'
    
    if not db_path.exists():
        print(f"❌ Banco não encontrado: {db_path}")
        sys.exit(1)
    
    # ====================STEP 1: Backup ====================
    print("📦 STEP 1: Fazendo backup do banco...")
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = db_path.parent / f'futebol_dev.db.backup.{timestamp}'
    
    try:
        shutil.copy2(db_path, backup_path)
        print(f"   ✅ Backup criado: {backup_path.name}")
        print(f"   📍 Localização: {backup_path}")
    except Exception as e:
        print(f"   ❌ Erro ao criar backup: {e}")
        sys.exit(1)
    print()
    
    # ==================== STEP 2: Limpar tabelas temporárias ====================
    print("🧹 STEP 2: Limpando tabelas temporárias do Alembic...")
    try:
        result = subprocess.run(
            [sys.executable, 'scripts/cleanup_alembic_tmp.py'],
            capture_output=True,
            text=True
        )
        print(result.stdout)
        if result.returncode != 0:
            print(f"   ⚠️  Aviso: {result.stderr}")
    except Exception as e:
        print(f"   ⚠️  Erro na limpeza (não crítico): {e}")
    print()
    
    # ==================== STEP 3: Verificar estado atual ====================
    print("🔍 STEP 3: Verificando estado atual das migrations...")
    try:
        result = subprocess.run(
            ['flask', 'db', 'current'],
            capture_output=True,
            text=True
        )
        print(result.stdout)
        if result.returncode != 0:
            print(f"   ⚠️  {result.stderr}")
    except Exception as e:
        print(f"   ⚠️  Erro ao verificar: {e}")
    print()
    
    # ==================== STEP 4: Aplicar migrations ====================
    print("⬆️  STEP 4: Aplicando migrations...")
    print("   ⏳ Aguarde...")
    try:
        result = subprocess.run(
            ['flask', 'db', 'upgrade'],
            capture_output=True,
            text=True
        )
        print(result.stdout)
        
        if result.returncode != 0:
            print(f"   ❌ Erro ao aplicar migrations:")
            print(result.stderr)
            print()
            print(f"   💡 Banco foi feito backup em: {backup_path}")
            print(f"   💡 Para restaurar: cp {backup_path} {db_path}")
            sys.exit(1)
        else:
            print("   ✅ Migrations aplicadas com sucesso!")
    except Exception as e:
        print(f"   ❌ Erro: {e}")
        sys.exit(1)
    print()
    
    # ==================== STEP 5: Validar resultado ====================
    print("✅ STEP 5: Validando resultado...")
    try:
        result = subprocess.run(
            [sys.executable, 'scripts/validate_production_readiness.py'],
            capture_output=True,
            text=True
        )
        print(result.stdout)
        
        if result.returncode != 0:
            print("   ⚠️  Algumas validações falharam")
            print("   📝 Revise os erros acima")
        else:
            print("   🎉 Todas validações passaram!")
    except Exception as e:
        print(f"   ⚠️  Erro na validação: {e}")
    print()
    
    print("=" * 70)
    print("🎉 PROCESSO CONCLUÍDO!")
    print("=" * 70)
    print()
    print("📝 Próximos passos:")
    print("   1. Teste criação de período mensal no frontend")
    print("   2. Verifique se erro 500 foi resolvido")
    print("   3. Valide integridade referencial (tente criar órfão)")
    print()
    print(f"💾 Backup disponível em: {backup_path}")
    print()

if __name__ == '__main__':
    apply_migrations_safely()
```

---

## 🏃 COMANDOS DE EXECUÇÃO (Ordem Correta)

Execute estes comandos na sequência:

```bash
# 1. Limpar tabelas temporárias
python scripts/cleanup_alembic_tmp.py

# 2. Aplicar migrations de forma segura
python scripts/apply_migrations_safely.py

# 3. Validação completa
python scripts/validate_production_readiness.py

# 4. Verificação rápida
python scripts/verify_db.py

# 5. Remover pasta legada (opcional mas recomendado)
python scripts/remove_legacy_migrations.py

# 6. Testar endpoint crítico
curl -X POST http://localhost:5000/api/monthly-payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "month": 10,
    "year": 2025,
    "players": [...]
  }'
```

---

## 📊 RESULTADO ESPERADO

Após executar todos os scripts acima, você deve ver:

```
✅ Foreign Keys: HABILITADO
✅ Coluna custom_monthly_fee: EXISTE
✅ Migration: 4f7d0e32f0cd
✅ FK para users: EXISTE
✅ FK para monthly_periods: EXISTE
✅ Tabelas: 6/6 presentes
✅ Índices: Criados

🎉 BANCO 100% PRONTO PARA PRODUÇÃO!
```

---

## 🆘 SE ALGO DER ERRADO

```bash
# Restaurar backup
cp instance/futebol_dev.db.backup.YYYYMMDD_HHMMSS instance/futebol_dev.db

# Verificar logs
cat logs/app.log

# Resetar Alembic (último recurso)
flask db stamp head
flask db upgrade
```

---

Pronto! Todos os arquivos estão prontos para copiar e colar. Quer que eu:

1. **Crie os arquivos da Fase 2** (índices + CI/CD)?
2. **Gere o plano de migração para PostgreSQL**?
3. **Crie testes de integridade FK**?

Me avise qual o próximo passo! 🚀
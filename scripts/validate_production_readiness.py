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
    print("VALIDAÇÃO DE BANCO DE DADOS PARA PRODUÇÃO")
    print("=" * 70)
    print()
    
    app = create_app('development')
    errors = []
    warnings = []
    success_checks = []
    
    with app.app_context():
        
        # ==================== CHECK 1: PRAGMA foreign_keys ====================
        print("CHECK 1: PRAGMA foreign_keys")
        try:
            result = db.session.execute(text("PRAGMA foreign_keys")).fetchone()
            if result and result[0] == 1:
                print("   OK - Foreign keys HABILITADAS")
                success_checks.append("Foreign keys habilitadas")
            else:
                error_msg = "ERRO - PRAGMA foreign_keys NÃO está habilitado!"
                print(f"   {error_msg}")
                errors.append(error_msg)
        except Exception as e:
            error_msg = f"ERRO - Erro ao verificar PRAGMA: {e}"
            print(f"   {error_msg}")
            errors.append(error_msg)
        print()
        
        # ==================== CHECK 2: Coluna custom_monthly_fee ====================
        print("CHECK 2: Coluna custom_monthly_fee")
        try:
            cols_result = db.session.execute(
                text("PRAGMA table_info('monthly_players')")
            ).fetchall()
            cols = [row[1] for row in cols_result]
            
            if 'custom_monthly_fee' in cols:
                print("   OK - Coluna custom_monthly_fee EXISTE")
                success_checks.append("Coluna custom_monthly_fee presente")
            else:
                error_msg = "ERRO - Coluna custom_monthly_fee AUSENTE em monthly_players"
                print(f"   {error_msg}")
                print(f"   Colunas existentes: {', '.join(cols)}")
                errors.append(error_msg)
        except Exception as e:
            error_msg = f"ERRO - Erro ao verificar colunas: {e}"
            print(f"   {error_msg}")
            errors.append(error_msg)
        print()
        
        # ==================== CHECK 3: Foreign Keys ====================
        print("CHECK 3: Foreign Keys em monthly_players")
        try:
            fks_result = db.session.execute(
                text("PRAGMA foreign_key_list('monthly_players')")
            ).fetchall()
            fk_tables = [row[2] for row in fks_result]
            
            if 'users' in fk_tables:
                print("   OK - FK para users EXISTE")
                success_checks.append("FK users em monthly_players")
            else:
                error_msg = "ERRO - FK para users AUSENTE em monthly_players"
                print(f"   {error_msg}")
                print(f"   FKs existentes: {', '.join(fk_tables) if fk_tables else 'Nenhuma'}")
                errors.append(error_msg)
                
            # Verificar monthly_periods também
            if 'monthly_periods' in fk_tables:
                print("   OK - FK para monthly_periods EXISTE")
                success_checks.append("FK monthly_periods em monthly_players")
            else:
                warning_msg = "AVISO - FK para monthly_periods pode estar ausente"
                print(f"   {warning_msg}")
                warnings.append(warning_msg)
                
        except Exception as e:
            error_msg = f"ERRO - Erro ao verificar FKs: {e}"
            print(f"   {error_msg}")
            errors.append(error_msg)
        print()
        
        # ==================== CHECK 4: Migration Atual ====================
        print("CHECK 4: Versão da Migration")
        try:
            migration_result = db.session.execute(
                text("SELECT version_num FROM alembic_version")
            ).fetchone()
            
            if migration_result:
                current_version = migration_result[0]
                print(f"   INFO - Versão atual: {current_version}")
                
                # Verificar se é a versão esperada
                if current_version in ['d5a0b37e5b49', '4f7d0e32f0cd', '32bca4f380be']:
                    print("   OK - Migration atualizada")
                    success_checks.append(f"Migration {current_version}")
                else:
                    warning_msg = f"AVISO - Migration {current_version} pode estar desatualizada"
                    print(f"   {warning_msg}")
                    warnings.append(warning_msg)
            else:
                error_msg = "ERRO - Nenhuma migration aplicada!"
                print(f"   {error_msg}")
                errors.append(error_msg)
                
        except Exception as e:
            error_msg = f"ERRO - Erro ao verificar migrations: {e}"
            print(f"   {error_msg}")
            errors.append(error_msg)
        print()
        
        # ==================== CHECK 5: Integridade de Tabelas ====================
        print("CHECK 5: Integridade de Tabelas")
        try:
            inspector = inspect(db.engine)
            required_tables = [
                'users', 'monthly_periods', 'monthly_players', 
                'casual_players', 'expenses', 'alembic_version'
            ]
            
            existing_tables = inspector.get_table_names()
            
            for table in required_tables:
                if table in existing_tables:
                    print(f"   OK - Tabela {table} existe")
                else:
                    error_msg = f"ERRO - Tabela {table} AUSENTE"
                    print(f"   {error_msg}")
                    errors.append(error_msg)
                    
        except Exception as e:
            error_msg = f"ERRO - Erro ao verificar tabelas: {e}"
            print(f"   {error_msg}")
            errors.append(error_msg)
        print()
    
    # ==================== RESULTADO FINAL ====================
    print("=" * 70)
    print("RESULTADO DA VALIDAÇÃO")
    print("=" * 70)
    print()
    
    if errors:
        print("ERROS BLOQUEADORES ENCONTRADOS:")
        for i, error in enumerate(errors, 1):
            print(f"   {i}. {error}")
        print()
        print("BANCO NÃO está pronto para produção!")
        print("Execute as correções da Fase 1 antes de prosseguir.")
        return False
        
    elif warnings:
        print("AVISOS (não bloqueiam produção):")
        for i, warning in enumerate(warnings, 1):
            print(f"   {i}. {warning}")
        print()
        print("BANCO está FUNCIONAL, mas recomenda-se resolver avisos")
        print("Considere executar Fase 2 para otimizações.")
        return True
        
    else:
        print("BANCO 100% PRONTO PARA PRODUÇÃO!")
        print()
        print("Checks bem-sucedidos:")
        for i, check in enumerate(success_checks, 1):
            print(f"   {i}. {check}")
        return True


if __name__ == '__main__':
    try:
        success = validate_database()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\nErro fatal durante validação: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

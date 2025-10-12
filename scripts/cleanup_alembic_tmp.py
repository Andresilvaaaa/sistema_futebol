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
    
    print(f"Conectando ao banco: {db_path}")
    conn = sqlite3.connect(str(db_path))
    cursor = conn.cursor()
    
    # Buscar tabelas temporárias
    cursor.execute("""
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name LIKE '_alembic_tmp_%'
    """)
    tmp_tables = cursor.fetchall()
    
    if not tmp_tables:
        print("OK - Nenhuma tabela temporária encontrada")
        conn.close()
        return
    
    print(f"Encontradas {len(tmp_tables)} tabelas temporárias:")
    for table in tmp_tables:
        print(f"  - {table[0]}")
    
    # Remover tabelas temporárias
    for table in tmp_tables:
        table_name = table[0]
        try:
            cursor.execute(f"DROP TABLE IF EXISTS {table_name}")
            print(f"  OK - Removida: {table_name}")
        except Exception as e:
            print(f"  ERRO - Erro ao remover {table_name}: {e}")
    
    conn.commit()
    conn.close()
    print("\nLimpeza concluída!")

if __name__ == '__main__':
    cleanup_alembic_tmp()
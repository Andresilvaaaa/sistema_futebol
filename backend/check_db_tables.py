#!/usr/bin/env python3
"""
Script para verificar as tabelas existentes no banco de dados SQLite
"""

import sqlite3
import os

def check_database_tables():
    """Verifica as tabelas existentes no banco de dados"""
    db_path = 'instance/futebol_dev.db'
    
    if not os.path.exists(db_path):
        print(f"❌ Banco de dados não encontrado: {db_path}")
        return
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Listar todas as tabelas
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        print(f"📊 Tabelas encontradas no banco de dados ({len(tables)}):")
        for table in tables:
            print(f"  - {table[0]}")
            
        # Verificar se existe a tabela alembic_version
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='alembic_version';")
        alembic_table = cursor.fetchone()
        
        if alembic_table:
            cursor.execute("SELECT version_num FROM alembic_version;")
            version = cursor.fetchone()
            print(f"\n🔄 Versão atual do Alembic: {version[0] if version else 'Nenhuma'}")
        else:
            print("\n⚠️  Tabela alembic_version não encontrada")
            
        conn.close()
        
    except Exception as e:
        print(f"❌ Erro ao verificar banco de dados: {e}")

if __name__ == "__main__":
    check_database_tables()
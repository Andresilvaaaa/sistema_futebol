#!/usr/bin/env python3
"""
Script para adicionar colunas user_id às tabelas monthly_players e casual_players
"""

import sqlite3
import os

def add_user_id_columns():
    """Adiciona colunas user_id às tabelas que ainda não possuem"""
    
    db_path = 'instance/futebol_dev.db'
    
    if not os.path.exists(db_path):
        print(f"❌ Banco de dados não encontrado: {db_path}")
        return
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        print("🔧 Adicionando colunas user_id...")
        
        # Verificar se a coluna user_id já existe em monthly_players
        cursor.execute("PRAGMA table_info(monthly_players)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'user_id' not in columns:
            print("  ➕ Adicionando user_id à tabela monthly_players...")
            cursor.execute("""
                ALTER TABLE monthly_players 
                ADD COLUMN user_id VARCHAR(36) NULL
            """)
            print("  ✅ Coluna user_id adicionada à monthly_players")
        else:
            print("  ⚠️  Coluna user_id já existe em monthly_players")
        
        # Verificar se a coluna user_id já existe em casual_players
        cursor.execute("PRAGMA table_info(casual_players)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'user_id' not in columns:
            print("  ➕ Adicionando user_id à tabela casual_players...")
            cursor.execute("""
                ALTER TABLE casual_players 
                ADD COLUMN user_id VARCHAR(36) NULL
            """)
            print("  ✅ Coluna user_id adicionada à casual_players")
        else:
            print("  ⚠️  Coluna user_id já existe em casual_players")
        
        # Commit das alterações
        conn.commit()
        print("\n✅ Todas as colunas user_id foram adicionadas com sucesso!")
        
        # Verificar a estrutura final
        print("\n📊 Verificando estrutura final das tabelas:")
        
        for table in ['monthly_players', 'casual_players']:
            cursor.execute(f"PRAGMA table_info({table})")
            columns = cursor.fetchall()
            user_id_exists = any(column[1] == 'user_id' for column in columns)
            status = "✅" if user_id_exists else "❌"
            print(f"  {status} {table}: user_id {'presente' if user_id_exists else 'ausente'}")
        
    except Exception as e:
        print(f"❌ Erro ao adicionar colunas: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    add_user_id_columns()
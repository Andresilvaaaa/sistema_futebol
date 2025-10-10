#!/usr/bin/env python3
"""
Script para verificar a estrutura das tabelas existentes no banco de dados SQLite
"""

import sqlite3
import os

def check_table_structure():
    """Verifica a estrutura das tabelas existentes no banco de dados"""
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
        
        print(f"📊 Estrutura das tabelas no banco de dados:")
        
        for table in tables:
            table_name = table[0]
            print(f"\n🔍 Tabela: {table_name}")
            
            # Obter informações das colunas
            cursor.execute(f"PRAGMA table_info({table_name});")
            columns = cursor.fetchall()
            
            for col in columns:
                cid, name, type_, notnull, default_value, pk = col
                nullable = "NOT NULL" if notnull else "NULL"
                primary = " (PRIMARY KEY)" if pk else ""
                default = f" DEFAULT {default_value}" if default_value else ""
                print(f"  - {name}: {type_} {nullable}{default}{primary}")
                
            # Verificar se tem user_id
            has_user_id = any(col[1] == 'user_id' for col in columns)
            if has_user_id:
                print(f"  ✅ Tabela {table_name} já possui coluna user_id")
            else:
                print(f"  ❌ Tabela {table_name} NÃO possui coluna user_id")
            
        conn.close()
        
    except Exception as e:
        print(f"❌ Erro ao verificar estrutura do banco: {e}")

if __name__ == "__main__":
    check_table_structure()
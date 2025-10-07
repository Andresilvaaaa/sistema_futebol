#!/usr/bin/env python3
"""
Script de diagnóstico para verificar a estrutura da tabela monthly_players
Baseado nas soluções propostas em console.md
"""

import sqlite3
import os

def check_database_structure():
    """Verifica a estrutura atual da tabela monthly_players"""
    
    # Caminhos possíveis para o banco de dados
    possible_db_paths = [
        'backend/instance/futebol_dev.db',
        'instance/futebol_dev.db',
        'backend/futebol_dev.db',
        'futebol_dev.db'
    ]
    
    db_path = None
    for path in possible_db_paths:
        if os.path.exists(path):
            db_path = path
            break
    
    if not db_path:
        print("❌ Nenhum arquivo de banco de dados encontrado!")
        print("Caminhos verificados:")
        for path in possible_db_paths:
            print(f"  - {path}")
        return False
    
    print(f"📁 Usando banco de dados: {db_path}")
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Verificar se a tabela existe
        cursor.execute("""
            SELECT name FROM sqlite_master 
            WHERE type='table' AND name='monthly_players'
        """)
        
        if not cursor.fetchone():
            print("❌ Tabela 'monthly_players' não existe!")
            return False
        
        # Verificar estrutura da tabela
        cursor.execute("PRAGMA table_info(monthly_players)")
        columns = cursor.fetchall()
        
        print("\n📊 Colunas da tabela monthly_players:")
        print("-" * 50)
        for col in columns:
            cid, name, type_name, notnull, default_value, pk = col
            nullable = "NOT NULL" if notnull else "NULL"
            pk_info = " (PRIMARY KEY)" if pk else ""
            print(f"  {name:<20} {type_name:<15} {nullable}{pk_info}")
        
        # Verificar se custom_monthly_fee existe
        column_names = [col[1] for col in columns]
        has_custom_fee = 'custom_monthly_fee' in column_names
        
        print(f"\n{'✅' if has_custom_fee else '❌'} Coluna 'custom_monthly_fee' existe: {has_custom_fee}")
        
        # Contar registros existentes
        cursor.execute("SELECT COUNT(*) FROM monthly_players")
        count = cursor.fetchone()[0]
        print(f"📈 Total de registros na tabela: {count}")
        
        conn.close()
        return has_custom_fee
        
    except sqlite3.Error as e:
        print(f"❌ Erro ao acessar banco de dados: {e}")
        return False
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        return False

if __name__ == "__main__":
    print("🔍 DIAGNÓSTICO DA ESTRUTURA DO BANCO DE DADOS")
    print("=" * 60)
    
    has_column = check_database_structure()
    
    print("\n" + "=" * 60)
    if has_column:
        print("✅ DIAGNÓSTICO: Coluna custom_monthly_fee existe!")
        print("   O problema pode estar em outro lugar.")
    else:
        print("❌ DIAGNÓSTICO: Coluna custom_monthly_fee NÃO existe!")
        print("   Execute o script fix_db.py para corrigir.")
    print("=" * 60)
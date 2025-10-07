#!/usr/bin/env python3
"""
Script de correção para adicionar a coluna custom_monthly_fee à tabela monthly_players
Baseado nas soluções propostas em console.md
"""

import sqlite3
import os
from decimal import Decimal

def fix_database_structure():
    """Adiciona a coluna custom_monthly_fee à tabela monthly_players se ela não existir"""
    
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
        
        # Verificar se a coluna já existe
        cursor.execute("PRAGMA table_info(monthly_players)")
        columns = cursor.fetchall()
        column_names = [col[1] for col in columns]
        
        if 'custom_monthly_fee' in column_names:
            print("✅ Coluna 'custom_monthly_fee' já existe!")
            return True
        
        print("🔧 Adicionando coluna 'custom_monthly_fee'...")
        
        # Fazer backup da estrutura atual
        print("📋 Estrutura atual da tabela:")
        for col in columns:
            cid, name, type_name, notnull, default_value, pk = col
            nullable = "NOT NULL" if notnull else "NULL"
            pk_info = " (PRIMARY KEY)" if pk else ""
            print(f"  {name:<20} {type_name:<15} {nullable}{pk_info}")
        
        # Adicionar a coluna custom_monthly_fee
        cursor.execute("""
            ALTER TABLE monthly_players 
            ADD COLUMN custom_monthly_fee DECIMAL(10,2) DEFAULT NULL
        """)
        
        conn.commit()
        print("✅ Coluna 'custom_monthly_fee' adicionada com sucesso!")
        
        # Verificar a nova estrutura
        cursor.execute("PRAGMA table_info(monthly_players)")
        new_columns = cursor.fetchall()
        
        print("\n📋 Nova estrutura da tabela:")
        for col in new_columns:
            cid, name, type_name, notnull, default_value, pk = col
            nullable = "NOT NULL" if notnull else "NULL"
            pk_info = " (PRIMARY KEY)" if pk else ""
            marker = " ← NOVA" if name == 'custom_monthly_fee' else ""
            print(f"  {name:<20} {type_name:<15} {nullable}{pk_info}{marker}")
        
        # Contar registros existentes
        cursor.execute("SELECT COUNT(*) FROM monthly_players")
        count = cursor.fetchone()[0]
        print(f"\n📈 Total de registros na tabela: {count}")
        
        if count > 0:
            print("ℹ️  Registros existentes terão custom_monthly_fee = NULL por padrão")
        
        conn.close()
        return True
        
    except sqlite3.Error as e:
        print(f"❌ Erro ao modificar banco de dados: {e}")
        if 'conn' in locals():
            conn.rollback()
            conn.close()
        return False
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        if 'conn' in locals():
            conn.close()
        return False

def verify_fix():
    """Verifica se a correção foi aplicada com sucesso"""
    print("\n🔍 Verificando se a correção foi aplicada...")
    
    # Usar o mesmo código do check_db_structure.py
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
        return False
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        cursor.execute("PRAGMA table_info(monthly_players)")
        columns = cursor.fetchall()
        column_names = [col[1] for col in columns]
        
        has_custom_fee = 'custom_monthly_fee' in column_names
        conn.close()
        
        return has_custom_fee
        
    except Exception:
        return False

if __name__ == "__main__":
    print("🔧 CORREÇÃO DA ESTRUTURA DO BANCO DE DADOS")
    print("=" * 60)
    
    success = fix_database_structure()
    
    if success:
        # Verificar se a correção foi aplicada
        if verify_fix():
            print("\n" + "=" * 60)
            print("✅ CORREÇÃO APLICADA COM SUCESSO!")
            print("   A coluna 'custom_monthly_fee' foi adicionada.")
            print("   Você pode agora reiniciar o servidor Flask.")
            print("=" * 60)
        else:
            print("\n" + "=" * 60)
            print("⚠️  CORREÇÃO PODE NÃO TER SIDO APLICADA!")
            print("   Execute check_db_structure.py para verificar.")
            print("=" * 60)
    else:
        print("\n" + "=" * 60)
        print("❌ FALHA NA CORREÇÃO!")
        print("   Verifique os erros acima e tente novamente.")
        print("=" * 60)
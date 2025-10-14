#!/usr/bin/env python3
"""
Script para verificar se a coluna custom_monthly_fee existe na tabela monthly_players
"""

import os
import sys

# Adicionar o diretório backend ao sys.path
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from backend import create_app
from backend.services.db.connection import db

def check_custom_monthly_fee_column():
    """Verifica se a coluna custom_monthly_fee existe na tabela monthly_players"""
    app = create_app()
    with app.app_context():
        try:
            # Usar o inspector do SQLAlchemy para verificar a estrutura da tabela
            inspector = db.inspect(db.engine)
            columns = inspector.get_columns('monthly_players')
            
            print("🔍 Colunas na tabela monthly_players:")
            column_names = []
            for column in columns:
                column_names.append(column['name'])
                print(f"  - {column['name']} ({column['type']})")
            
            # Verificar se custom_monthly_fee existe
            if 'custom_monthly_fee' in column_names:
                print("\n✅ A coluna 'custom_monthly_fee' EXISTE na tabela monthly_players")
                return True
            else:
                print("\n❌ A coluna 'custom_monthly_fee' NÃO EXISTE na tabela monthly_players")
                print("💡 É necessário executar a migration para adicionar esta coluna")
                return False
                
        except Exception as e:
            print(f"❌ Erro ao verificar a tabela: {e}")
            return False

if __name__ == '__main__':
    check_custom_monthly_fee_column()
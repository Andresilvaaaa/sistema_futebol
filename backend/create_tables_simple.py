#!/usr/bin/env python3
"""
Script simples para criar tabelas do banco de dados.
"""

import os
import sys

# Adicionar o diretório backend ao path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Importar o app já configurado
from app import app

def create_tables():
    """Cria todas as tabelas definidas nos modelos."""
    
    with app.app_context():
        print("Criando tabelas do banco de dados...")
        
        # Importar os modelos para garantir que estejam registrados
        from services.db.models import User, Player, MonthlyPeriod, MonthlyPlayer, CasualPlayer, Expense
        from services.db.connection import db
        
        # Criar todas as tabelas
        db.create_all()
        
        print("Tabelas criadas com sucesso!")
        
        # Verificar quais tabelas foram criadas
        inspector = db.inspect(db.engine)
        tables = inspector.get_table_names()
        
        print(f"\nTabelas disponíveis no banco:")
        for table in sorted(tables):
            print(f"  - {table}")

if __name__ == "__main__":
    create_tables()
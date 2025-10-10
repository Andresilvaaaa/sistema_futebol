#!/usr/bin/env python3
"""
Script para criar todas as tabelas do banco de dados.
"""

import os
import sys

# Adicionar o diretório backend ao path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from services.db.connection import db

def create_tables():
    """Cria todas as tabelas definidas nos modelos."""
    app = create_app()
    
    with app.app_context():
        print("Criando tabelas do banco de dados...")
        
        # Importar os modelos para garantir que estejam registrados
        from services.db.models import User, Player, MonthlyPeriod, MonthlyPlayer, CasualPlayer, Expense
        
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
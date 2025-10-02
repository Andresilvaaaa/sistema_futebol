#!/usr/bin/env python3
"""
Script para limpar todos os dados de períodos mensais do banco de dados
Este script remove:
- Todos os registros de MonthlyPeriod
- Todos os registros de MonthlyPlayer 
- Todos os registros de CasualPlayer
- Todos os registros de Expense relacionados aos períodos mensais

ATENÇÃO: Esta operação é irreversível!
"""

import sys
import os
from datetime import datetime

# Adicionar o diretório backend ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from .services.db.connection import db
from .services.db.models import MonthlyPeriod, MonthlyPlayer, CasualPlayer, Expense
from app import create_app

def cleanup_monthly_data():
    """
    Remove todos os dados relacionados aos períodos mensais
    """
    try:
        print("🧹 Iniciando limpeza dos dados mensais...")
        print("=" * 50)
        
        # Contar registros antes da limpeza
        monthly_periods_count = MonthlyPeriod.query.count()
        monthly_players_count = MonthlyPlayer.query.count()
        casual_players_count = CasualPlayer.query.count()
        expenses_count = Expense.query.count()
        
        print(f"📊 Registros encontrados:")
        print(f"   - Períodos mensais: {monthly_periods_count}")
        print(f"   - Jogadores mensais: {monthly_players_count}")
        print(f"   - Jogadores casuais: {casual_players_count}")
        print(f"   - Despesas: {expenses_count}")
        print()
        
        if monthly_periods_count == 0 and monthly_players_count == 0 and casual_players_count == 0 and expenses_count == 0:
            print("✅ Não há dados mensais para limpar!")
            return True
        
        # Confirmar operação
        print("⚠️  ATENÇÃO: Esta operação irá remover TODOS os dados mensais!")
        print("   Esta ação é IRREVERSÍVEL!")
        print()
        
        # Para automação, vamos prosseguir automaticamente
        print("🗑️  Removendo dados...")
        
        # 1. Remover despesas (têm FK para monthly_periods)
        if expenses_count > 0:
            print(f"   Removendo {expenses_count} despesas...")
            Expense.query.delete()
        
        # 2. Remover jogadores casuais (têm FK para monthly_periods)
        if casual_players_count > 0:
            print(f"   Removendo {casual_players_count} jogadores casuais...")
            CasualPlayer.query.delete()
        
        # 3. Remover jogadores mensais (têm FK para monthly_periods)
        if monthly_players_count > 0:
            print(f"   Removendo {monthly_players_count} jogadores mensais...")
            MonthlyPlayer.query.delete()
        
        # 4. Remover períodos mensais
        if monthly_periods_count > 0:
            print(f"   Removendo {monthly_periods_count} períodos mensais...")
            MonthlyPeriod.query.delete()
        
        # Commit das alterações
        db.session.commit()
        
        print()
        print("✅ Limpeza concluída com sucesso!")
        print("=" * 50)
        
        # Verificar se a limpeza foi bem-sucedida
        remaining_periods = MonthlyPeriod.query.count()
        remaining_players = MonthlyPlayer.query.count()
        remaining_casual = CasualPlayer.query.count()
        remaining_expenses = Expense.query.count()
        
        print(f"📊 Registros restantes:")
        print(f"   - Períodos mensais: {remaining_periods}")
        print(f"   - Jogadores mensais: {remaining_players}")
        print(f"   - Jogadores casuais: {remaining_casual}")
        print(f"   - Despesas: {remaining_expenses}")
        
        if remaining_periods == 0 and remaining_players == 0 and remaining_casual == 0 and remaining_expenses == 0:
            print()
            print("🎉 Todos os dados mensais foram removidos com sucesso!")
            return True
        else:
            print()
            print("❌ Erro: Alguns registros não foram removidos!")
            return False
            
    except Exception as e:
        print(f"❌ Erro durante a limpeza: {str(e)}")
        db.session.rollback()
        return False

def main():
    """
    Função principal
    """
    print("🧹 Script de Limpeza de Dados Mensais")
    print(f"⏰ Executado em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Criar aplicação Flask
    app = create_app()
    
    with app.app_context():
        success = cleanup_monthly_data()
        
        if success:
            print()
            print("✅ Script executado com sucesso!")
            print("💡 Agora você pode criar novos períodos mensais do zero.")
            sys.exit(0)
        else:
            print()
            print("❌ Script falhou!")
            print("💡 Verifique os logs de erro acima.")
            sys.exit(1)

if __name__ == "__main__":
    main()
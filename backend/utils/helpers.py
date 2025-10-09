"""
Funções auxiliares para o sistema de futebol
"""
from datetime import datetime
from sqlalchemy import and_
from ..services.db.models import MonthlyPlayer, MonthlyPeriod, PaymentStatus
from ..services.db.connection import db


def calculate_pending_months_count(player_id, current_period_id):
    """
    Calcula o número de meses pendentes acumulados para um jogador.
    
    Args:
        player_id: ID do jogador
        current_period_id: ID do período atual
        
    Returns:
        int: Número de meses pendentes acumulados
    """
    # Buscar o período atual para obter a data de referência
    current_period = MonthlyPeriod.query.get(current_period_id)
    if not current_period:
        return 0
    
    # Buscar todos os MonthlyPlayer do jogador com status 'pending'
    # ordenados por data (mais antigos primeiro)
    pending_payments = MonthlyPlayer.query.join(MonthlyPeriod).filter(
        and_(
            MonthlyPlayer.player_id == player_id,
            MonthlyPlayer.status == PaymentStatus.PENDING.value,
            # Considerar apenas períodos até o período atual (inclusive)
            MonthlyPeriod.year <= current_period.year,
            # Se for o mesmo ano, considerar apenas meses até o mês atual
            db.or_(
                MonthlyPeriod.year < current_period.year,
                and_(
                    MonthlyPeriod.year == current_period.year,
                    MonthlyPeriod.month <= current_period.month
                )
            )
        )
    ).order_by(MonthlyPeriod.year.asc(), MonthlyPeriod.month.asc()).all()
    
    return len(pending_payments)


def update_all_pending_counts_for_period(period_id):
    """
    Atualiza o contador de pendências acumuladas para todos os jogadores de um período.
    
    Args:
        period_id: ID do período para atualizar
    """
    # Buscar todos os MonthlyPlayer do período
    monthly_players = MonthlyPlayer.query.filter_by(monthly_period_id=period_id).all()
    
    for monthly_player in monthly_players:
        # Calcular pendências acumuladas para cada jogador
        pending_count = calculate_pending_months_count(monthly_player.player_id, period_id)
        monthly_player.pending_months_count = pending_count
    
    # Commit das alterações
    db.session.commit()
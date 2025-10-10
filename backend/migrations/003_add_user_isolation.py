"""
Migração para adicionar isolamento de dados por usuário:
- Adicionar campo user_id nas tabelas players, monthly_periods e expenses
- Criar relacionamentos FK com a tabela users
- Atualizar índices únicos para incluir user_id
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import sqlite

def upgrade():
    """Aplicar mudanças para isolamento de dados por usuário"""
    
    # 1. Adicionar coluna user_id na tabela players
    with op.batch_alter_table('players', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.String(36), nullable=True))
        batch_op.create_foreign_key('fk_players_user_id', 'users', ['user_id'], ['id'])
        batch_op.create_index('idx_players_user_id', ['user_id'])
    
    # 2. Adicionar coluna user_id na tabela monthly_periods
    with op.batch_alter_table('monthly_periods', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.String(36), nullable=True))
        batch_op.create_foreign_key('fk_monthly_periods_user_id', 'users', ['user_id'], ['id'])
        batch_op.create_index('idx_monthly_periods_user_id', ['user_id'])
        
        # Remover constraint único antigo e criar novo com user_id
        batch_op.drop_constraint('uq_monthly_periods_year_month', type_='unique')
        batch_op.create_unique_constraint('uq_monthly_periods_year_month_user', ['year', 'month', 'user_id'])
    
    # 3. Adicionar coluna user_id na tabela expenses
    with op.batch_alter_table('expenses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.String(36), nullable=True))
        batch_op.create_foreign_key('fk_expenses_user_id', 'users', ['user_id'], ['id'])
        batch_op.create_index('idx_expenses_user_id', ['user_id'])
    
    # 4. Atualizar dados existentes com o primeiro usuário encontrado
    # (assumindo que existe pelo menos um usuário no sistema)
    connection = op.get_bind()
    
    # Buscar o primeiro usuário
    result = connection.execute(sa.text("SELECT id FROM users LIMIT 1"))
    first_user = result.fetchone()
    
    if first_user:
        user_id = first_user[0]
        
        # Atualizar todas as tabelas com o user_id do primeiro usuário
        connection.execute(sa.text(f"UPDATE players SET user_id = '{user_id}' WHERE user_id IS NULL"))
        connection.execute(sa.text(f"UPDATE monthly_periods SET user_id = '{user_id}' WHERE user_id IS NULL"))
        connection.execute(sa.text(f"UPDATE expenses SET user_id = '{user_id}' WHERE user_id IS NULL"))
    
    # 5. Tornar as colunas user_id obrigatórias
    with op.batch_alter_table('players', schema=None) as batch_op:
        batch_op.alter_column('user_id', nullable=False)
    
    with op.batch_alter_table('monthly_periods', schema=None) as batch_op:
        batch_op.alter_column('user_id', nullable=False)
    
    with op.batch_alter_table('expenses', schema=None) as batch_op:
        batch_op.alter_column('user_id', nullable=False)


def downgrade():
    """Reverter mudanças de isolamento de dados por usuário"""
    
    # 1. Remover coluna user_id da tabela players
    with op.batch_alter_table('players', schema=None) as batch_op:
        batch_op.drop_constraint('fk_players_user_id', type_='foreignkey')
        batch_op.drop_index('idx_players_user_id')
        batch_op.drop_column('user_id')
    
    # 2. Remover coluna user_id da tabela monthly_periods
    with op.batch_alter_table('monthly_periods', schema=None) as batch_op:
        batch_op.drop_constraint('fk_monthly_periods_user_id', type_='foreignkey')
        batch_op.drop_index('idx_monthly_periods_user_id')
        batch_op.drop_constraint('uq_monthly_periods_year_month_user', type_='unique')
        batch_op.create_unique_constraint('uq_monthly_periods_year_month', ['year', 'month'])
        batch_op.drop_column('user_id')
    
    # 3. Remover coluna user_id da tabela expenses
    with op.batch_alter_table('expenses', schema=None) as batch_op:
        batch_op.drop_constraint('fk_expenses_user_id', type_='foreignkey')
        batch_op.drop_index('idx_expenses_user_id')
        batch_op.drop_column('user_id')
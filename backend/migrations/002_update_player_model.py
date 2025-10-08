"""
Migração para atualizar o modelo Player:
- Tornar campo email opcional (nullable=True)
- Remover campo monthly_fee (controlado na gestão mensal)
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import sqlite

def upgrade():
    """Aplicar mudanças no modelo Player"""
    
    # Para SQLite, precisamos recriar a tabela devido às limitações
    # 1. Criar nova tabela com a estrutura atualizada
    op.create_table('players_new',
        sa.Column('id', sa.String(36), primary_key=True),
        sa.Column('name', sa.String(100), nullable=False),
        sa.Column('position', sa.String(50), nullable=False),
        sa.Column('phone', sa.String(20), nullable=False),
        sa.Column('email', sa.String(120), nullable=True),  # Tornado opcional
        sa.Column('join_date', sa.Date(), nullable=False),
        sa.Column('status', sa.String(20), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False, default=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        # monthly_fee removido
    )
    
    # 2. Criar índices
    op.create_index('ix_players_new_name', 'players_new', ['name'])
    op.create_index('ix_players_new_email', 'players_new', ['email'])
    op.create_unique_constraint('uq_players_new_phone', 'players_new', ['phone'])
    
    # 3. Copiar dados da tabela antiga (excluindo monthly_fee)
    op.execute("""
        INSERT INTO players_new (id, name, position, phone, email, join_date, status, is_active, created_at, updated_at)
        SELECT id, name, position, phone, email, join_date, status, is_active, created_at, updated_at
        FROM players
    """)
    
    # 4. Remover tabela antiga
    op.drop_table('players')
    
    # 5. Renomear nova tabela
    op.rename_table('players_new', 'players')


def downgrade():
    """Reverter mudanças no modelo Player"""
    
    # 1. Criar tabela com estrutura antiga
    op.create_table('players_old',
        sa.Column('id', sa.String(36), primary_key=True),
        sa.Column('name', sa.String(100), nullable=False),
        sa.Column('position', sa.String(50), nullable=False),
        sa.Column('phone', sa.String(20), nullable=False),
        sa.Column('email', sa.String(120), nullable=False),  # Volta a ser obrigatório
        sa.Column('join_date', sa.Date(), nullable=False),
        sa.Column('status', sa.String(20), nullable=False),
        sa.Column('monthly_fee', sa.Numeric(10, 2), nullable=False, default=0.00),  # Restaurado
        sa.Column('is_active', sa.Boolean(), nullable=False, default=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
    )
    
    # 2. Criar índices
    op.create_index('ix_players_old_name', 'players_old', ['name'])
    op.create_index('ix_players_old_email', 'players_old', ['email'])
    op.create_unique_constraint('uq_players_old_phone', 'players_old', ['phone'])
    op.create_unique_constraint('uq_players_old_email', 'players_old', ['email'])
    
    # 3. Copiar dados (adicionando monthly_fee padrão para registros sem email)
    op.execute("""
        INSERT INTO players_old (id, name, position, phone, email, join_date, status, monthly_fee, is_active, created_at, updated_at)
        SELECT 
            id, 
            name, 
            position, 
            phone, 
            COALESCE(email, 'sem-email-' || id || '@temp.com') as email,  -- Email temporário para registros sem email
            join_date, 
            status, 
            0.00 as monthly_fee,  -- Valor padrão
            is_active, 
            created_at, 
            updated_at
        FROM players
    """)
    
    # 4. Remover tabela atual
    op.drop_table('players')
    
    # 5. Renomear tabela antiga
    op.rename_table('players_old', 'players')
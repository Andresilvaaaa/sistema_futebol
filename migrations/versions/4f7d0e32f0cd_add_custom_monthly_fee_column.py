"""Add custom_monthly_fee column to monthly_players

Revision ID: 4f7d0e32f0cd
Revises: 32bca4f380be
Create Date: 2025-10-09 22:20:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4f7d0e32f0cd'
down_revision = '32bca4f380be'
branch_labels = None
depends_on = None


def upgrade():
    # Use batch operations for SQLite compatibility
    # Checar se a coluna já existe para evitar erro de duplicidade
    conn = op.get_bind()
    cols = [r[1] for r in conn.exec_driver_sql("PRAGMA table_info('monthly_players')").fetchall()]
    if 'custom_monthly_fee' not in cols:
        with op.batch_alter_table('monthly_players', schema=None) as batch_op:
            batch_op.add_column(sa.Column('custom_monthly_fee', sa.Numeric(10, 2), nullable=True))
    else:
        # Já existe, não fazer nada
        pass


def downgrade():
    with op.batch_alter_table('monthly_players', schema=None) as batch_op:
        batch_op.drop_column('custom_monthly_fee')
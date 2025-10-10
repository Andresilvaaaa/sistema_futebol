"""initial_migration

Revision ID: edae12b4e22f
Revises: 
Create Date: 2024-12-19 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'edae12b4e22f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Esta migração marca o estado atual do banco de dados
    # Todas as tabelas já existem, então não fazemos nada
    pass


def downgrade():
    # Esta migração marca o estado atual do banco de dados
    # Não fazemos nada no downgrade
    pass
"""add_user_id_to_monthly_players_and_casual_players

Revision ID: 4c071650131b
Revises: edae12b4e22f
Create Date: 2024-12-19 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4c071650131b'
down_revision = 'edae12b4e22f'
branch_labels = None
depends_on = None


def upgrade():
    """Add user_id columns to monthly_players and casual_players tables"""
    # Add user_id column to monthly_players table
    op.add_column('monthly_players', sa.Column('user_id', sa.String(36), nullable=True))
    
    # Add user_id column to casual_players table
    op.add_column('casual_players', sa.Column('user_id', sa.String(36), nullable=True))
    
    # Create foreign key constraints
    op.create_foreign_key(
        'fk_monthly_players_user_id',
        'monthly_players', 'users',
        ['user_id'], ['id']
    )
    
    op.create_foreign_key(
        'fk_casual_players_user_id',
        'casual_players', 'users',
        ['user_id'], ['id']
    )
    
    # Update existing records with a default user_id (if any exist)
    # This would need to be customized based on your data
    # For now, we'll leave them as nullable and handle in application logic


def downgrade():
    """Remove user_id columns from monthly_players and casual_players tables"""
    # Drop foreign key constraints
    op.drop_constraint('fk_monthly_players_user_id', 'monthly_players', type_='foreignkey')
    op.drop_constraint('fk_casual_players_user_id', 'casual_players', type_='foreignkey')
    
    # Drop columns
    op.drop_column('monthly_players', 'user_id')
    op.drop_column('casual_players', 'user_id')
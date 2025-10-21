"""add initial_balance to users

Revision ID: e1a2b3c4d5f6
Revises: d5a0b37e5b49
Create Date: 2025-10-21 00:00:00

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'e1a2b3c4d5f6'
down_revision = 'd5a0b37e5b49'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    dialect = conn.dialect.name

    # Verificar se a coluna já existe (compatível com SQLite)
    try:
        cols = [r[1] for r in conn.exec_driver_sql("PRAGMA table_info('users')").fetchall()]
    except Exception:
        cols = []

    if 'initial_balance' in cols:
        # Já existe — nada a fazer
        return

    if dialect == 'sqlite':
        # Em SQLite, adicionar NOT NULL precisa vir junto com DEFAULT na mesma instrução
        # para evitar recriação completa da tabela (que quebra FKs).
        op.execute("ALTER TABLE users ADD COLUMN initial_balance NUMERIC(10,2) NOT NULL DEFAULT 0")
    else:
        # Em Postgres/MySQL podemos adicionar com NOT NULL + DEFAULT e depois
        # opcionalmente remover o DEFAULT.
        with op.batch_alter_table('users', schema=None) as batch_op:
            batch_op.add_column(sa.Column('initial_balance', sa.Numeric(10, 2), nullable=False, server_default='0'))
        # Remover default se não quiser manter
        with op.batch_alter_table('users', schema=None) as batch_op:
            batch_op.alter_column('initial_balance', server_default=None)


def downgrade():
    # Para SQLite, o drop de coluna recria tabela e pode falhar por FKs;
    # mantemos a operação padrão sabendo que em dev pode exigir ajuste manual.
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('initial_balance')
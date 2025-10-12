"""
Migration: Add monthly_fee column to players table
"""
from sqlalchemy import text
from ..services.db.connection import db


def upgrade():
    """Add monthly_fee column"""
    try:
        db.engine.execute(text(
            """
            ALTER TABLE players 
            ADD COLUMN monthly_fee NUMERIC(10, 2) NOT NULL DEFAULT 100.00;
            """
        ))
        print("✅ Migration completed: Added monthly_fee column to players table")
    except Exception as e:
        print(f"❌ Migration failed: {str(e)}")
        raise


def downgrade():
    """Remove monthly_fee column"""
    try:
        db.engine.execute(text(
            """
            ALTER TABLE players 
            DROP COLUMN IF EXISTS monthly_fee;
            """
        ))
        print("✅ Rollback completed: Removed monthly_fee column from players table")
    except Exception as e:
        print(f"❌ Rollback failed: {str(e)}")
        raise


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "downgrade":
        downgrade()
    else:
        upgrade()
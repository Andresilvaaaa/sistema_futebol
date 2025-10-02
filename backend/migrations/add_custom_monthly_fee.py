"""
Migration: Add custom_monthly_fee column to monthly_players table
"""
from sqlalchemy import text
from ..services.db.connection import db


def upgrade():
    """Add custom_monthly_fee column"""
    try:
        # Add the new column
        db.engine.execute(text("""
            ALTER TABLE monthly_players 
            ADD COLUMN custom_monthly_fee NUMERIC(10, 2) NULL;
        """))
        
        print("✅ Migration completed: Added custom_monthly_fee column to monthly_players table")
        
    except Exception as e:
        print(f"❌ Migration failed: {str(e)}")
        raise


def downgrade():
    """Remove custom_monthly_fee column"""
    try:
        # Remove the column
        db.engine.execute(text("""
            ALTER TABLE monthly_players 
            DROP COLUMN IF EXISTS custom_monthly_fee;
        """))
        
        print("✅ Rollback completed: Removed custom_monthly_fee column from monthly_players table")
        
    except Exception as e:
        print(f"❌ Rollback failed: {str(e)}")
        raise


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "downgrade":
        downgrade()
    else:
        upgrade()
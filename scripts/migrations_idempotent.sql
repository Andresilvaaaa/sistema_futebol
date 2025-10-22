-- Idempotent SQL Script for Critical Column Hotfixes
-- This script can be run multiple times safely without causing errors
-- Used as fallback when 'flask db upgrade' fails

-- Enable error handling
\set ON_ERROR_STOP on

BEGIN;

-- Log the start of the hotfix
DO $$
BEGIN
    RAISE NOTICE 'Starting idempotent column hotfix at %', NOW();
END $$;

-- 1. Add initial_balance column to users table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'initial_balance'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE users ADD COLUMN initial_balance DECIMAL(10,2) DEFAULT 0.00;
        RAISE NOTICE 'Added column: users.initial_balance';
    ELSE
        RAISE NOTICE 'Column users.initial_balance already exists';
    END IF;
END $$;

-- 2. Add monthly_fee column to users table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'monthly_fee'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE users ADD COLUMN monthly_fee DECIMAL(10,2) DEFAULT 50.00;
        RAISE NOTICE 'Added column: users.monthly_fee';
    ELSE
        RAISE NOTICE 'Column users.monthly_fee already exists';
    END IF;
END $$;

-- 3. Add custom_monthly_fee column to users table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'custom_monthly_fee'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE users ADD COLUMN custom_monthly_fee DECIMAL(10,2);
        RAISE NOTICE 'Added column: users.custom_monthly_fee';
    ELSE
        RAISE NOTICE 'Column users.custom_monthly_fee already exists';
    END IF;
END $$;

-- 4. Ensure alembic_version table exists and has proper structure
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'alembic_version'
        AND table_schema = 'public'
    ) THEN
        CREATE TABLE alembic_version (
            version_num VARCHAR(32) NOT NULL,
            CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
        );
        RAISE NOTICE 'Created alembic_version table';
    ELSE
        RAISE NOTICE 'Table alembic_version already exists';
    END IF;
END $$;

-- 5. Update Alembic version to reflect the current state
-- Note: This gets the latest migration file version dynamically
DO $$
DECLARE
    latest_version VARCHAR(32);
    current_version VARCHAR(32);
BEGIN
    -- Get current version from alembic_version table
    SELECT version_num INTO current_version FROM alembic_version LIMIT 1;
    
    -- For safety, we'll only update if there's no current version
    -- In production, you should set this to the actual latest migration version
    IF current_version IS NULL THEN
        -- Insert a placeholder version - this should be updated to match your latest migration
        -- You can get this by running: flask db current
        INSERT INTO alembic_version (version_num) 
        VALUES ('head') -- This will be updated by the next proper migration
        ON CONFLICT (version_num) DO NOTHING;
        
        RAISE NOTICE 'Set Alembic version to head (will be updated by next migration)';
    ELSE
        RAISE NOTICE 'Alembic version already set to: %', current_version;
    END IF;
END $$;

-- 6. Verify all critical columns exist
DO $$
DECLARE
    missing_columns TEXT[] := ARRAY[]::TEXT[];
    col_name TEXT;
BEGIN
    -- Check for missing critical columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'initial_balance') THEN
        missing_columns := array_append(missing_columns, 'users.initial_balance');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'monthly_fee') THEN
        missing_columns := array_append(missing_columns, 'users.monthly_fee');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'custom_monthly_fee') THEN
        missing_columns := array_append(missing_columns, 'users.custom_monthly_fee');
    END IF;
    
    -- Report results
    IF array_length(missing_columns, 1) IS NULL THEN
        RAISE NOTICE 'All critical columns verified successfully';
    ELSE
        FOREACH col_name IN ARRAY missing_columns
        LOOP
            RAISE WARNING 'Critical column still missing: %', col_name;
        END LOOP;
        RAISE EXCEPTION 'Some critical columns are still missing after hotfix';
    END IF;
END $$;

-- Log completion
DO $$
BEGIN
    RAISE NOTICE 'Idempotent column hotfix completed successfully at %', NOW();
END $$;

COMMIT;

-- Final verification query
SELECT 
    'users' as table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name IN ('initial_balance', 'monthly_fee', 'custom_monthly_fee')
ORDER BY column_name;
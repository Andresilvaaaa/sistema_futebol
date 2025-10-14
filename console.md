25-10-14 01:18:46,242 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:18:46,243 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 01:18:46,243 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:18:46,244 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 01:18:46,244 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:18:46,244 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 01:18:46,244 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:18:46,244 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 01:18:46,245 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:18:46,245 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 01:18:46,245 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:18:46,245 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 01:18:46,245] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Serving Flask app 'app.py'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
[2025-10-14 01:18:47,477] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 01:18:47,479 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:18:47,481 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 01:18:47,482 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:18:47,483 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 01:18:47,484 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:18:47,484 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 01:18:47,484 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:18:47,484 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 01:18:47,485 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:18:47,485 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 01:18:47,485 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:18:47,485 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 01:18:47,485 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:18:47,486 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 01:18:47,486] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Debugger is active!
 * Debugger PIN: 454-874-479
C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\flask_sqlalchemy\model.py:22: SAWarning: relationship 'MonthlyPlayer.user' will copy column users.id to column monthly_players.user_id, which conflicts with relationship(s): 'MonthlyPeriod.monthly_players' (copies monthly_periods.user_id to monthly_players.user_id). If this is not the intention, consider if these relationships should be linked with back_populates, or if viewonly=True should be applied to one or more if they are read-only. For the less common case that foreign key constraints are partially overlapping, the orm.foreign() annotation can be used to isolate the columns that should be written towards.   To silence this warning, add the parameter 'overlaps="monthly_players"' to the 'MonthlyPlayer.user' relationship. (Background on this warning at: https://sqlalche.me/e/20/qzyx) (This warning originated from the `configure_mappers()` process, which was invoked automatically in response to a user-initiated operation.)
  return cls.query_class(
2025-10-14 01:19:10,092 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:10,095 INFO sqlalchemy.engine.Engine SELECT users.id AS users_id, users.username AS users_username, users.email AS users_email, users.password_hash AS users_password_hash, users.is_active AS users_is_active, users.created_at AS users_created_at, users.updated_at AS users_updated_at
FROM users
WHERE users.email = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:10,096 INFO sqlalchemy.engine.Engine [generated in 0.00035s] ('testehoje@gmail.com', 1, 0)
[2025-10-14 01:19:10,241] INFO in __init__: [Perf][Request] POST /api/auth/login -> 200 in 174ms
2025-10-14 01:19:10,241 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:10] "POST /api/auth/login HTTP/1.1" 200 -
[2025-10-14 01:19:20,388] INFO in __init__: [Perf][Request] OPTIONS /api/players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:20] "OPTIONS /api/players?per_page=100 HTTP/1.1" 200 -
[2025-10-14 01:19:20,389] INFO in __init__: [Perf][Request] OPTIONS /api/players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:20] "OPTIONS /api/players?per_page=100 HTTP/1.1" 200 -
[2025-10-14 01:19:20,389] INFO in __init__: [Perf][Request] OPTIONS /api/stats/players -> 200 in 0ms      
127.0.0.1 - - [14/Oct/2025 01:19:20] "OPTIONS /api/stats/players HTTP/1.1" 200 -
[2025-10-14 01:19:20,390] INFO in __init__: [Perf][Request] OPTIONS /api/stats/players -> 200 in 0ms      
127.0.0.1 - - [14/Oct/2025 01:19:20] "OPTIONS /api/stats/players HTTP/1.1" 200 -
2025-10-14 01:19:20,656 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:20,657 INFO sqlalchemy.engine.Engine SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:20,658 INFO sqlalchemy.engine.Engine [generated in 0.00031s] ('6307e26d-166b-4892-8a10-133510bb6516', 100, 0)
2025-10-14 01:19:20,661 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ?) AS anon_1
2025-10-14 01:19:20,661 INFO sqlalchemy.engine.Engine [generated in 0.00025s] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 01:19:20,668] INFO in __init__: [Perf][Request] GET /api/players -> 200 in 13ms
2025-10-14 01:19:20,669 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:20] "GET /api/players?per_page=100 HTTP/1.1" 200 -
2025-10-14 01:19:20,711 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:20,715 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1 
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 01:19:20,718 INFO sqlalchemy.engine.Engine [generated in 0.00367s] ('6307e26d-166b-4892-8a10-133510bb6516', 'active')
2025-10-14 01:19:20,722 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:20,723 INFO sqlalchemy.engine.Engine SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:20,724 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 01:19:20,724 INFO sqlalchemy.engine.Engine [cached since 0.06664s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 100, 0)
2025-10-14 01:19:20,724 INFO sqlalchemy.engine.Engine [cached since 0.00948s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'inactive')
2025-10-14 01:19:20,726 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 01:19:20,726 INFO sqlalchemy.engine.Engine [cached since 0.01112s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'pending')
2025-10-14 01:19:20,727 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ?) AS anon_1
2025-10-14 01:19:20,727 INFO sqlalchemy.engine.Engine [cached since 0.06604s ago] ('6307e26d-166b-4892-8a10-133510bb6516',)
2025-10-14 01:19:20,728 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
[2025-10-14 01:19:20,729] INFO in __init__: [Perf][Request] GET /api/players -> 200 in 13ms
2025-10-14 01:19:20,729 INFO sqlalchemy.engine.Engine [cached since 0.01471s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'delayed')
2025-10-14 01:19:20,730 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:20] "GET /api/players?per_page=100 HTTP/1.1" 200 -
2025-10-14 01:19:20,732 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ?) AS anon_1
2025-10-14 01:19:20,734 INFO sqlalchemy.engine.Engine [cached since 0.07349s ago] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 01:19:20,736] INFO in __init__: [Perf][Request] GET /api/stats/players -> 200 in 26ms
2025-10-14 01:19:20,736 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:20] "GET /api/stats/players HTTP/1.1" 200 -
2025-10-14 01:19:20,988 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:20,988 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1 
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 01:19:20,989 INFO sqlalchemy.engine.Engine [cached since 0.274s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'active')
2025-10-14 01:19:20,990 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 01:19:20,990 INFO sqlalchemy.engine.Engine [cached since 0.275s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'inactive')
2025-10-14 01:19:20,990 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 01:19:20,991 INFO sqlalchemy.engine.Engine [cached since 0.2759s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'pending')
2025-10-14 01:19:20,991 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 01:19:20,991 INFO sqlalchemy.engine.Engine [cached since 0.2767s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'delayed')
2025-10-14 01:19:20,992 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ?) AS anon_1
2025-10-14 01:19:20,992 INFO sqlalchemy.engine.Engine [cached since 0.3312s ago] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 01:19:20,993] INFO in __init__: [Perf][Request] GET /api/stats/players -> 200 in 5ms
2025-10-14 01:19:20,993 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:20] "GET /api/stats/players HTTP/1.1" 200 -
[2025-10-14 01:19:27,439] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:27] "OPTIONS /api/monthly-periods?year=2025&month=10 HTTP/1.1" 200 -
2025-10-14 01:19:27,753 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:27,754 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? AND monthly_periods.year = ? AND monthly_periods.month = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 01:19:27,755 INFO sqlalchemy.engine.Engine [generated in 0.00033s] ('6307e26d-166b-4892-8a10-133510bb6516', 2025, 10)
[2025-10-14 01:19:27,755] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 3ms        
2025-10-14 01:19:27,756 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:27] "GET /api/monthly-periods?year=2025&month=10 HTTP/1.1" 200 -
2025-10-14 01:19:28,019 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:28,019 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? AND monthly_periods.year = ? AND monthly_periods.month = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 01:19:28,019 INFO sqlalchemy.engine.Engine [cached since 0.2649s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 2025, 10)
[2025-10-14 01:19:28,020] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 1ms        
2025-10-14 01:19:28,020 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:28] "GET /api/monthly-periods?year=2025&month=10 HTTP/1.1" 200 -
[2025-10-14 01:19:28,070] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:28] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players?params=[object+Object] HTTP/1.1" 200 -
[2025-10-14 01:19:28,071] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:28] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players?params=[object+Object] HTTP/1.1" 200 -

🔍 [FLASK] get_monthly_period_players - INÍCIO
🔍 [FLASK] period_id recebido: 317a4f44-aa20-493d-a0b0-e3d7b802a002
🔍 [FLASK] current_user_id: 6307e26d-166b-4892-8a10-133510bb6516
2025-10-14 01:19:28,326 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:28,327 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:28,327 INFO sqlalchemy.engine.Engine [generated in 0.00031s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
✅ [FLASK] Período encontrado: 10/2025 (10/2025)
🔍 [FLASK] Período players_count: 2
🔍 [FLASK] Query SQL: SELECT monthly_players.id AS monthly_players_id, monthly_players.player_id AS monthly_players_player_id, monthly_players.monthly_period_id AS monthly_players_monthly_period_id, monthly_players.user_id AS monthly_players_user_id, monthly_players.player_name AS monthly_players_player_name, monthly_players.position AS monthly_players_position, monthly_players.phone AS monthly_players_phone, monthly_players.email AS monthly_players_email, monthly_players.monthly_fee AS monthly_players_monthly_fee, monthly_players.custom_monthly_fee AS monthly_players_custom_monthly_fee, monthly_players.join_date AS monthly_players_join_date, monthly_players.status AS monthly_players_status, monthly_players.payment_date AS monthly_players_payment_date, monthly_players.pending_months_count AS monthly_players_pending_months_count, monthly_players.created_at AS monthly_players_created_at, monthly_players.updated_at AS monthly_players_updated_at
FROM monthly_players
WHERE monthly_players.monthly_period_id = ? AND monthly_players.user_id = ?
2025-10-14 01:19:28,331 INFO sqlalchemy.engine.Engine SELECT monthly_players.id AS monthly_players_id, monthly_players.player_id AS monthly_players_player_id, monthly_players.monthly_period_id AS monthly_players_monthly_period_id, monthly_players.user_id AS monthly_players_user_id, monthly_players.player_name AS monthly_players_player_name, monthly_players.position AS monthly_players_position, monthly_players.phone AS monthly_players_phone, monthly_players.email AS monthly_players_email, monthly_players.monthly_fee AS monthly_players_monthly_fee, monthly_players.custom_monthly_fee AS monthly_players_custom_monthly_fee, monthly_players.join_date AS monthly_players_join_date, monthly_players.status AS monthly_players_status, monthly_players.payment_date AS monthly_players_payment_date, monthly_players.pending_months_count AS monthly_players_pending_months_count, monthly_players.created_at AS monthly_players_created_at, monthly_players.updated_at AS monthly_players_updated_at
FROM monthly_players
WHERE monthly_players.monthly_period_id = ? AND monthly_players.user_id = ?
2025-10-14 01:19:28,331 INFO sqlalchemy.engine.Engine [generated in 0.00038s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
🔍 [FLASK] Quantidade de jogadores encontrados na query: 1
🔍 [FLASK] Primeiro jogador encontrado:
  - ID: ea5045e2-1eb4-4d40-a0d3-29f96c0c210a
  - Player ID: 0059cc3b-7dc0-4737-8925-0b17c025331e
  - Nome: ANDRE
  - Monthly Period ID: 317a4f44-aa20-493d-a0b0-e3d7b802a002
  - User ID: 6307e26d-166b-4892-8a10-133510bb6516
  - Status: paid
2025-10-14 01:19:28,339 INFO sqlalchemy.engine.Engine SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.id = ?
2025-10-14 01:19:28,339 INFO sqlalchemy.engine.Engine [generated in 0.00041s] ('0059cc3b-7dc0-4737-8925-0b17c025331e',)
🔍 [FLASK] Resultado final sendo retornado: 1 jogadores
🔍 [FLASK] Dados do resultado: [{'id': 'ea5045e2-1eb4-4d40-a0d3-29f96c0c210a', 'player_id': '0059cc3b-7dc0-4737-8925-0b17c025331e', 'monthly_period_id': '317a4f44-aa20-493d-a0b0-e3d7b802a002', 'player_name': 'ANDRE', 'position': 'forward', 'phone': '19999999999', 'email': '', 'monthly_fee': 50.0, 'status': 'paid', 'payment_date': '2025-10-13T18:06:21.814556', 'created_at': '2025-10-13T13:45:34.995988', 'updated_at': '2025-10-13T18:06:21.814565', 'player': {'id': '0059cc3b-7dc0-4737-8925-0b17c025331e', 'name': 'ANDRE', 'email': None, 'phone': '19999999999', 'position': 'forward', 'monthly_fee': 100.0, 'status': 'active'}}]       
[2025-10-14 01:19:28,340] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 200 in 15ms
2025-10-14 01:19:28,341 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:28] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players?params=[object+Object] HTTP/1.1" 200 -

🔍 [FLASK] get_monthly_period_players - INÍCIO
🔍 [FLASK] period_id recebido: 317a4f44-aa20-493d-a0b0-e3d7b802a002
🔍 [FLASK] current_user_id: 6307e26d-166b-4892-8a10-133510bb6516
2025-10-14 01:19:28,376 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:28,376 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:28,376 INFO sqlalchemy.engine.Engine [cached since 0.04981s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
✅ [FLASK] Período encontrado: 10/2025 (10/2025)
🔍 [FLASK] Período players_count: 2
🔍 [FLASK] Query SQL: SELECT monthly_players.id AS monthly_players_id, monthly_players.player_id AS monthly_players_player_id, monthly_players.monthly_period_id AS monthly_players_monthly_period_id, monthly_players.user_id AS monthly_players_user_id, monthly_players.player_name AS monthly_players_player_name, monthly_players.position AS monthly_players_position, monthly_players.phone AS monthly_players_phone, monthly_players.email AS monthly_players_email, monthly_players.monthly_fee AS monthly_players_monthly_fee, monthly_players.custom_monthly_fee AS monthly_players_custom_monthly_fee, monthly_players.join_date AS monthly_players_join_date, monthly_players.status AS monthly_players_status, monthly_players.payment_date AS monthly_players_payment_date, monthly_players.pending_months_count AS monthly_players_pending_months_count, monthly_players.created_at AS monthly_players_created_at, monthly_players.updated_at AS monthly_players_updated_at
FROM monthly_players
WHERE monthly_players.monthly_period_id = ? AND monthly_players.user_id = ?
2025-10-14 01:19:28,378 INFO sqlalchemy.engine.Engine SELECT monthly_players.id AS monthly_players_id, monthly_players.player_id AS monthly_players_player_id, monthly_players.monthly_period_id AS monthly_players_monthly_period_id, monthly_players.user_id AS monthly_players_user_id, monthly_players.player_name AS monthly_players_player_name, monthly_players.position AS monthly_players_position, monthly_players.phone AS monthly_players_phone, monthly_players.email AS monthly_players_email, monthly_players.monthly_fee AS monthly_players_monthly_fee, monthly_players.custom_monthly_fee AS monthly_players_custom_monthly_fee, monthly_players.join_date AS monthly_players_join_date, monthly_players.status AS monthly_players_status, monthly_players.payment_date AS monthly_players_payment_date, monthly_players.pending_months_count AS monthly_players_pending_months_count, monthly_players.created_at AS monthly_players_created_at, monthly_players.updated_at AS monthly_players_updated_at
FROM monthly_players
WHERE monthly_players.monthly_period_id = ? AND monthly_players.user_id = ?
2025-10-14 01:19:28,379 INFO sqlalchemy.engine.Engine [cached since 0.0476s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
🔍 [FLASK] Quantidade de jogadores encontrados na query: 1
🔍 [FLASK] Primeiro jogador encontrado:
  - ID: ea5045e2-1eb4-4d40-a0d3-29f96c0c210a
  - Player ID: 0059cc3b-7dc0-4737-8925-0b17c025331e
  - Nome: ANDRE
  - Monthly Period ID: 317a4f44-aa20-493d-a0b0-e3d7b802a002
  - User ID: 6307e26d-166b-4892-8a10-133510bb6516
  - Status: paid
2025-10-14 01:19:28,380 INFO sqlalchemy.engine.Engine SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.id = ?
2025-10-14 01:19:28,380 INFO sqlalchemy.engine.Engine [cached since 0.04146s ago] ('0059cc3b-7dc0-4737-8925-0b17c025331e',)
🔍 [FLASK] Resultado final sendo retornado: 1 jogadores
🔍 [FLASK] Dados do resultado: [{'id': 'ea5045e2-1eb4-4d40-a0d3-29f96c0c210a', 'player_id': '0059cc3b-7dc0-4737-8925-0b17c025331e', 'monthly_period_id': '317a4f44-aa20-493d-a0b0-e3d7b802a002', 'player_name': 'ANDRE', 'position': 'forward', 'phone': '19999999999', 'email': '', 'monthly_fee': 50.0, 'status': 'paid', 'payment_date': '2025-10-13T18:06:21.814556', 'created_at': '2025-10-13T13:45:34.995988', 'updated_at': '2025-10-13T18:06:21.814565', 'player': {'id': '0059cc3b-7dc0-4737-8925-0b17c025331e', 'name': 'ANDRE', 'email': None, 'phone': '19999999999', 'position': 'forward', 'monthly_fee': 100.0, 'status': 'active'}}]       
[2025-10-14 01:19:28,381] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 200 in 6ms
2025-10-14 01:19:28,381 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:28] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players?params=[object+Object] HTTP/1.1" 200 -
[2025-10-14 01:19:28,649] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:28] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players HTTP/1.1" 200 -
[2025-10-14 01:19:28,653] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:28] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players HTTP/1.1" 200 -
2025-10-14 01:19:28,729 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:28,729 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:28,729 INFO sqlalchemy.engine.Engine [cached since 0.4025s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:28,731 INFO sqlalchemy.engine.Engine SELECT casual_players.id AS casual_players_id, casual_players.monthly_period_id AS casual_players_monthly_period_id, casual_players.user_id AS casual_players_user_id, casual_players.player_name AS casual_players_player_name, casual_players.play_date AS casual_players_play_date, casual_players.invited_by AS casual_players_invited_by, casual_players.amount AS casual_players_amount, casual_players.status AS casual_players_status, casual_players.payment_date AS casual_players_payment_date, casual_players.created_at AS casual_players_created_at, casual_players.updated_at AS casual_players_updated_at
FROM casual_players
WHERE casual_players.monthly_period_id = ? AND casual_players.user_id = ?
2025-10-14 01:19:28,731 INFO sqlalchemy.engine.Engine [generated in 0.00029s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:19:28,734] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 200 in 6ms
2025-10-14 01:19:28,735 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:28] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players HTTP/1.1" 200 -
2025-10-14 01:19:28,963 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:28,963 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:28,963 INFO sqlalchemy.engine.Engine [cached since 0.6366s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:28,964 INFO sqlalchemy.engine.Engine SELECT casual_players.id AS casual_players_id, casual_players.monthly_period_id AS casual_players_monthly_period_id, casual_players.user_id AS casual_players_user_id, casual_players.player_name AS casual_players_player_name, casual_players.play_date AS casual_players_play_date, casual_players.invited_by AS casual_players_invited_by, casual_players.amount AS casual_players_amount, casual_players.status AS casual_players_status, casual_players.payment_date AS casual_players_payment_date, casual_players.created_at AS casual_players_created_at, casual_players.updated_at AS casual_players_updated_at
FROM casual_players
WHERE casual_players.monthly_period_id = ? AND casual_players.user_id = ?
2025-10-14 01:19:28,964 INFO sqlalchemy.engine.Engine [cached since 0.2334s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:19:28,965] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 200 in 2ms
2025-10-14 01:19:28,965 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:28] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players HTTP/1.1" 200 -
[2025-10-14 01:19:29,041] INFO in __init__: [Perf][Request] OPTIONS /api/stats/payments/2025/10 -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:29] "OPTIONS /api/stats/payments/2025/10 HTTP/1.1" 200 -
[2025-10-14 01:19:29,042] INFO in __init__: [Perf][Request] OPTIONS /api/stats/payments/2025/10 -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:29] "OPTIONS /api/stats/payments/2025/10 HTTP/1.1" 200 -
2025-10-14 01:19:29,277 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:29,278 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.year = ? AND monthly_periods.month = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:29,278 INFO sqlalchemy.engine.Engine [generated in 0.00033s] (2025, 10, '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:29,279 INFO sqlalchemy.engine.Engine SELECT monthly_players.id AS monthly_players_id, monthly_players.player_id AS monthly_players_player_id, monthly_players.monthly_period_id AS monthly_players_monthly_period_id, monthly_players.user_id AS monthly_players_user_id, monthly_players.player_name AS monthly_players_player_name, monthly_players.position AS monthly_players_position, monthly_players.phone AS monthly_players_phone, monthly_players.email AS monthly_players_email, monthly_players.monthly_fee AS monthly_players_monthly_fee, monthly_players.custom_monthly_fee AS monthly_players_custom_monthly_fee, monthly_players.join_date AS monthly_players_join_date, monthly_players.status AS monthly_players_status, monthly_players.payment_date AS monthly_players_payment_date, monthly_players.pending_months_count AS monthly_players_pending_months_count, monthly_players.created_at AS monthly_players_created_at, monthly_players.updated_at AS monthly_players_updated_at
FROM monthly_players
WHERE monthly_players.monthly_period_id = ? AND monthly_players.user_id = ?
2025-10-14 01:19:29,280 INFO sqlalchemy.engine.Engine [cached since 0.9487s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:19:29,281] INFO in __init__: [Perf][Request] GET /api/stats/payments/2025/10 -> 200 in 4ms 
2025-10-14 01:19:29,282 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:29] "GET /api/stats/payments/2025/10 HTTP/1.1" 200 -
2025-10-14 01:19:29,355 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:29,355 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.year = ? AND monthly_periods.month = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:29,356 INFO sqlalchemy.engine.Engine [cached since 0.0782s ago] (2025, 10, '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:29,357 INFO sqlalchemy.engine.Engine SELECT monthly_players.id AS monthly_players_id, monthly_players.player_id AS monthly_players_player_id, monthly_players.monthly_period_id AS monthly_players_monthly_period_id, monthly_players.user_id AS monthly_players_user_id, monthly_players.player_name AS monthly_players_player_name, monthly_players.position AS monthly_players_position, monthly_players.phone AS monthly_players_phone, monthly_players.email AS monthly_players_email, monthly_players.monthly_fee AS monthly_players_monthly_fee, monthly_players.custom_monthly_fee AS monthly_players_custom_monthly_fee, monthly_players.join_date AS monthly_players_join_date, monthly_players.status AS monthly_players_status, monthly_players.payment_date AS monthly_players_payment_date, monthly_players.pending_months_count AS monthly_players_pending_months_count, monthly_players.created_at AS monthly_players_created_at, monthly_players.updated_at AS monthly_players_updated_at
FROM monthly_players
WHERE monthly_players.monthly_period_id = ? AND monthly_players.user_id = ?
2025-10-14 01:19:29,357 INFO sqlalchemy.engine.Engine [cached since 1.026s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:19:29,358] INFO in __init__: [Perf][Request] GET /api/stats/payments/2025/10 -> 200 in 3ms 
2025-10-14 01:19:29,358 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:29] "GET /api/stats/payments/2025/10 HTTP/1.1" 200 -
[2025-10-14 01:19:31,183] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:31] "OPTIONS /api/monthly-periods HTTP/1.1" 200 -
2025-10-14 01:19:31,497 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:31,499 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 01:19:31,499 INFO sqlalchemy.engine.Engine [generated in 0.00042s] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 01:19:31,500] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 3ms        
2025-10-14 01:19:31,500 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:31] "GET /api/monthly-periods HTTP/1.1" 200 -
2025-10-14 01:19:31,762 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:31,763 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 01:19:31,763 INFO sqlalchemy.engine.Engine [cached since 0.2646s ago] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 01:19:31,765] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 3ms        
2025-10-14 01:19:31,765 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:31] "GET /api/monthly-periods HTTP/1.1" 200 -
[2025-10-14 01:19:31,810] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:31] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:31,811] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:31] "OPTIONS /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:31,812] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:31] "OPTIONS /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:31,812] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:31] "OPTIONS /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:31,813] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:31] "OPTIONS /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:32,075] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:32] "OPTIONS /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:32,127] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:32] "OPTIONS /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:32,127] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:32] "OPTIONS /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:32,128] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:32] "OPTIONS /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:32,128] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:32] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:32,129] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:32] "OPTIONS /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:32,390] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:32] "OPTIONS /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:32,438] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:32] "OPTIONS /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses HTTP/1.1" 200 -
2025-10-14 01:19:32,442 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:32,442 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
[2025-10-14 01:19:32,439] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:19:32] "OPTIONS /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses HTTP/1.1" 200 -
2025-10-14 01:19:32,442 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:32,443 INFO sqlalchemy.engine.Engine [cached since 4.116s ago] ('211ec706-f5bf-4a53-b906-6f19877c6600', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:32,443 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:32,446 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:32,446 INFO sqlalchemy.engine.Engine [cached since 4.12s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:32,448 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:19:32,448 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:32,448 INFO sqlalchemy.engine.Engine [generated in 0.00059s] ('211ec706-f5bf-4a53-b906-6f19877c6600', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:19:32,449 INFO sqlalchemy.engine.Engine [cached since 4.122s ago] ('9d9b8ac5-fe6e-484b-9729-b7652782bc4a', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:32,449 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
[2025-10-14 01:19:32,450] INFO in __init__: [Perf][Request] GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 200 in 9ms
2025-10-14 01:19:32,450 INFO sqlalchemy.engine.Engine [cached since 0.002317s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:19:32,450 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:32] "GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:32,451] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 12ms
2025-10-14 01:19:32,452 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:19:32,453 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:32] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
2025-10-14 01:19:32,453 INFO sqlalchemy.engine.Engine [cached since 0.004902s ago] ('9d9b8ac5-fe6e-484b-9729-b7652782bc4a', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:19:32,458] INFO in __init__: [Perf][Request] GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 200 in 13ms
2025-10-14 01:19:32,458 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:32] "GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses HTTP/1.1" 200 -
2025-10-14 01:19:32,708 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:32,708 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:32,708 INFO sqlalchemy.engine.Engine [cached since 4.382s ago] ('f8c0022b-fd8f-49cb-8a54-ece546d15389', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:32,709 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:19:32,709 INFO sqlalchemy.engine.Engine [cached since 0.2615s ago] ('f8c0022b-fd8f-49cb-8a54-ece546d15389', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:19:32,710] INFO in __init__: [Perf][Request] GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 200 in 2ms
2025-10-14 01:19:32,710 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:32] "GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses HTTP/1.1" 200 -
2025-10-14 01:19:32,755 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:32,755 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:32,756 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:32,756 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:32,757 INFO sqlalchemy.engine.Engine [cached since 4.431s ago] ('8b278aa0-a6ab-488f-bb55-491255ed2072', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:32,757 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:32,758 INFO sqlalchemy.engine.Engine [cached since 4.431s ago] ('8fde156b-43b2-4c7b-a4bc-1896c597bf04', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:32,758 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:32,759 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:19:32,759 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:19:32,759 INFO sqlalchemy.engine.Engine [cached since 4.433s ago] ('369deb54-5467-4e5f-8c66-1a8932105ded', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:32,759 INFO sqlalchemy.engine.Engine [cached since 0.3116s ago] ('8b278aa0-a6ab-488f-bb55-491255ed2072', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:19:32,760 INFO sqlalchemy.engine.Engine [cached since 0.3118s ago] ('8fde156b-43b2-4c7b-a4bc-1896c597bf04', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:19:32,761] INFO in __init__: [Perf][Request] GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 200 in 6ms
2025-10-14 01:19:32,762 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:32] "GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses HTTP/1.1" 200 -
2025-10-14 01:19:32,763 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
[2025-10-14 01:19:32,763] INFO in __init__: [Perf][Request] GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 200 in 7ms
2025-10-14 01:19:32,763 INFO sqlalchemy.engine.Engine [cached since 0.3155s ago] ('369deb54-5467-4e5f-8c66-1a8932105ded', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:19:32,764 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:32] "GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:32,765] INFO in __init__: [Perf][Request] GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 200 in 7ms
2025-10-14 01:19:32,766 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:32,766 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:32] "GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses HTTP/1.1" 200 -
2025-10-14 01:19:32,767 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:32,769 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:32,770 INFO sqlalchemy.engine.Engine [cached since 4.443s ago] ('211ec706-f5bf-4a53-b906-6f19877c6600', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:32,770 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:32,770 INFO sqlalchemy.engine.Engine [cached since 4.444s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:32,772 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:19:32,772 INFO sqlalchemy.engine.Engine [cached since 0.3242s ago] ('211ec706-f5bf-4a53-b906-6f19877c6600', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:19:32,773 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:19:32,773 INFO sqlalchemy.engine.Engine [cached since 0.3249s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:19:32,773] INFO in __init__: [Perf][Request] GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 200 in 8ms
2025-10-14 01:19:32,775 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:32] "GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:32,776] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 7ms
2025-10-14 01:19:32,777 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:32] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
2025-10-14 01:19:33,021 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:33,022 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:33,022 INFO sqlalchemy.engine.Engine [cached since 4.695s ago] ('9d9b8ac5-fe6e-484b-9729-b7652782bc4a', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:33,023 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:19:33,023 INFO sqlalchemy.engine.Engine [cached since 0.5751s ago] ('9d9b8ac5-fe6e-484b-9729-b7652782bc4a', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:19:33,023] INFO in __init__: [Perf][Request] GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 200 in 2ms
2025-10-14 01:19:33,024 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:33] "GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses HTTP/1.1" 200 -
2025-10-14 01:19:33,071 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:33,071 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:33,072 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:33,072 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:33,072 INFO sqlalchemy.engine.Engine [cached since 4.746s ago] ('f8c0022b-fd8f-49cb-8a54-ece546d15389', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:33,073 INFO sqlalchemy.engine.Engine [cached since 4.746s ago] ('8b278aa0-a6ab-488f-bb55-491255ed2072', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:33,073 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:19:33,074 INFO sqlalchemy.engine.Engine [cached since 0.6258s ago] ('f8c0022b-fd8f-49cb-8a54-ece546d15389', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:19:33,074 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:19:33,074 INFO sqlalchemy.engine.Engine [cached since 0.6264s ago] ('8b278aa0-a6ab-488f-bb55-491255ed2072', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:19:33,075] INFO in __init__: [Perf][Request] GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 200 in 4ms
2025-10-14 01:19:33,075 INFO sqlalchemy.engine.Engine ROLLBACK
[2025-10-14 01:19:33,075] INFO in __init__: [Perf][Request] GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 200 in 4ms
127.0.0.1 - - [14/Oct/2025 01:19:33] "GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses HTTP/1.1" 200 -
2025-10-14 01:19:33,076 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:33] "GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses HTTP/1.1" 200 -
2025-10-14 01:19:33,079 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:33,080 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:33,081 INFO sqlalchemy.engine.Engine [cached since 4.754s ago] ('8fde156b-43b2-4c7b-a4bc-1896c597bf04', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:33,083 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:19:33,083 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:19:33,084 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:19:33,084 INFO sqlalchemy.engine.Engine [cached since 4.758s ago] ('369deb54-5467-4e5f-8c66-1a8932105ded', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:19:33,085 INFO sqlalchemy.engine.Engine [cached since 0.6368s ago] ('8fde156b-43b2-4c7b-a4bc-1896c597bf04', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:19:33,086 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
[2025-10-14 01:19:33,086] INFO in __init__: [Perf][Request] GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 200 in 8ms
2025-10-14 01:19:33,086 INFO sqlalchemy.engine.Engine [cached since 0.6382s ago] ('369deb54-5467-4e5f-8c66-1a8932105ded', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:19:33,086 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:33] "GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses HTTP/1.1" 200 -
[2025-10-14 01:19:33,087] INFO in __init__: [Perf][Request] GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 200 in 4ms
2025-10-14 01:19:33,087 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:19:33] "GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses HTTP/1.1" 200 -

venv) (TraeAI-9) C:\Users\ANDREE\Desktop\sistema_futebol\backend [0:0] $ flask run
[2025-10-14 01:20:10,271] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 01:20:10,272 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:10,273 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 01:20:10,273 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:10,274 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 01:20:10,274 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:10,274 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 01:20:10,274 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:10,274 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 01:20:10,275 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:10,275 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 01:20:10,275 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:10,275 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 01:20:10,275 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:10,276 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 01:20:10,276] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Serving Flask app 'app.py'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
[2025-10-14 01:20:11,466] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 01:20:11,468 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:11,468 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 01:20:11,468 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:11,469 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 01:20:11,469 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:11,470 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 01:20:11,470 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:11,470 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 01:20:11,470 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:11,470 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 01:20:11,471 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:11,471 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 01:20:11,471 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:11,472 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 01:20:11,472] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Debugger is active!
 * Debugger PIN: 454-874-479
[2025-10-14 01:20:13,423] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:13] "OPTIONS /api/monthly-periods?month=10&year=2025 HTTP/1.1" 200 -
[2025-10-14 01:20:13,424] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods -> 200 in 0ms    
127.0.0.1 - - [14/Oct/2025 01:20:13] "OPTIONS /api/monthly-periods?month=10&year=2025 HTTP/1.1" 200 -     
C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\flask_sqlalchemy\model.py:22: SAWarning: relationship 'MonthlyPlayer.user' will copy column users.id to column monthly_players.user_id, which conflicts with relationship(s): 'MonthlyPeriod.monthly_players' (copies monthly_periods.user_id to monthly_players.user_id). If this is not the intention, consider if these relationships should be linked with back_populates, or if viewonly=True should be applied to one or more if they are read-only. For the less common case that foreign key constraints are partially overlapping, the orm.foreign() annotation can be used to isolate the columns that should be written towards.   To silence this warning, add the parameter 'overlaps="monthly_players"' to the 'MonthlyPlayer.user' relationship. (Background on this warning at: https://sqlalche.me/e/20/qzyx) (This warning originated from the `configure_mappers()` process, which was invoked automatically in response to a user-initiated operation.)
  return cls.query_class(
2025-10-14 01:20:13,723 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:13,726 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? AND monthly_periods.year = ? AND monthly_periods.month = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 01:20:13,727 INFO sqlalchemy.engine.Engine [generated in 0.00037s] ('6307e26d-166b-4892-8a10-133510bb6516', 2025, 10)
[2025-10-14 01:20:13,728] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 36ms       
2025-10-14 01:20:13,728 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:13] "GET /api/monthly-periods?month=10&year=2025 HTTP/1.1" 200 -
2025-10-14 01:20:13,732 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:13,733 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? AND monthly_periods.year = ? AND monthly_periods.month = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 01:20:13,734 INFO sqlalchemy.engine.Engine [cached since 0.007655s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 2025, 10)
[2025-10-14 01:20:13,735] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 4ms        
2025-10-14 01:20:13,736 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:13] "GET /api/monthly-periods?month=10&year=2025 HTTP/1.1" 200 -
[2025-10-14 01:20:14,037] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:14] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:14,053] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:14] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
2025-10-14 01:20:14,352 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:14,353 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:14,354 INFO sqlalchemy.engine.Engine [generated in 0.00033s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:14,356 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:20:14,356 INFO sqlalchemy.engine.Engine [generated in 0.00027s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:20:14,357] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 5ms
2025-10-14 01:20:14,357 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:14] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
2025-10-14 01:20:14,666 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:14,667 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:14,667 INFO sqlalchemy.engine.Engine [cached since 0.3137s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:14,668 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:20:14,668 INFO sqlalchemy.engine.Engine [cached since 0.3128s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:20:14,669] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 3ms
2025-10-14 01:20:14,669 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:14] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -



venv) (TraeAI-9) C:\Users\ANDREE\Desktop\sistema_futebol\backend [0:0] $ flask run
[2025-10-14 01:20:28,352] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 01:20:28,353 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:28,353 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 01:20:28,354 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:28,354 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 01:20:28,355 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:28,355 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 01:20:28,355 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:28,355 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 01:20:28,355 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:28,356 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 01:20:28,356 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:28,356 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 01:20:28,356 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:28,356 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 01:20:28,357] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Serving Flask app 'app.py'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
[2025-10-14 01:20:29,457] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 01:20:29,458 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:29,458 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 01:20:29,458 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:29,460 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 01:20:29,460 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:29,460 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 01:20:29,460 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:29,461 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 01:20:29,461 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:29,461 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 01:20:29,461 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:29,461 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 01:20:29,462 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:20:29,462 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 01:20:29,462] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Debugger is active!
 * Debugger PIN: 454-874-479
[2025-10-14 01:20:34,980] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:34] "OPTIONS /api/monthly-periods HTTP/1.1" 200 -
[2025-10-14 01:20:34,983] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods -> 200 in 0ms    
127.0.0.1 - - [14/Oct/2025 01:20:34] "OPTIONS /api/monthly-periods HTTP/1.1" 200 -
C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\flask_sqlalchemy\model.py:22: SAWarning: relationship 'MonthlyPlayer.user' will copy column users.id to column monthly_players.user_id, which conflicts with relationship(s): 'MonthlyPeriod.monthly_players' (copies monthly_periods.user_id to monthly_players.user_id). If this is not the intention, consider if these relationships should be linked with back_populates, or if viewonly=True should be applied to one or more if they are read-only. For the less common case that foreign key constraints are partially overlapping, the orm.foreign() annotation can be used to isolate the columns that should be written towards.   To silence this warning, add the parameter 'overlaps="monthly_players"' to the 'MonthlyPlayer.user' relationship. (Background on this warning at: https://sqlalche.me/e/20/qzyx) (This warning originated from the `configure_mappers()` process, which was invoked automatically in response to a user-initiated operation.)
  return cls.query_class(
2025-10-14 01:20:35,264 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:35,268 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 01:20:35,268 INFO sqlalchemy.engine.Engine [generated in 0.00041s] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 01:20:35,269] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 28ms       
2025-10-14 01:20:35,270 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:35] "GET /api/monthly-periods HTTP/1.1" 200 -
2025-10-14 01:20:35,288 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:35,288 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 01:20:35,289 INFO sqlalchemy.engine.Engine [cached since 0.02062s ago] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 01:20:35,290] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 2ms        
2025-10-14 01:20:35,290 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:35] "GET /api/monthly-periods HTTP/1.1" 200 -
[2025-10-14 01:20:35,586] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:35] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:35,587] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:35] "OPTIONS /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:35,587] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:35] "OPTIONS /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:35,588] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:35] "OPTIONS /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:35,589] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:35] "OPTIONS /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:35,595] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:35] "OPTIONS /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:35,896] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:35] "OPTIONS /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:35,897] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:35] "OPTIONS /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:35,897] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:35] "OPTIONS /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:35,898] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 0ms
[2025-10-14 01:20:35,899] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:35] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
127.0.0.1 - - [14/Oct/2025 01:20:35] "OPTIONS /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:35,901] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:35] "OPTIONS /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:36,210] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 01:20:36] "OPTIONS /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,212 INFO sqlalchemy.engine.Engine BEGIN (implicit)
[2025-10-14 01:20:36,211] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 200 in 0ms
2025-10-14 01:20:36,214 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
127.0.0.1 - - [14/Oct/2025 01:20:36] "OPTIONS /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,215 INFO sqlalchemy.engine.Engine [generated in 0.00127s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,215 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,215 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,217 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,218 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,218 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,220 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:20:36,220 INFO sqlalchemy.engine.Engine [cached since 0.006937s ago] ('211ec706-f5bf-4a53-b906-6f19877c6600', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,221 INFO sqlalchemy.engine.Engine [cached since 0.007256s ago] ('f8c0022b-fd8f-49cb-8a54-ece546d15389', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,221 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,221 INFO sqlalchemy.engine.Engine [generated in 0.00119s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:20:36,222 INFO sqlalchemy.engine.Engine [cached since 0.008299s ago] ('9d9b8ac5-fe6e-484b-9729-b7652782bc4a', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,223 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
[2025-10-14 01:20:36,223] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 12ms
2025-10-14 01:20:36,224 INFO sqlalchemy.engine.Engine [cached since 0.003462s ago] ('211ec706-f5bf-4a53-b906-6f19877c6600', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:20:36,224 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
[2025-10-14 01:20:36,225] INFO in __init__: [Perf][Request] GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 200 in 12ms
2025-10-14 01:20:36,224 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,225 INFO sqlalchemy.engine.Engine [cached since 0.004653s ago] ('f8c0022b-fd8f-49cb-8a54-ece546d15389', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:20:36,225 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
[2025-10-14 01:20:36,226] INFO in __init__: [Perf][Request] GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 200 in 12ms
2025-10-14 01:20:36,225 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,226 INFO sqlalchemy.engine.Engine [cached since 0.005936s ago] ('9d9b8ac5-fe6e-484b-9729-b7652782bc4a', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:20:36,226 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:36,227] INFO in __init__: [Perf][Request] GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 200 in 11ms
2025-10-14 01:20:36,229 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,521 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,522 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,522 INFO sqlalchemy.engine.Engine [cached since 0.309s ago] ('8b278aa0-a6ab-488f-bb55-491255ed2072', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,522 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,523 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,523 INFO sqlalchemy.engine.Engine [cached since 0.3097s ago] ('8fde156b-43b2-4c7b-a4bc-1896c597bf04', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,523 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:20:36,524 INFO sqlalchemy.engine.Engine [cached since 0.3038s ago] ('8b278aa0-a6ab-488f-bb55-491255ed2072', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:20:36,524 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:20:36,524 INFO sqlalchemy.engine.Engine [cached since 0.3043s ago] ('8fde156b-43b2-4c7b-a4bc-1896c597bf04', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:20:36,525] INFO in __init__: [Perf][Request] GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 200 in 3ms
2025-10-14 01:20:36,525 INFO sqlalchemy.engine.Engine ROLLBACK
[2025-10-14 01:20:36,525] INFO in __init__: [Perf][Request] GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 200 in 3ms
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,526 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,529 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,530 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,531 INFO sqlalchemy.engine.Engine [cached since 0.3179s ago] ('369deb54-5467-4e5f-8c66-1a8932105ded', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,531 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,532 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,532 INFO sqlalchemy.engine.Engine [cached since 0.3186s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,532 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:20:36,533 INFO sqlalchemy.engine.Engine [cached since 0.3126s ago] ('369deb54-5467-4e5f-8c66-1a8932105ded', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:20:36,533 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
[2025-10-14 01:20:36,533] INFO in __init__: [Perf][Request] GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 200 in 5ms
2025-10-14 01:20:36,534 INFO sqlalchemy.engine.Engine [cached since 0.3135s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:20:36,534 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses HTTP/1.1" 200 -
[2025-10-14 01:20:36,535] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 3ms
2025-10-14 01:20:36,535 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,538 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,538 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,539 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,540 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,540 INFO sqlalchemy.engine.Engine [cached since 0.3267s ago] ('211ec706-f5bf-4a53-b906-6f19877c6600', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,540 INFO sqlalchemy.engine.Engine [cached since 0.3269s ago] ('f8c0022b-fd8f-49cb-8a54-ece546d15389', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,542 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:20:36,543 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:20:36,543 INFO sqlalchemy.engine.Engine [cached since 0.323s ago] ('f8c0022b-fd8f-49cb-8a54-ece546d15389', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:20:36,543 INFO sqlalchemy.engine.Engine [cached since 0.3232s ago] ('211ec706-f5bf-4a53-b906-6f19877c6600', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:20:36,544] INFO in __init__: [Perf][Request] GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 200 in 6ms
2025-10-14 01:20:36,544 INFO sqlalchemy.engine.Engine ROLLBACK
[2025-10-14 01:20:36,544] INFO in __init__: [Perf][Request] GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 200 in 7ms
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,545 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,834 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,836 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,837 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,837 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,837 INFO sqlalchemy.engine.Engine [cached since 0.6236s ago] ('9d9b8ac5-fe6e-484b-9729-b7652782bc4a', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,837 INFO sqlalchemy.engine.Engine [cached since 0.6238s ago] ('8b278aa0-a6ab-488f-bb55-491255ed2072', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,838 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:20:36,839 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:20:36,839 INFO sqlalchemy.engine.Engine [cached since 0.6186s ago] ('9d9b8ac5-fe6e-484b-9729-b7652782bc4a', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:20:36,839 INFO sqlalchemy.engine.Engine [cached since 0.6187s ago] ('8b278aa0-a6ab-488f-bb55-491255ed2072', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:20:36,839] INFO in __init__: [Perf][Request] GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 200 in 5ms
2025-10-14 01:20:36,840 INFO sqlalchemy.engine.Engine ROLLBACK
[2025-10-14 01:20:36,839] INFO in __init__: [Perf][Request] GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 200 in 3ms
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,840 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,843 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,843 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:20:36,843 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,844 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:20:36,845 INFO sqlalchemy.engine.Engine [cached since 0.6312s ago] ('8fde156b-43b2-4c7b-a4bc-1896c597bf04', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,845 INFO sqlalchemy.engine.Engine [cached since 0.6314s ago] ('369deb54-5467-4e5f-8c66-1a8932105ded', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:20:36,846 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:20:36,846 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:20:36,846 INFO sqlalchemy.engine.Engine [cached since 0.6262s ago] ('8fde156b-43b2-4c7b-a4bc-1896c597bf04', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:20:36,846 INFO sqlalchemy.engine.Engine [cached since 0.6263s ago] ('369deb54-5467-4e5f-8c66-1a8932105ded', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 01:20:36,847] INFO in __init__: [Perf][Request] GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 200 in 5ms
2025-10-14 01:20:36,847 INFO sqlalchemy.engine.Engine ROLLBACK
[2025-10-14 01:20:36,847] INFO in __init__: [Perf][Request] GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 200 in 4ms
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses HTTP/1.1" 200 -
2025-10-14 01:20:36,848 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:20:36] "GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses HTTP/1.1" 200 -



C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/players -> 590ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/players -> 676ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/stats/players -> 678ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/stats/players -> 900ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:55 [DEBUG] Carregando dados para 10/2025
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:55 [DEBUG] Carregando dados para 10/2025
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods -> 317ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:86 🔍 [MonthlyPage] Buscando jogadores para período: 317a4f44-aa20-493d-a0b0-e3d7b802a002
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:250 [PaymentsService] getMonthlyPlayers - INÍCIO
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:251 [PaymentsService] periodId: 317a4f44-aa20-493d-a0b0-e3d7b802a002
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:252 [PaymentsService] params: {page: 1, per_page: 100}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:259 [PaymentsService] Endpoint da API: /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:261 [PaymentsService] Chamando api.get...
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods -> 630ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:86 🔍 [MonthlyPage] Buscando jogadores para período: 317a4f44-aa20-493d-a0b0-e3d7b802a002
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:250 [PaymentsService] getMonthlyPlayers - INÍCIO
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:251 [PaymentsService] periodId: 317a4f44-aa20-493d-a0b0-e3d7b802a002
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:252 [PaymentsService] params: {page: 1, per_page: 100}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:259 [PaymentsService] Endpoint da API: /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:261 [PaymentsService] Chamando api.get...
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 587ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:263 [PaymentsService] Resposta da API recebida: [{…}]
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:264 [PaymentsService] Tipo da resposta: object
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:265 [PaymentsService] É array?: true
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:266 [PaymentsService] Tamanho se for array: 1
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:267 [PaymentsService] JSON.stringify da resposta: [
  {
    "created_at": "2025-10-13T13:45:34.995988",
    "email": "",
    "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
    "monthly_fee": 50,
    "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
    "payment_date": "2025-10-13T18:06:21.814556",
    "phone": "19999999999",
    "player": {
      "email": null,
      "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
      "monthly_fee": 100,
      "name": "ANDRE",
      "phone": "19999999999",
      "position": "forward",
      "status": "active"
    },
    "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
    "player_name": "ANDRE",
    "position": "forward",
    "status": "paid",
    "updated_at": "2025-10-13T18:06:21.814565"
  }
]
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:271 [PaymentsService] PRIMEIRO ITEM DETALHADO: {
  "created_at": "2025-10-13T13:45:34.995988",
  "email": "",
  "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
  "monthly_fee": 50,
  "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
  "payment_date": "2025-10-13T18:06:21.814556",
  "phone": "19999999999",
  "player": {
    "email": null,
    "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
    "monthly_fee": 100,
    "name": "ANDRE",
    "phone": "19999999999",
    "position": "forward",
    "status": "active"
  },
  "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
  "player_name": "ANDRE",
  "position": "forward",
  "status": "paid",
  "updated_at": "2025-10-13T18:06:21.814565"
}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:272 [PaymentsService] Chaves do primeiro item: (13) ['created_at', 'email', 'id', 'monthly_fee', 'monthly_period_id', 'payment_date', 'phone', 'player', 'player_id', 'player_name', 'position', 'status', 'updated_at']
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:277 [PaymentsService] Resposta é array direto, adaptando...
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:278 [PaymentsService] Tamanho do array: 1
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:281 [PaymentsService] Primeiro item completo: {
  "created_at": "2025-10-13T13:45:34.995988",
  "email": "",
  "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
  "monthly_fee": 50,
  "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
  "payment_date": "2025-10-13T18:06:21.814556",
  "phone": "19999999999",
  "player": {
    "email": null,
    "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
    "monthly_fee": 100,
    "name": "ANDRE",
    "phone": "19999999999",
    "position": "forward",
    "status": "active"
  },
  "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
  "player_name": "ANDRE",
  "position": "forward",
  "status": "paid",
  "updated_at": "2025-10-13T18:06:21.814565"
}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:285 [PaymentsService] Processando jogador 0: {
  "created_at": "2025-10-13T13:45:34.995988",
  "email": "",
  "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
  "monthly_fee": 50,
  "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
  "payment_date": "2025-10-13T18:06:21.814556",
  "phone": "19999999999",
  "player": {
    "email": null,
    "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
    "monthly_fee": 100,
    "name": "ANDRE",
    "phone": "19999999999",
    "position": "forward",
    "status": "active"
  },
  "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
  "player_name": "ANDRE",
  "position": "forward",
  "status": "paid",
  "updated_at": "2025-10-13T18:06:21.814565"
}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:294 [PaymentsService] Jogador 0 processado: {
  "created_at": "2025-10-13T13:45:34.995988",
  "email": "",
  "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
  "monthly_fee": 50,
  "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
  "payment_date": "2025-10-13T18:06:21.814556",
  "phone": "19999999999",
  "player": {
    "email": null,
    "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
    "monthly_fee": 100,
    "name": "ANDRE",
    "phone": "19999999999",
    "position": "forward",
    "status": "active"
  },
  "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
  "player_name": "ANDRE",
  "position": "forward",
  "status": "paid",
  "updated_at": "2025-10-13T18:06:21.814565",
  "monthlyFee": 50,
  "customMonthlyFee": null,
  "pendingMonthsCount": 0
}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:298 [PaymentsService] Total de jogadores processados: 1
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:299 [PaymentsService] Todos os jogadores processados: [
  {
    "created_at": "2025-10-13T13:45:34.995988",
    "email": "",
    "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
    "monthly_fee": 50,
    "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
    "payment_date": "2025-10-13T18:06:21.814556",
    "phone": "19999999999",
    "player": {
      "email": null,
      "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
      "monthly_fee": 100,
      "name": "ANDRE",
      "phone": "19999999999",
      "position": "forward",
      "status": "active"
    },
    "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
    "player_name": "ANDRE",
    "position": "forward",
    "status": "paid",
    "updated_at": "2025-10-13T18:06:21.814565",
    "monthlyFee": 50,
    "customMonthlyFee": null,
    "pendingMonthsCount": 0
  }
]
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:311 [PaymentsService] Resposta adaptada final: {
  "data": [
    {
      "created_at": "2025-10-13T13:45:34.995988",
      "email": "",
      "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
      "monthly_fee": 50,
      "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
      "payment_date": "2025-10-13T18:06:21.814556",
      "phone": "19999999999",
      "player": {
        "email": null,
        "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
        "monthly_fee": 100,
        "name": "ANDRE",
        "phone": "19999999999",
        "position": "forward",
        "status": "active"
      },
      "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
      "player_name": "ANDRE",
      "position": "forward",
      "status": "paid",
      "updated_at": "2025-10-13T18:06:21.814565",
      "monthlyFee": 50,
      "customMonthlyFee": null,
      "pendingMonthsCount": 0
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 100,
    "total": 1,
    "pages": 1
  }
}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:312 [PaymentsService] getMonthlyPlayers - RETORNANDO ARRAY ADAPTADO
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:88 🔍 [MonthlyPage] Resposta completa do getMonthlyPlayers: {
  "data": [
    {
      "created_at": "2025-10-13T13:45:34.995988",
      "email": "",
      "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
      "monthly_fee": 50,
      "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
      "payment_date": "2025-10-13T18:06:21.814556",
      "phone": "19999999999",
      "player": {
        "email": null,
        "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
        "monthly_fee": 100,
        "name": "ANDRE",
        "phone": "19999999999",
        "position": "forward",
        "status": "active"
      },
      "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
      "player_name": "ANDRE",
      "position": "forward",
      "status": "paid",
      "updated_at": "2025-10-13T18:06:21.814565",
      "monthlyFee": 50,
      "customMonthlyFee": null,
      "pendingMonthsCount": 0
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 100,
    "total": 1,
    "pages": 1
  }
}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:90 🔍 [MonthlyPage] Dados dos jogadores recebidos: [{…}]
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:91 🔍 [MonthlyPage] Quantidade de jogadores: 1
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:107 🔍 [MonthlyPage] Jogadores processados: [{…}]
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 324ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:263 [PaymentsService] Resposta da API recebida: [{…}]
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:264 [PaymentsService] Tipo da resposta: object
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:265 [PaymentsService] É array?: true
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:266 [PaymentsService] Tamanho se for array: 1
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:267 [PaymentsService] JSON.stringify da resposta: [
  {
    "created_at": "2025-10-13T13:45:34.995988",
    "email": "",
    "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
    "monthly_fee": 50,
    "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
    "payment_date": "2025-10-13T18:06:21.814556",
    "phone": "19999999999",
    "player": {
      "email": null,
      "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
      "monthly_fee": 100,
      "name": "ANDRE",
      "phone": "19999999999",
      "position": "forward",
      "status": "active"
    },
    "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
    "player_name": "ANDRE",
    "position": "forward",
    "status": "paid",
    "updated_at": "2025-10-13T18:06:21.814565"
  }
]
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:271 [PaymentsService] PRIMEIRO ITEM DETALHADO: {
  "created_at": "2025-10-13T13:45:34.995988",
  "email": "",
  "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
  "monthly_fee": 50,
  "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
  "payment_date": "2025-10-13T18:06:21.814556",
  "phone": "19999999999",
  "player": {
    "email": null,
    "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
    "monthly_fee": 100,
    "name": "ANDRE",
    "phone": "19999999999",
    "position": "forward",
    "status": "active"
  },
  "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
  "player_name": "ANDRE",
  "position": "forward",
  "status": "paid",
  "updated_at": "2025-10-13T18:06:21.814565"
}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:272 [PaymentsService] Chaves do primeiro item: (13) ['created_at', 'email', 'id', 'monthly_fee', 'monthly_period_id', 'payment_date', 'phone', 'player', 'player_id', 'player_name', 'position', 'status', 'updated_at']
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:277 [PaymentsService] Resposta é array direto, adaptando...
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:278 [PaymentsService] Tamanho do array: 1
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:281 [PaymentsService] Primeiro item completo: {
  "created_at": "2025-10-13T13:45:34.995988",
  "email": "",
  "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
  "monthly_fee": 50,
  "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
  "payment_date": "2025-10-13T18:06:21.814556",
  "phone": "19999999999",
  "player": {
    "email": null,
    "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
    "monthly_fee": 100,
    "name": "ANDRE",
    "phone": "19999999999",
    "position": "forward",
    "status": "active"
  },
  "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
  "player_name": "ANDRE",
  "position": "forward",
  "status": "paid",
  "updated_at": "2025-10-13T18:06:21.814565"
}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:285 [PaymentsService] Processando jogador 0: {
  "created_at": "2025-10-13T13:45:34.995988",
  "email": "",
  "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
  "monthly_fee": 50,
  "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
  "payment_date": "2025-10-13T18:06:21.814556",
  "phone": "19999999999",
  "player": {
    "email": null,
    "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
    "monthly_fee": 100,
    "name": "ANDRE",
    "phone": "19999999999",
    "position": "forward",
    "status": "active"
  },
  "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
  "player_name": "ANDRE",
  "position": "forward",
  "status": "paid",
  "updated_at": "2025-10-13T18:06:21.814565"
}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:294 [PaymentsService] Jogador 0 processado: {
  "created_at": "2025-10-13T13:45:34.995988",
  "email": "",
  "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
  "monthly_fee": 50,
  "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
  "payment_date": "2025-10-13T18:06:21.814556",
  "phone": "19999999999",
  "player": {
    "email": null,
    "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
    "monthly_fee": 100,
    "name": "ANDRE",
    "phone": "19999999999",
    "position": "forward",
    "status": "active"
  },
  "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
  "player_name": "ANDRE",
  "position": "forward",
  "status": "paid",
  "updated_at": "2025-10-13T18:06:21.814565",
  "monthlyFee": 50,
  "customMonthlyFee": null,
  "pendingMonthsCount": 0
}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:298 [PaymentsService] Total de jogadores processados: 1
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:299 [PaymentsService] Todos os jogadores processados: [
  {
    "created_at": "2025-10-13T13:45:34.995988",
    "email": "",
    "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
    "monthly_fee": 50,
    "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
    "payment_date": "2025-10-13T18:06:21.814556",
    "phone": "19999999999",
    "player": {
      "email": null,
      "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
      "monthly_fee": 100,
      "name": "ANDRE",
      "phone": "19999999999",
      "position": "forward",
      "status": "active"
    },
    "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
    "player_name": "ANDRE",
    "position": "forward",
    "status": "paid",
    "updated_at": "2025-10-13T18:06:21.814565",
    "monthlyFee": 50,
    "customMonthlyFee": null,
    "pendingMonthsCount": 0
  }
]
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:311 [PaymentsService] Resposta adaptada final: {
  "data": [
    {
      "created_at": "2025-10-13T13:45:34.995988",
      "email": "",
      "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
      "monthly_fee": 50,
      "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
      "payment_date": "2025-10-13T18:06:21.814556",
      "phone": "19999999999",
      "player": {
        "email": null,
        "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
        "monthly_fee": 100,
        "name": "ANDRE",
        "phone": "19999999999",
        "position": "forward",
        "status": "active"
      },
      "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
      "player_name": "ANDRE",
      "position": "forward",
      "status": "paid",
      "updated_at": "2025-10-13T18:06:21.814565",
      "monthlyFee": 50,
      "customMonthlyFee": null,
      "pendingMonthsCount": 0
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 100,
    "total": 1,
    "pages": 1
  }
}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:312 [PaymentsService] getMonthlyPlayers - RETORNANDO ARRAY ADAPTADO
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:88 🔍 [MonthlyPage] Resposta completa do getMonthlyPlayers: {
  "data": [
    {
      "created_at": "2025-10-13T13:45:34.995988",
      "email": "",
      "id": "ea5045e2-1eb4-4d40-a0d3-29f96c0c210a",
      "monthly_fee": 50,
      "monthly_period_id": "317a4f44-aa20-493d-a0b0-e3d7b802a002",
      "payment_date": "2025-10-13T18:06:21.814556",
      "phone": "19999999999",
      "player": {
        "email": null,
        "id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
        "monthly_fee": 100,
        "name": "ANDRE",
        "phone": "19999999999",
        "position": "forward",
        "status": "active"
      },
      "player_id": "0059cc3b-7dc0-4737-8925-0b17c025331e",
      "player_name": "ANDRE",
      "position": "forward",
      "status": "paid",
      "updated_at": "2025-10-13T18:06:21.814565",
      "monthlyFee": 50,
      "customMonthlyFee": null,
      "pendingMonthsCount": 0
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 100,
    "total": 1,
    "pages": 1
  }
}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:90 🔍 [MonthlyPage] Dados dos jogadores recebidos: [{…}]
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:91 🔍 [MonthlyPage] Quantidade de jogadores: 1
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:107 🔍 [MonthlyPage] Jogadores processados: [{…}]
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 364ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 565ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/stats/payments/2025/10 -> 566ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/stats/payments/2025/10 -> 374ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods -> 313ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods -> 570ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 944ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 944ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 944ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 1199ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 1247ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 1247ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 999ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 1258ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\cashflow-data.ts:67 [Perf][Cashflow] Agregação de despesas (7 períodos) -> 1261ms
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 1026ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 1253ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 1302ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 1302ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 1307ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 1307ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\cashflow-data.ts:67 [Perf][Cashflow] Agregação de despesas (7 períodos) -> 1309ms
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:35 🔍 Buscando período para: 10/2025
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:35 🔍 Buscando período para: 10/2025
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods -> 583ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:42 📊 Resposta da API de períodos: {success: true, data: Array(1), message: undefined, timestamp: undefined, pagination: {…}}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:46 ✅ Período encontrado: 10/2025 (ID: 317a4f44-aa20-493d-a0b0-e3d7b802a002)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods -> 629ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:42 📊 Resposta da API de períodos: {success: true, data: Array(1), message: undefined, timestamp: undefined, pagination: {…}}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:46 ✅ Período encontrado: 10/2025 (ID: 317a4f44-aa20-493d-a0b0-e3d7b802a002)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 315ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 322ms (status: 200)

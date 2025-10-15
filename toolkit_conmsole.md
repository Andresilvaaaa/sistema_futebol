(venv) (TraeAI-6) C:\Users\ANDREE\Desktop\sistema_futebol [0:0] $ flask run
[2025-10-14 21:18:34,114] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 21:18:34,115 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:18:34,116 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 21:18:34,116 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:18:34,117 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 21:18:34,117 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:18:34,117 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 21:18:34,117 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:18:34,118 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 21:18:34,118 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:18:34,118 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 21:18:34,118 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:18:34,119 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 21:18:34,119 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:18:34,120 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 21:18:34,120] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Serving Flask app 'backend.app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
[2025-10-14 21:18:35,790] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 21:18:35,792 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:18:35,792 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 21:18:35,793 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:18:35,794 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 21:18:35,794 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:18:35,794 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 21:18:35,795 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:18:35,795 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 21:18:35,795 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:18:35,796 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 21:18:35,796 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:18:35,797 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 21:18:35,797 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:18:35,797 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 21:18:35,797] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Debugger is active!
 * Debugger PIN: 454-874-479
[2025-10-14 21:19:13,219] INFO in __init__: [Perf][Request] OPTIONS /api/players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:13] "OPTIONS /api/players?per_page=100 HTTP/1.1" 200 -
[2025-10-14 21:19:13,220] INFO in __init__: [Perf][Request] OPTIONS /api/stats/players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:13] "OPTIONS /api/stats/players HTTP/1.1" 200 -
[2025-10-14 21:19:13,221] INFO in __init__: [Perf][Request] OPTIONS /api/players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:13] "OPTIONS /api/players?per_page=100 HTTP/1.1" 200 -
[2025-10-14 21:19:13,223] INFO in __init__: [Perf][Request] OPTIONS /api/stats/players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:13] "OPTIONS /api/stats/players HTTP/1.1" 200 -
C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\flask_sqlalchemy\model.py:22: SAWarning: relationship 'MonthlyPlayer.user' will copy column users.id to column monthly_players.user_id, which conflicts with relationship(s): 'MonthlyPeriod.monthly_players' (copies monthly_periods.user_id to monthly_players.user_id). If this is not the intention, consider if these relationships should be linked with back_populates, or if viewonly=True should be applied to one or more if they are read-only. For the less common case that foreign key constraints are partially overlapping, the orm.foreign() annotation can be used to isolate the columns that should be written towards.   To silence this warning, add the parameter 'overlaps="monthly_players"' to the 'MonthlyPlayer.user' relationship. (Background on this warning at: https://sqlalche.me/e/20/qzyx) (This warning originated from the `configure_mappers()` process, which was invoked automatically in response to a user-initiated operation.)
  return cls.query_class(
2025-10-14 21:19:13,526 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:13,529 INFO sqlalchemy.engine.Engine SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:13,530 INFO sqlalchemy.engine.Engine [generated in 0.00038s] ('6307e26d-166b-4892-8a10-133510bb6516', 100, 0)
2025-10-14 21:19:13,532 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:13,535 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 21:19:13,537 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ?) AS anon_1
2025-10-14 21:19:13,538 INFO sqlalchemy.engine.Engine [generated in 0.00289s] ('6307e26d-166b-4892-8a10-133510bb6516', 'active')        
2025-10-14 21:19:13,538 INFO sqlalchemy.engine.Engine [generated in 0.00087s] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 21:19:13,540] INFO in __init__: [Perf][Request] GET /api/players -> 200 in 60ms
2025-10-14 21:19:13,541 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 21:19:13,541 INFO sqlalchemy.engine.Engine [cached since 0.00617s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'inactive')  
2025-10-14 21:19:13,542 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1 
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 21:19:13,542 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:13] "GET /api/players?per_page=100 HTTP/1.1" 200 -
2025-10-14 21:19:13,542 INFO sqlalchemy.engine.Engine [cached since 0.007658s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'pending')  
2025-10-14 21:19:13,544 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 21:19:13,544 INFO sqlalchemy.engine.Engine [cached since 0.009119s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'delayed')  
2025-10-14 21:19:13,546 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:13,546 INFO sqlalchemy.engine.Engine SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:13,547 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ?) AS anon_1
2025-10-14 21:19:13,547 INFO sqlalchemy.engine.Engine [cached since 0.01784s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 100, 0)      
2025-10-14 21:19:13,547 INFO sqlalchemy.engine.Engine [cached since 0.009993s ago] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 21:19:13,548] INFO in __init__: [Perf][Request] GET /api/stats/players -> 200 in 17ms
2025-10-14 21:19:13,549 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ?) AS anon_1
2025-10-14 21:19:13,549 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:13] "GET /api/stats/players HTTP/1.1" 200 -
2025-10-14 21:19:13,549 INFO sqlalchemy.engine.Engine [cached since 0.0118s ago] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 21:19:13,550] INFO in __init__: [Perf][Request] GET /api/players -> 200 in 5ms
2025-10-14 21:19:13,551 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:13] "GET /api/players?per_page=100 HTTP/1.1" 200 -
2025-10-14 21:19:13,857 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:13,858 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1 
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 21:19:13,858 INFO sqlalchemy.engine.Engine [cached since 0.3233s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'active')     
2025-10-14 21:19:13,859 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 21:19:13,859 INFO sqlalchemy.engine.Engine [cached since 0.3244s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'inactive')   
2025-10-14 21:19:13,860 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 21:19:13,860 INFO sqlalchemy.engine.Engine [cached since 0.3253s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'pending')    
2025-10-14 21:19:13,861 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ? AND players.status = ?) AS anon_1
2025-10-14 21:19:13,861 INFO sqlalchemy.engine.Engine [cached since 0.3262s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 'delayed')    
2025-10-14 21:19:13,862 INFO sqlalchemy.engine.Engine SELECT count(*) AS count_1
FROM (SELECT players.id AS players_id, players.name AS players_name, players.position AS players_position, players.phone AS players_phone, players.email AS players_email, players.join_date AS players_join_date, players.status AS players_status, players.monthly_fee AS players_monthly_fee, players.is_active AS players_is_active, players.user_id AS players_user_id, players.created_at AS players_created_at, players.updated_at AS players_updated_at
FROM players
WHERE players.user_id = ?) AS anon_1
2025-10-14 21:19:13,862 INFO sqlalchemy.engine.Engine [cached since 0.3244s ago] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 21:19:13,862] INFO in __init__: [Perf][Request] GET /api/stats/players -> 200 in 5ms
2025-10-14 21:19:13,862 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:13] "GET /api/stats/players HTTP/1.1" 200 -
[2025-10-14 21:19:15,380] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:15] "OPTIONS /api/monthly-periods?year=2025&month=10 HTTP/1.1" 200 -
[2025-10-14 21:19:15,381] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:15] "OPTIONS /api/monthly-periods?year=2025&month=10 HTTP/1.1" 200 -
2025-10-14 21:19:15,645 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:15,647 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? AND monthly_periods.year = ? AND monthly_periods.month = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 21:19:15,648 INFO sqlalchemy.engine.Engine [generated in 0.00039s] ('6307e26d-166b-4892-8a10-133510bb6516', 2025, 10)        
[2025-10-14 21:19:15,648] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 4ms
2025-10-14 21:19:15,649 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:15] "GET /api/monthly-periods?year=2025&month=10 HTTP/1.1" 200 -
2025-10-14 21:19:15,692 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:15,692 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? AND monthly_periods.year = ? AND monthly_periods.month = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 21:19:15,692 INFO sqlalchemy.engine.Engine [cached since 0.04522s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 2025, 10)    
[2025-10-14 21:19:15,693] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 1ms
2025-10-14 21:19:15,693 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:15] "GET /api/monthly-periods?year=2025&month=10 HTTP/1.1" 200 -
[2025-10-14 21:19:15,959] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:15] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players?params=[object+Object] HTTP/1.1" 200 -
[2025-10-14 21:19:15,960] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:15] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players?params=[object+Object] HTTP/1.1" 200 -

🔍 [FLASK] get_monthly_period_players - INÍCIO
🔍 [FLASK] period_id recebido: 317a4f44-aa20-493d-a0b0-e3d7b802a002
🔍 [FLASK] current_user_id: 6307e26d-166b-4892-8a10-133510bb6516
2025-10-14 21:19:16,005 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:16,007 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:16,007 INFO sqlalchemy.engine.Engine [generated in 0.00039s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
✅ [FLASK] Período encontrado: 10/2025 (10/2025)
🔍 [FLASK] Período players_count: 2
🔍 [FLASK] Query SQL: SELECT monthly_players.id AS monthly_players_id, monthly_players.player_id AS monthly_players_player_id, monthly_players.monthly_period_id AS monthly_players_monthly_period_id, monthly_players.user_id AS monthly_players_user_id, monthly_players.player_name AS monthly_players_player_name, monthly_players.position AS monthly_players_position, monthly_players.phone AS monthly_players_phone, monthly_players.email AS monthly_players_email, monthly_players.monthly_fee AS monthly_players_monthly_fee, monthly_players.custom_monthly_fee AS monthly_players_custom_monthly_fee, monthly_players.join_date AS monthly_players_join_date, monthly_players.status AS monthly_players_status, monthly_players.payment_date AS monthly_players_payment_date, monthly_players.pending_months_count AS monthly_players_pending_months_count, monthly_players.created_at AS monthly_players_created_at, monthly_players.updated_at AS monthly_players_updated_at, players_1.id AS players_1_id, players_1.name AS players_1_name, players_1.position AS players_1_position, players_1.phone AS players_1_phone, players_1.email AS players_1_email, players_1.join_date AS players_1_join_date, players_1.status AS players_1_status, players_1.monthly_fee AS players_1_monthly_fee, players_1.is_active AS players_1_is_active, players_1.user_id AS players_1_user_id, players_1.created_at AS players_1_created_at, players_1.updated_at AS players_1_updated_at
FROM monthly_players LEFT OUTER JOIN players AS players_1 ON players_1.id = monthly_players.player_id
WHERE monthly_players.monthly_period_id = ? AND monthly_players.user_id = ?
2025-10-14 21:19:16,014 INFO sqlalchemy.engine.Engine SELECT monthly_players.id AS monthly_players_id, monthly_players.player_id AS monthly_players_player_id, monthly_players.monthly_period_id AS monthly_players_monthly_period_id, monthly_players.user_id AS monthly_players_user_id, monthly_players.player_name AS monthly_players_player_name, monthly_players.position AS monthly_players_position, monthly_players.phone AS monthly_players_phone, monthly_players.email AS monthly_players_email, monthly_players.monthly_fee AS monthly_players_monthly_fee, monthly_players.custom_monthly_fee AS monthly_players_custom_monthly_fee, monthly_players.join_date AS monthly_players_join_date, monthly_players.status AS monthly_players_status, monthly_players.payment_date AS monthly_players_payment_date, monthly_players.pending_months_count AS monthly_players_pending_months_count, monthly_players.created_at AS monthly_players_created_at, monthly_players.updated_at AS monthly_players_updated_at, players_1.id AS players_1_id, players_1.name AS players_1_name, players_1.position AS players_1_position, players_1.phone AS players_1_phone, players_1.email AS players_1_email, players_1.join_date AS players_1_join_date, players_1.status AS players_1_status, players_1.monthly_fee AS players_1_monthly_fee, players_1.is_active AS players_1_is_active, players_1.user_id AS players_1_user_id, players_1.created_at AS players_1_created_at, players_1.updated_at AS players_1_updated_at
FROM monthly_players LEFT OUTER JOIN players AS players_1 ON players_1.id = monthly_players.player_id
WHERE monthly_players.monthly_period_id = ? AND monthly_players.user_id = ?
2025-10-14 21:19:16,014 INFO sqlalchemy.engine.Engine [generated in 0.00037s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
🔍 [FLASK] Quantidade de jogadores encontrados na query: 1
🔍 [FLASK] Primeiro jogador encontrado:
  - ID: ea5045e2-1eb4-4d40-a0d3-29f96c0c210a
  - Player ID: 0059cc3b-7dc0-4737-8925-0b17c025331e
  - Nome: ANDRE
  - Monthly Period ID: 317a4f44-aa20-493d-a0b0-e3d7b802a002
  - User ID: 6307e26d-166b-4892-8a10-133510bb6516
  - Status: paid
🔍 [FLASK] Resultado final sendo retornado: 1 jogadores
🔍 [FLASK] Dados do resultado: [{'id': 'ea5045e2-1eb4-4d40-a0d3-29f96c0c210a', 'player_id': '0059cc3b-7dc0-4737-8925-0b17c025331e', 'monthly_period_id': '317a4f44-aa20-493d-a0b0-e3d7b802a002', 'player_name': 'ANDRE', 'position': 'forward', 'phone': '19999999999', 'email': '', 'monthly_fee': 50.0, 'status': 'paid', 'payment_date': '2025-10-13T18:06:21.814556', 'created_at': '2025-10-13T13:45:34.995988', 'updated_at': '2025-10-13T18:06:21.814565', 'player': {'id': '0059cc3b-7dc0-4737-8925-0b17c025331e', 'name': 'ANDRE', 'email': None, 'phone': '19999999999', 'position': 'forward', 'monthly_fee': 100.0, 'status': 'active'}}]
[2025-10-14 21:19:16,016] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 200 in 11ms
2025-10-14 21:19:16,016 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:16] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players?params=[object+Object] HTTP/1.1" 200 -

🔍 [FLASK] get_monthly_period_players - INÍCIO
🔍 [FLASK] period_id recebido: 317a4f44-aa20-493d-a0b0-e3d7b802a002
🔍 [FLASK] current_user_id: 6307e26d-166b-4892-8a10-133510bb6516
2025-10-14 21:19:16,273 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:16,273 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:16,273 INFO sqlalchemy.engine.Engine [cached since 0.267s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
✅ [FLASK] Período encontrado: 10/2025 (10/2025)
🔍 [FLASK] Período players_count: 2
🔍 [FLASK] Query SQL: SELECT monthly_players.id AS monthly_players_id, monthly_players.player_id AS monthly_players_player_id, monthly_players.monthly_period_id AS monthly_players_monthly_period_id, monthly_players.user_id AS monthly_players_user_id, monthly_players.player_name AS monthly_players_player_name, monthly_players.position AS monthly_players_position, monthly_players.phone AS monthly_players_phone, monthly_players.email AS monthly_players_email, monthly_players.monthly_fee AS monthly_players_monthly_fee, monthly_players.custom_monthly_fee AS monthly_players_custom_monthly_fee, monthly_players.join_date AS monthly_players_join_date, monthly_players.status AS monthly_players_status, monthly_players.payment_date AS monthly_players_payment_date, monthly_players.pending_months_count AS monthly_players_pending_months_count, monthly_players.created_at AS monthly_players_created_at, monthly_players.updated_at AS monthly_players_updated_at, players_1.id AS players_1_id, players_1.name AS players_1_name, players_1.position AS players_1_position, players_1.phone AS players_1_phone, players_1.email AS players_1_email, players_1.join_date AS players_1_join_date, players_1.status AS players_1_status, players_1.monthly_fee AS players_1_monthly_fee, players_1.is_active AS players_1_is_active, players_1.user_id AS players_1_user_id, players_1.created_at AS players_1_created_at, players_1.updated_at AS players_1_updated_at
FROM monthly_players LEFT OUTER JOIN players AS players_1 ON players_1.id = monthly_players.player_id
WHERE monthly_players.monthly_period_id = ? AND monthly_players.user_id = ?
2025-10-14 21:19:16,277 INFO sqlalchemy.engine.Engine SELECT monthly_players.id AS monthly_players_id, monthly_players.player_id AS monthly_players_player_id, monthly_players.monthly_period_id AS monthly_players_monthly_period_id, monthly_players.user_id AS monthly_players_user_id, monthly_players.player_name AS monthly_players_player_name, monthly_players.position AS monthly_players_position, monthly_players.phone AS monthly_players_phone, monthly_players.email AS monthly_players_email, monthly_players.monthly_fee AS monthly_players_monthly_fee, monthly_players.custom_monthly_fee AS monthly_players_custom_monthly_fee, monthly_players.join_date AS monthly_players_join_date, monthly_players.status AS monthly_players_status, monthly_players.payment_date AS monthly_players_payment_date, monthly_players.pending_months_count AS monthly_players_pending_months_count, monthly_players.created_at AS monthly_players_created_at, monthly_players.updated_at AS monthly_players_updated_at, players_1.id AS players_1_id, players_1.name AS players_1_name, players_1.position AS players_1_position, players_1.phone AS players_1_phone, players_1.email AS players_1_email, players_1.join_date AS players_1_join_date, players_1.status AS players_1_status, players_1.monthly_fee AS players_1_monthly_fee, players_1.is_active AS players_1_is_active, players_1.user_id AS players_1_user_id, players_1.created_at AS players_1_created_at, players_1.updated_at AS players_1_updated_at
FROM monthly_players LEFT OUTER JOIN players AS players_1 ON players_1.id = monthly_players.player_id
WHERE monthly_players.monthly_period_id = ? AND monthly_players.user_id = ?
2025-10-14 21:19:16,277 INFO sqlalchemy.engine.Engine [cached since 0.2638s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
🔍 [FLASK] Quantidade de jogadores encontrados na query: 1
🔍 [FLASK] Primeiro jogador encontrado:
  - ID: ea5045e2-1eb4-4d40-a0d3-29f96c0c210a
  - Player ID: 0059cc3b-7dc0-4737-8925-0b17c025331e
  - Nome: ANDRE
  - Monthly Period ID: 317a4f44-aa20-493d-a0b0-e3d7b802a002
  - User ID: 6307e26d-166b-4892-8a10-133510bb6516
  - Status: paid
🔍 [FLASK] Resultado final sendo retornado: 1 jogadores
🔍 [FLASK] Dados do resultado: [{'id': 'ea5045e2-1eb4-4d40-a0d3-29f96c0c210a', 'player_id': '0059cc3b-7dc0-4737-8925-0b17c025331e', 'monthly_period_id': '317a4f44-aa20-493d-a0b0-e3d7b802a002', 'player_name': 'ANDRE', 'position': 'forward', 'phone': '19999999999', 'email': '', 'monthly_fee': 50.0, 'status': 'paid', 'payment_date': '2025-10-13T18:06:21.814556', 'created_at': '2025-10-13T13:45:34.995988', 'updated_at': '2025-10-13T18:06:21.814565', 'player': {'id': '0059cc3b-7dc0-4737-8925-0b17c025331e', 'name': 'ANDRE', 'email': None, 'phone': '19999999999', 'position': 'forward', 'monthly_fee': 100.0, 'status': 'active'}}]
[2025-10-14 21:19:16,279] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 200 in 6ms
2025-10-14 21:19:16,279 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:16] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players?params=[object+Object] HTTP/1.1" 200 -
[2025-10-14 21:19:16,335] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:16] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players HTTP/1.1" 200 -
[2025-10-14 21:19:16,336] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:16] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players HTTP/1.1" 200 -  
2025-10-14 21:19:16,589 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:16,589 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:16,590 INFO sqlalchemy.engine.Engine [cached since 0.5832s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:16,592 INFO sqlalchemy.engine.Engine SELECT casual_players.id AS casual_players_id, casual_players.monthly_period_id AS casual_players_monthly_period_id, casual_players.user_id AS casual_players_user_id, casual_players.player_name AS casual_players_player_name, casual_players.play_date AS casual_players_play_date, casual_players.invited_by AS casual_players_invited_by, casual_players.amount AS casual_players_amount, casual_players.status AS casual_players_status, casual_players.payment_date AS casual_players_payment_date, casual_players.created_at AS casual_players_created_at, casual_players.updated_at AS casual_players_updated_at
FROM casual_players
WHERE casual_players.monthly_period_id = ? AND casual_players.user_id = ?
2025-10-14 21:19:16,592 INFO sqlalchemy.engine.Engine [generated in 0.00046s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:19:16,593] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 200 in 4ms
2025-10-14 21:19:16,594 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:16] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players HTTP/1.1" 200 -      
2025-10-14 21:19:16,652 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:16,653 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:16,653 INFO sqlalchemy.engine.Engine [cached since 0.6465s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:16,654 INFO sqlalchemy.engine.Engine SELECT casual_players.id AS casual_players_id, casual_players.monthly_period_id AS casual_players_monthly_period_id, casual_players.user_id AS casual_players_user_id, casual_players.player_name AS casual_players_player_name, casual_players.play_date AS casual_players_play_date, casual_players.invited_by AS casual_players_invited_by, casual_players.amount AS casual_players_amount, casual_players.status AS casual_players_status, casual_players.payment_date AS casual_players_payment_date, casual_players.created_at AS casual_players_created_at, casual_players.updated_at AS casual_players_updated_at
FROM casual_players
WHERE casual_players.monthly_period_id = ? AND casual_players.user_id = ?
2025-10-14 21:19:16,654 INFO sqlalchemy.engine.Engine [cached since 0.06223s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:19:16,655] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 200 in 2ms
2025-10-14 21:19:16,655 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:16] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players HTTP/1.1" 200 -      
[2025-10-14 21:19:16,901] INFO in __init__: [Perf][Request] OPTIONS /api/stats/payments/2025/10 -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:16] "OPTIONS /api/stats/payments/2025/10 HTTP/1.1" 200 -
[2025-10-14 21:19:16,902] INFO in __init__: [Perf][Request] OPTIONS /api/stats/payments/2025/10 -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:16] "OPTIONS /api/stats/payments/2025/10 HTTP/1.1" 200 -
2025-10-14 21:19:16,964 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:16,965 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.year = ? AND monthly_periods.month = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:16,966 INFO sqlalchemy.engine.Engine [generated in 0.00039s] (2025, 10, '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)  
2025-10-14 21:19:16,967 INFO sqlalchemy.engine.Engine SELECT monthly_players.id AS monthly_players_id, monthly_players.player_id AS monthly_players_player_id, monthly_players.monthly_period_id AS monthly_players_monthly_period_id, monthly_players.user_id AS monthly_players_user_id, monthly_players.player_name AS monthly_players_player_name, monthly_players.position AS monthly_players_position, monthly_players.phone AS monthly_players_phone, monthly_players.email AS monthly_players_email, monthly_players.monthly_fee AS monthly_players_monthly_fee, monthly_players.custom_monthly_fee AS monthly_players_custom_monthly_fee, monthly_players.join_date AS monthly_players_join_date, monthly_players.status AS monthly_players_status, monthly_players.payment_date AS monthly_players_payment_date, monthly_players.pending_months_count AS monthly_players_pending_months_count, monthly_players.created_at AS monthly_players_created_at, monthly_players.updated_at AS monthly_players_updated_at
FROM monthly_players
WHERE monthly_players.monthly_period_id = ? AND monthly_players.user_id = ?
2025-10-14 21:19:16,967 INFO sqlalchemy.engine.Engine [generated in 0.00031s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:19:16,969] INFO in __init__: [Perf][Request] GET /api/stats/payments/2025/10 -> 200 in 5ms
2025-10-14 21:19:16,969 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:16] "GET /api/stats/payments/2025/10 HTTP/1.1" 200 -
2025-10-14 21:19:17,216 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:17,217 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.year = ? AND monthly_periods.month = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:17,217 INFO sqlalchemy.engine.Engine [cached since 0.2517s ago] (2025, 10, '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:17,218 INFO sqlalchemy.engine.Engine SELECT monthly_players.id AS monthly_players_id, monthly_players.player_id AS monthly_players_player_id, monthly_players.monthly_period_id AS monthly_players_monthly_period_id, monthly_players.user_id AS monthly_players_user_id, monthly_players.player_name AS monthly_players_player_name, monthly_players.position AS monthly_players_position, monthly_players.phone AS monthly_players_phone, monthly_players.email AS monthly_players_email, monthly_players.monthly_fee AS monthly_players_monthly_fee, monthly_players.custom_monthly_fee AS monthly_players_custom_monthly_fee, monthly_players.join_date AS monthly_players_join_date, monthly_players.status AS monthly_players_status, monthly_players.payment_date AS monthly_players_payment_date, monthly_players.pending_months_count AS monthly_players_pending_months_count, monthly_players.created_at AS monthly_players_created_at, monthly_players.updated_at AS monthly_players_updated_at
FROM monthly_players
WHERE monthly_players.monthly_period_id = ? AND monthly_players.user_id = ?
2025-10-14 21:19:17,218 INFO sqlalchemy.engine.Engine [cached since 0.251s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:19:17,219] INFO in __init__: [Perf][Request] GET /api/stats/payments/2025/10 -> 200 in 2ms
2025-10-14 21:19:17,219 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:17] "GET /api/stats/payments/2025/10 HTTP/1.1" 200 -


(venv) (TraeAI-6) C:\Users\ANDREE\Desktop\sistema_futebol [0:0] $ flask run
[2025-10-14 21:19:32,056] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 21:19:32,057 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:32,057 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 21:19:32,058 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:32,058 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 21:19:32,058 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:32,059 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 21:19:32,059 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:32,059 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 21:19:32,059 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:32,060 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 21:19:32,060 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:32,060 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 21:19:32,060 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:32,061 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 21:19:32,061] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Serving Flask app 'backend.app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
[2025-10-14 21:19:33,488] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 21:19:33,490 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:33,490 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 21:19:33,492 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:33,493 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 21:19:33,493 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:33,494 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 21:19:33,494 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:33,495 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 21:19:33,495 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:33,495 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 21:19:33,495 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:33,496 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 21:19:33,496 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:33,496 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 21:19:33,497] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Debugger is active!
 * Debugger PIN: 454-874-479
[2025-10-14 21:19:40,239] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:40] "OPTIONS /api/monthly-periods HTTP/1.1" 200 -
[2025-10-14 21:19:40,240] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:40] "OPTIONS /api/monthly-periods HTTP/1.1" 200 -
C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\flask_sqlalchemy\model.py:22: SAWarning: relationship 'MonthlyPlayer.user' will copy column users.id to column monthly_players.user_id, which conflicts with relationship(s): 'MonthlyPeriod.monthly_players' (copies monthly_periods.user_id to monthly_players.user_id). If this is not the intention, consider if these relationships should be linked with back_populates, or if viewonly=True should be applied to one or more if they are read-only. For the less common case that foreign key constraints are partially overlapping, the orm.foreign() annotation can be used to isolate the columns that should be written towards.   To silence this warning, add the parameter 'overlaps="monthly_players"' to the 'MonthlyPlayer.user' relationship. (Background on this warning at: https://sqlalche.me/e/20/qzyx) (This warning originated from the `configure_mappers()` process, which was invoked automatically in response to a user-initiated operation.)
  return cls.query_class(
2025-10-14 21:19:40,530 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:40,534 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 21:19:40,534 INFO sqlalchemy.engine.Engine [generated in 0.00042s] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 21:19:40,536] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 32ms
2025-10-14 21:19:40,537 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:40] "GET /api/monthly-periods HTTP/1.1" 200 -
2025-10-14 21:19:40,552 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:40,552 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 21:19:40,552 INFO sqlalchemy.engine.Engine [cached since 0.01846s ago] ('6307e26d-166b-4892-8a10-133510bb6516',)
[2025-10-14 21:19:40,553] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 2ms
2025-10-14 21:19:40,554 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:40] "GET /api/monthly-periods HTTP/1.1" 200 -
[2025-10-14 21:19:40,852] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:40] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
[2025-10-14 21:19:40,852] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:40] "OPTIONS /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses HTTP/1.1" 200 -        
[2025-10-14 21:19:40,853] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:40] "OPTIONS /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses HTTP/1.1" 200 -        
[2025-10-14 21:19:40,854] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:40] "OPTIONS /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses HTTP/1.1" 200 -        
[2025-10-14 21:19:40,854] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:40] "OPTIONS /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses HTTP/1.1" 200 -        
[2025-10-14 21:19:40,862] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:40] "OPTIONS /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses HTTP/1.1" 200 -        
[2025-10-14 21:19:41,167] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:41] "OPTIONS /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses HTTP/1.1" 200 -
[2025-10-14 21:19:41,168] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:41] "OPTIONS /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses HTTP/1.1" 200 -        
[2025-10-14 21:19:41,168] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:41] "OPTIONS /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses HTTP/1.1" 200 -        
[2025-10-14 21:19:41,169] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:41] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -        
[2025-10-14 21:19:41,169] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:41] "OPTIONS /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses HTTP/1.1" 200 -        
[2025-10-14 21:19:41,170] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:41] "OPTIONS /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses HTTP/1.1" 200 -
[2025-10-14 21:19:41,483] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 200 in 0ms
2025-10-14 21:19:41,484 INFO sqlalchemy.engine.Engine BEGIN (implicit)
127.0.0.1 - - [14/Oct/2025 21:19:41] "OPTIONS /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses HTTP/1.1" 200 -        
2025-10-14 21:19:41,486 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:41,487 INFO sqlalchemy.engine.Engine [generated in 0.00110s] ('f8c0022b-fd8f-49cb-8a54-ece546d15389', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
[2025-10-14 21:19:41,487] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:19:41] "OPTIONS /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses HTTP/1.1" 200 -        
2025-10-14 21:19:41,490 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:41,493 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:41,496 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:19:41,497 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:41,497 INFO sqlalchemy.engine.Engine [cached since 0.01078s ago] ('9d9b8ac5-fe6e-484b-9729-b7652782bc4a', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:41,498 INFO sqlalchemy.engine.Engine [generated in 0.00208s] ('f8c0022b-fd8f-49cb-8a54-ece546d15389', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 21:19:41,499 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
[2025-10-14 21:19:41,500] INFO in __init__: [Perf][Request] GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 200 in 17ms
2025-10-14 21:19:41,499 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:41,500 INFO sqlalchemy.engine.Engine [cached since 0.01392s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:41,501 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:41] "GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses HTTP/1.1" 200 -
2025-10-14 21:19:41,501 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:41,502 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:19:41,502 INFO sqlalchemy.engine.Engine [cached since 0.01622s ago] ('8b278aa0-a6ab-488f-bb55-491255ed2072', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:41,503 INFO sqlalchemy.engine.Engine [cached since 0.00657s ago] ('9d9b8ac5-fe6e-484b-9729-b7652782bc4a', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 21:19:41,503 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:19:41,504 INFO sqlalchemy.engine.Engine [cached since 0.007622s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:19:41,504] INFO in __init__: [Perf][Request] GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 200 in 16ms
2025-10-14 21:19:41,505 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:41] "GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses HTTP/1.1" 200 -
2025-10-14 21:19:41,506 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:19:41,507 INFO sqlalchemy.engine.Engine [cached since 0.01113s ago] ('8b278aa0-a6ab-488f-bb55-491255ed2072', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:19:41,506] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 15ms
2025-10-14 21:19:41,509 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:41] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
[2025-10-14 21:19:41,510] INFO in __init__: [Perf][Request] GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 200 in 12ms
2025-10-14 21:19:41,513 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:41] "GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses HTTP/1.1" 200 -
2025-10-14 21:19:41,795 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:41,796 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:41,797 INFO sqlalchemy.engine.Engine [cached since 0.3112s ago] ('211ec706-f5bf-4a53-b906-6f19877c6600', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:41,797 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:41,798 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:41,798 INFO sqlalchemy.engine.Engine [cached since 0.312s ago] ('8fde156b-43b2-4c7b-a4bc-1896c597bf04', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:41,798 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:19:41,799 INFO sqlalchemy.engine.Engine [cached since 0.3025s ago] ('211ec706-f5bf-4a53-b906-6f19877c6600', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 21:19:41,799 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
[2025-10-14 21:19:41,801] INFO in __init__: [Perf][Request] GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 200 in 6ms
2025-10-14 21:19:41,803 INFO sqlalchemy.engine.Engine [cached since 0.3067s ago] ('8fde156b-43b2-4c7b-a4bc-1896c597bf04', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 21:19:41,803 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:41] "GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses HTTP/1.1" 200 -
[2025-10-14 21:19:41,804] INFO in __init__: [Perf][Request] GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 200 in 7ms
2025-10-14 21:19:41,805 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:41] "GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses HTTP/1.1" 200 -
2025-10-14 21:19:41,811 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:41,812 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:41,812 INFO sqlalchemy.engine.Engine [cached since 0.3264s ago] ('369deb54-5467-4e5f-8c66-1a8932105ded', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:41,814 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:19:41,814 INFO sqlalchemy.engine.Engine [cached since 0.3182s ago] ('369deb54-5467-4e5f-8c66-1a8932105ded', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:19:41,815] INFO in __init__: [Perf][Request] GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 200 in 5ms
2025-10-14 21:19:41,816 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:41] "GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses HTTP/1.1" 200 -
2025-10-14 21:19:41,821 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:41,822 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:41,822 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:41,822 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:41,822 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:41,823 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:41,824 INFO sqlalchemy.engine.Engine [cached since 0.3377s ago] ('9d9b8ac5-fe6e-484b-9729-b7652782bc4a', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:41,824 INFO sqlalchemy.engine.Engine [cached since 0.338s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:41,824 INFO sqlalchemy.engine.Engine [cached since 0.3383s ago] ('f8c0022b-fd8f-49cb-8a54-ece546d15389', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:41,828 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:19:41,829 INFO sqlalchemy.engine.Engine [cached since 0.3327s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 21:19:41,828 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
[2025-10-14 21:19:41,831] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 10ms
2025-10-14 21:19:41,830 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:19:41,831 INFO sqlalchemy.engine.Engine [cached since 0.3347s ago] ('9d9b8ac5-fe6e-484b-9729-b7652782bc4a', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 21:19:41,832 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:41] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
2025-10-14 21:19:41,832 INFO sqlalchemy.engine.Engine [cached since 0.3357s ago] ('f8c0022b-fd8f-49cb-8a54-ece546d15389', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:19:41,833] INFO in __init__: [Perf][Request] GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 200 in 12ms
2025-10-14 21:19:41,834 INFO sqlalchemy.engine.Engine ROLLBACK
[2025-10-14 21:19:41,833] INFO in __init__: [Perf][Request] GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 200 in 14ms
127.0.0.1 - - [14/Oct/2025 21:19:41] "GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses HTTP/1.1" 200 -
2025-10-14 21:19:41,835 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:41] "GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses HTTP/1.1" 200 -
2025-10-14 21:19:42,110 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:42,111 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:42,112 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:42,112 INFO sqlalchemy.engine.Engine [cached since 0.6257s ago] ('8b278aa0-a6ab-488f-bb55-491255ed2072', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:42,112 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:42,113 INFO sqlalchemy.engine.Engine [cached since 0.6266s ago] ('211ec706-f5bf-4a53-b906-6f19877c6600', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:42,113 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:19:42,114 INFO sqlalchemy.engine.Engine [cached since 0.6176s ago] ('8b278aa0-a6ab-488f-bb55-491255ed2072', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 21:19:42,114 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:19:42,114 INFO sqlalchemy.engine.Engine [cached since 0.6183s ago] ('211ec706-f5bf-4a53-b906-6f19877c6600', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:19:42,115] INFO in __init__: [Perf][Request] GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 200 in 5ms
2025-10-14 21:19:42,115 INFO sqlalchemy.engine.Engine ROLLBACK
[2025-10-14 21:19:42,115] INFO in __init__: [Perf][Request] GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 200 in 4ms
127.0.0.1 - - [14/Oct/2025 21:19:42] "GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses HTTP/1.1" 200 -
2025-10-14 21:19:42,116 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:42] "GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses HTTP/1.1" 200 -
2025-10-14 21:19:42,125 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:42,126 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:42,126 INFO sqlalchemy.engine.Engine [cached since 0.6401s ago] ('8fde156b-43b2-4c7b-a4bc-1896c597bf04', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:42,127 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:19:42,127 INFO sqlalchemy.engine.Engine [cached since 0.6311s ago] ('8fde156b-43b2-4c7b-a4bc-1896c597bf04', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:19:42,128] INFO in __init__: [Perf][Request] GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 200 in 2ms
2025-10-14 21:19:42,128 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:42] "GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses HTTP/1.1" 200 -
2025-10-14 21:19:42,141 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:42,141 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:19:42,142 INFO sqlalchemy.engine.Engine [cached since 0.6555s ago] ('369deb54-5467-4e5f-8c66-1a8932105ded', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:19:42,142 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:19:42,143 INFO sqlalchemy.engine.Engine [cached since 0.6466s ago] ('369deb54-5467-4e5f-8c66-1a8932105ded', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:19:42,143] INFO in __init__: [Perf][Request] GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 200 in 2ms
2025-10-14 21:19:42,144 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:19:42] "GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses HTTP/1.1" 200 -


venv) (TraeAI-6) C:\Users\ANDREE\Desktop\sistema_futebol [0:0] $ flask run
[2025-10-14 21:19:58,786] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 21:19:58,787 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:19:58,787 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 21:19:58,787 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:58,788 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 21:19:58,788 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:58,788 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 21:19:58,789 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:58,789 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 21:19:58,789 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:58,789 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 21:19:58,789 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:58,790 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 21:19:58,790 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:19:58,790 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 21:19:58,790] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Serving Flask app 'backend.app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
[2025-10-14 21:20:00,092] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 21:20:00,093 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:20:00,094 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 21:20:00,094 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:20:00,095 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 21:20:00,095 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:20:00,095 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 21:20:00,095 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:20:00,096 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 21:20:00,096 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:20:00,096 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 21:20:00,096 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:20:00,097 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 21:20:00,097 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 21:20:00,097 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 21:20:00,097] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Debugger is active!
 * Debugger PIN: 454-874-479
[2025-10-14 21:20:03,690] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods -> 200 in 0ms
[2025-10-14 21:20:03,691] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:20:03] "OPTIONS /api/monthly-periods?month=10&year=2025 HTTP/1.1" 200 -
127.0.0.1 - - [14/Oct/2025 21:20:03] "OPTIONS /api/monthly-periods?month=10&year=2025 HTTP/1.1" 200 -
C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\flask_sqlalchemy\model.py:22: SAWarning: relationship 'MonthlyPlayer.user' will copy column users.id to column monthly_players.user_id, which conflicts with relationship(s): 'MonthlyPeriod.monthly_players' (copies monthly_periods.user_id to monthly_players.user_id). If this is not the intention, consider if these relationships should be linked with back_populates, or if viewonly=True should be applied to one or more if they are read-only. For the less common case that foreign key constraints are partially overlapping, the orm.foreign() annotation can be used to isolate the columns that should be written towards.   To silence this warning, add the parameter 'overlaps="monthly_players"' to the 'MonthlyPlayer.user' relationship. (Background on this warning at: https://sqlalche.me/e/20/qzyx) (This warning originated from the `configure_mappers()` process, which was invoked automatically in response to a user-initiated operation.)
  return cls.query_class(
2025-10-14 21:20:03,979 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:20:03,983 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? AND monthly_periods.year = ? AND monthly_periods.month = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 21:20:03,983 INFO sqlalchemy.engine.Engine [generated in 0.00045s] ('6307e26d-166b-4892-8a10-133510bb6516', 2025, 10)        
[2025-10-14 21:20:03,984] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 27ms
2025-10-14 21:20:03,984 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:20:03] "GET /api/monthly-periods?month=10&year=2025 HTTP/1.1" 200 -
2025-10-14 21:20:04,002 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:20:04,003 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? AND monthly_periods.year = ? AND monthly_periods.month = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 21:20:04,003 INFO sqlalchemy.engine.Engine [cached since 0.02049s ago] ('6307e26d-166b-4892-8a10-133510bb6516', 2025, 10)    
[2025-10-14 21:20:04,004] INFO in __init__: [Perf][Request] GET /api/monthly-periods -> 200 in 2ms
2025-10-14 21:20:04,004 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:20:04] "GET /api/monthly-periods?month=10&year=2025 HTTP/1.1" 200 -
[2025-10-14 21:20:04,304] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:20:04] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
[2025-10-14 21:20:04,304] INFO in __init__: [Perf][Request] OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 0ms
127.0.0.1 - - [14/Oct/2025 21:20:04] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -        
2025-10-14 21:20:04,309 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:20:04,311 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:20:04,311 INFO sqlalchemy.engine.Engine [generated in 0.00032s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:20:04,313 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:20:04,314 INFO sqlalchemy.engine.Engine [generated in 0.00049s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:20:04,315] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 5ms
2025-10-14 21:20:04,315 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:20:04] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
2025-10-14 21:20:04,613 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 21:20:04,613 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 21:20:04,614 INFO sqlalchemy.engine.Engine [cached since 0.303s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 21:20:04,615 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 21:20:04,615 INFO sqlalchemy.engine.Engine [cached since 0.3017s ago] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
[2025-10-14 21:20:04,615] INFO in __init__: [Perf][Request] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 200 in 2ms
2025-10-14 21:20:04,616 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 21:20:04] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -


:3000/landing:1 [DOM] Input elements should have autocomplete attributes (suggested: "current-password"): (More info: https://goo.gl/9p2vKq) 
 Download the React DevTools for a better development experience: https://react.dev/link/react-devtools
 [Fast Refresh] rebuilding
 [Fast Refresh] done in 933ms
 [Fast Refresh] rebuilding
 [Fast Refresh] done in 853ms
 [Perf][API] GET /api/players -> 370ms (status: 200)
 [Perf][API] GET /api/players -> 783ms (status: 200)
 [Perf][API] GET /api/stats/players -> 835ms (status: 200)
 [Perf][API] GET /api/stats/players -> 1119ms (status: 200)
 [Fast Refresh] rebuilding
 [Fast Refresh] done in 1454ms
 [DEBUG] Carregando dados para 10/2025
 [DEBUG] Carregando dados para 10/2025
 [Perf][API] GET /api/monthly-periods -> 330ms (status: 200)
 🔍 [MonthlyPage] Buscando jogadores para período: 317a4f44-aa20-493d-a0b0-e3d7b802a002
 [PaymentsService] getMonthlyPlayers - INÍCIO
 [PaymentsService] periodId: 317a4f44-aa20-493d-a0b0-e3d7b802a002
 [PaymentsService] params: Object
 [PaymentsService] Endpoint da API: /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players
 [PaymentsService] Chamando api.get...
 [Perf][API] GET /api/monthly-periods -> 661ms (status: 200)
 🔍 [MonthlyPage] Buscando jogadores para período: 317a4f44-aa20-493d-a0b0-e3d7b802a002
 [PaymentsService] getMonthlyPlayers - INÍCIO
 [PaymentsService] periodId: 317a4f44-aa20-493d-a0b0-e3d7b802a002
 [PaymentsService] params: Object
 [PaymentsService] Endpoint da API: /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players
 [PaymentsService] Chamando api.get...
 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 594ms (status: 200)
 [PaymentsService] Resposta da API recebida: Array(1)
 [PaymentsService] Tipo da resposta: object
 [PaymentsService] É array?: true
 [PaymentsService] Tamanho se for array: 1
 [PaymentsService] JSON.stringify da resposta: [
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
 [PaymentsService] PRIMEIRO ITEM DETALHADO: {
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
 [PaymentsService] Chaves do primeiro item: Array(13)
 [PaymentsService] Resposta é array direto, adaptando...
 [PaymentsService] Tamanho do array: 1
 [PaymentsService] Primeiro item completo: {
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
 [PaymentsService] Processando jogador 0: {
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
 [PaymentsService] Jogador 0 processado: {
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
 [PaymentsService] Total de jogadores processados: 1
 [PaymentsService] Todos os jogadores processados: [
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
 [PaymentsService] Resposta adaptada final: {
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
 [PaymentsService] getMonthlyPlayers - RETORNANDO ARRAY ADAPTADO
 🔍 [MonthlyPage] Resposta completa do getMonthlyPlayers: {
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
 🔍 [MonthlyPage] Dados dos jogadores recebidos: Array(1)
 🔍 [MonthlyPage] Quantidade de jogadores: 1
 🔍 [MonthlyPage] Jogadores processados: Array(1)
 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 322ms (status: 200)
 [PaymentsService] Resposta da API recebida: Array(1)
 [PaymentsService] Tipo da resposta: object
 [PaymentsService] É array?: true
 [PaymentsService] Tamanho se for array: 1
 [PaymentsService] JSON.stringify da resposta: [
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
 [PaymentsService] PRIMEIRO ITEM DETALHADO: {
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
 [PaymentsService] Chaves do primeiro item: Array(13)
 [PaymentsService] Resposta é array direto, adaptando...
 [PaymentsService] Tamanho do array: 1
 [PaymentsService] Primeiro item completo: {
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
 [PaymentsService] Processando jogador 0: {
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
 [PaymentsService] Jogador 0 processado: {
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
 [PaymentsService] Total de jogadores processados: 1
 [PaymentsService] Todos os jogadores processados: [
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
 [PaymentsService] Resposta adaptada final: {
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
 [PaymentsService] getMonthlyPlayers - RETORNANDO ARRAY ADAPTADO
 🔍 [MonthlyPage] Resposta completa do getMonthlyPlayers: {
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
 🔍 [MonthlyPage] Dados dos jogadores recebidos: Array(1)
 🔍 [MonthlyPage] Quantidade de jogadores: 1
 🔍 [MonthlyPage] Jogadores processados: Array(1)
 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 374ms (status: 200)
 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 562ms (status: 200)
 [Perf][API] GET /api/stats/payments/2025/10 -> 564ms (status: 200)
 [Perf][API] GET /api/stats/payments/2025/10 -> 376ms (status: 200)
 [Perf][API] GET /api/players -> 638ms (status: 200)
 [Perf][API] GET /api/stats/players -> 684ms (status: 200)
 [Perf][API] GET /api/players -> 684ms (status: 200)
 [Perf][API] GET /api/stats/players -> 957ms (status: 200)
 [DEBUG] Carregando dados para 10/2025
 [DEBUG] Carregando dados para 10/2025
 [Perf][API] GET /api/monthly-periods -> 587ms (status: 200)
 🔍 [MonthlyPage] Buscando jogadores para período: 317a4f44-aa20-493d-a0b0-e3d7b802a002
 [PaymentsService] getMonthlyPlayers - INÍCIO
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:251 [PaymentsService] periodId: 317a4f44-aa20-493d-a0b0-e3d7b802a002
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:252 [PaymentsService] params: Object
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:259 [PaymentsService] Endpoint da API: /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:261 [PaymentsService] Chamando api.get...
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods -> 631ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:86 🔍 [MonthlyPage] Buscando jogadores para período: 317a4f44-aa20-493d-a0b0-e3d7b802a002
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:250 [PaymentsService] getMonthlyPlayers - INÍCIO
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:251 [PaymentsService] periodId: 317a4f44-aa20-493d-a0b0-e3d7b802a002
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:252 [PaymentsService] params: Object
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:259 [PaymentsService] Endpoint da API: /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:261 [PaymentsService] Chamando api.get...
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 368ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:263 [PaymentsService] Resposta da API recebida: Array(1)
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
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:272 [PaymentsService] Chaves do primeiro item: Array(13)
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
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:90 🔍 [MonthlyPage] Dados dos jogadores recebidos: Array(1)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:91 🔍 [MonthlyPage] Quantidade de jogadores: 1
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:107 🔍 [MonthlyPage] Jogadores processados: Array(1)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/players -> 586ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:263 [PaymentsService] Resposta da API recebida: Array(1)
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
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\services\payments.ts:272 [PaymentsService] Chaves do primeiro item: Array(13)
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
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:90 🔍 [MonthlyPage] Dados dos jogadores recebidos: Array(1)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:91 🔍 [MonthlyPage] Quantidade de jogadores: 1
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\monthly\page.tsx:107 🔍 [MonthlyPage] Jogadores processados: Array(1)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 577ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/casual-players -> 375ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/stats/payments/2025/10 -> 375ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/stats/payments/2025/10 -> 564ms (status: 200)
hot-reloader-app.js:197 [Fast Refresh] rebuilding
report-hmr-latency.js:14 [Fast Refresh] done in 1493ms
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods -> 606ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods -> 622ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 969ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 970ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 975ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 975ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 1267ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 1269ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 1279ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\cashflow-data.ts:120 [Perf][Cashflow] Agregação de despesas (7 períodos) -> 1280ms
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 1279ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/9d9b8ac5-fe6e-484b-9729-b7652782bc4a/expenses -> 1280ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/f8c0022b-fd8f-49cb-8a54-ece546d15389/expenses -> 1282ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/8b278aa0-a6ab-488f-bb55-491255ed2072/expenses -> 1562ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/211ec706-f5bf-4a53-b906-6f19877c6600/expenses -> 1562ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/8fde156b-43b2-4c7b-a4bc-1896c597bf04/expenses -> 1574ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/369deb54-5467-4e5f-8c66-1a8932105ded/expenses -> 1589ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\cashflow-data.ts:120 [Perf][Cashflow] Agregação de despesas (7 períodos) -> 1590ms
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:35 🔍 Buscando período para: 10/2025
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:35 🔍 Buscando período para: 10/2025
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods -> 623ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:42 📊 Resposta da API de períodos: Object
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:46 ✅ Período encontrado: 10/2025 (ID: 317a4f44-aa20-493d-a0b0-e3d7b802a002)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods -> 641ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:42 📊 Resposta da API de períodos: Object
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:46 ✅ Período encontrado: 10/2025 (ID: 317a4f44-aa20-493d-a0b0-e3d7b802a002)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 312ms (status: 200)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\lib\api.ts:203 [Perf][API] GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses -> 630ms (status: 200)


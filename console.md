(venv) (TraeAI-9) C:\Users\ANDREE\Desktop\sistema_futebol\backend [0:0] $ flask run
[2025-10-14 01:04:12,756] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 01:04:12,760 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:04:12,760 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 01:04:12,760 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:04:12,761 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 01:04:12,761 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:04:12,762 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 01:04:12,762 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:04:12,762 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 01:04:12,762 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:04:12,763 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 01:04:12,763 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:04:12,763 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 01:04:12,763 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:04:12,764 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 01:04:12,764] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Serving Flask app 'app.py'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
[2025-10-14 01:04:13,784] INFO in connection: SQLite PRAGMA foreign_keys=ON habilitado
2025-10-14 01:04:13,785 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:04:13,785 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("players")
2025-10-14 01:04:13,785 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:04:13,786 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_periods")
2025-10-14 01:04:13,786 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:04:13,786 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("monthly_players")
2025-10-14 01:04:13,786 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:04:13,787 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("casual_players")
2025-10-14 01:04:13,787 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:04:13,787 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("expenses")
2025-10-14 01:04:13,787 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:04:13,788 INFO sqlalchemy.engine.Engine PRAGMA main.table_info("users")
2025-10-14 01:04:13,788 INFO sqlalchemy.engine.Engine [raw sql] ()
2025-10-14 01:04:13,788 INFO sqlalchemy.engine.Engine COMMIT
[2025-10-14 01:04:13,788] INFO in __init__: Dev DB auto-created (ensure tables exist).
 * Debugger is active!
 * Debugger PIN: 454-874-479
127.0.0.1 - - [14/Oct/2025 01:04:25] "OPTIONS /api/monthly-periods?month=10&year=2025 HTTP/1.1" 200 -
C:\Users\ANDREE\Desktop\sistema_futebol\venv\Lib\site-packages\flask_sqlalchemy\model.py:22: SAWarning: relationship 'MonthlyPlayer.user' will copy column users.id to column monthly_players.user_id, which conflicts with relationship(s): 'MonthlyPeriod.monthly_players' (copies monthly_periods.user_id to monthly_players.user_id). If this is not the intention, consider if these relationships should be linked with back_populates, or if viewonly=True should be applied to one or more if they are read-only. For the less common case that foreign key constraints are partially overlapping, the orm.foreign() annotation can be used to isolate the columns that should be written towards.   To silence this warning, add the parameter 'overlaps="monthly_players"' to the 'MonthlyPlayer.user' relationship. (Background on this warning at: https://sqlalche.me/e/20/qzyx) (This warning originated from the `configure_mappers()` process, which was invoked automatically in response to a user-initiated operation.)
  return cls.query_class(
2025-10-14 01:04:25,908 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:04:25,910 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.user_id = ? AND monthly_periods.year = ? AND monthly_periods.month = ? ORDER BY monthly_periods.year DESC, monthly_periods.month DESC
2025-10-14 01:04:25,910 INFO sqlalchemy.engine.Engine [generated in 0.00039s] ('6307e26d-166b-4892-8a10-133510bb6516', 2025, 10)
2025-10-14 01:04:25,912 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:04:25] "GET /api/monthly-periods?month=10&year=2025 HTTP/1.1" 200 -
127.0.0.1 - - [14/Oct/2025 01:04:25] "OPTIONS /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -
2025-10-14 01:04:26,230 INFO sqlalchemy.engine.Engine BEGIN (implicit)
2025-10-14 01:04:26,231 INFO sqlalchemy.engine.Engine SELECT monthly_periods.id AS monthly_periods_id, monthly_periods.month AS monthly_periods_month, monthly_periods.year AS monthly_periods_year, monthly_periods.name AS monthly_periods_name, monthly_periods.is_active AS monthly_periods_is_active, monthly_periods.user_id AS monthly_periods_user_id, monthly_periods.total_expected AS monthly_periods_total_expected, monthly_periods.total_received AS monthly_periods_total_received, monthly_periods.players_count AS monthly_periods_players_count, monthly_periods.created_at AS monthly_periods_created_at, monthly_periods.updated_at AS monthly_periods_updated_at
FROM monthly_periods
WHERE monthly_periods.id = ? AND monthly_periods.user_id = ?
 LIMIT ? OFFSET ?
2025-10-14 01:04:26,231 INFO sqlalchemy.engine.Engine [generated in 0.00028s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516', 1, 0)
2025-10-14 01:04:26,233 INFO sqlalchemy.engine.Engine SELECT expenses.id AS expenses_id, expenses.monthly_period_id AS expenses_monthly_period_id, expenses.user_id AS expenses_user_id, expenses.description AS expenses_description, expenses.amount AS expenses_amount, expenses.category AS expenses_category, expenses.date AS expenses_date, expenses.month AS expenses_month, expenses.year AS expenses_year, expenses.created_at AS expenses_created_at, expenses.updated_at AS expenses_updated_at
FROM expenses
WHERE expenses.monthly_period_id = ? AND expenses.user_id = ?
2025-10-14 01:04:26,234 INFO sqlalchemy.engine.Engine [generated in 0.00034s] ('317a4f44-aa20-493d-a0b0-e3d7b802a002', '6307e26d-166b-4892-8a10-133510bb6516')
2025-10-14 01:04:26,235 INFO sqlalchemy.engine.Engine ROLLBACK
127.0.0.1 - - [14/Oct/2025 01:04:26] "GET /api/monthly-periods/317a4f44-aa20-493d-a0b0-e3d7b802a002/expenses HTTP/1.1" 200 -

main-app.js?v=1760414664382:1170 Download the React DevTools for a better development experience: https://react.dev/link/react-devtools
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:35 🔍 Buscando período para: 10/2025
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:42 📊 Resposta da API de períodos: {success: true, data: Array(1), message: undefined, timestamp: undefined, pagination: {…}}
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:46 ✅ Período encontrado: 10/2025 (ID: 317a4f44-aa20-493d-a0b0-e3d7b802a002)
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\components\ui\dialog.tsx:60 Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.
DescriptionWarning.useEffect @ index.mjs:477
react_stack_bottom_frame @ react-dom-client.development.js:23669
runWithFiberInDEV @ react-dom-client.development.js:872
commitHookEffectListMount @ react-dom-client.development.js:12345
commitHookPassiveMountEffects @ react-dom-client.development.js:12466
commitPassiveMountOnFiber @ react-dom-client.development.js:14387
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14390
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14390
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14390
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14390
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14485
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14458
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14390
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14390
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14390
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14485
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14458
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14514
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14390
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14380
recursivelyTraversePassiveMountEffects @ react-dom-client.development.js:14360
commitPassiveMountOnFiber @ react-dom-client.development.js:14390
<DescriptionWarning>
exports.jsx @ react-jsx-runtime.development.js:323
eval @ index.mjs:352
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateForwardRef @ react-dom-client.development.js:8807
beginWork @ react-dom-client.development.js:11197
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopSync @ react-dom-client.development.js:15547
renderRootSync @ react-dom-client.development.js:15527
performWorkOnRoot @ react-dom-client.development.js:14991
performSyncWorkOnRoot @ react-dom-client.development.js:16831
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16677
processRootScheduleInMicrotask @ react-dom-client.development.js:16715
eval @ react-dom-client.development.js:16850
<ForwardRef>
exports.jsx @ react-jsx-runtime.development.js:323
eval @ index.mjs:252
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateForwardRef @ react-dom-client.development.js:8807
beginWork @ react-dom-client.development.js:11197
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopSync @ react-dom-client.development.js:15547
renderRootSync @ react-dom-client.development.js:15527
performWorkOnRoot @ react-dom-client.development.js:14991
performSyncWorkOnRoot @ react-dom-client.development.js:16831
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16677
processRootScheduleInMicrotask @ react-dom-client.development.js:16715
eval @ react-dom-client.development.js:16850
<ForwardRef>
exports.jsx @ react-jsx-runtime.development.js:323
DialogContent @ index.mjs:220
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateForwardRef @ react-dom-client.development.js:8807
beginWork @ react-dom-client.development.js:11197
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopSync @ react-dom-client.development.js:15547
renderRootSync @ react-dom-client.development.js:15527
performWorkOnRoot @ react-dom-client.development.js:14991
performSyncWorkOnRoot @ react-dom-client.development.js:16831
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16677
processRootScheduleInMicrotask @ react-dom-client.development.js:16715
eval @ react-dom-client.development.js:16850
<DialogContent>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:323
DialogContent @ C:\Users\ANDREE\Desktop\sistema_futebol\frontend\components\ui\dialog.tsx:60
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateFunctionComponent @ react-dom-client.development.js:9247
beginWork @ react-dom-client.development.js:10858
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopSync @ react-dom-client.development.js:15547
renderRootSync @ react-dom-client.development.js:15527
performWorkOnRoot @ react-dom-client.development.js:14991
performSyncWorkOnRoot @ react-dom-client.development.js:16831
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16677
processRootScheduleInMicrotask @ react-dom-client.development.js:16715
eval @ react-dom-client.development.js:16850
<DialogContent>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:323
AddExpenseDialog @ C:\Users\ANDREE\Desktop\sistema_futebol\frontend\components\add-expense-dialog.tsx:118
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateFunctionComponent @ react-dom-client.development.js:9247
beginWork @ react-dom-client.development.js:10858
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopSync @ react-dom-client.development.js:15547
renderRootSync @ react-dom-client.development.js:15527
performWorkOnRoot @ react-dom-client.development.js:14991
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16816
performWorkUntilDeadline @ scheduler.development.js:45
<AddExpenseDialog>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:323
ExpensesPage @ C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:271
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateFunctionComponent @ react-dom-client.development.js:9247
beginWork @ react-dom-client.development.js:10858
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopSync @ react-dom-client.development.js:15547
renderRootSync @ react-dom-client.development.js:15527
performWorkOnRoot @ react-dom-client.development.js:14991
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16816
performWorkUntilDeadline @ scheduler.development.js:45
<ExpensesPage>
exports.jsx @ react-jsx-runtime.development.js:323
ClientPageRoot @ client-page.js:20
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateFunctionComponent @ react-dom-client.development.js:9247
beginWork @ react-dom-client.development.js:10807
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopConcurrentByScheduler @ react-dom-client.development.js:15721
renderRootConcurrent @ react-dom-client.development.js:15696
performWorkOnRoot @ react-dom-client.development.js:14990
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16816
performWorkUntilDeadline @ scheduler.development.js:45
"use client"
Function.all @ VM1154 <anonymous>:1
Function.all @ VM1154 <anonymous>:1
Function.all @ VM1154 <anonymous>:1
initializeElement @ react-server-dom-webpack-client.browser.development.js:1343
eval @ react-server-dom-webpack-client.browser.development.js:3066
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1246
resolveModelChunk @ react-server-dom-webpack-client.browser.development.js:1101
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2899
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2766
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2969
progress @ react-server-dom-webpack-client.browser.development.js:3233
"use server"
ResponseInstance @ react-server-dom-webpack-client.browser.development.js:2041
createResponseFromOptions @ react-server-dom-webpack-client.browser.development.js:3094
exports.createFromReadableStream @ react-server-dom-webpack-client.browser.development.js:3478
eval @ app-index.js:130
(app-pages-browser)/./node_modules/.pnpm/next@15.5.4_@babel+core@7.2_b3e63afa656d653b2c379051d876aa0b/node_modules/next/dist/client/app-index.js @ main-app.js?v=1760414664382:160
options.factory @ webpack.js:1
__webpack_require__ @ webpack.js:1
fn @ webpack.js:1
eval @ app-next-dev.js:14
eval @ app-bootstrap.js:59
loadScriptsInSequence @ app-bootstrap.js:24
appBootstrap @ app-bootstrap.js:53
eval @ app-next-dev.js:13
(app-pages-browser)/./node_modules/.pnpm/next@15.5.4_@babel+core@7.2_b3e63afa656d653b2c379051d876aa0b/node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1760414664382:182
options.factory @ webpack.js:1
__webpack_require__ @ webpack.js:1
__webpack_exec__ @ main-app.js?v=1760414664382:1878
(anonymous) @ main-app.js?v=1760414664382:1879
webpackJsonpCallback @ webpack.js:1
(anonymous) @ main-app.js?v=1760414664382:9
C:\Users\ANDREE\Desktop\sistema_futebol\frontend\components\ui\dialog.tsx:60 Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.
DescriptionWarning.useEffect @ index.mjs:477
react_stack_bottom_frame @ react-dom-client.development.js:23669
runWithFiberInDEV @ react-dom-client.development.js:872
commitHookEffectListMount @ react-dom-client.development.js:12345
commitHookPassiveMountEffects @ react-dom-client.development.js:12466
reconnectPassiveEffects @ react-dom-client.development.js:14563
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14534
reconnectPassiveEffects @ react-dom-client.development.js:14610
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14534
reconnectPassiveEffects @ react-dom-client.development.js:14556
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14534
reconnectPassiveEffects @ react-dom-client.development.js:14556
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14534
reconnectPassiveEffects @ react-dom-client.development.js:14556
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14534
reconnectPassiveEffects @ react-dom-client.development.js:14556
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14534
reconnectPassiveEffects @ react-dom-client.development.js:14556
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14534
reconnectPassiveEffects @ react-dom-client.development.js:14556
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14534
reconnectPassiveEffects @ react-dom-client.development.js:14556
recursivelyTraverseReconnectPassiveEffects @ react-dom-client.development.js:14534
reconnectPassiveEffects @ react-dom-client.development.js:14610
doubleInvokeEffectsOnFiber @ react-dom-client.development.js:16566
runWithFiberInDEV @ react-dom-client.development.js:875
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16530
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
runWithFiberInDEV @ react-dom-client.development.js:875
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16550
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
runWithFiberInDEV @ react-dom-client.development.js:875
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16550
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
recursivelyTraverseAndDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16536
commitDoubleInvokeEffectsInDEV @ react-dom-client.development.js:16575
flushPassiveEffects @ react-dom-client.development.js:16348
flushPendingEffects @ react-dom-client.development.js:16299
flushSpawnedWork @ react-dom-client.development.js:16265
commitRoot @ react-dom-client.development.js:15998
commitRootWhenReady @ react-dom-client.development.js:15228
performWorkOnRoot @ react-dom-client.development.js:15147
performSyncWorkOnRoot @ react-dom-client.development.js:16831
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16677
processRootScheduleInMicrotask @ react-dom-client.development.js:16715
eval @ react-dom-client.development.js:16850
<DescriptionWarning>
exports.jsx @ react-jsx-runtime.development.js:323
eval @ index.mjs:352
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateForwardRef @ react-dom-client.development.js:8807
beginWork @ react-dom-client.development.js:11197
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopSync @ react-dom-client.development.js:15547
renderRootSync @ react-dom-client.development.js:15527
performWorkOnRoot @ react-dom-client.development.js:14991
performSyncWorkOnRoot @ react-dom-client.development.js:16831
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16677
processRootScheduleInMicrotask @ react-dom-client.development.js:16715
eval @ react-dom-client.development.js:16850
<ForwardRef>
exports.jsx @ react-jsx-runtime.development.js:323
eval @ index.mjs:252
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateForwardRef @ react-dom-client.development.js:8807
beginWork @ react-dom-client.development.js:11197
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopSync @ react-dom-client.development.js:15547
renderRootSync @ react-dom-client.development.js:15527
performWorkOnRoot @ react-dom-client.development.js:14991
performSyncWorkOnRoot @ react-dom-client.development.js:16831
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16677
processRootScheduleInMicrotask @ react-dom-client.development.js:16715
eval @ react-dom-client.development.js:16850
<ForwardRef>
exports.jsx @ react-jsx-runtime.development.js:323
DialogContent @ index.mjs:220
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateForwardRef @ react-dom-client.development.js:8807
beginWork @ react-dom-client.development.js:11197
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopSync @ react-dom-client.development.js:15547
renderRootSync @ react-dom-client.development.js:15527
performWorkOnRoot @ react-dom-client.development.js:14991
performSyncWorkOnRoot @ react-dom-client.development.js:16831
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16677
processRootScheduleInMicrotask @ react-dom-client.development.js:16715
eval @ react-dom-client.development.js:16850
<DialogContent>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:323
DialogContent @ C:\Users\ANDREE\Desktop\sistema_futebol\frontend\components\ui\dialog.tsx:60
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateFunctionComponent @ react-dom-client.development.js:9247
beginWork @ react-dom-client.development.js:10858
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopSync @ react-dom-client.development.js:15547
renderRootSync @ react-dom-client.development.js:15527
performWorkOnRoot @ react-dom-client.development.js:14991
performSyncWorkOnRoot @ react-dom-client.development.js:16831
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16677
processRootScheduleInMicrotask @ react-dom-client.development.js:16715
eval @ react-dom-client.development.js:16850
<DialogContent>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:323
AddExpenseDialog @ C:\Users\ANDREE\Desktop\sistema_futebol\frontend\components\add-expense-dialog.tsx:118
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateFunctionComponent @ react-dom-client.development.js:9247
beginWork @ react-dom-client.development.js:10858
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopSync @ react-dom-client.development.js:15547
renderRootSync @ react-dom-client.development.js:15527
performWorkOnRoot @ react-dom-client.development.js:14991
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16816
performWorkUntilDeadline @ scheduler.development.js:45
<AddExpenseDialog>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:323
ExpensesPage @ C:\Users\ANDREE\Desktop\sistema_futebol\frontend\app\dashboard\expenses\page.tsx:271
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateFunctionComponent @ react-dom-client.development.js:9247
beginWork @ react-dom-client.development.js:10858
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopSync @ react-dom-client.development.js:15547
renderRootSync @ react-dom-client.development.js:15527
performWorkOnRoot @ react-dom-client.development.js:14991
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16816
performWorkUntilDeadline @ scheduler.development.js:45
<ExpensesPage>
exports.jsx @ react-jsx-runtime.development.js:323
ClientPageRoot @ client-page.js:20
react_stack_bottom_frame @ react-dom-client.development.js:23584
renderWithHooksAgain @ react-dom-client.development.js:6893
renderWithHooks @ react-dom-client.development.js:6805
updateFunctionComponent @ react-dom-client.development.js:9247
beginWork @ react-dom-client.development.js:10807
runWithFiberInDEV @ react-dom-client.development.js:872
performUnitOfWork @ react-dom-client.development.js:15727
workLoopConcurrentByScheduler @ react-dom-client.development.js:15721
renderRootConcurrent @ react-dom-client.development.js:15696
performWorkOnRoot @ react-dom-client.development.js:14990
performWorkOnRootViaSchedulerTask @ react-dom-client.development.js:16816
performWorkUntilDeadline @ scheduler.development.js:45
"use client"
Function.all @ VM1154 <anonymous>:1
Function.all @ VM1154 <anonymous>:1
Function.all @ VM1154 <anonymous>:1
initializeElement @ react-server-dom-webpack-client.browser.development.js:1343
eval @ react-server-dom-webpack-client.browser.development.js:3066
initializeModelChunk @ react-server-dom-webpack-client.browser.development.js:1246
resolveModelChunk @ react-server-dom-webpack-client.browser.development.js:1101
processFullStringRow @ react-server-dom-webpack-client.browser.development.js:2899
processFullBinaryRow @ react-server-dom-webpack-client.browser.development.js:2766
processBinaryChunk @ react-server-dom-webpack-client.browser.development.js:2969
progress @ react-server-dom-webpack-client.browser.development.js:3233
"use server"
ResponseInstance @ react-server-dom-webpack-client.browser.development.js:2041
createResponseFromOptions @ react-server-dom-webpack-client.browser.development.js:3094
exports.createFromReadableStream @ react-server-dom-webpack-client.browser.development.js:3478
eval @ app-index.js:130
(app-pages-browser)/./node_modules/.pnpm/next@15.5.4_@babel+core@7.2_b3e63afa656d653b2c379051d876aa0b/node_modules/next/dist/client/app-index.js @ main-app.js?v=1760414664382:160
options.factory @ webpack.js:1
__webpack_require__ @ webpack.js:1
fn @ webpack.js:1
eval @ app-next-dev.js:14
eval @ app-bootstrap.js:59
loadScriptsInSequence @ app-bootstrap.js:24
appBootstrap @ app-bootstrap.js:53
eval @ app-next-dev.js:13
(app-pages-browser)/./node_modules/.pnpm/next@15.5.4_@babel+core@7.2_b3e63afa656d653b2c379051d876aa0b/node_modules/next/dist/client/app-next-dev.js @ main-app.js?v=1760414664382:182
options.factory @ webpack.js:1
__webpack_require__ @ webpack.js:1
__webpack_exec__ @ main-app.js?v=1760414664382:1878
(anonymous) @ main-app.js?v=1760414664382:1879
webpackJsonpCallback @ webpack.js:1
(anonymous) @ main-app.js?v=1760414664382:9
[Violation] 'submit' handler took 11066ms

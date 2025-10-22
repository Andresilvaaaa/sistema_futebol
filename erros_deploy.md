root@srv866884:~# cd ~/sistema_futebol
root@srv866884:~/sistema_futebol# docker compose -f docker-compose.prod.yml exec backend bash
root@4a4fca6ea6a1:/app# cd /app
flask db current
flask db history
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
d5a0b37e5b49
d5a0b37e5b49 -> e1a2b3c4d5f6 (head), add initial_balance to users
b97cc35f62e7 -> d5a0b37e5b49, cleanup tmp players table
4f7d0e32f0cd -> b97cc35f62e7, Add multi-tenant constraints (FKs compostas e unicidade por usuário)
32bca4f380be -> 4f7d0e32f0cd, Add custom_monthly_fee column to monthly_players
<base> -> 32bca4f380be, add custom_monthly_fee to monthly_players
root@4a4fca6ea6a1:/app# flask db upgrade
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade d5a0b37e5b49 -> e1a2b3c4d5f6, add initial_balance to users
Traceback (most recent call last):
  File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
    self.dialect.do_execute(
  File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/default.py", line 941, in do_execute
    cursor.execute(statement, parameters)
psycopg2.errors.InFailedSqlTransaction: current transaction is aborted, commands ignored until end of transaction block


The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "/usr/local/bin/flask", line 7, in <module>
    sys.exit(main())
             ^^^^^^
  File "/usr/local/lib/python3.11/site-packages/flask/cli.py", line 1105, in main
    cli.main()
  File "/usr/local/lib/python3.11/site-packages/click/core.py", line 1078, in main
    rv = self.invoke(ctx)
         ^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/click/core.py", line 1688, in invoke
    return _process_result(sub_ctx.command.invoke(sub_ctx))
                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/click/core.py", line 1688, in invoke
    return _process_result(sub_ctx.command.invoke(sub_ctx))
                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/click/core.py", line 1434, in invoke
    return ctx.invoke(self.callback, **ctx.params)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/click/core.py", line 783, in invoke
    return __callback(*args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/click/decorators.py", line 33, in new_func
    return f(get_current_context(), *args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/flask/cli.py", line 386, in decorator
    return ctx.invoke(f, *args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/click/core.py", line 783, in invoke
    return __callback(*args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/flask_migrate/cli.py", line 157, in upgrade
    _upgrade(directory or g.directory, revision, sql, tag, x_arg or g.x_arg)
  File "/usr/local/lib/python3.11/site-packages/flask_migrate/__init__.py", line 111, in wrapped
    f(*args, **kwargs)
  File "/usr/local/lib/python3.11/site-packages/flask_migrate/__init__.py", line 200, in upgrade
    command.upgrade(config, revision, sql=sql, tag=tag)
  File "/usr/local/lib/python3.11/site-packages/alembic/command.py", line 406, in upgrade
    script.run_env()
  File "/usr/local/lib/python3.11/site-packages/alembic/script/base.py", line 586, in run_env
    util.load_python_file(self.dir, "env.py")
  File "/usr/local/lib/python3.11/site-packages/alembic/util/pyfiles.py", line 95, in load_python_file
    module = load_module_py(module_id, path)
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/alembic/util/pyfiles.py", line 113, in load_module_py
    spec.loader.exec_module(module)  # type: ignore
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<frozen importlib._bootstrap_external>", line 940, in exec_module
  File "<frozen importlib._bootstrap>", line 241, in _call_with_frames_removed
  File "/app/migrations/env.py", line 113, in <module>
    run_migrations_online()
  File "/app/migrations/env.py", line 107, in run_migrations_online
    context.run_migrations()
  File "<string>", line 8, in run_migrations
  File "/usr/local/lib/python3.11/site-packages/alembic/runtime/environment.py", line 946, in run_migrations
    self.get_context().run_migrations(**kw)
  File "/usr/local/lib/python3.11/site-packages/alembic/runtime/migration.py", line 623, in run_migrations
    step.migration_fn(**kw)
  File "/app/migrations/versions/e1a2b3c4d5f6_add_initial_balance_to_users.py", line 39, in upgrade
    with op.batch_alter_table('users', schema=None) as batch_op:
  File "/usr/local/lib/python3.11/contextlib.py", line 144, in __exit__
    next(self.gen)
  File "/usr/local/lib/python3.11/site-packages/alembic/operations/base.py", line 398, in batch_alter_table
    impl.flush()
  File "/usr/local/lib/python3.11/site-packages/alembic/operations/batch.py", line 116, in flush
    fn(*arg, **kw)
  File "/usr/local/lib/python3.11/site-packages/alembic/ddl/impl.py", line 374, in add_column
    self._exec(base.AddColumn(table_name, column, schema=schema))
  File "/usr/local/lib/python3.11/site-packages/alembic/ddl/impl.py", line 247, in _exec
    return conn.execute(construct, params)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1418, in execute
    return meth(
           ^^^^^
  File "/usr/local/lib/python3.11/site-packages/sqlalchemy/sql/ddl.py", line 180, in _execute_on_connection
    return connection._execute_ddl(
           ^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1529, in _execute_ddl
    ret = self._execute_context(
          ^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1846, in _execute_context
    return self._exec_single_context(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1986, in _exec_single_context
    self._handle_dbapi_exception(
  File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 2355, in _handle_dbapi_exception
    raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
  File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
    self.dialect.do_execute(
  File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/default.py", line 941, in do_execute
    cursor.execute(statement, parameters)
sqlalchemy.exc.InternalError: (psycopg2.errors.InFailedSqlTransaction) current transaction is aborted, commands ignored until end of transaction block

[SQL: ALTER TABLE users ADD COLUMN initial_balance NUMERIC(10, 2) DEFAULT '0' NOT NULL]
(Background on this error at: https://sqlalche.me/e/20/2j85)
root@4a4fca6ea6a1:/app#




oot@srv866884:~# cd ~/sistema_futebol
root@srv866884:~/sistema_futebol# docker compose -f docker-compose.prod.yml ps
NAME                       IMAGE                                                   COMMAND                  SERVICE    CREATED          STATUS                      PORTS
sistema_futebol_backend    ghcr.io/andresilvaaaa/sistema-futebol-backend:latest    "gunicorn -w 4 -b 0.…"   backend    32 minutes ago   Up 32 minutes (unhealthy)   0.0.0.0:5001->5000/tcp, [::]:5001->5000/tcp
sistema_futebol_frontend   ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest   "docker-entrypoint.s…"   frontend   32 minutes ago   Up 32 minutes (healthy)     0.0.0.0:8080->3000/tcp, [::]:8080->3000/tcp
sistema_futebol_postgres   postgres:15-alpine                                      "docker-entrypoint.s…"   postgres   32 minutes ago   Up 32 minutes (healthy)     0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp
root@srv866884:~/sistema_futebol# docker compose -f docker-compose.prod.yml logs --tail=100 backend
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1846, in _execute_context
sistema_futebol_backend  |     return self._exec_single_context(
sistema_futebol_backend  |            ^^^^^^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1986, in _exec_single_context
sistema_futebol_backend  |     self._handle_dbapi_exception(
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 2355, in _handle_dbapi_exception
sistema_futebol_backend  |     raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
sistema_futebol_backend  |     self.dialect.do_execute(
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/default.py", line 941, in do_execute
sistema_futebol_backend  |     cursor.execute(statement, parameters)
sistema_futebol_backend  | sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedColumn) column users.initial_balance does not exist
sistema_futebol_backend  | LINE 1: ...assword_hash, users.is_active AS users_is_active, users.init...
sistema_futebol_backend  |                                                              ^
sistema_futebol_backend  |
sistema_futebol_backend  | [SQL: SELECT users.id AS users_id, users.username AS users_username, users.email AS users_email, users.password_hash AS users_password_hash, users.is_active AS users_is_active, users.initial_balance AS users_initial_balance, users.created_at AS users_created_at, users.updated_at AS users_updated_at
sistema_futebol_backend  | FROM users
sistema_futebol_backend  | WHERE users.email = %(email_1)s
sistema_futebol_backend  |  LIMIT %(param_1)s]
sistema_futebol_backend  | [parameters: {'email_1': 'andthegustavo@gmail.com', 'param_1': 1}]
sistema_futebol_backend  | (Background on this error at: https://sqlalche.me/e/20/f405)
sistema_futebol_backend  | /usr/local/lib/python3.11/site-packages/flask_sqlalchemy/model.py:22: SAWarning: relationship 'MonthlyPlayer.user' will copy column users.id to column monthly_players.user_id, which conflicts with relationship(s): 'MonthlyPeriod.monthly_players' (copies monthly_periods.user_id to monthly_players.user_id). If this is not the intention, consider if these relationships should be linked with back_populates, or if viewonly=True should be applied to one or more if they are read-only. For the less common case that foreign key constraints are partially overlapping, the orm.foreign() annotation can be used to isolate the columns that should be written towards.   To silence this warning, add the parameter 'overlaps="monthly_players"' to the 'MonthlyPlayer.user' relationship. (Background on this warning at: https://sqlalche.me/e/20/qzyx) (This warning originated from the `configure_mappers()` process, which was invoked automatically in response to a user-initiated operation.)
sistema_futebol_backend  |   return cls.query_class(
sistema_futebol_backend  | [2025-10-21 19:50:50,105] ERROR in app: Exception on /api/auth/login [POST]
sistema_futebol_backend  | Traceback (most recent call last):
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
sistema_futebol_backend  |     self.dialect.do_execute(
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/default.py", line 941, in do_execute
sistema_futebol_backend  |     cursor.execute(statement, parameters)
sistema_futebol_backend  | psycopg2.errors.UndefinedColumn: column users.initial_balance does not exist
sistema_futebol_backend  | LINE 1: ...assword_hash, users.is_active AS users_is_active, users.init...
sistema_futebol_backend  |                                                              ^
sistema_futebol_backend  |
sistema_futebol_backend  |
sistema_futebol_backend  | The above exception was the direct cause of the following exception:
sistema_futebol_backend  |
sistema_futebol_backend  | Traceback (most recent call last):
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/flask/app.py", line 1473, in wsgi_app
sistema_futebol_backend  |     response = self.full_dispatch_request()
sistema_futebol_backend  |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/flask/app.py", line 882, in full_dispatch_request
sistema_futebol_backend  |     rv = self.handle_user_exception(e)
sistema_futebol_backend  |          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/flask_cors/extension.py", line 176, in wrapped_function
sistema_futebol_backend  |     return cors_after_request(app.make_response(f(*args, **kwargs)))
sistema_futebol_backend  |                                                 ^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/flask/app.py", line 880, in full_dispatch_request
sistema_futebol_backend  |     rv = self.dispatch_request()
sistema_futebol_backend  |          ^^^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/flask/app.py", line 865, in dispatch_request
sistema_futebol_backend  |     return self.ensure_sync(self.view_functions[rule.endpoint])(**view_args)  # type: ignore[no-any-return]
sistema_futebol_backend  |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/app/backend/blueprints/auth/controllers.py", line 37, in login
sistema_futebol_backend  |     user = User.query.filter_by(email=raw_username.lower()).first()
sistema_futebol_backend  |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/orm/query.py", line 2728, in first
sistema_futebol_backend  |     return self.limit(1)._iter().first()  # type: ignore
sistema_futebol_backend  |            ^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/orm/query.py", line 2827, in _iter
sistema_futebol_backend  |     result: Union[ScalarResult[_T], Result[_T]] = self.session.execute(
sistema_futebol_backend  |                                                   ^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/orm/session.py", line 2362, in execute
sistema_futebol_backend  |     return self._execute_internal(
sistema_futebol_backend  |            ^^^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/orm/session.py", line 2247, in _execute_internal
sistema_futebol_backend  |     result: Result[Any] = compile_state_cls.orm_execute_statement(
sistema_futebol_backend  |                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/orm/context.py", line 305, in orm_execute_statement
sistema_futebol_backend  |     result = conn.execute(
sistema_futebol_backend  |              ^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1418, in execute
sistema_futebol_backend  |     return meth(
sistema_futebol_backend  |            ^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/sql/elements.py", line 515, in _execute_on_connection
sistema_futebol_backend  |     return connection._execute_clauseelement(
sistema_futebol_backend  |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1640, in _execute_clauseelement
sistema_futebol_backend  |     ret = self._execute_context(
sistema_futebol_backend  |           ^^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1846, in _execute_context
sistema_futebol_backend  |     return self._exec_single_context(
sistema_futebol_backend  |            ^^^^^^^^^^^^^^^^^^^^^^^^^^
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1986, in _exec_single_context
sistema_futebol_backend  |     self._handle_dbapi_exception(
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 2355, in _handle_dbapi_exception
sistema_futebol_backend  |     raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
sistema_futebol_backend  |     self.dialect.do_execute(
sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/default.py", line 941, in do_execute
sistema_futebol_backend  |     cursor.execute(statement, parameters)
sistema_futebol_backend  | sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedColumn) column users.initial_balance does not exist
sistema_futebol_backend  | LINE 1: ...assword_hash, users.is_active AS users_is_active, users.init...
sistema_futebol_backend  |                                                              ^
sistema_futebol_backend  |
sistema_futebol_backend  | [SQL: SELECT users.id AS users_id, users.username AS users_username, users.email AS users_email, users.password_hash AS users_password_hash, users.is_active AS users_is_active, users.initial_balance AS users_initial_balance, users.created_at AS users_created_at, users.updated_at AS users_updated_at
sistema_futebol_backend  | FROM users
sistema_futebol_backend  | WHERE users.email = %(email_1)s
sistema_futebol_backend  |  LIMIT %(param_1)s]
sistema_futebol_backend  | [parameters: {'email_1': 'andthegustavo@gmail.com', 'param_1': 1}]
sistema_futebol_backend  | (Background on this error at: https://sqlalche.me/e/20/f405)
root@srv866884:~/sistema_futebol# docker compose -f docker-compose.prod.yml logs --tail=100 db
no such service: db
root@srv866884:~/sistema_futebol# docker compose -f docker-compose.prod.yml logs --tail=100 nginx
no such service: nginx
root@srv866884:~/sistema_futebol# docker compose -f docker-compose.prod.yml exec db psql -U futebol_user -d futebol_db
service "db" is not running
root@srv866884:~/sistema_futebol#



root@srv866884:~/sistema_futebol# -- Verificar estrutura da tabela users

SELECT

    column_name,

    data_type,

    is_nullable,

    column_default

FROM information_schema.columns

WHERE table_name = 'users'

ORDER BY ordinal_position;

-- Verificar se há constraints faltando

SELECT

    tc.constraint_name,

    tc.constraint_type,

    kcu.column_name

FROM information_schema.table_constraints tc

JOIN information_schema.key_column_usage kcu

    ON tc.constraint_name = kcu.constraint_name

WHERE tc.table_name = 'users';

--: command not found

SELECT: command not found

column_name,: command not found

data_type,: command not found

is_nullable,: command not found

column_default: command not found

FROM: command not found

WHERE: command not found

ORDER: command not found

--: command not found

SELECT: command not found

tc.constraint_name,: command not found

tc.constraint_type,: command not found

kcu.column_name: command not found

FROM: command not found

JOIN: command not found

ON: command not found

WHERE: command not found

root@srv866884:~/sistema_futebol#

root@srv866884:~/sistema_futebol# # Verificar se o arquivo existe e está correto

docker compose -f docker-compose.prod.yml exec backend cat /app/blueprints/auth/controllers.py | grep -A 30 "def login"

cat: /app/blueprints/auth/controllers.py: No such file or directory

root@srv866884:~/sistema_futebol#

root@srv866884:~/sistema_futebol# #!/bin/bash

echo "=== 🔍 DIAGNÓSTICO DO SISTEMA ==="

echo ""

echo "1️⃣ Status dos Containers:"

docker compose -f docker-compose.prod.yml ps

echo ""

echo "2️⃣ Últimos logs do Backend:"

docker compose -f docker-compose.prod.yml logs --tail=50 backend | grep -i "error\|exception\|traceback" || echo "Nenhum erro encontrado nos logs recentes"

echo ""

echo "3️⃣ Status do Banco de Dados:"

docker compose -f docker-compose.prod.yml exec -T db psql -U futebol_user -d futebol_db -c "SELECT COUNT(*) as total_users FROM users;"

echo ""

echo "4️⃣ Migrations Aplicadas:"

docker compose -f docker-compose.prod.yml exec -T backend flask db current

echo ""

echo "5️⃣ Teste de Conexão Backend -> Database:"

docker compose -f docker-compose.prod.yml exec -T backend python -c "

from app import app, db

with app.app_context():

    try:

        db.session.execute('SELECT 1')

        print('✅ Conexão com banco OK')

echo "=== ✅ Diagnóstico Completo ==="p_code}\n" https://esporteflowpro.com.br/api/health || echo "❌ Health check falho

=== 🔍 DIAGNÓSTICO DO SISTEMA ===

1️⃣ Status dos Containers:

NAME                       IMAGE                                                   COMMAND                  SERVICE    CREATED          STATUS                      PORTS

sistema_futebol_backend    ghcr.io/andresilvaaaa/sistema-futebol-backend:latest    "gunicorn -w 4 -b 0.…"   backend    36 minutes ago   Up 36 minutes (unhealthy)   0.0.0.0:5001->5000/tcp, [::]:5001->5000/tcp

sistema_futebol_frontend   ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest   "docker-entrypoint.s…"   frontend   36 minutes ago   Up 36 minutes (healthy)     0.0.0.0:8080->3000/tcp, [::]:8080->3000/tcp

sistema_futebol_postgres   postgres:15-alpine                                      "docker-entrypoint.s…"   postgres   36 minutes ago   Up 36 minutes (healthy)     0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp

2️⃣ Últimos logs do Backend:

sistema_futebol_backend  |     self._handle_dbapi_exception(

sistema_futebol_backend  |   File "/usr/local/lib/python3.11/site-packages/sqlalchemy/engine/base.py", line 2355, in _handle_dbapi_exception

sistema_futebol_backend  |     raise sqlalchemy_exception.with_traceback(exc_info[2]) from e

sistema_futebol_backend  | sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedColumn) column users.initial_balance does not exist

sistema_futebol_backend  | (Background on this error at: https://sqlalche.me/e/20/f405)

3️⃣ Status do Banco de Dados:

service "db" is not running

4️⃣ Migrations Aplicadas:

INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.

INFO  [alembic.runtime.migration] Will assume transactional DDL.

d5a0b37e5b49

5️⃣ Teste de Conexão Backend -> Database:

Traceback (most recent call last):

  File "<string>", line 2, in <module>

ModuleNotFoundError: No module named 'app'

6️⃣ Health Check do Nginx:

Status: 200

=== ✅ Diagnóstico Completo ===

root@srv866884:~/sistema_futebol#
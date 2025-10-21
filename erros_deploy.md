root@srv866884:~# cd ~/sistema_futebol
root@srv866884:~/sistema_futebol# C="docker compose -f docker-compose.prod.yml"
root@srv866884:~/sistema_futebol# docker compose -f docker-compose.prod.yml
Usage:  docker compose [OPTIONS] COMMAND

Define and run multi-container applications with Docker

Options:
      --all-resources              Include all resources, even those not used by services
      --ansi string                Control when to print ANSI control characters ("never"|"always"|"auto")
                                   (default "auto")
      --compatibility              Run compose in backward compatibility mode
      --dry-run                    Execute command in dry run mode
      --env-file stringArray       Specify an alternate environment file
  -f, --file stringArray           Compose configuration files
      --parallel int               Control max parallelism, -1 for unlimited (default -1)
      --profile stringArray        Specify a profile to enable
      --progress string            Set type of progress output (auto, tty, plain, json, quiet)
      --project-directory string   Specify an alternate working directory
                                   (default: the path of the, first specified, Compose file)
  -p, --project-name string        Project name

Management Commands:
  bridge      Convert compose files into another model

Commands:
  attach      Attach local standard input, output, and error streams to a service's running container
  build       Build or rebuild services
  commit      Create a new image from a service container's changes
  config      Parse, resolve and render compose file in canonical format
  cp          Copy files/folders between a service container and the local filesystem
  create      Creates containers for a service
  down        Stop and remove containers, networks
  events      Receive real time events from containers
  exec        Execute a command in a running container
  export      Export a service container's filesystem as a tar archive
  images      List images used by the created containers
  kill        Force stop service containers
  logs        View output from containers
  ls          List running compose projects
  pause       Pause services
  port        Print the public port for a port binding
  ps          List containers
  publish     Publish compose application
  pull        Pull service images
  push        Push service images
  restart     Restart service containers
  rm          Removes stopped service containers
  run         Run a one-off command on a service
  scale       Scale services
  start       Start services
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop services
  top         Display the running processes
  unpause     Unpause services
  up          Create and start containers
  version     Show the Docker Compose version information
  volumes     List volumes
  wait        Block until containers of all (or specified) services stop.
  watch       Watch build context for service and rebuild/refresh containers when files are updated

Run 'docker compose COMMAND --help' for more information on a command.
root@srv866884:~/sistema_futebol# "docker compose -f docker-compose.prod.yml"
docker compose -f docker-compose.prod.yml: command not found
root@srv866884:~/sistema_futebol# echo '--- backend env ---'
$C exec backend env | grep -E 'FLASK_ENV|DATABASE_URL'
--- backend env ---
FLASK_ENV=production
DATABASE_URL=postgresql://sistema_futebol:1410andrE!1410andrE!@45.93.12.120:5432/sistema_futebol_prod
root@srv866884:~/sistema_futebol# echo '--- migrations path ---'
$C exec backend ls -l /app/migrations
$C exec backend head -n 20 /app/migrations/env.py || true
--- migrations path ---
total 20
-rw-r--r-- 1 root root   41 Oct 20 17:32 README
-rw-r--r-- 1 root root  857 Oct 20 17:32 alembic.ini
-rw-r--r-- 1 root root 3344 Oct 20 17:32 env.py
-rw-r--r-- 1 root root  494 Oct 20 17:32 script.py.mako
drwxr-xr-x 2 root root 4096 Oct 20 17:32 versions
import logging
from logging.config import fileConfig

from flask import current_app

from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)
logger = logging.getLogger('alembic.env')


def get_engine():
    try:
        # this works with Flask-SQLAlchemy<3 and Alchemical
root@srv866884:~/sistema_futebol# echo '--- run migrations ---'
$C exec backend flask db upgrade
$C exec backend flask db current
--- run migrations ---
^C^C^C^C

root@srv866884:~# cd ~/sistema_futebol
root@srv866884:~/sistema_futebol# echo '--- psycopg2 quick test ---'
$C exec backend python - << 'PY'
import os, psycopg2
url = os.environ.get('DATABASE_URL'); print('DATABASE_URL:', url)
conn = psycopg2.connect(url)
cur = conn.cursor(); cur.execute('SELECT 1'); print('DB OK'); conn.close()
PY
--- psycopg2 quick test ---
-bash: exec: backend: cannot execute: Is a directory
root@srv866884:~/sistema_futebol# import os, psycopg2
Command 'import' not found, but can be installed with:
apt install graphicsmagick-imagemagick-compat  # version 1.4+really1.3.42-1, or
apt install imagemagick-6.q16                  # version 8:6.9.11.60+dfsg-1.6ubuntu1
apt install imagemagick-6.q16hdri              # version 8:6.9.11.60+dfsg-1.6ubuntu1
root@srv866884:~/sistema_futebol# url = os.environ.get('DATABASE_URL'); print('DATABASE_URL:', url)
-bash: syntax error near unexpected token `('
root@srv866884:~/sistema_futebol# conn = psycopg2.connect(url)
-bash: syntax error near unexpected token `('
root@srv866884:~/sistema_futebol# cur = conn.cursor(); cur.execute('SELECT 1'); print('DB OK'); conn.close()
-bash: syntax error near unexpected token `('
root@srv866884:~/sistema_futebol# logout
Connection to 31.97.166.28 closed.
PS C:\Users\ANDREE> echo '--- health ---'
--- health ---
PS C:\Users\ANDREE> curl -s https://esporteflowpro.com.br/api/health

cmdlet Invoke-WebRequest na posição de comando 1 do pipeline
Forneça valores para os seguintes parâmetros:
Uri: echo '--- backend logs (tail) ---'
curl : Não é possível localizar a unidade. Não existe uma unidade com o nome 'https'.
No linha:1 caractere:1
+ curl -s https://esporteflowpro.com.br/api/health
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (https:String) [Invoke-WebRequest], DriveNotFoundException
    + FullyQualifiedErrorId : DriveNotFound,Microsoft.PowerShell.Commands.InvokeWebRequestCommand

PS C:\Users\ANDREE> $C logs --tail=120 backend
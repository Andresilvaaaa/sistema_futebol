"""
Utilitários para configuração
Helpers para facilitar o uso das configurações
"""
import os
from typing import Optional


def get_config_class(env_name: Optional[str] = None):
    """
    Retorna a classe de configuração baseada no ambiente

    Args:
        env_name: Nome do ambiente (development, production, testing, homolog)
                 Se None, usa FLASK_ENV ou 'development'

    Returns:
        Classe de configuração apropriada
    """
    from . import config

    if env_name is None:
        env_name = os.environ.get('FLASK_ENV', 'development')

    return config.get(env_name, config['default'])


def setup_app_config(app, env_name: Optional[str] = None):
    """
    Configura uma aplicação Flask com o ambiente especificado

    Args:
        app: Instância da aplicação Flask
        env_name: Nome do ambiente

    Returns:
        Aplicação configurada
    """
    config_class = get_config_class(env_name)
    app.config.from_object(config_class)

    # Inicializa configurações específicas do ambiente
    config_class.init_app(app)

    return app


def validate_required_env_vars(required_vars: list,
                               env_name: Optional[str] = None):
    """
    Valida se variáveis de ambiente obrigatórias estão definidas

    Args:
        required_vars: Lista de variáveis obrigatórias
        env_name: Nome do ambiente (para logs)

    Raises:
        ValueError: Se alguma variável obrigatória não estiver definida
    """
    missing_vars = []

    for var in required_vars:
        if not os.environ.get(var):
            missing_vars.append(var)

    if missing_vars:
        env_info = f" for {env_name}" if env_name else ""
        raise ValueError(
            f"Missing required environment variables{env_info}: "
            f"{', '.join(missing_vars)}"
        )


def load_env_file(filepath: str = '.env'):
    """
    Carrega variáveis de ambiente de um arquivo

    Args:
        filepath: Caminho para o arquivo .env
    """
    if not os.path.exists(filepath):
        print(f"Warning: {filepath} not found")
        return

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()

                # Pular linhas vazias e comentários
                if not line or line.startswith('#'):
                    continue

                # Dividir chave=valor
                if '=' not in line:
                    print(
                        f"Warning: Invalid line {line_num} in {filepath}: "
                        f"{line}"
                    )
                    continue

                key, value = line.split('=', 1)
                key = key.strip()
                value = value.strip().strip('"').strip("'")  # Remove aspas

                # Só define se não existir
                os.environ.setdefault(key, value)

    except Exception as e:
        print(f"Error loading {filepath}: {e}")


def get_database_info():
    """
    Retorna informações sobre a configuração do banco de dados

    Returns:
        dict: Informações sobre o banco
    """
    db_url = os.environ.get('DATABASE_URL', 'sqlite:///futebol_dev.db')

    if db_url.startswith('sqlite'):
        db_type = 'SQLite'
        db_file = db_url.split('///')[-1] if ':///' in db_url else 'memory'
    elif db_url.startswith('postgresql'):
        db_type = 'PostgreSQL'
        db_file = db_url.split('@')[-1] if '@' in db_url else 'unknown'
    elif db_url.startswith('mysql'):
        db_type = 'MySQL'
        db_file = db_url.split('@')[-1] if '@' in db_url else 'unknown'
    else:
        db_type = 'Unknown'
        db_file = 'unknown'

    return {
        'type': db_type,
        'location': db_file,
        'url': db_url
    }


# Carrega .env automaticamente quando o módulo é importado
load_env_file()

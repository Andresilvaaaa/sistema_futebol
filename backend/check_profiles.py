import sqlite3

def check_database():
    conn = sqlite3.connect('instance/futebol_dev.db')
    cursor = conn.cursor()

    print('=== VERIFICAÇÃO DE TABELAS NO BANCO ===\n')

    # Listar todas as tabelas
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = cursor.fetchall()

    print('Tabelas encontradas:')
    for table in tables:
        print(f'  - {table[0]}')

    print('\n=== VERIFICANDO TABELA DE PERFIS ===')

    # Verificar se existe tabela profiles ou similar
    profile_tables = [t[0] for t in tables if 'profile' in t[0].lower()]
    if profile_tables:
        print(f'Tabelas de perfil encontradas: {profile_tables}')
        
        for table_name in profile_tables:
            print(f'\nEstrutura da tabela {table_name}:')
            cursor.execute(f'PRAGMA table_info({table_name})')
            columns = cursor.fetchall()
            for col in columns:
                print(f'  {col[1]} ({col[2]}) - NOT NULL: {bool(col[3])}')
            
            # Mostrar dados da tabela
            cursor.execute(f'SELECT * FROM {table_name}')
            data = cursor.fetchall()
            print(f'Registros na tabela {table_name}: {len(data)}')
            if data:
                for i, row in enumerate(data, 1):
                    print(f'  Registro {i}: {row}')
    else:
        print('Nenhuma tabela de perfil encontrada.')
        print('Os perfis podem estar armazenados na tabela users.')

    conn.close()

if __name__ == "__main__":
    check_database()
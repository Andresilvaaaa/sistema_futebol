"""
Configuração de testes para o Sistema de Futebol
Fixtures compartilhadas e configuração do ambiente de teste
"""

import pytest
import sys
import os
from decimal import Decimal
from datetime import date, datetime

# Adicionar o diretório backend ao sys.path para importações
backend_dir = os.path.dirname(os.path.abspath(__file__))
backend_parent = os.path.dirname(backend_dir)
if backend_parent not in sys.path:
    sys.path.insert(0, backend_parent)

from tests.test_config import create_test_app, setup_test_models


@pytest.fixture(scope='function')
def app():
    """Cria uma instância isolada da aplicação para testes"""
    app, db = create_test_app()
    
    with app.app_context():
        # Configurar modelos de teste
        models = setup_test_models(db)
        
        # Criar todas as tabelas
        db.create_all()
        
        # Disponibilizar modelos e db no contexto da aplicação
        app.test_models = models
        app.test_db = db
        
        # Inicializar dados de teste vazios
        if not hasattr(app, 'test_data'):
            app.test_data = {
                'players': [],
                'monthly_periods': [],
                'monthly_players': [],
                'casual_players': []
            }
        
        yield app
        
        # Limpar após o teste
        db.drop_all()


@pytest.fixture(scope='function')
def client(app):
    """Cliente de teste para fazer requisições HTTP"""
    return app.test_client()


@pytest.fixture(scope='function')
def runner(app):
    """Runner para comandos CLI"""
    return app.test_cli_runner()


@pytest.fixture(scope='function')
def db_session(app):
    """Sessão de banco de dados para testes"""
    db = app.test_db
    yield db.session


@pytest.fixture
def sample_user(app, db_session):
    """Cria um usuário de exemplo para testes"""
    User = app.test_models['User']
    
    user = User(
        username='testuser',
        email='test@example.com',
        password_hash='hashed_password'
    )
    db_session.add(user)
    db_session.commit()
    return user


@pytest.fixture
def sample_player(app, db_session, sample_user):
    """Cria um jogador de exemplo para testes"""
    Player = app.test_models['Player']
    
    player = Player(
        user_id=sample_user.id,
        name='João Silva',
        position='Atacante',
        phone='11999999999',
        email='joao@example.com',
        monthly_fee=Decimal('50.00')
    )
    db_session.add(player)
    db_session.commit()
    return player


@pytest.fixture
def sample_players(app, db_session, sample_user):
    """Cria múltiplos jogadores para testes"""
    Player = app.test_models['Player']
    
    players_data = [
        {
            'user_id': sample_user.id,
            'name': 'João Silva',
            'position': 'Atacante',
            'phone': '11999999999',
            'email': 'joao@example.com',
            'monthly_fee': Decimal('50.00'),
            'is_active': True
        },
        {
            'user_id': sample_user.id,
            'name': 'Pedro Santos',
            'position': 'Meio-campo',
            'phone': '11888888888',
            'email': 'pedro@example.com',
            'monthly_fee': Decimal('45.00'),
            'is_active': True
        },
        {
            'user_id': sample_user.id,
            'name': 'Carlos Oliveira',
            'position': 'Zagueiro',
            'phone': '11777777777',
            'email': 'carlos@example.com',
            'monthly_fee': Decimal('55.00'),
            'is_active': False
        }
    ]
    
    players = []
    for i, data in enumerate(players_data):
        # Criar no banco de dados
        player = Player(**data)
        db_session.add(player)
        players.append(player)
        
        # Adicionar aos dados de teste da aplicação
        test_player = data.copy()
        test_player['id'] = i + 1
        test_player['monthly_fee'] = float(test_player['monthly_fee'])
        test_player['status'] = 'active' if test_player['is_active'] else 'inactive'
        app.test_data['players'].append(test_player)
    
    db_session.commit()
    return players


@pytest.fixture
def sample_monthly_period(app, db_session, sample_user):
    """Cria um período mensal de exemplo para testes"""
    MonthlyPeriod = app.test_models['MonthlyPeriod']
    
    period = MonthlyPeriod(
        user_id=sample_user.id,
        month=3,
        year=2024,
        name='Março 2024'
    )
    db_session.add(period)
    db_session.commit()
    # Adicionar aos dados de teste da aplicação
    app.test_data['monthly_periods'].append({
        'id': period.id,
        'month': period.month,
        'year': period.year,
        'name': period.name
    })
    return period


@pytest.fixture
def sample_monthly_player(app, db_session, sample_player, sample_monthly_period):
    """Cria um pagamento mensal de exemplo para testes"""
    MonthlyPlayer = app.test_models['MonthlyPlayer']
    
    monthly_player = MonthlyPlayer(
        player_id=sample_player.id,
        monthly_period_id=sample_monthly_period.id,
        user_id=sample_player.user_id,
        player_name=sample_player.name,
        position=sample_player.position,
        phone=sample_player.phone,
        email=sample_player.email,
        monthly_fee=sample_player.monthly_fee,
        join_date=sample_player.join_date
    )
    db_session.add(monthly_player)
    db_session.commit()
    return monthly_player


@pytest.fixture
def sample_casual_player(app, db_session, sample_monthly_period, sample_user):
    """Cria um jogador casual de exemplo para testes"""
    CasualPlayer = app.test_models['CasualPlayer']
    
    casual_player = CasualPlayer(
        monthly_period_id=sample_monthly_period.id,
        user_id=sample_user.id,
        player_name='Visitante Silva',
        play_date=date(2024, 3, 15),
        invited_by='João Silva',
        amount=Decimal('20.00')
    )
    db_session.add(casual_player)
    db_session.commit()
    return casual_player


@pytest.fixture
def sample_expense(app, db_session, sample_monthly_period, sample_user):
    """Cria uma despesa de exemplo para testes"""
    Expense = app.test_models['Expense']
    
    expense = Expense(
        monthly_period_id=sample_monthly_period.id,
        user_id=sample_user.id,
        description='Aluguel do campo',
        category='Campo',
        amount=Decimal('200.00'),
        expense_date=date(2024, 3, 1)
    )
    db_session.add(expense)
    db_session.commit()
    return expense


@pytest.fixture
def client(app):
    """Cria um cliente de teste Flask"""
    return app.test_client()


@pytest.fixture
def auth_headers(app):
    """Headers com token JWT para autenticação"""
    # Para testes, usar um token mock que será aceito pelo JWT manager
    mock_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': f'Bearer {mock_token}'
    }


@pytest.fixture
def api_headers():
    """Headers padrão para requisições da API"""
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }


@pytest.fixture
def helpers():
    """Funções auxiliares para testes da API"""
    class TestHelpers:
        @staticmethod
        def assert_api_success(response, expected_status=200):
            """Verifica se a resposta da API foi bem-sucedida"""
            assert response.status_code == expected_status
            # Para respostas 204, não há corpo JSON obrigatório
            if expected_status == 204:
                return None
            data = response.get_json()
            assert data is not None
            assert 'success' in data
            assert data['success'] is True
            return data
        
        @staticmethod
        def assert_api_error(response, expected_status=400):
            """Verifica se a resposta da API contém erro"""
            assert response.status_code == expected_status
            data = response.get_json()
            assert data is not None
            assert 'success' in data
            assert data['success'] is False
            return data
        
        @staticmethod
        def assert_pagination(data):
            """Verifica se os dados contêm informações de paginação"""
            assert 'pagination' in data
            pagination = data['pagination']
            assert 'page' in pagination
            assert 'per_page' in pagination
            assert 'total' in pagination
            assert 'pages' in pagination
    
    return TestHelpers()


@pytest.fixture(scope='function')
def sample_monthly_players(app, db_session, sample_players, sample_monthly_period):
    """Cria múltiplos pagamentos mensais para testes"""
    MonthlyPlayer = app.test_models['MonthlyPlayer']
    
    monthly_players = []
    for i, player in enumerate(sample_players):
        monthly_player = MonthlyPlayer(
            player_id=player.id,
            monthly_period_id=sample_monthly_period.id,
            user_id=player.user_id,
            player_name=player.name,
            position=player.position,
            phone=player.phone,
            email=player.email,
            monthly_fee=player.monthly_fee,
            join_date=player.join_date,
            payment_status='paid' if i == 0 else 'pending'
        )
        db_session.add(monthly_player)
        monthly_players.append(monthly_player)
        
        # Adicionar aos dados de teste da aplicação
        test_monthly_player = {
            'id': i + 1,
            'player_id': player.id,
            'monthly_period_id': sample_monthly_period.id,
            'player_name': player.name,
            'position': player.position,
            'phone': player.phone,
            'email': player.email,
            'monthly_fee': float(player.monthly_fee),
            'payment_status': 'paid' if i == 0 else 'pending'
        }
        app.test_data['monthly_players'].append(test_monthly_player)
    
    db_session.commit()
    return monthly_players


# Configurações adicionais para pytest
def pytest_configure(config):
    """Configuração adicional do pytest"""
    import warnings
    warnings.filterwarnings("ignore", category=DeprecationWarning)
    warnings.filterwarnings("ignore", message=".*RemovedInMarshmallow4Warning.*")


def pytest_collection_modifyitems(config, items):
    """Modifica itens de teste coletados"""
    # Adicionar marcadores automáticos baseados no nome do arquivo
    for item in items:
        if "test_models" in item.nodeid:
            item.add_marker(pytest.mark.models)
        elif "test_api" in item.nodeid:
            item.add_marker(pytest.mark.api)
        elif "test_services" in item.nodeid:
            item.add_marker(pytest.mark.services)
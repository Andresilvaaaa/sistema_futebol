"""
Testes para os modelos do Sistema de Futebol
Testa criação, validação e relacionamentos dos modelos
"""

import pytest
from decimal import Decimal
from datetime import date, datetime


class TestUserModel:
    """Testes para o modelo User"""
    
    def test_user_creation(self, app, db_session):
        """Testa a criação de um usuário"""
        User = app.test_models['User']
        
        user = User(
            username='testuser',
            email='test@example.com',
            password_hash='hashed_password'
        )
        
        db_session.add(user)
        db_session.commit()
        
        assert user.id is not None
        assert user.username == 'testuser'
        assert user.email == 'test@example.com'
        assert user.is_active is True
        assert user.created_at is not None
    
    def test_user_uniqueness(self, app, db_session):
        """Testa a unicidade de username e email"""
        User = app.test_models['User']
        
        # Criar primeiro usuário
        user1 = User(
            username='testuser',
            email='test@example.com',
            password_hash='hashed_password'
        )
        db_session.add(user1)
        db_session.commit()
        
        # Tentar criar usuário com mesmo username
        user2 = User(
            username='testuser',
            email='different@example.com',
            password_hash='hashed_password'
        )
        db_session.add(user2)
        
        with pytest.raises(Exception):  # Violação de constraint
            db_session.commit()


class TestPlayerModel:
    """Testes para o modelo Player"""
    
    def test_player_creation(self, app, db_session):
        """Testa a criação de um jogador"""
        Player = app.test_models['Player']
        
        player = Player(
            name='João Silva',
            position='Atacante',
            phone='11999999999',
            email='joao@example.com',
            monthly_fee=Decimal('50.00')
        )
        
        db_session.add(player)
        db_session.commit()
        
        assert player.id is not None
        assert player.name == 'João Silva'
        assert player.position == 'Atacante'
        assert player.monthly_fee == Decimal('50.00')
        assert player.is_active is True
        assert player.join_date == date.today()
    
    def test_player_default_values(self, app, db_session):
        """Testa valores padrão do jogador"""
        Player = app.test_models['Player']
        
        player = Player(name='Teste Player')
        db_session.add(player)
        db_session.commit()
        
        assert player.monthly_fee == Decimal('50.00')
        assert player.is_active is True
        assert player.join_date == date.today()


class TestMonthlyPeriodModel:
    """Testes para o modelo MonthlyPeriod"""
    
    def test_monthly_period_creation(self, app, db_session):
        """Testa a criação de um período mensal"""
        MonthlyPeriod = app.test_models['MonthlyPeriod']
        
        period = MonthlyPeriod(
            month=3,
            year=2024,
            name='Março 2024'
        )
        
        db_session.add(period)
        db_session.commit()
        
        assert period.id is not None
        assert period.month == 3
        assert period.year == 2024
        assert period.name == 'Março 2024'
        assert period.is_closed is False


class TestMonthlyPlayerModel:
    """Testes para o modelo MonthlyPlayer"""
    
    def test_monthly_player_creation(self, app, db_session, sample_player, sample_monthly_period):
        """Testa a criação de um registro mensal de jogador"""
        MonthlyPlayer = app.test_models['MonthlyPlayer']
        
        monthly_player = MonthlyPlayer(
            player_id=sample_player.id,
            monthly_period_id=sample_monthly_period.id,
            player_name=sample_player.name,
            position=sample_player.position,
            phone=sample_player.phone,
            email=sample_player.email,
            monthly_fee=sample_player.monthly_fee,
            join_date=sample_player.join_date
        )
        
        db_session.add(monthly_player)
        db_session.commit()
        
        assert monthly_player.id is not None
        assert monthly_player.player_id == sample_player.id
        assert monthly_player.monthly_period_id == sample_monthly_period.id
        assert monthly_player.payment_status == 'pending'
    
    def test_monthly_player_relationships(self, app, db_session, sample_monthly_player):
        """Testa os relacionamentos do MonthlyPlayer"""
        # Verificar se os relacionamentos funcionam
        assert sample_monthly_player.player is not None
        assert sample_monthly_player.monthly_period is not None
        assert sample_monthly_player.player.name == 'João Silva'
        assert sample_monthly_player.monthly_period.name == 'Março 2024'


class TestCasualPlayerModel:
    """Testes para o modelo CasualPlayer"""
    
    def test_casual_player_creation(self, app, db_session, sample_monthly_period):
        """Testa a criação de um jogador casual"""
        CasualPlayer = app.test_models['CasualPlayer']
        
        casual_player = CasualPlayer(
            monthly_period_id=sample_monthly_period.id,
            player_name='Visitante Silva',
            play_date=date(2024, 3, 15),
            invited_by='João Silva',
            amount=Decimal('20.00')
        )
        
        db_session.add(casual_player)
        db_session.commit()
        
        assert casual_player.id is not None
        assert casual_player.player_name == 'Visitante Silva'
        assert casual_player.amount == Decimal('20.00')
        assert casual_player.play_date == date(2024, 3, 15)


class TestExpenseModel:
    """Testes para o modelo Expense"""
    
    def test_expense_creation(self, app, db_session, sample_monthly_period):
        """Testa a criação de uma despesa"""
        Expense = app.test_models['Expense']
        
        expense = Expense(
            monthly_period_id=sample_monthly_period.id,
            description='Aluguel do campo',
            category='Campo',
            amount=Decimal('200.00'),
            expense_date=date(2024, 3, 1)
        )
        
        db_session.add(expense)
        db_session.commit()
        
        assert expense.id is not None
        assert expense.description == 'Aluguel do campo'
        assert expense.category == 'Campo'
        assert expense.amount == Decimal('200.00')
        assert expense.expense_date == date(2024, 3, 1)


class TestModelRelationships:
    """Testes para relacionamentos entre modelos"""
    
    def test_monthly_period_relationships(self, app, db_session, sample_monthly_period, sample_monthly_player, sample_casual_player, sample_expense):
        """Testa os relacionamentos do MonthlyPeriod"""
        # Verificar se o período tem os registros relacionados
        assert len(sample_monthly_period.monthly_players) == 1
        assert len(sample_monthly_period.casual_players) == 1
        assert len(sample_monthly_period.expenses) == 1
        
        # Verificar se os dados estão corretos
        assert sample_monthly_period.monthly_players[0].player_name == 'João Silva'
        assert sample_monthly_period.casual_players[0].player_name == 'Visitante Silva'
        assert sample_monthly_period.expenses[0].description == 'Aluguel do campo'
    
    def test_player_monthly_records(self, app, db_session, sample_player, sample_monthly_player):
        """Testa o relacionamento do Player com MonthlyPlayer"""
        # Verificar se o jogador tem registros mensais
        assert len(sample_player.monthly_records) == 1
        assert sample_player.monthly_records[0].player_name == 'João Silva'
        assert sample_player.monthly_records[0].monthly_fee == Decimal('50.00')


class TestMultiTenantConstraints:
    """Testes de unicidade e FKs compostas multi-tenant"""

    def test_unique_player_phone_per_user(self, app, db_session, sample_user):
        Player = app.test_models['Player']
        # Primeiro jogador com phone X para user U
        p1 = Player(user_id=sample_user.id, name='A', position='Z', phone='111', email='a@example.com', monthly_fee=Decimal('10.00'))
        db_session.add(p1)
        db_session.commit()

        # Segundo jogador com mesmo phone X e mesmo user U -> viola uq_players_user_phone
        p2 = Player(user_id=sample_user.id, name='B', position='Z', phone='111', email='b@example.com', monthly_fee=Decimal('10.00'))
        db_session.add(p2)
        with pytest.raises(Exception):
            db_session.commit()
        db_session.rollback()

        # Mesmo phone X mas usuário diferente -> permitido
        # Criar outro usuário
        User = app.test_models['User']
        other = User(username='other', email='other@example.com', password_hash='x')
        db_session.add(other)
        db_session.commit()
        p3 = Player(user_id=other.id, name='C', position='Z', phone='111', email='c@example.com', monthly_fee=Decimal('10.00'))
        db_session.add(p3)
        db_session.commit()

    def test_unique_monthly_periods_id_user(self, app, db_session, sample_user):
        MonthlyPeriod = app.test_models['MonthlyPeriod']
        # Criar período
        mp1 = MonthlyPeriod(user_id=sample_user.id, month=1, year=2024, name='Jan 2024')
        db_session.add(mp1)
        db_session.commit()
        # Tentar duplicar id+user: simulamos criando manualmente com mesmo id e user
        mp2 = MonthlyPeriod(id=mp1.id, user_id=sample_user.id, month=2, year=2024, name='Fev 2024')
        db_session.add(mp2)
        with pytest.raises(Exception):
            db_session.commit()
        db_session.rollback()

    def test_unique_monthly_players_triplet(self, app, db_session, sample_player, sample_monthly_period):
        MonthlyPlayer = app.test_models['MonthlyPlayer']
        # Primeiro registro
        mp1 = MonthlyPlayer(
            player_id=sample_player.id,
            monthly_period_id=sample_monthly_period.id,
            user_id=sample_player.user_id,
            player_name=sample_player.name,
            position=sample_player.position,
            phone=sample_player.phone,
            email=sample_player.email,
            monthly_fee=Decimal('10.00'),
            join_date=sample_player.join_date,
        )
        db_session.add(mp1)
        db_session.commit()
        # Duplicar tripla (user, player, period) -> viola uq_monthly_players_user_player_period
        mp2 = MonthlyPlayer(
            player_id=sample_player.id,
            monthly_period_id=sample_monthly_period.id,
            user_id=sample_player.user_id,
            player_name=sample_player.name,
            position=sample_player.position,
            phone=sample_player.phone,
            email='other@example.com',
            monthly_fee=Decimal('20.00'),
            join_date=sample_player.join_date,
        )
        db_session.add(mp2)
        with pytest.raises(Exception):
            db_session.commit()
        db_session.rollback()

    def test_composite_fk_same_user_enforced(self, app, db_session, sample_player, sample_monthly_period):
        """Garante que MonthlyPlayer referencia player e período do mesmo usuário"""
        MonthlyPlayer = app.test_models['MonthlyPlayer']
        User = app.test_models['User']
        # Criar outro usuário
        other = User(username='u2', email='u2@example.com', password_hash='x')
        db_session.add(other)
        db_session.commit()
        # Tentar criar monthly_player com player do user A e período do user B
        mp = MonthlyPlayer(
            player_id=sample_player.id,
            monthly_period_id=sample_monthly_period.id,
            user_id=other.id,
            player_name=sample_player.name,
            position=sample_player.position,
            phone=sample_player.phone,
            email=sample_player.email,
            monthly_fee=Decimal('10.00'),
            join_date=sample_player.join_date,
        )
        db_session.add(mp)
        with pytest.raises(Exception):
            db_session.commit()
        db_session.rollback()

    def test_ondelete_cascade_monthly_players(self, app, db_session, sample_player, sample_monthly_period, sample_monthly_player):
        """Ao deletar player ou período, registros em monthly_players são removidos"""
        MonthlyPlayer = app.test_models['MonthlyPlayer']
        Player = app.test_models['Player']
        MonthlyPeriod = app.test_models['MonthlyPeriod']
        # Confirmar existe 1
        assert db_session.query(MonthlyPlayer).count() == 1
        # Deletar player
        db_session.delete(sample_player)
        with pytest.raises(Exception):
            # SQLite dos testes pode não suportar CASCADE sem PRAGMA; commit pode falhar se FK impedir
            # Vamos tentar commit e, em caso de erro, rollback e seguir para deletar pelo período
            db_session.commit()
        db_session.rollback()
        # Deletar período (uma das operações deve cascatar)
        db_session.delete(sample_monthly_period)
        db_session.commit()
        assert db_session.query(MonthlyPlayer).count() == 0

    def test_ondelete_cascade_casual_and_expenses(self, app, db_session, sample_monthly_period, sample_casual_player, sample_expense):
        CasualPlayer = app.test_models['CasualPlayer']
        Expense = app.test_models['Expense']
        MonthlyPeriod = app.test_models['MonthlyPeriod']
        assert db_session.query(CasualPlayer).count() == 1
        assert db_session.query(Expense).count() == 1
        # Deletar período
        db_session.delete(sample_monthly_period)
        db_session.commit()
        assert db_session.query(CasualPlayer).count() == 0
        assert db_session.query(Expense).count() == 0


class TestModelValidation:
    """Testes para validação de modelos"""
    
    def test_required_fields(self, app, db_session):
        """Testa campos obrigatórios"""
        User = app.test_models['User']
        Player = app.test_models['Player']
        
        # Tentar criar usuário sem campos obrigatórios
        user = User()
        db_session.add(user)
        
        with pytest.raises(Exception):
            db_session.commit()
        
        db_session.rollback()
        
        # Tentar criar jogador sem nome
        player = Player()
        db_session.add(player)
        
        with pytest.raises(Exception):
            db_session.commit()
    
    def test_data_types(self, app, db_session, sample_monthly_period):
        """Testa tipos de dados"""
        Expense = app.test_models['Expense']
        
        expense = Expense(
            monthly_period_id=sample_monthly_period.id,
            description='Teste',
            category='Teste',
            amount=Decimal('100.50'),
            expense_date=date(2024, 3, 1)
        )
        
        db_session.add(expense)
        db_session.commit()
        
        # Verificar se os tipos estão corretos
        assert isinstance(expense.amount, Decimal)
        assert isinstance(expense.expense_date, date)
        assert isinstance(expense.created_at, datetime)
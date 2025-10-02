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
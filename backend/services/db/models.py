"""
Modelos de banco de dados para o Sistema de Futebol
Baseados nos tipos TypeScript do frontend
"""
from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import (
    Boolean, Column, DateTime, ForeignKey, Integer, 
    Numeric, String, Text, Date, func
)
from sqlalchemy.orm import relationship, validates
import uuid

# Importar db do Flask-SQLAlchemy
from .connection import db
from werkzeug.security import generate_password_hash, check_password_hash


class PlayerStatus(Enum):
    """Status do jogador"""
    ACTIVE = "active"
    PENDING = "pending"
    DELAYED = "delayed"
    INACTIVE = "inactive"


class PaymentStatus(Enum):
    """Status de pagamento"""
    PAID = "paid"
    PENDING = "pending"


class Player(db.Model):
    """Modelo para jogadores do time"""
    __tablename__ = 'players'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False, index=True)
    position = Column(String(50), nullable=False)
    phone = Column(String(20), nullable=False, unique=True)
    email = Column(String(120), nullable=True, index=True)  # Tornado opcional
    join_date = Column(Date, nullable=False, default=func.current_date())
    status = Column(String(20), nullable=False, default=PlayerStatus.ACTIVE.value)
    # monthly_fee removido - controlado na gestão mensal
    is_active = Column(Boolean, nullable=False, default=True)
    user_id = Column(String(36), ForeignKey('users.id'), nullable=False)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    user = relationship("User", back_populates="players")
    monthly_payments = relationship("MonthlyPlayer", back_populates="player", cascade="all, delete-orphan")
    
    @validates('status')
    def validate_status(self, key, status):
        valid_statuses = [s.value for s in PlayerStatus]
        if status not in valid_statuses:
            raise ValueError(f"Status deve ser um dos: {valid_statuses}")
        return status
    
    @validates('email')
    def validate_email(self, key, email):
        if email and '@' not in email:  # Só valida se email foi fornecido
            raise ValueError("Email deve conter @")
        return email.lower() if email else None
    
    def __repr__(self):
        return f"<Player(id={self.id}, name='{self.name}', status='{self.status}')>"


class MonthlyPeriod(db.Model):
    """Modelo para períodos mensais"""
    __tablename__ = 'monthly_periods'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    month = Column(Integer, nullable=False)  # 1-12
    year = Column(Integer, nullable=False)
    name = Column(String(50), nullable=False)  # Ex: "Janeiro 2024"
    is_active = Column(Boolean, nullable=False, default=True)
    user_id = Column(String(36), ForeignKey('users.id'), nullable=False)
    
    # Campos calculados/cache
    total_expected = Column(Numeric(10, 2), nullable=False, default=0.00)
    total_received = Column(Numeric(10, 2), nullable=False, default=0.00)
    players_count = Column(Integer, nullable=False, default=0)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    user = relationship("User", back_populates="monthly_periods")
    monthly_players = relationship("MonthlyPlayer", back_populates="monthly_period", cascade="all, delete-orphan")
    casual_players = relationship("CasualPlayer", back_populates="monthly_period", cascade="all, delete-orphan")
    expenses = relationship("Expense", back_populates="monthly_period", cascade="all, delete-orphan")
    
    @validates('month')
    def validate_month(self, key, month):
        if not 1 <= month <= 12:
            raise ValueError("Mês deve estar entre 1 e 12")
        return month
    
    @validates('year')
    def validate_year(self, key, year):
        current_year = datetime.now().year
        if not (current_year - 5) <= year <= (current_year + 5):
            raise ValueError(f"Ano deve estar entre {current_year - 5} e {current_year + 5}")
        return year
    
    def __repr__(self):
        return f"<MonthlyPeriod(id={self.id}, name='{self.name}', active={self.is_active})>"


class MonthlyPlayer(db.Model):
    """Modelo para pagamentos mensais dos jogadores"""
    __tablename__ = 'monthly_players'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    player_id = Column(String(36), ForeignKey('players.id'), nullable=False)
    monthly_period_id = Column(String(36), ForeignKey('monthly_periods.id'), nullable=False)
    user_id = Column(String(36), ForeignKey('users.id'), nullable=False)
    
    # Dados do jogador no momento (snapshot)
    player_name = Column(String(100), nullable=False)
    position = Column(String(50), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), nullable=False)
    monthly_fee = Column(Numeric(10, 2), nullable=False)  # Taxa padrão do jogador
    custom_monthly_fee = Column(Numeric(10, 2), nullable=True)  # Taxa customizada para este mês específico
    join_date = Column(Date, nullable=False)
    
    # Status do pagamento
    status = Column(String(20), nullable=False, default=PaymentStatus.PENDING.value)
    payment_date = Column(DateTime, nullable=True)
    pending_months_count = Column(Integer, nullable=False, default=0)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    player = relationship("Player", back_populates="monthly_payments")
    monthly_period = relationship("MonthlyPeriod", back_populates="monthly_players")
    user = relationship("User", back_populates="monthly_players")
    
    @property
    def effective_monthly_fee(self):
        """Retorna a taxa efetiva (customizada se definida, senão a padrão)"""
        return self.custom_monthly_fee if self.custom_monthly_fee is not None else self.monthly_fee
    
    @validates('status')
    def validate_status(self, key, status):
        valid_statuses = [s.value for s in PaymentStatus]
        if status not in valid_statuses:
            raise ValueError(f"Status deve ser um dos: {valid_statuses}")
        return status
    
    def __repr__(self):
        return f"<MonthlyPlayer(id={self.id}, player='{self.player_name}', status='{self.status}')>"


class CasualPlayer(db.Model):
    """Modelo para jogadores casuais (avulsos)"""
    __tablename__ = 'casual_players'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    monthly_period_id = Column(String(36), ForeignKey('monthly_periods.id'), nullable=False)
    user_id = Column(String(36), ForeignKey('users.id'), nullable=False)
    
    player_name = Column(String(100), nullable=False)
    play_date = Column(Date, nullable=False)
    invited_by = Column(String(100), nullable=False)  # Nome de quem convidou
    amount = Column(Numeric(10, 2), nullable=False)
    
    # Status do pagamento
    status = Column(String(20), nullable=False, default=PaymentStatus.PENDING.value)
    payment_date = Column(DateTime, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    monthly_period = relationship("MonthlyPeriod", back_populates="casual_players")
    user = relationship("User", back_populates="casual_players")
    
    @validates('status')
    def validate_status(self, key, status):
        valid_statuses = [s.value for s in PaymentStatus]
        if status not in valid_statuses:
            raise ValueError(f"Status deve ser um dos: {valid_statuses}")
        return status
    
    def __repr__(self):
        return f"<CasualPlayer(id={self.id}, name='{self.player_name}', amount={self.amount})>"


class Expense(db.Model):
    """Modelo para despesas"""
    __tablename__ = 'expenses'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    monthly_period_id = Column(String(36), ForeignKey('monthly_periods.id'), nullable=False)
    user_id = Column(String(36), ForeignKey('users.id'), nullable=False)
    
    description = Column(Text, nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    category = Column(String(50), nullable=False)
    date = Column(Date, nullable=False)
    month = Column(Integer, nullable=False)  # 1-12
    year = Column(Integer, nullable=False)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    monthly_period = relationship("MonthlyPeriod", back_populates="expenses")
    user = relationship("User", back_populates="expenses")
    
    @validates('month')
    def validate_month(self, key, month):
        if not 1 <= month <= 12:
            raise ValueError("Mês deve estar entre 1 e 12")
        return month
    
    @validates('amount')
    def validate_amount(self, key, amount):
        if amount <= 0:
            raise ValueError("Valor deve ser positivo")
        return amount
    
    def __repr__(self):
        return f"<Expense(id={self.id}, description='{self.description}', amount={self.amount})>"


# Índices compostos para performance
from sqlalchemy import Index

# Índice para buscar pagamentos por período
Index('idx_monthly_players_period', MonthlyPlayer.monthly_period_id, MonthlyPlayer.status)

# Índice para buscar jogadores casuais por período
Index('idx_casual_players_period', CasualPlayer.monthly_period_id, CasualPlayer.status)

# Índice para buscar despesas por período
Index('idx_expenses_period', Expense.monthly_period_id, Expense.month, Expense.year)

# Índice único para evitar períodos duplicados por usuário
Index('idx_monthly_periods_unique', MonthlyPeriod.month, MonthlyPeriod.year, MonthlyPeriod.user_id, unique=True)

class User(db.Model):
    """Modelo de usuário para autenticação e perfil"""
    __tablename__ = 'users'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String(50), nullable=False, unique=True, index=True)
    email = Column(String(100), nullable=False, unique=True, index=True)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)

    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    players = relationship("Player", back_populates="user", cascade="all, delete-orphan")
    monthly_periods = relationship("MonthlyPeriod", back_populates="user", cascade="all, delete-orphan")
    monthly_players = relationship("MonthlyPlayer", back_populates="user", cascade="all, delete-orphan")
    casual_players = relationship("CasualPlayer", back_populates="user", cascade="all, delete-orphan")
    expenses = relationship("Expense", back_populates="user", cascade="all, delete-orphan")

    def set_password(self, password: str):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Email deve conter @")
        return email.lower()

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"

# Índices para usuário (após a definição da classe)
Index('idx_users_username_unique', User.username, unique=True)
Index('idx_users_email_unique', User.email, unique=True)
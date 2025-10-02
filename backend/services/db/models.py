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
    """Modelo para jogadores regulares"""
    __tablename__ = 'players'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False, index=True)
    position = Column(String(50), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), nullable=False, unique=True, index=True)
    join_date = Column(Date, nullable=False, default=func.current_date())
    status = Column(String(20), nullable=False, default=PlayerStatus.ACTIVE.value)
    monthly_fee = Column(Numeric(10, 2), nullable=False, default=0.00)
    is_active = Column(Boolean, nullable=False, default=True)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    monthly_payments = relationship("MonthlyPlayer", back_populates="player", cascade="all, delete-orphan")
    
    @validates('status')
    def validate_status(self, key, status):
        valid_statuses = [s.value for s in PlayerStatus]
        if status not in valid_statuses:
            raise ValueError(f"Status deve ser um dos: {valid_statuses}")
        return status
    
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Email deve conter @")
        return email.lower()
    
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
    
    # Campos calculados/cache
    total_expected = Column(Numeric(10, 2), nullable=False, default=0.00)
    total_received = Column(Numeric(10, 2), nullable=False, default=0.00)
    players_count = Column(Integer, nullable=False, default=0)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
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

# Índice único para evitar períodos duplicados
Index('idx_monthly_periods_unique', MonthlyPeriod.month, MonthlyPeriod.year, unique=True)
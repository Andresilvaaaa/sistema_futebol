"""
Schemas de validação para a API usando Marshmallow
"""
from marshmallow import Schema, fields, validate, validates, ValidationError
from datetime import datetime


# ==================== SCHEMAS DE JOGADORES ====================

class PlayerCreateSchema(Schema):
    """Schema para criação de jogadores"""
    name = fields.Str(required=True, validate=validate.Length(min=2, max=100))
    position = fields.Str(required=True, validate=validate.OneOf([
        'goalkeeper', 'defender', 'midfielder', 'forward'
    ]))
    monthly_fee = fields.Decimal(required=True, validate=validate.Range(min=0))
    status = fields.Str(validate=validate.OneOf([
        'active', 'inactive', 'pending', 'suspended'
    ]), missing='active')
    phone = fields.Str(validate=validate.Length(max=20), allow_none=True)
    email = fields.Email(allow_none=True)


class PlayerUpdateSchema(Schema):
    """Schema para atualização de jogadores"""
    name = fields.Str(validate=validate.Length(min=2, max=100))
    position = fields.Str(validate=validate.OneOf([
        'goalkeeper', 'defender', 'midfielder', 'forward'
    ]))
    monthly_fee = fields.Decimal(validate=validate.Range(min=0))
    status = fields.Str(validate=validate.OneOf([
        'active', 'inactive', 'pending', 'suspended'
    ]))
    phone = fields.Str(validate=validate.Length(max=20), allow_none=True)
    email = fields.Email(allow_none=True)


class PlayerResponseSchema(Schema):
    """Schema para resposta de jogadores"""
    id = fields.Str()
    name = fields.Str()
    position = fields.Str()
    monthly_fee = fields.Decimal(as_string=True)
    status = fields.Str()
    phone = fields.Str()
    email = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()


# ==================== SCHEMAS DE PAGAMENTOS MENSAIS ====================

class MonthlyPaymentCreateSchema(Schema):
    """Schema para criação de período de pagamento mensal"""
    year = fields.Int(required=True, validate=validate.Range(min=2020, max=2050))
    month = fields.Int(required=True, validate=validate.Range(min=1, max=12))
    
    @validates('year')
    def validate_year(self, value):
        current_year = datetime.now().year
        if value < 2020 or value > 2030:
            raise ValidationError(f'Ano deve estar entre 2020 e 2030')
    
    @validates('month')
    def validate_month(self, value):
        current_date = datetime.now()
        if value < 1 or value > 12:
            raise ValidationError('Mês deve estar entre 1 e 12')


class MonthlyPaymentResponseSchema(Schema):
    """Schema para resposta de pagamentos mensais"""
    id = fields.Str()
    monthly_period_id = fields.Str()
    player_id = fields.Str()
    monthly_fee = fields.Decimal(as_string=True)
    custom_monthly_fee = fields.Decimal(as_string=True, allow_none=True)
    effective_monthly_fee = fields.Method("get_effective_monthly_fee")
    amount_paid = fields.Decimal(as_string=True)
    status = fields.Str()
    payment_date = fields.DateTime()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    
    # Campos relacionados
    player = fields.Nested(PlayerResponseSchema, exclude=['created_at', 'updated_at'])
    monthly_period = fields.Method('get_period_info')
    
    def get_effective_monthly_fee(self, obj):
        """Retorna a taxa efetiva (customizada ou padrão)"""
        return str(obj.effective_monthly_fee)
    
    def get_period_info(self, obj):
        """Retorna informações do período"""
        if hasattr(obj, 'monthly_period') and obj.monthly_period:
            return {
                'id': obj.monthly_period.id,
                'month': obj.monthly_period.month,
                'year': obj.monthly_period.year,
                'name': obj.monthly_period.name,
                'is_active': obj.monthly_period.is_active,
                'created_at': obj.monthly_period.created_at.isoformat() if obj.monthly_period.created_at else None
            }
        return None


# ==================== SCHEMAS DE JOGADORES CASUAIS ====================

class CasualPlayerCreateSchema(Schema):
    """Schema para criação de jogadores casuais"""
    player_name = fields.Str(required=True, validate=validate.Length(min=2, max=100))
    play_date = fields.Date(required=True)
    invited_by = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    amount = fields.Decimal(required=True, validate=validate.Range(min=0))
    status = fields.Str(validate=validate.OneOf([
        'pending', 'paid'
    ]), missing='pending')


class CasualPlayerResponseSchema(Schema):
    """Schema para resposta de jogadores casuais"""
    id = fields.Str()
    name = fields.Str()
    phone = fields.Str()
    email = fields.Str()
    notes = fields.Str()
    total_games = fields.Int()
    total_paid = fields.Decimal(as_string=True)
    created_at = fields.DateTime()
    updated_at = fields.DateTime()


# ==================== SCHEMAS DE DESPESAS ====================

class ExpenseCreateSchema(Schema):
    """Schema para criação de despesas"""
    description = fields.Str(required=True, validate=validate.Length(min=3, max=200))
    amount = fields.Decimal(required=True, validate=validate.Range(min=0))
    category = fields.Str(required=True, validate=validate.OneOf([
        'equipment', 'field_rental', 'referee', 'transportation', 
        'food', 'medical', 'maintenance', 'other'
    ]))
    expense_date = fields.Date(required=True)  # Mudado de DateTime para Date
    paid_by = fields.Str(validate=validate.Length(max=100), allow_none=True)
    receipt_url = fields.Url(allow_none=True)
    notes = fields.Str(validate=validate.Length(max=500), allow_none=True)
    
    @validates('expense_date')
    def validate_expense_date(self, value):
        # Removendo validação de data futura para permitir previsão de gastos
        # Usuários podem criar despesas futuras para planejamento financeiro
        pass


class ExpenseUpdateSchema(Schema):
    """Schema para atualização de despesas"""
    description = fields.Str(validate=validate.Length(min=3, max=200))
    amount = fields.Decimal(validate=validate.Range(min=0))
    category = fields.Str(validate=validate.OneOf([
        'equipment', 'field_rental', 'referee', 'transportation', 
        'food', 'medical', 'maintenance', 'other'
    ]))
    expense_date = fields.Date()  # Mudado de DateTime para Date
    paid_by = fields.Str(validate=validate.Length(max=100), allow_none=True)
    receipt_url = fields.Url(allow_none=True)
    notes = fields.Str(validate=validate.Length(max=500), allow_none=True)
    
    @validates('expense_date')
    def validate_expense_date(self, value):
        # Removendo validação de data futura para permitir previsão de gastos
        # Usuários podem editar despesas futuras para planejamento financeiro
        pass


class ExpenseResponseSchema(Schema):
    """Schema para resposta de despesas"""
    id = fields.Str()
    description = fields.Str()
    amount = fields.Decimal(as_string=True)
    category = fields.Str()
    expense_date = fields.DateTime()
    paid_by = fields.Str()
    receipt_url = fields.Str()
    notes = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()


# ==================== SCHEMAS DE ESTATÍSTICAS ====================

class PlayerStatsSchema(Schema):
    """Schema para estatísticas de jogadores"""
    active = fields.Int()
    inactive = fields.Int()
    pending = fields.Int()
    suspended = fields.Int()
    total = fields.Int()


class PaymentStatsSchema(Schema):
    """Schema para estatísticas de pagamentos"""
    total_players = fields.Int()
    paid = fields.Int()
    partial = fields.Int()
    pending = fields.Int()
    total_expected = fields.Decimal(as_string=True)
    total_received = fields.Decimal(as_string=True)
    collection_rate = fields.Float()


class CashFlowStatsSchema(Schema):
    """Schema para estatísticas de fluxo de caixa"""
    total_income = fields.Decimal(as_string=True)
    total_expenses = fields.Decimal(as_string=True)
    net_balance = fields.Decimal(as_string=True)
    period_start = fields.DateTime()
    period_end = fields.DateTime()


# ==================== SCHEMAS DE FILTROS ====================

class PlayerFilterSchema(Schema):
    """Schema para filtros de jogadores"""
    status = fields.Str(validate=validate.OneOf([
        'active', 'inactive', 'pending', 'suspended'
    ]))
    position = fields.Str(validate=validate.OneOf([
        'goalkeeper', 'defender', 'midfielder', 'forward'
    ]))
    page = fields.Int(validate=validate.Range(min=1), missing=1)
    per_page = fields.Int(validate=validate.Range(min=1, max=100), missing=20)


class PaymentFilterSchema(Schema):
    """Schema para filtros de pagamentos"""
    year = fields.Int(validate=validate.Range(min=2020, max=2050))
    month = fields.Int(validate=validate.Range(min=1, max=12))
    player_id = fields.Str()
    status = fields.Str(validate=validate.OneOf([
        'pending', 'partial', 'paid', 'overdue'
    ]))
    page = fields.Int(validate=validate.Range(min=1), missing=1)
    per_page = fields.Int(validate=validate.Range(min=1, max=100), missing=20)

# ==================== SCHEMA DE ATUALIZAÇÃO DE PERÍODO MENSAL ====================

class MonthlyPeriodUpdateSchema(Schema):
    """Schema para atualização de período mensal"""
    monthly_fee = fields.Decimal(validate=validate.Range(min=0))
    status = fields.Str(validate=validate.OneOf(['active', 'closed']))


class ExpenseFilterSchema(Schema):
    """Schema para filtros de despesas"""
    category = fields.Str(validate=validate.OneOf([
        'equipment', 'field_rental', 'referee', 'transportation', 
        'food', 'medical', 'maintenance', 'other'
    ]))
    start_date = fields.DateTime()
    end_date = fields.DateTime()
    min_amount = fields.Decimal(validate=validate.Range(min=0))
    max_amount = fields.Decimal(validate=validate.Range(min=0))
    page = fields.Int(validate=validate.Range(min=1), missing=1)
    per_page = fields.Int(validate=validate.Range(min=1, max=100), missing=20)
    
    @validates('end_date')
    def validate_date_range(self, value):
        if hasattr(self, 'start_date') and self.start_date and value:
            if value < self.start_date:
                raise ValidationError('Data final deve ser posterior à data inicial')
"""
Controladores da API para gerenciamento de jogadores e pagamentos mensais
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from sqlalchemy import and_, extract
from datetime import datetime
import uuid

from ...services.db.connection import db
from ...services.db.models import Player, MonthlyPeriod, MonthlyPlayer, CasualPlayer, Expense, PaymentStatus
from .schemas import (
    PlayerCreateSchema, PlayerUpdateSchema, PlayerResponseSchema,
    MonthlyPaymentCreateSchema, MonthlyPaymentResponseSchema,
    CasualPlayerCreateSchema, ExpenseCreateSchema
)
from .response_utils import APIResponse, ValidationError, handle_api_error

api_bp = Blueprint('api', __name__, url_prefix='/api')

# ==================== ROTAS DE JOGADORES ====================

@api_bp.route('/players', methods=['GET'])
@jwt_required()
@handle_api_error
def get_players():
    """
    Lista todos os jogadores com filtros opcionais
    """
    # Parâmetros de filtro
    status = request.args.get('status')
    search = request.args.get('search')
    page = int(request.args.get('page', 1))
    per_page = min(int(request.args.get('per_page', 10)), 100)
    
    # Identidade do usuário
    current_user_id = str(get_jwt_identity())

    # Query base restrita ao usuário
    query = Player.query.filter(Player.user_id == current_user_id)
    
    # Aplicar filtros
    if status:
        query = query.filter(Player.status == status)
    
    if search:
        query = query.filter(
            Player.name.ilike(f'%{search}%')
        )
    
    # Paginação (compatível com Flask-SQLAlchemy 3.x e versões anteriores)
    try:
        # Flask-SQLAlchemy < 3.x
        players = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
    except Exception:
        # Flask-SQLAlchemy >= 3.x usa db.paginate
        players = db.paginate(
            query.order_by(Player.name),
            page=page,
            per_page=per_page,
            error_out=False
        )
    
    # Serializar dados
    schema = PlayerResponseSchema(many=True)
    players_data = schema.dump(players.items)
    
    # Informações de paginação
    pagination = {
        'page': players.page,
        'pages': players.pages,
        'per_page': players.per_page,
        'total': players.total,
        'has_next': players.has_next,
        'has_prev': players.has_prev
    }
    
    return APIResponse.paginated(
        data=players_data,
        pagination=pagination,
        message=f"Encontrados {players.total} jogadores"
    )


@api_bp.route('/players', methods=['POST'])
@jwt_required()
@handle_api_error
def create_player():
    """
    Cria um novo jogador
    """
    data = request.json
    
    # Validação básica
    if not data:
        raise ValidationError("Dados não fornecidos")
    
    # Validar campos obrigatórios
    required_fields = ['name', 'phone']
    missing_fields = [field for field in required_fields if not data.get(field)]
    
    if missing_fields:
        raise ValidationError(
            "Campos obrigatórios não fornecidos",
            {'missing_fields': missing_fields}
        )
    
    current_user_id = str(get_jwt_identity())

    # Verificar se já existe jogador com mesmo telefone para este usuário
    existing_player = Player.query.filter(
        and_(Player.phone == data['phone'], Player.user_id == current_user_id)
    ).first()
    if existing_player:
        raise ValidationError(
            "Já existe um jogador com este telefone",
            {'phone': ['Telefone já cadastrado']}
        )
    
    # Criar novo jogador
    player = Player(
        id=str(uuid.uuid4()),
        name=data['name'].strip(),
        phone=data['phone'].strip(),
        position=data.get('position', '').strip(),
        status='active',
        user_id=current_user_id
    )
    
    db.session.add(player)
    db.session.commit()
    
    # Serializar resposta
    schema = PlayerResponseSchema()
    player_data = schema.dump(player)
    
    return APIResponse.success(
        data=player_data,
        message="Jogador criado com sucesso",
        status_code=201
    )


@api_bp.route('/players/<player_id>', methods=['GET'])
@jwt_required()
@handle_api_error
def get_player(player_id):
    """
    Busca um jogador específico por ID
    """
    current_user_id = str(get_jwt_identity())
    player = Player.query.filter(
        and_(Player.id == player_id, Player.user_id == current_user_id)
    ).first()
    if not player:
        return jsonify({'error': 'Jogador não encontrado'}), 404
    
    schema = PlayerResponseSchema()
    player_data = schema.dump(player)
    
    return APIResponse.success(
        data=player_data,
        message="Jogador encontrado"
    )


@api_bp.route('/players/<player_id>', methods=['PUT'])
@jwt_required()
@handle_api_error
def update_player(player_id):
    """
    Atualiza dados de um jogador
    """
    current_user_id = str(get_jwt_identity())
    player = Player.query.filter(
        and_(Player.id == player_id, Player.user_id == current_user_id)
    ).first()
    if not player:
        return jsonify({'error': 'Jogador não encontrado'}), 404
    data = request.json
    
    if not data:
        raise ValidationError("Dados não fornecidos")
    
    # Validar se telefone já existe em outro jogador
    if 'phone' in data and data['phone'] != player.phone:
        existing_player = Player.query.filter(
            and_(Player.phone == data['phone'], Player.user_id == current_user_id)
        ).first()
        if existing_player:
            raise ValidationError(
                "Já existe um jogador com este telefone",
                {'phone': ['Telefone já cadastrado']}
            )
    
    # Atualizar campos permitidos
    updatable_fields = ['name', 'phone', 'position']
    for field in updatable_fields:
        if field in data:
            setattr(player, field, data[field].strip() if isinstance(data[field], str) else data[field])
    
    db.session.commit()
    
    # Serializar resposta
    schema = PlayerResponseSchema()
    player_data = schema.dump(player)
    
    return APIResponse.success(
        data=player_data,
        message="Jogador atualizado com sucesso"
    )


@api_bp.route('/players/<player_id>/activate', methods=['PATCH'])
@jwt_required()
@handle_api_error
def activate_player(player_id):
    """
    Ativa um jogador
    """
    current_user_id = str(get_jwt_identity())
    player = Player.query.filter(
        and_(Player.id == player_id, Player.user_id == current_user_id)
    ).first()
    if not player:
        return jsonify({'error': 'Jogador não encontrado'}), 404
    
    if player.status == 'active':
        raise ValidationError("Jogador já está ativo")
    
    player.status = 'active'
    db.session.commit()
    
    schema = PlayerResponseSchema()
    player_data = schema.dump(player)
    
    return APIResponse.success(
        data=player_data,
        message="Jogador ativado com sucesso"
    )


@api_bp.route('/players/<player_id>/deactivate', methods=['PATCH'])
@jwt_required()
@handle_api_error
def deactivate_player(player_id):
    """
    Desativa um jogador
    """
    current_user_id = str(get_jwt_identity())
    player = Player.query.filter(
        and_(Player.id == player_id, Player.user_id == current_user_id)
    ).first()
    if not player:
        return jsonify({'error': 'Jogador não encontrado'}), 404
    
    if player.status == 'inactive':
        raise ValidationError("Jogador já está inativo")
    
    player.status = 'inactive'
    db.session.commit()
    
    schema = PlayerResponseSchema()
    player_data = schema.dump(player)
    
    return APIResponse.success(
        data=player_data,
        message="Jogador desativado com sucesso"
    )


@api_bp.route('/players/<player_id>', methods=['DELETE'])
@jwt_required()
@handle_api_error
def delete_player(player_id):
    """
    Remove um jogador (soft delete)
    """
    current_user_id = str(get_jwt_identity())
    player = Player.query.filter(
        and_(Player.id == player_id, Player.user_id == current_user_id)
    ).first()
    if not player:
        return jsonify({'error': 'Jogador não encontrado'}), 404
    
    # Verificar se jogador tem pagamentos associados
    has_payments = MonthlyPlayer.query.filter(
        and_(MonthlyPlayer.player_id == player_id, MonthlyPlayer.user_id == current_user_id)
    ).first()
    if has_payments:
        raise ValidationError(
            "Não é possível excluir jogador com pagamentos associados",
            {'player': ['Jogador possui histórico de pagamentos']}
        )
    
    # Soft delete
    player.status = 'deleted'
    db.session.commit()
    
    return APIResponse.success(
        message="Jogador removido com sucesso"
    )


# ==================== ROTAS DE PAGAMENTOS MENSAIS ====================

@api_bp.route('/monthly-payments', methods=['GET'])
@jwt_required()
@handle_api_error
def get_monthly_payments():
    """
    Lista pagamentos mensais agregados por período, com paginação de períodos.
    Retorna para cada período: dados do período, jogadores mensais e jogadores avulsos.
    Filtros opcionais: year, month, player_id, status.
    """
    # Parâmetros de filtro
    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    player_id = request.args.get('player_id', type=str)
    status = request.args.get('status', type=str)
    page = int(request.args.get('page', 1))
    per_page = min(int(request.args.get('per_page', 20)), 100)

    # Buscar períodos com filtros e paginação
    current_user_id = str(get_jwt_identity())
    period_query = db.session.query(MonthlyPeriod).filter(MonthlyPeriod.user_id == current_user_id)
    if year:
        period_query = period_query.filter(MonthlyPeriod.year == year)
    if month:
        period_query = period_query.filter(MonthlyPeriod.month == month)

    period_query = period_query.order_by(MonthlyPeriod.year.desc(), MonthlyPeriod.month.desc())
    periods_paginated = period_query.paginate(page=page, per_page=per_page, error_out=False)

    aggregated = []
    for period in periods_paginated.items:
        # Jogadores mensais do período (aplicar filtros opcionais)
        mp_query = db.session.query(MonthlyPlayer).filter(
            and_(MonthlyPlayer.monthly_period_id == period.id, MonthlyPlayer.user_id == current_user_id)
        )
        if player_id:
            mp_query = mp_query.filter(MonthlyPlayer.player_id == player_id)
        if status:
            mp_query = mp_query.filter(MonthlyPlayer.status == status)

        monthly_players = mp_query.all()

        # Serializar jogadores mensais
        mp_schema = MonthlyPaymentResponseSchema(many=True)
        monthly_players_data = mp_schema.dump(monthly_players)

        # Jogadores avulsos do período
        casual_players = db.session.query(CasualPlayer).filter(
            and_(CasualPlayer.monthly_period_id == period.id, CasualPlayer.user_id == current_user_id)
        ).all()
        casual_players_data = []
        for cp in casual_players:
            casual_players_data.append({
                'id': cp.id,
                'monthly_period_id': cp.monthly_period_id,
                'player_name': cp.player_name,
                'play_date': cp.play_date.isoformat() if cp.play_date else None,
                'invited_by': getattr(cp, 'invited_by', None),
                'amount': float(cp.amount) if cp.amount is not None else None,
                'status': getattr(cp, 'status', None),
                'payment_date': getattr(cp, 'payment_date', None).isoformat() if getattr(cp, 'payment_date', None) else None,
                'created_at': cp.created_at.isoformat() if cp.created_at else None,
                'updated_at': getattr(cp, 'updated_at', None).isoformat() if getattr(cp, 'updated_at', None) else None
            })

        aggregated.append({
            'period': {
                'id': period.id,
                'month': period.month,
                'year': period.year,
                'name': period.name,
                'is_active': getattr(period, 'is_active', True),
                'total_expected': float(getattr(period, 'total_expected', 0) or 0),
                'total_received': float(getattr(period, 'total_received', 0) or 0),
                'players_count': getattr(period, 'players_count', None),
                'created_at': period.created_at.isoformat() if getattr(period, 'created_at', None) else None,
                'updated_at': getattr(period, 'updated_at', None).isoformat() if getattr(period, 'updated_at', None) else None
            },
            'monthly_players': monthly_players_data,
            'casual_players': casual_players_data
        })

    pagination = {
        'page': periods_paginated.page,
        'pages': periods_paginated.pages,
        'per_page': periods_paginated.per_page,
        'total': periods_paginated.total,
        'has_next': periods_paginated.has_next,
        'has_prev': periods_paginated.has_prev
    }

    return APIResponse.paginated(
        data=aggregated,
        pagination=pagination,
        message=f"Encontrados {periods_paginated.total} períodos"
    )


@api_bp.route('/monthly-players/<monthly_player_id>/custom-fee', methods=['PUT'])
@jwt_required()
@handle_api_error
def update_monthly_player_custom_fee(monthly_player_id):
    """
    Atualiza a taxa mensal customizada de um jogador para um período específico
    """
    current_user_id = str(get_jwt_identity())
    monthly_player = MonthlyPlayer.query.filter(
        and_(MonthlyPlayer.id == monthly_player_id, MonthlyPlayer.user_id == current_user_id)
    ).first()
    if not monthly_player:
        return jsonify({'error': 'Pagamento mensal não encontrado'}), 404
    data = request.json
    
    if not data:
        raise ValidationError("Dados não fornecidos")
    
    custom_fee = data.get('custom_monthly_fee')
    
    if custom_fee is None:
        raise ValidationError("Campo custom_monthly_fee é obrigatório")
    
    try:
        custom_fee = float(custom_fee)
        if custom_fee < 0:
            raise ValidationError("Taxa customizada deve ser maior ou igual a zero")
    except (ValueError, TypeError):
        raise ValidationError("Taxa customizada deve ser um número válido")
    
    # Atualizar taxa customizada
    monthly_player.custom_monthly_fee = custom_fee
    
    # Recalcular totais do período
    period = monthly_player.monthly_period
    total_expected = db.session.query(
        db.func.sum(
            db.func.coalesce(MonthlyPlayer.custom_monthly_fee, MonthlyPlayer.monthly_fee)
        )
    ).filter(
        and_(MonthlyPlayer.monthly_period_id == period.id, MonthlyPlayer.user_id == current_user_id)
    ).scalar() or 0
    
    period.total_expected = total_expected
    
    db.session.commit()
    
    # Serializar resposta
    schema = MonthlyPaymentResponseSchema()
    monthly_player_data = schema.dump(monthly_player)
    
    return APIResponse.success(
        data=monthly_player_data,
        message="Taxa mensal customizada atualizada com sucesso"
    )


@api_bp.route('/monthly-payments', methods=['POST'])
@jwt_required()
def create_monthly_payment():
    """
    Cria um novo período de pagamento mensal e automaticamente importa todos os jogadores ativos
    """
    try:
        # Validar dados de entrada
        schema = MonthlyPaymentCreateSchema()
        data = schema.load(request.json)
        
        current_user_id = str(get_jwt_identity())

        # Verificar se já existe período para o mês/ano deste usuário
        existing_period = MonthlyPeriod.query.filter(
            and_(
                MonthlyPeriod.year == data['year'],
                MonthlyPeriod.month == data['month'],
                MonthlyPeriod.user_id == current_user_id
            )
        ).first()
        
        if existing_period:
            return jsonify({'error': 'Já existe um período para este mês/ano'}), 400
        
        # Buscar todos os jogadores ativos do usuário
        active_players = Player.query.filter(
            and_(Player.is_active == True, Player.user_id == current_user_id)
        ).all()
        
        if not active_players:
            return jsonify({'error': 'Não há jogadores ativos para criar o período mensal'}), 400
        
        # Calcular totais
        total_expected = sum(float(player.monthly_fee) for player in active_players)
        
        # Criar novo período com jogadores ativos
        period = MonthlyPeriod(
            id=str(uuid.uuid4()),
            year=data['year'],
            month=data['month'],
            name=f"{data['month']:02d}/{data['year']}",
            total_expected=total_expected,
            total_received=0,
            players_count=len(active_players),
            is_active=True,
            user_id=current_user_id
        )
        
        db.session.add(period)
        db.session.flush()  # Para obter o ID do período
        
        # Criar registros MonthlyPlayer para todos os jogadores ativos
        monthly_players_created = 0
        for player in active_players:
            monthly_player = MonthlyPlayer(
                id=str(uuid.uuid4()),
                player_id=player.id,
                monthly_period_id=period.id,
                player_name=player.name,
                position=player.position,
                phone=player.phone,
                email=player.email,
                monthly_fee=player.monthly_fee,
                join_date=player.join_date,
                status=PaymentStatus.PENDING.value,
                pending_months_count=0,
                user_id=current_user_id
            )
            db.session.add(monthly_player)
            monthly_players_created += 1
        
        db.session.commit()
        
        return jsonify({
            'message': f'Período de pagamento criado com sucesso com {monthly_players_created} jogadores',
            'period_id': period.id,
            'created_payments': monthly_players_created,
            'total_players': monthly_players_created,
            'total_expected': float(total_expected)
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao criar período de pagamento: {str(e)}'}), 500


@api_bp.route('/monthly-payments/<payment_id>/pay', methods=['PUT'])
@jwt_required()
def update_payment(payment_id):
    """
    Atualiza o status de pagamento de um jogador
    """
    try:
        payment = MonthlyPlayer.query.get_or_404(payment_id)
        
        data = request.json
        payment_date = data.get('payment_date')
        
        # Atualizar pagamento
        payment.status = 'paid'
        
        if payment_date:
            payment.payment_date = datetime.fromisoformat(payment_date.replace('Z', '+00:00'))
        else:
            payment.payment_date = datetime.utcnow()
        
        # Atualizar total recebido do período
        period = MonthlyPeriod.query.get(payment.monthly_period_id)
        period.total_received = db.session.query(
            db.func.sum(MonthlyPlayer.monthly_fee)
        ).filter(
            and_(
                MonthlyPlayer.monthly_period_id == period.id,
                MonthlyPlayer.status == 'paid'
            )
        ).scalar() or 0
        
        db.session.commit()
        
        # Retornar pagamento atualizado
        schema = MonthlyPaymentResponseSchema()
        return jsonify(schema.dump(payment)), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao atualizar pagamento: {str(e)}'}), 500


# ==================== ROTAS DE ESTATÍSTICAS ====================

@api_bp.route('/stats/players', methods=['GET'])
@jwt_required()
def get_player_stats():
    """
    Retorna estatísticas dos jogadores
    """
    try:
        # Escopo por usuário autenticado
        current_user_id = str(get_jwt_identity())

        # Contagens por status restritas ao usuário
        active_count = Player.query.filter(
            and_(Player.user_id == current_user_id, Player.status == 'active')
        ).count()

        inactive_count = Player.query.filter(
            and_(Player.user_id == current_user_id, Player.status == 'inactive')
        ).count()

        pending_count = Player.query.filter(
            and_(Player.user_id == current_user_id, Player.status == 'pending')
        ).count()

        delayed_count = Player.query.filter(
            and_(Player.user_id == current_user_id, Player.status == 'delayed')
        ).count()

        total_count = Player.query.filter(Player.user_id == current_user_id).count()

        stats = {
            'active': active_count,
            'inactive': inactive_count,
            'pending': pending_count,
            'delayed': delayed_count,
            'total': total_count
        }
        
        return jsonify(stats), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar estatísticas: {str(e)}'}), 500


@api_bp.route('/stats/payments/<int:year>/<int:month>', methods=['GET'])
@jwt_required()
def get_payment_stats(year, month):
    """
    Retorna estatísticas de pagamentos para um mês específico
    """
    try:
        # Buscar período
        period = MonthlyPeriod.query.filter(
            and_(
                MonthlyPeriod.year == year,
                MonthlyPeriod.month == month
            )
        ).first()
        
        if not period:
            return jsonify({'error': 'Período não encontrado'}), 404
        
        # Calcular estatísticas
        payments = MonthlyPlayer.query.filter_by(monthly_period_id=period.id).all()
        
        stats = {
            'total_players': len(payments),
            'paid': len([p for p in payments if p.status == 'paid']),
            'partial': len([p for p in payments if p.status == 'partial']),
            'pending': len([p for p in payments if p.status == 'pending']),
            'total_expected': period.total_expected,
            'total_received': period.total_received,
            'collection_rate': (period.total_received / period.total_expected * 100) if period.total_expected > 0 else 0
        }
        
        return jsonify(stats), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar estatísticas de pagamento: {str(e)}'}), 500


# ==================== MONTHLY PERIODS ROUTES ====================

@api_bp.route('/monthly-periods', methods=['GET'])
@jwt_required()
def get_monthly_periods():
    """
    Lista todos os períodos mensais
    """
    try:
        current_user_id = str(get_jwt_identity())
        periods = MonthlyPeriod.query.filter(
            MonthlyPeriod.user_id == current_user_id
        ).order_by(MonthlyPeriod.year.desc(), MonthlyPeriod.month.desc()).all()
        
        result = []
        for period in periods:
            result.append({
                'id': period.id,
                'month': period.month,
                'year': period.year,
                'name': period.name,
                'is_active': period.is_active,
                'total_expected': float(period.total_expected),
                'total_received': float(period.total_received),
                'players_count': period.players_count,
                'created_at': period.created_at.isoformat(),
                'updated_at': period.updated_at.isoformat()
            })
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar períodos: {str(e)}'}), 500


@api_bp.route('/monthly-periods/<period_id>', methods=['GET'])
@jwt_required()
def get_monthly_period(period_id):
    """
    Busca um período mensal específico
    """
    try:
        current_user_id = str(get_jwt_identity())
        period = MonthlyPeriod.query.filter(
            and_(MonthlyPeriod.id == period_id, MonthlyPeriod.user_id == current_user_id)
        ).first()
        
        if not period:
            return jsonify({'error': 'Período não encontrado'}), 404
        
        result = {
            'id': period.id,
            'month': period.month,
            'year': period.year,
            'name': period.name,
            'is_active': period.is_active,
            'total_expected': float(period.total_expected),
            'total_received': float(period.total_received),
            'players_count': period.players_count,
            'created_at': period.created_at.isoformat(),
            'updated_at': period.updated_at.isoformat()
        }
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar período: {str(e)}'}), 500


@api_bp.route('/monthly-periods/<period_id>/players', methods=['POST'])
@jwt_required()
def add_players_to_monthly_period(period_id):
    """
    Adiciona jogadores selecionados a um período mensal
    """
    try:
        # Verificar se o período existe e pertence ao usuário
        current_user_id = str(get_jwt_identity())
        period = MonthlyPeriod.query.filter(
            and_(MonthlyPeriod.id == period_id, MonthlyPeriod.user_id == current_user_id)
        ).first()
        if not period:
            return jsonify({'error': 'Período não encontrado'}), 404
        
        # Validar dados de entrada
        data = request.json
        if not data or 'player_ids' not in data:
            return jsonify({'error': 'Lista de player_ids é obrigatória'}), 400
        
        player_ids = data['player_ids']
        if not isinstance(player_ids, list) or len(player_ids) == 0:
            return jsonify({'error': 'Lista de player_ids deve conter pelo menos um ID'}), 400
        
        # Buscar jogadores válidos do usuário
        players = Player.query.filter(
            and_(Player.id.in_(player_ids), Player.user_id == current_user_id)
        ).all()
        if len(players) != len(player_ids):
            return jsonify({'error': 'Um ou mais jogadores não foram encontrados'}), 400
        
        # Verificar se algum jogador já está no período
        existing_players = MonthlyPlayer.query.filter(
            and_(
                MonthlyPlayer.monthly_period_id == period_id,
                MonthlyPlayer.player_id.in_(player_ids),
                MonthlyPlayer.user_id == current_user_id
            )
        ).all()
        
        if existing_players:
            existing_names = [mp.player_name for mp in existing_players]
            return jsonify({
                'error': f'Os seguintes jogadores já estão no período: {", ".join(existing_names)}'
            }), 400
        
        # Criar registros para os jogadores selecionados
        created_players = []
        total_expected_increase = 0
        
        for player in players:
            monthly_player = MonthlyPlayer(
                id=str(uuid.uuid4()),
                monthly_period_id=period_id,
                player_id=player.id,
                player_name=player.name,
                position=player.position,
                phone=player.phone or '',
                email=player.email or '',
                monthly_fee=player.monthly_fee,
                join_date=player.join_date,
                status='pending',
                user_id=current_user_id
            )
            db.session.add(monthly_player)
            created_players.append(monthly_player)
            total_expected_increase += player.monthly_fee
        
        # Atualizar totais do período
        period.total_expected += total_expected_increase
        period.players_count = MonthlyPlayer.query.filter(
            and_(MonthlyPlayer.monthly_period_id == period_id, MonthlyPlayer.user_id == current_user_id)
        ).count() + len(created_players)
        
        db.session.commit()
        
        return jsonify({
            'message': f'{len(created_players)} jogadores adicionados com sucesso',
            'added_players': len(created_players),
            'total_expected_increase': float(total_expected_increase)
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao adicionar jogadores ao período: {str(e)}'}), 500


@api_bp.route('/monthly-periods/<period_id>/players', methods=['GET'])
@jwt_required()
def get_monthly_period_players(period_id):
    """
    Lista jogadores de um período mensal específico
    """
    try:
        # Verificar se o período existe e pertence ao usuário
        current_user_id = str(get_jwt_identity())
        period = MonthlyPeriod.query.filter(
            and_(MonthlyPeriod.id == period_id, MonthlyPeriod.user_id == current_user_id)
        ).first()
        if not period:
            return jsonify({'error': 'Período não encontrado'}), 404
        
        # Buscar jogadores do período do usuário
        monthly_players = MonthlyPlayer.query.filter(
            and_(MonthlyPlayer.monthly_period_id == period_id, MonthlyPlayer.user_id == current_user_id)
        ).all()
        
        result = []
        for mp in monthly_players:
            player_data = {
                'id': mp.id,
                'player_id': mp.player_id,
                'monthly_period_id': mp.monthly_period_id,
                'player_name': mp.player_name,
                'position': mp.position,
                'phone': mp.phone,
                'email': mp.email,
                'monthly_fee': float(mp.monthly_fee),
                'status': mp.status,
                'payment_date': mp.payment_date.isoformat() if mp.payment_date else None,
                'created_at': mp.created_at.isoformat(),
                'updated_at': mp.updated_at.isoformat()
            }
            
            # Incluir dados do jogador se disponível
            if mp.player:
                player_data['player'] = {
                    'id': mp.player.id,
                    'name': mp.player.name,
                    'email': mp.player.email,
                    'phone': mp.player.phone,
                    'position': mp.player.position,
                    'monthly_fee': float(mp.player.monthly_fee),
                    'status': mp.player.status
                }
            
            result.append(player_data)
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar jogadores do período: {str(e)}'}), 500


@api_bp.route('/monthly-periods/<period_id>/casual-players', methods=['GET'])
@jwt_required()
def get_monthly_period_casual_players(period_id):
    """
    Lista jogadores casuais de um período mensal específico
    """
    try:
        # Verificar se o período existe e pertence ao usuário
        current_user_id = str(get_jwt_identity())
        period = MonthlyPeriod.query.filter(
            and_(MonthlyPeriod.id == period_id, MonthlyPeriod.user_id == current_user_id)
        ).first()
        if not period:
            return jsonify({'error': 'Período não encontrado'}), 404
        
        # Buscar jogadores casuais do período do usuário
        casual_players = CasualPlayer.query.filter(
            and_(CasualPlayer.monthly_period_id == period_id, CasualPlayer.user_id == current_user_id)
        ).all()
        
        result = []
        for cp in casual_players:
            result.append({
                'id': cp.id,
                'monthly_period_id': cp.monthly_period_id,
                'player_name': cp.player_name,
                'play_date': cp.play_date.isoformat(),
                'invited_by': cp.invited_by,
                'amount': float(cp.amount),
                'payment_date': cp.payment_date.isoformat() if cp.payment_date else None,
                'status': cp.status,
                'created_at': cp.created_at.isoformat(),
                'updated_at': cp.updated_at.isoformat()
            })
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar jogadores casuais do período: {str(e)}'}), 500


@api_bp.route('/monthly-periods/<period_id>/expenses', methods=['GET'])
@jwt_required()
def get_monthly_period_expenses(period_id):
    """
    Lista despesas de um período mensal específico
    """
    try:
        # Verificar se o período existe e pertence ao usuário
        current_user_id = str(get_jwt_identity())
        period = MonthlyPeriod.query.filter(
            and_(MonthlyPeriod.id == period_id, MonthlyPeriod.user_id == current_user_id)
        ).first()
        if not period:
            return jsonify({'error': 'Período não encontrado'}), 404
        
        # Buscar despesas do período do usuário
        expenses = Expense.query.filter(
            and_(Expense.monthly_period_id == period_id, Expense.user_id == current_user_id)
        ).all()
        
        result = []
        for expense in expenses:
            result.append({
                'id': expense.id,
                'monthly_period_id': expense.monthly_period_id,
                'description': expense.description,
                'amount': float(expense.amount),
                'category': expense.category,
                'expense_date': expense.expense_date.isoformat(),
                'created_at': expense.created_at.isoformat(),
                'updated_at': expense.updated_at.isoformat()
            })
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar despesas do período: {str(e)}'}), 500


# ==================== TRATAMENTO DE ERROS ====================

@api_bp.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Recurso não encontrado'}), 404


@api_bp.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Requisição inválida'}), 400


@api_bp.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Erro interno do servidor'}), 500
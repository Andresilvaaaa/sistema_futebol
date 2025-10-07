"""
Controladores da API para gerenciamento de jogadores e pagamentos mensais
"""
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from sqlalchemy import and_, extract
from datetime import datetime
from decimal import Decimal, InvalidOperation
import uuid

from ...services.db.connection import db
from ...services.db.models import Player, MonthlyPeriod, MonthlyPlayer, CasualPlayer, Expense, PaymentStatus
from .schemas import (
    PlayerCreateSchema, PlayerUpdateSchema, PlayerResponseSchema,
    MonthlyPaymentCreateSchema, MonthlyPaymentResponseSchema,
    MonthlyPeriodUpdateSchema,
    CasualPlayerCreateSchema, ExpenseCreateSchema
)
from .response_utils import APIResponse, ValidationError, handle_api_error
from marshmallow import ValidationError as MarshmallowValidationError
import logging

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
    
    # Query base
    query = Player.query
    
    # Aplicar filtros
    if status:
        query = query.filter(Player.status == status)
    
    if search:
        query = query.filter(
            Player.name.ilike(f'%{search}%')
        )
    
    # Paginação
    players = query.paginate(
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
    
    # Validar campos obrigatórios alinhados ao modelo
    required_fields = ['name', 'phone', 'email', 'position']
    missing_fields = [field for field in required_fields if not data.get(field)]
    
    if missing_fields:
        raise ValidationError(
            "Campos obrigatórios não fornecidos",
            {'missing_fields': missing_fields}
        )
    
    # Normalizar entradas
    name = data['name'].strip() if isinstance(data.get('name'), str) else data['name']
    phone = data['phone'].strip() if isinstance(data.get('phone'), str) else data['phone']
    email = data['email'].strip().lower() if isinstance(data.get('email'), str) else data['email']
    position = data['position'].strip() if isinstance(data.get('position'), str) else data['position']
    
    # Verificar duplicidade de telefone
    existing_player = Player.query.filter_by(phone=phone).first()
    if existing_player:
        raise ValidationError(
            "Já existe um jogador com este telefone",
            {'phone': ['Telefone já cadastrado']}
        )
    
    # Verificar duplicidade de email
    existing_email = Player.query.filter_by(email=email).first()
    if existing_email:
        raise ValidationError(
            "Já existe um jogador com este email",
            {'email': ['Email já cadastrado']}
        )
    
    # Criar novo jogador
    player = Player(
        id=str(uuid.uuid4()),
        name=name,
        phone=phone,
        email=email,
        position=position,
        # Usa taxa mensal informada ou 0.00 por padrão
        monthly_fee=data.get('monthly_fee', 0.00),
        status='active'
    )
    
    db.session.add(player)
    
    try:
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        # Retorna erro 400 com detalhes para evitar 500
        raise ValidationError(
            "Falha ao criar jogador por violação de integridade",
            {'db': [str(e.orig) if hasattr(e, 'orig') else str(e)]}
        )
    
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
    player = Player.query.get_or_404(player_id)
    
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
    player = Player.query.get_or_404(player_id)
    data = request.json
    
    if not data:
        raise ValidationError("Dados não fornecidos")
    
    # Validar se telefone já existe em outro jogador
    if 'phone' in data and data['phone'] != player.phone:
        existing_player = Player.query.filter_by(phone=data['phone']).first()
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
    player = Player.query.get_or_404(player_id)
    
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
    player = Player.query.get_or_404(player_id)
    
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
    player = Player.query.get_or_404(player_id)
    
    # Verificar se jogador tem pagamentos associados
    has_payments = MonthlyPlayer.query.filter_by(player_id=player_id).first()
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
    print("[DEBUG][get_monthly_payments] Iniciando listagem de pagamentos mensais")
    # Parâmetros de filtro
    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    player_id = request.args.get('player_id', type=str)
    status = request.args.get('status', type=str)
    page = int(request.args.get('page', 1))
    per_page = min(int(request.args.get('per_page', 20)), 100)
    print(f"[DEBUG][get_monthly_payments] filtros year={year}, month={month}, player_id={player_id}, status={status}, page={page}, per_page={per_page}")

    # Buscar períodos com filtros e paginação
    period_query = db.session.query(MonthlyPeriod)
    if year:
        period_query = period_query.filter(MonthlyPeriod.year == year)
    if month:
        period_query = period_query.filter(MonthlyPeriod.month == month)

    period_query = period_query.order_by(MonthlyPeriod.year.desc(), MonthlyPeriod.month.desc())
    periods_paginated = period_query.paginate(page=page, per_page=per_page, error_out=False)
    print(f"[DEBUG][get_monthly_payments] períodos encontrados={periods_paginated.total}")

    aggregated = []
    for period in periods_paginated.items:
        # Jogadores mensais do período (aplicar filtros opcionais)
        mp_query = db.session.query(MonthlyPlayer).filter(MonthlyPlayer.monthly_period_id == period.id)
        if player_id:
            mp_query = mp_query.filter(MonthlyPlayer.player_id == player_id)
        if status:
            mp_query = mp_query.filter(MonthlyPlayer.status == status)
        print(f"[DEBUG][get_monthly_payments] carregando monthly_players para período {period.id}")
        monthly_players = mp_query.all()
        print(f"[DEBUG][get_monthly_payments] monthly_players carregados={len(monthly_players)} para período {period.id}")

        # Serializar jogadores mensais
        mp_schema = MonthlyPaymentResponseSchema(many=True)
        monthly_players_data = mp_schema.dump(monthly_players)

        # Jogadores avulsos do período
        casual_players = db.session.query(CasualPlayer).filter(CasualPlayer.monthly_period_id == period.id).all()
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

    print("[DEBUG][get_monthly_payments] finalizando resposta agregada")
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
    print(f"[DEBUG][update_monthly_player_custom_fee] monthly_player_id={monthly_player_id}")
    monthly_player = MonthlyPlayer.query.get_or_404(monthly_player_id)
    data = request.json
    print(f"[DEBUG][update_monthly_player_custom_fee] payload recebido={data}")
    
    if not data:
        raise ValidationError("Dados não fornecidos")
    
    custom_fee = data.get('custom_monthly_fee')
    print(f"[DEBUG][update_monthly_player_custom_fee] custom_monthly_fee bruto={custom_fee}")
    
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
    print(f"[DEBUG][update_monthly_player_custom_fee] custom_monthly_fee salvo={monthly_player.custom_monthly_fee}")
    
    # Recalcular totais do período
    period = monthly_player.monthly_period
    total_expected = db.session.query(
        db.func.sum(
            db.func.coalesce(MonthlyPlayer.custom_monthly_fee, MonthlyPlayer.monthly_fee)
        )
    ).filter(MonthlyPlayer.monthly_period_id == period.id).scalar() or 0
    print(f"[DEBUG][update_monthly_player_custom_fee] novo total_expected calculado={total_expected}")
    period.total_expected = total_expected
    
    db.session.commit()
    
    # Serializar resposta
    schema = MonthlyPaymentResponseSchema()
    monthly_player_data = schema.dump(monthly_player)
    
    print(f"[DEBUG][update_monthly_player_custom_fee] sucesso para monthly_player_id={monthly_player_id}")
    return APIResponse.success(
        data=monthly_player_data,
        message="Taxa mensal customizada atualizada com sucesso"
    )


@api_bp.route('/monthly-payments', methods=['POST'])
@jwt_required()
@handle_api_error
def create_monthly_payment():
    """
    Cria um novo período de pagamento mensal e automaticamente importa todos os jogadores ativos
    """
    try:
        # Validar dados de entrada
        schema = MonthlyPaymentCreateSchema()
        print(f"[DEBUG][create_monthly_payment] request.json bruto={request.json}")
        data = schema.load(request.json)
        print(f"[DEBUG][create_monthly_payment] dados validados pelo schema={data}")
        logging.info(f"[MonthlyPeriod] Request to create period: month={data['month']}, year={data['year']}")

        # Verificar se já existe período para o mês/ano
        print(f"[DEBUG][create_monthly_payment] verificando período existente para {data['month']}/{data['year']}")
        existing_period = MonthlyPeriod.query.filter(
            and_(
                MonthlyPeriod.year == data['year'],
                MonthlyPeriod.month == data['month']
            )
        ).first()

        if existing_period:
            print(f"[DEBUG][create_monthly_payment] período já existe id={existing_period.id}")
            return APIResponse.error('Já existe um período para este mês/ano', status_code=400)

        # Buscar todos os jogadores ativos
        print("[DEBUG][create_monthly_payment] consultando jogadores ativos")
        active_players = Player.query.filter(Player.is_active == True).all()
        logging.info(f"[MonthlyPeriod] Active players found: {len(active_players)}")
        print(f"[DEBUG][create_monthly_payment] jogadores ativos encontrados={len(active_players)}")

        if not active_players:
            # Em desenvolvimento, permitir criação de período mesmo sem jogadores ativos
            env = current_app.config.get('ENV', 'development')
            if env == 'development':
                logging.warning('[MonthlyPeriod] Nenhum jogador ativo encontrado; seguindo em desenvolvimento com período vazio.')
                print('[DEBUG][create_monthly_payment] Ambiente dev, permitindo período vazio sem jogadores')
            else:
                return APIResponse.error('Não há jogadores ativos para criar o período mensal', status_code=400)

        # Calcular totais com Decimal para evitar incompatibilidades de tipo
        total_expected = Decimal('0')
        for player in active_players or []:
            fee = player.monthly_fee
            try:
                if fee is None:
                    fee_decimal = Decimal('0')
                elif isinstance(fee, Decimal):
                    fee_decimal = fee
                elif isinstance(fee, (float, int)):
                    fee_decimal = Decimal(str(fee))
                else:
                    fee_decimal = Decimal(str(fee))
            except (InvalidOperation, ValueError, TypeError):
                fee_decimal = Decimal('0')
            total_expected += fee_decimal
        logging.info(f"[MonthlyPeriod] Computed total_expected: {str(total_expected)}")
        print(f"[DEBUG][create_monthly_payment] total_expected computado={str(total_expected)}")

        # Criar novo período com jogadores ativos
        period = MonthlyPeriod(
            id=str(uuid.uuid4()),
            year=data['year'],
            month=data['month'],
            name=f"{data['month']:02d}/{data['year']}",
            total_expected=total_expected,
            total_received=Decimal('0'),
            players_count=len(active_players or []),
            is_active=True
        )

        db.session.add(period)
        db.session.flush()  # Para obter o ID do período
        logging.info(f"[MonthlyPeriod] Created period with id={period.id}")
        print(f"[DEBUG][create_monthly_payment] período criado id={period.id}")

        # Criar registros MonthlyPlayer para todos os jogadores ativos
        monthly_players_created = 0
        for player in active_players or []:
            # Sanitizar e tipar corretamente os campos
            player_name = player.name or ''
            position = player.position or ''
            phone = player.phone or ''
            email = player.email or ''

            # Garantir Decimal em monthly_fee
            fee = player.monthly_fee
            try:
                if fee is None:
                    fee_decimal = Decimal('0')
                elif isinstance(fee, Decimal):
                    fee_decimal = fee
                elif isinstance(fee, (float, int)):
                    fee_decimal = Decimal(str(fee))
                else:
                    fee_decimal = Decimal(str(fee))
            except (InvalidOperation, ValueError, TypeError):
                fee_decimal = Decimal('0')

            # Garantir data válida
            join_date = player.join_date or datetime.utcnow().date()

            print(f"[DEBUG][create_monthly_payment] criando MonthlyPlayer para player_id={player.id} fee={str(fee_decimal)}")
            monthly_player = MonthlyPlayer(
                id=str(uuid.uuid4()),
                player_id=player.id,
                monthly_period_id=period.id,
                player_name=player_name,
                position=position,
                phone=phone,
                email=email,
                monthly_fee=fee_decimal,
                custom_monthly_fee=None,
                join_date=join_date,
                status=PaymentStatus.PENDING.value,
                pending_months_count=0
            )
            db.session.add(monthly_player)
            monthly_players_created += 1

        db.session.commit()
        logging.info(f"[MonthlyPeriod] Monthly players created: {monthly_players_created}")
        print(f"[DEBUG][create_monthly_payment] monthly_players criados={monthly_players_created}")

        # Montar dados do período para resposta padronizada
        period_data = {
            'id': period.id,
            'year': period.year,
            'month': period.month,
            'name': period.name,
            'is_active': period.is_active,
            'total_expected': period.total_expected,
            'total_received': period.total_received,
            'players_count': period.players_count,
            'created_at': period.created_at,
            'updated_at': period.updated_at
        }

        print(f"[DEBUG][create_monthly_payment] sucesso período id={period.id}")
        return APIResponse.success(
            data=period_data,
            message=f'Período de pagamento criado com sucesso com {monthly_players_created} jogadores',
            status_code=201
        )

    except MarshmallowValidationError as e:
        logging.warning(f"Falha na validação do schema ao criar período mensal: {getattr(e, 'messages', str(e))}")
        print(f"[DEBUG][create_monthly_payment] validação falhou errors={getattr(e, 'messages', None)}")
        return APIResponse.error('Dados inválidos para criação do período mensal', errors=getattr(e, 'messages', None), status_code=400)
    except IntegrityError as e:
        # Tratar erros de integridade do banco (campos obrigatórios, FK, etc.)
        db.session.rollback()
        print(f"[DEBUG][create_monthly_payment] IntegrityError ao criar período: {str(e)}")
        return APIResponse.error(
            'Dados inválidos ao criar período de pagamento',
            errors={'db': [str(e.orig) if hasattr(e, 'orig') else str(e)]},
            status_code=400
        )
    except Exception as e:
        db.session.rollback()
        # Deixar o decorador tratar o erro de forma padronizada
        logging.exception(f"Erro não tratado ao criar período mensal: {e}")
        print(f"[DEBUG][create_monthly_payment] Exception não tratada: {str(e)}")
        # Em desenvolvimento, retornar detalhes do erro para facilitar diagnóstico
        env = current_app.config.get('ENV', 'development')
        if env == 'development':
            return APIResponse.error(
                message=f"Erro interno do servidor: {str(e)}",
                status_code=500
            )
        # Em outros ambientes, deixar o decorador tratar o erro
        raise e


@api_bp.route('/monthly-payments/<payment_id>/pay', methods=['PUT'])
@jwt_required()
def update_payment(payment_id):
    """
    Atualiza o status de pagamento de um jogador
    """
    try:
        print(f"[DEBUG][update_payment] Iniciando atualização de pagamento payment_id={payment_id}")
        payment = MonthlyPlayer.query.get_or_404(payment_id)
        print(f"[DEBUG][update_payment] pagamento encontrado: id={payment.id}, status_atual={payment.status}")
        
        data = request.json
        print(f"[DEBUG][update_payment] payload recebido={data}")
        payment_date = data.get('payment_date')
        print(f"[DEBUG][update_payment] payment_date recebido={payment_date}")
        
        # Atualizar pagamento
        payment.status = 'paid'
        print(f"[DEBUG][update_payment] status atualizado para 'paid'")
        
        if payment_date:
            payment.payment_date = datetime.fromisoformat(payment_date.replace('Z', '+00:00'))
            print(f"[DEBUG][update_payment] payment_date setado via payload={payment.payment_date}")
        else:
            payment.payment_date = datetime.utcnow()
            print(f"[DEBUG][update_payment] payment_date setado para agora={payment.payment_date}")
        
        # Atualizar total recebido do período
        period = MonthlyPeriod.query.get(payment.monthly_period_id)
        print(f"[DEBUG][update_payment] período carregado id={getattr(period, 'id', None)}")
        period.total_received = db.session.query(
            db.func.sum(MonthlyPlayer.monthly_fee)
        ).filter(
            and_(
                MonthlyPlayer.monthly_period_id == period.id,
                MonthlyPlayer.status == 'paid'
            )
        ).scalar() or 0
        print(f"[DEBUG][update_payment] total_received recalculado={period.total_received}")
        
        db.session.commit()
        print(f"[DEBUG][update_payment] commit realizado com sucesso para payment_id={payment_id}")
        
        # Retornar pagamento atualizado
        schema = MonthlyPaymentResponseSchema()
        response_data = schema.dump(payment)
        print(f"[DEBUG][update_payment] resposta gerada={response_data}")
        return jsonify(response_data), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"[ERROR][update_payment] erro ao atualizar pagamento: {str(e)}")
        return jsonify({'error': f'Erro ao atualizar pagamento: {str(e)}'}), 500


# ==================== ROTAS DE PAGAMENTO (MonthlyPlayer em período) ====================

@api_bp.route('/monthly-periods/<period_id>/players/<player_id>/payment', methods=['PATCH'])
@jwt_required()
@handle_api_error
def update_monthly_player_payment(period_id, player_id):
    """
    Atualiza o status de pagamento de um MonthlyPlayer específico dentro de um período.

    Request body: { "status": "paid" | "pending" }
    - Define payment_date automaticamente ao marcar como 'paid'
    - Recalcula o total_received do MonthlyPeriod
    - Retorna o MonthlyPlayer serializado via MonthlyPaymentResponseSchema
    """
    print(f"[DEBUG][update_monthly_player_payment] period_id={period_id} player_id={player_id}")
    # Buscar o registro do MonthlyPlayer pelo par (period_id, player_id)
    monthly_player = MonthlyPlayer.query.filter_by(
        monthly_period_id=period_id,
        player_id=player_id
    ).first()

    if not monthly_player:
        raise ValidationError("Jogador não encontrado no período informado")

    data = request.json or {}
    print(f"[DEBUG][update_monthly_player_payment] payload recebido={data}")
    status = data.get('status')

    # Validar status permitido (apenas 'paid' e 'pending')
    allowed_statuses = [PaymentStatus.PAID.value, PaymentStatus.PENDING.value]
    if status not in allowed_statuses:
        raise ValidationError(f"Status deve ser um dos: {allowed_statuses}")

    # Atualizar status e data de pagamento
    monthly_player.status = status
    if status == PaymentStatus.PAID.value:
        monthly_player.payment_date = datetime.utcnow()
    else:
        monthly_player.payment_date = None

    # Recalcular total_received do período considerando taxa efetiva e avulsos pagos
    period = monthly_player.monthly_period
    total_monthly_received = db.session.query(
        db.func.sum(
            db.func.coalesce(MonthlyPlayer.custom_monthly_fee, MonthlyPlayer.monthly_fee)
        )
    ).filter(
        and_(
            MonthlyPlayer.monthly_period_id == period.id,
            MonthlyPlayer.status == PaymentStatus.PAID.value
        )
    ).scalar() or 0

    total_casual_received = db.session.query(
        db.func.sum(CasualPlayer.amount)
    ).filter(
        and_(
            CasualPlayer.monthly_period_id == period.id,
            CasualPlayer.status == PaymentStatus.PAID.value
        )
    ).scalar() or 0

    period.total_received = (total_monthly_received or 0) + (total_casual_received or 0)

    db.session.commit()

    # Serializar resposta consistente
    schema = MonthlyPaymentResponseSchema()
    response_data = schema.dump(monthly_player)
    print(f"[DEBUG][update_monthly_player_payment] resposta gerada={response_data}")
    return APIResponse.success(
        data=response_data,
        message="Status de pagamento atualizado com sucesso"
    )


# ==================== ROTAS DE ESTATÍSTICAS ====================

@api_bp.route('/stats/players', methods=['GET'])
@jwt_required()
def get_player_stats():
    """
    Retorna estatísticas dos jogadores
    """
    try:
        stats = {
            'active': Player.query.filter_by(status='active').count(),
            'inactive': Player.query.filter_by(status='inactive').count(),
            'pending': Player.query.filter_by(status='pending').count(),
            'total': Player.query.count()
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
        print(f"[DEBUG][get_payment_stats] Iniciando busca de stats para {month}/{year}")
        # Buscar período
        period = MonthlyPeriod.query.filter(
            and_(
                MonthlyPeriod.year == year,
                MonthlyPeriod.month == month
            )
        ).first()
        print(f"[DEBUG][get_payment_stats] período encontrado={getattr(period, 'id', None)}")
        
        if not period:
            print("[DEBUG][get_payment_stats] período não encontrado")
            return jsonify({'error': 'Período não encontrado'}), 404
        
        # Calcular estatísticas
        payments = MonthlyPlayer.query.filter_by(monthly_period_id=period.id).all()
        print(f"[DEBUG][get_payment_stats] pagamentos carregados={len(payments)}")
        
        stats = {
            'total_players': len(payments),
            'paid': len([p for p in payments if p.status == 'paid']),
            'partial': len([p for p in payments if p.status == 'partial']),
            'pending': len([p for p in payments if p.status == 'pending']),
            'total_expected': period.total_expected,
            'total_received': period.total_received,
            'collection_rate': (period.total_received / period.total_expected * 100) if period.total_expected > 0 else 0
        }
        print(f"[DEBUG][get_payment_stats] stats calculadas={stats}")
        
        return jsonify(stats), 200
        
    except Exception as e:
        print(f"[ERROR][get_payment_stats] erro ao buscar estatísticas: {str(e)}")
        return jsonify({'error': f'Erro ao buscar estatísticas de pagamento: {str(e)}'}), 500


# ==================== MONTHLY PERIODS ROUTES ====================

@api_bp.route('/monthly-periods', methods=['GET'])
@jwt_required()
def get_monthly_periods():
    """
    Lista todos os períodos mensais
    """
    try:
        print("[DEBUG][get_monthly_periods] Iniciando listagem de períodos")
        periods = MonthlyPeriod.query.order_by(MonthlyPeriod.year.desc(), MonthlyPeriod.month.desc()).all()
        print(f"[DEBUG][get_monthly_periods] períodos carregados={len(periods)}")
        
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
        print(f"[DEBUG][get_monthly_periods] resposta montada com {len(result)} períodos")
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"[ERROR][get_monthly_periods] erro ao buscar períodos: {str(e)}")
        return jsonify({'error': f'Erro ao buscar períodos: {str(e)}'}), 500


@api_bp.route('/monthly-periods/<period_id>', methods=['GET'])
@jwt_required()
def get_monthly_period(period_id):
    """
    Busca um período mensal específico
    """
    try:
        period = MonthlyPeriod.query.get(period_id)
        
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


@api_bp.route('/monthly-periods/<period_id>', methods=['PUT'])
@jwt_required()
@handle_api_error
def update_monthly_period(period_id):
    """
    Atualiza um período mensal existente.

    Suporta reajuste em massa da mensalidade padrão dos jogadores do período
    e atualização do status do período ("active" | "closed").

    Request body (qualquer combinação):
    {
      "monthly_fee": number,
      "status": "active" | "closed"
    }

    Efeitos:
    - Se "monthly_fee" for fornecido, atualiza o campo MonthlyPlayer.monthly_fee
      de todos os jogadores do período. Taxas customizadas (custom_monthly_fee)
      são preservadas e continuam sendo priorizadas no cálculo efetivo.
    - Recalcula "total_expected" do MonthlyPeriod usando coalesce(custom_monthly_fee, monthly_fee).
    - Se "status" for fornecido, atualiza MonthlyPeriod.is_active.
    - Retorna o período atualizado em resposta padronizada.
    """
    print(f"[DEBUG][update_monthly_period] period_id={period_id}")

    # Garantir existência do período
    period = MonthlyPeriod.query.get_or_404(period_id)

    # Validar payload com schema
    schema = MonthlyPeriodUpdateSchema()
    raw_data = request.json or {}
    print(f"[DEBUG][update_monthly_period] payload bruto={raw_data}")
    data = schema.load(raw_data)
    print(f"[DEBUG][update_monthly_period] payload validado={data}")

    updates_applied = []

    # Reajuste em massa da mensalidade
    monthly_fee = data.get('monthly_fee')
    if monthly_fee is not None:
        from decimal import Decimal, InvalidOperation
        try:
            new_fee = Decimal(str(monthly_fee))
            if new_fee < 0:
                raise ValidationError('monthly_fee deve ser maior ou igual a zero')
        except (InvalidOperation, ValueError, TypeError):
            raise ValidationError('monthly_fee deve ser um número válido')

        print(f"[DEBUG][update_monthly_period] aplicando mensalidade padrão em massa={str(new_fee)}")
        # Atualizar todos os MonthlyPlayer do período (preserva custom_monthly_fee)
        db.session.query(MonthlyPlayer).filter(
            MonthlyPlayer.monthly_period_id == period_id
        ).update({MonthlyPlayer.monthly_fee: new_fee}, synchronize_session=False)
        updates_applied.append('monthly_fee')

    # Atualização de status do período
    status = data.get('status')
    if status is not None:
        period.is_active = True if status == 'active' else False
        print(f"[DEBUG][update_monthly_period] status atualizado para is_active={period.is_active}")
        updates_applied.append('status')

    # Recalcular total_expected usando taxa efetiva
    total_expected = db.session.query(
        db.func.sum(
            db.func.coalesce(MonthlyPlayer.custom_monthly_fee, MonthlyPlayer.monthly_fee)
        )
    ).filter(
        MonthlyPlayer.monthly_period_id == period.id
    ).scalar() or 0
    print(f"[DEBUG][update_monthly_period] total_expected recalculado={total_expected}")
    period.total_expected = total_expected

    db.session.commit()
    print(f"[DEBUG][update_monthly_period] commit aplicado, updates={updates_applied}")

    # Montar resposta padronizada
    period_data = {
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

    return APIResponse.success(
        data=period_data,
        message='Período atualizado com sucesso'
    )


@api_bp.route('/monthly-periods/<period_id>/players', methods=['POST'])
@jwt_required()
def add_players_to_monthly_period(period_id):
    """
    Adiciona jogadores selecionados a um período mensal
    """
    try:
        # Verificar se o período existe
        period = MonthlyPeriod.query.get(period_id)
        if not period:
            return jsonify({'error': 'Período não encontrado'}), 404
        
        # Validar dados de entrada
        data = request.json
        if not data or 'player_ids' not in data:
            return jsonify({'error': 'Lista de player_ids é obrigatória'}), 400
        
        player_ids = data['player_ids']
        if not isinstance(player_ids, list) or len(player_ids) == 0:
            return jsonify({'error': 'Lista de player_ids deve conter pelo menos um ID'}), 400
        
        # Buscar jogadores válidos
        players = Player.query.filter(Player.id.in_(player_ids)).all()
        if len(players) != len(player_ids):
            return jsonify({'error': 'Um ou mais jogadores não foram encontrados'}), 400
        
        # Verificar se algum jogador já está no período
        existing_players = MonthlyPlayer.query.filter(
            and_(
                MonthlyPlayer.monthly_period_id == period_id,
                MonthlyPlayer.player_id.in_(player_ids)
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
                status='pending'
            )
            db.session.add(monthly_player)
            created_players.append(monthly_player)
            total_expected_increase += player.monthly_fee
        
        # Atualizar totais do período
        period.total_expected += total_expected_increase
        period.players_count = MonthlyPlayer.query.filter_by(monthly_period_id=period_id).count() + len(created_players)
        
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
        print(f"[DEBUG][get_monthly_period_players] Iniciando listagem para period_id={period_id}")
        # Verificar se o período existe
        period = MonthlyPeriod.query.get(period_id)
        if not period:
            print("[DEBUG][get_monthly_period_players] período não encontrado")
            return jsonify({'error': 'Período não encontrado'}), 404
        
        # Buscar jogadores do período
        monthly_players = MonthlyPlayer.query.filter_by(monthly_period_id=period_id).all()
        print(f"[DEBUG][get_monthly_period_players] jogadores carregados={len(monthly_players)}")
        
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
        print(f"[DEBUG][get_monthly_period_players] resposta montada com {len(result)} jogadores")
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"[ERROR][get_monthly_period_players] erro ao buscar jogadores: {str(e)}")
        return jsonify({'error': f'Erro ao buscar jogadores do período: {str(e)}'}), 500


@api_bp.route('/monthly-periods/<period_id>/casual-players', methods=['GET'])
@jwt_required()
def get_monthly_period_casual_players(period_id):
    """
    Lista jogadores casuais de um período mensal específico
    """
    try:
        print(f"[DEBUG][get_monthly_period_casual_players] Iniciando listagem para period_id={period_id}")
        # Verificar se o período existe
        period = MonthlyPeriod.query.get(period_id)
        if not period:
            print("[DEBUG][get_monthly_period_casual_players] período não encontrado")
            return jsonify({'error': 'Período não encontrado'}), 404
        
        # Buscar jogadores casuais do período
        casual_players = CasualPlayer.query.filter_by(monthly_period_id=period_id).all()
        print(f"[DEBUG][get_monthly_period_casual_players] jogadores casuais carregados={len(casual_players)}")
        
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
        print(f"[DEBUG][get_monthly_period_casual_players] resposta montada com {len(result)} jogadores casuais")
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"[ERROR][get_monthly_period_casual_players] erro ao buscar jogadores casuais: {str(e)}")
        return jsonify({'error': f'Erro ao buscar jogadores casuais do período: {str(e)}'}), 500


@api_bp.route('/monthly-periods/<period_id>/casual-players', methods=['POST'])
@jwt_required()
@handle_api_error
def create_casual_player(period_id):
    """
    Adiciona um jogador casual (avulso) a um período mensal específico
    """
    try:
        print(f"[DEBUG][create_casual_player] Iniciando criação para period_id={period_id}")
        
        # Verificar se o período existe
        period = MonthlyPeriod.query.get(period_id)
        if not period:
            print("[DEBUG][create_casual_player] período não encontrado")
            return APIResponse.error('Período não encontrado', 404)
        
        # Validar dados de entrada
        data = request.get_json()
        if not data:
            return APIResponse.error('Dados não fornecidos', 400)
        
        schema = CasualPlayerCreateSchema()
        try:
            validated_data = schema.load(data)
        except MarshmallowValidationError as e:
            return APIResponse.error('Dados inválidos', 400, {'validation_errors': e.messages})
        
        # Criar jogador casual
        casual_player = CasualPlayer(
            monthly_period_id=period_id,
            player_name=validated_data['player_name'],
            play_date=validated_data['play_date'],
            invited_by=validated_data.get('invited_by', ''),
            amount=Decimal(str(validated_data['amount'])),
            status=validated_data.get('status', PaymentStatus.PENDING.value)
        )
        
        # Se status for 'paid', definir data de pagamento
        if casual_player.status == PaymentStatus.PAID.value:
            casual_player.payment_date = datetime.utcnow()
        
        db.session.add(casual_player)
        db.session.commit()
        
        print(f"[DEBUG][create_casual_player] jogador casual criado com ID={casual_player.id}")
        
        # Retornar dados do jogador criado
        result = {
            'id': casual_player.id,
            'monthly_period_id': casual_player.monthly_period_id,
            'player_name': casual_player.player_name,
            'play_date': casual_player.play_date.isoformat(),
            'invited_by': casual_player.invited_by,
            'amount': float(casual_player.amount),
            'payment_date': casual_player.payment_date.isoformat() if casual_player.payment_date else None,
            'status': casual_player.status,
            'created_at': casual_player.created_at.isoformat(),
            'updated_at': casual_player.updated_at.isoformat()
        }
        
        return APIResponse.success(result, 'Jogador avulso adicionado com sucesso', 201)
        
    except Exception as e:
        db.session.rollback()
        print(f"[ERROR][create_casual_player] erro ao criar jogador casual: {str(e)}")
        return APIResponse.error(f'Erro ao adicionar jogador avulso: {str(e)}', 500)

@api_bp.route('/monthly-periods/<period_id>/casual-players/<casual_player_id>/payment', methods=['PATCH'])
@jwt_required()
@handle_api_error
def update_casual_player_payment(period_id, casual_player_id):
    """
    Atualiza o status de pagamento de um jogador avulso (CasualPlayer) em um período.

    Request body: { "status": "paid" | "pending" }
    - Define payment_date automaticamente ao marcar como 'paid'
    - Recalcula o total_received do MonthlyPeriod incluindo avulsos pagos
    - Retorna o CasualPlayer serializado em formato consistente com listagem
    """
    print(f"[DEBUG][update_casual_player_payment] period_id={period_id} casual_player_id={casual_player_id}")

    # Verificar se o período existe
    period = MonthlyPeriod.query.get(period_id)
    if not period:
        raise ValidationError('Período não encontrado')

    # Buscar o jogador casual pelo par (period_id, casual_player_id)
    casual_player = CasualPlayer.query.filter_by(
        id=casual_player_id,
        monthly_period_id=period_id
    ).first()

    if not casual_player:
        raise ValidationError('Jogador avulso não encontrado para o período informado')

    data = request.json or {}
    print(f"[DEBUG][update_casual_player_payment] payload recebido={data}")
    status = data.get('status')

    allowed_statuses = [PaymentStatus.PAID.value, PaymentStatus.PENDING.value]
    if status not in allowed_statuses:
        raise ValidationError(f"Status deve ser um dos: {allowed_statuses}")

    # Atualizar status e data de pagamento
    casual_player.status = status
    if status == PaymentStatus.PAID.value:
        casual_player.payment_date = datetime.utcnow()
    else:
        casual_player.payment_date = None

    # Recalcular total_received do período (mensal pagos + avulsos pagos)
    total_monthly_received = db.session.query(
        db.func.sum(
            db.func.coalesce(MonthlyPlayer.custom_monthly_fee, MonthlyPlayer.monthly_fee)
        )
    ).filter(
        and_(
            MonthlyPlayer.monthly_period_id == period.id,
            MonthlyPlayer.status == PaymentStatus.PAID.value
        )
    ).scalar() or 0

    total_casual_received = db.session.query(
        db.func.sum(CasualPlayer.amount)
    ).filter(
        and_(
            CasualPlayer.monthly_period_id == period.id,
            CasualPlayer.status == PaymentStatus.PAID.value
        )
    ).scalar() or 0

    period.total_received = (total_monthly_received or 0) + (total_casual_received or 0)

    db.session.commit()

    result = {
        'id': casual_player.id,
        'monthly_period_id': casual_player.monthly_period_id,
        'player_name': casual_player.player_name,
        'play_date': casual_player.play_date.isoformat(),
        'invited_by': casual_player.invited_by,
        'amount': float(casual_player.amount),
        'payment_date': casual_player.payment_date.isoformat() if casual_player.payment_date else None,
        'status': casual_player.status,
        'created_at': casual_player.created_at.isoformat(),
        'updated_at': casual_player.updated_at.isoformat()
    }

    print(f"[DEBUG][update_casual_player_payment] resposta gerada={result}")
    return APIResponse.success(
        data=result,
        message='Status de pagamento do avulso atualizado com sucesso'
    )


@api_bp.route('/monthly-periods/<period_id>/casual-players/<casual_player_id>', methods=['DELETE'])
@jwt_required()
@handle_api_error
def delete_casual_player(period_id, casual_player_id):
    """
    Remove um jogador casual (avulso) de um período mensal específico
    """
    try:
        print(f"[DEBUG][delete_casual_player] Iniciando remoção period_id={period_id}, casual_player_id={casual_player_id}")
        
        # Verificar se o período existe
        period = MonthlyPeriod.query.get(period_id)
        if not period:
            print("[DEBUG][delete_casual_player] período não encontrado")
            return APIResponse.error('Período não encontrado', 404)
        
        # Buscar jogador casual
        casual_player = CasualPlayer.query.filter_by(
            id=casual_player_id,
            monthly_period_id=period_id
        ).first()
        
        if not casual_player:
            print("[DEBUG][delete_casual_player] jogador casual não encontrado")
            return APIResponse.error('Jogador avulso não encontrado', 404)
        
        # Armazenar dados para resposta
        player_name = casual_player.player_name
        
        # Remover jogador casual
        db.session.delete(casual_player)
        db.session.commit()
        
        print(f"[DEBUG][delete_casual_player] jogador casual removido: {player_name}")
        
        return APIResponse.success(
            None, 
            f'Jogador avulso "{player_name}" removido com sucesso', 
            200
        )
        
    except Exception as e:
        db.session.rollback()
        print(f"[ERROR][delete_casual_player] erro ao remover jogador casual: {str(e)}")
        return APIResponse.error(f'Erro ao remover jogador avulso: {str(e)}', 500)


@api_bp.route('/monthly-periods/<period_id>/expenses', methods=['GET'])
@jwt_required()
def get_monthly_period_expenses(period_id):
    """
    Lista despesas de um período mensal específico
    """
    try:
        # Verificar se o período existe
        period = MonthlyPeriod.query.get(period_id)
        if not period:
            return jsonify({'error': 'Período não encontrado'}), 404
        
        # Buscar despesas do período
        expenses = Expense.query.filter_by(monthly_period_id=period_id).all()
        
        result = []
        for expense in expenses:
            result.append({
                'id': expense.id,
                'monthly_period_id': expense.monthly_period_id,
                'description': expense.description,
                'amount': float(expense.amount),
                'category': expense.category,
                'expense_date': expense.date.isoformat(),
                'created_at': expense.created_at.isoformat(),
                'updated_at': expense.updated_at.isoformat()
            })
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar despesas do período: {str(e)}'}), 500


@api_bp.route('/monthly-periods/<period_id>/expenses', methods=['POST'])
@jwt_required()
@handle_api_error
def create_expense(period_id):
    """
    Cria uma nova despesa para um período mensal específico
    """
    try:
        # Verificar se o período existe
        period = MonthlyPeriod.query.get(period_id)
        if not period:
            return APIResponse.error('Período não encontrado', 404)
        
        # Log dos dados recebidos para debug
        current_app.logger.info(f"Dados recebidos para criação de despesa: {request.json}")
        
        # Validar dados de entrada
        schema = ExpenseCreateSchema()
        try:
            data = schema.load(request.json)
        except MarshmallowValidationError as e:
            current_app.logger.error(f"Erro de validação: {e.messages}")
            return APIResponse.error('Dados inválidos', e.messages, 400)
        
        # Extrair mês e ano da data da despesa a partir da data validada pelo schema
        expense_date = data['expense_date']  # Agora é um objeto date, não datetime
        
        # Criar nova despesa
        expense = Expense(
            id=str(uuid.uuid4()),
            monthly_period_id=period_id,
            description=data['description'],
            amount=Decimal(str(data['amount'])),
            category=data['category'],
            date=expense_date,
            month=expense_date.month,
            year=expense_date.year
        )
        
        db.session.add(expense)
        db.session.commit()
        
        # Retornar despesa criada
        result = {
            'id': expense.id,
            'monthly_period_id': expense.monthly_period_id,
            'description': expense.description,
            'amount': float(expense.amount),
            'category': expense.category,
            'expense_date': expense.date.isoformat(),
            'created_at': expense.created_at.isoformat(),
            'updated_at': expense.updated_at.isoformat()
        }
        
        return APIResponse.success(result, 'Despesa criada com sucesso', 201)
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Erro ao criar despesa: {str(e)}")
        return APIResponse.error(f'Erro ao criar despesa: {str(e)}', 500)


@api_bp.route('/monthly-periods/<period_id>/expenses/<expense_id>', methods=['PUT'])
@jwt_required()
@handle_api_error
def update_expense(period_id, expense_id):
    """
    Atualiza uma despesa existente
    """
    try:
        # Verificar se o período existe
        period = MonthlyPeriod.query.get(period_id)
        if not period:
            return APIResponse.error('Período não encontrado', 404)
        
        # Verificar se a despesa existe
        expense = Expense.query.filter_by(id=expense_id, monthly_period_id=period_id).first()
        if not expense:
            return APIResponse.error('Despesa não encontrada', 404)
        
        # Validar dados de entrada (update permite campos parciais)
        schema = ExpenseUpdateSchema()
        try:
            data = schema.load(request.json)
        except MarshmallowValidationError as e:
            return APIResponse.error('Dados inválidos', e.messages, 400)
        
        # Extrair mês e ano da data da despesa, se fornecida
        expense_date = None
        if 'expense_date' in data and data['expense_date'] is not None:
            expense_date = data['expense_date'].date()
        
        # Atualizar campos da despesa (somente os presentes no payload)
        if 'description' in data:
            expense.description = data['description']
        if 'amount' in data:
            expense.amount = Decimal(str(data['amount']))
        if 'category' in data:
            expense.category = data['category']
        if expense_date is not None:
            expense.date = expense_date
            expense.month = expense_date.month
            expense.year = expense_date.year
        expense.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        # Retornar despesa atualizada
        result = {
            'id': expense.id,
            'monthly_period_id': expense.monthly_period_id,
            'description': expense.description,
            'amount': float(expense.amount),
            'category': expense.category,
            'expense_date': expense.date.isoformat(),
            'created_at': expense.created_at.isoformat(),
            'updated_at': expense.updated_at.isoformat()
        }
        
        return APIResponse.success(result, 'Despesa atualizada com sucesso')
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Erro ao atualizar despesa: {str(e)}")
        return APIResponse.error(f'Erro ao atualizar despesa: {str(e)}', 500)


@api_bp.route('/monthly-periods/<period_id>/expenses/<expense_id>', methods=['DELETE'])
@jwt_required()
@handle_api_error
def delete_expense(period_id, expense_id):
    """
    Remove uma despesa existente
    """
    try:
        # Verificar se o período existe
        period = MonthlyPeriod.query.get(period_id)
        if not period:
            return APIResponse.error('Período não encontrado', 404)
        
        # Verificar se a despesa existe
        expense = Expense.query.filter_by(id=expense_id, monthly_period_id=period_id).first()
        if not expense:
            return APIResponse.error('Despesa não encontrada', 404)
        
        # Remover despesa
        db.session.delete(expense)
        db.session.commit()
        
        return APIResponse.success(None, 'Despesa removida com sucesso')
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Erro ao remover despesa: {str(e)}")
        return APIResponse.error(f'Erro ao remover despesa: {str(e)}', 500)


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
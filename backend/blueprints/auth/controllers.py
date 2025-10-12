"""
Blueprint de Autenticação
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from backend.services.db.connection import db
from backend.services.db.models import User

# Criação do blueprint
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Endpoint de login
    """
    data = request.get_json() or {}

    # Aceitar login por usuário OU e-mail, mantendo compatibilidade com o frontend
    raw_username = (data.get('username') or '').strip()
    raw_email = (data.get('email') or '').strip().lower()
    password = (data.get('password') or '')

    # Validações básicas
    if (not raw_username and not raw_email) or not password:
        return jsonify({'error': 'Username ou e-mail e password são obrigatórios'}), 400

    # Determinar critério de busca: se veio e-mail explícito ou se o username aparenta ser um e-mail
    user = None
    if raw_email:
        user = User.query.filter_by(email=raw_email).first()
    else:
        if '@' in raw_username:
            # Username digitado como e-mail
            user = User.query.filter_by(email=raw_username.lower()).first()
        else:
            user = User.query.filter_by(username=raw_username).first()

    # Validar credenciais
    if not user or not user.check_password(password):
        return jsonify({'error': 'Credenciais inválidas'}), 401

    # Criar token de acesso com identidade = ID do usuário
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': 'user'
        }
    }), 200


@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Endpoint de registro de novo usuário
    Espera: { "username": str, "email": str, "password": str }
    Retorna: { "access_token": str, "user": { id, username, email, role } }
    """
    data = request.get_json() or {}

    username = (data.get('username') or '').strip()
    email = (data.get('email') or '').strip().lower()
    password = (data.get('password') or '')

    if not username or not email or not password:
        return jsonify({'error': 'username, email e password são obrigatórios'}), 400

    # Validações básicas
    if len(username) < 2:
        return jsonify({'error': 'Nome de usuário deve ter pelo menos 2 caracteres'}), 400
    if '@' not in email:
        return jsonify({'error': 'Email inválido'}), 400
    if len(password) < 6:
        return jsonify({'error': 'Senha deve ter pelo menos 6 caracteres'}), 400

    try:
        # Verificar duplicidade
        if User.query.filter_by(username=username).first():
            return jsonify({'error': 'Username já está em uso'}), 409
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email já está em uso'}), 409

        # Criar usuário
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        # Criar token (identidade: ID do usuário)
        access_token = create_access_token(identity=str(user.id))

        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': 'user'
            }
        }), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Conflito de dados (duplicidade)'}), 409
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao registrar usuário: {str(e)}'}), 500


@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    """
    Endpoint para obter perfil do usuário autenticado
    """
    current_user_id = get_jwt_identity()

    user = User.query.filter_by(id=str(current_user_id)).first()
    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    return jsonify({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': 'user'
        }
    }), 200


@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """
    Endpoint de logout
    """
    return jsonify({'message': 'Logout realizado com sucesso'}), 200
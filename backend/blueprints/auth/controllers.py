"""
Blueprint de Autenticação
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
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
    # Aceitar tanto 'username' quanto 'email' para compatibilidade com frontend
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if (not username and not email) or not password:
        return jsonify({'error': 'Credenciais obrigatórias: email/username e password'}), 400

    # Interpretar username contendo '@' como email para compatibilidade com frontend
    if not email and username and '@' in str(username):
        email = username

    # Buscar usuário por email (preferência) ou username
    if email:
        user = db.session.query(User).filter_by(email=email.lower()).first()
    else:
        user = db.session.query(User).filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Credenciais inválidas'}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token, 'user': user.to_dict()}), 200


@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    """
    Endpoint para obter perfil do usuário autenticado
    """
    user_id = get_jwt_identity()
    user = db.session.query(User).get(user_id)
    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404
    return jsonify({'user': user.to_dict()}), 200


@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """
    Endpoint de logout
    """
    return jsonify({'message': 'Logout realizado com sucesso'}), 200


@auth_bp.route('/register', methods=['POST'])
def register():
    """Cadastro básico de usuário"""
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'username, email e password são obrigatórios'}), 400

    # Verificar se já existe
    if db.session.query(User).filter((User.username == username) | (User.email == email)).first():
        return jsonify({'error': 'Usuário ou email já existe'}), 409

    # Criar usuário
    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token, 'user': user.to_dict()}), 201
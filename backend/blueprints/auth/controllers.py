"""
Blueprint de Autenticação
"""
import logging
from datetime import datetime
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from backend.services.db.connection import db
from backend.services.db.models import User

# Configurar logger específico para autenticação
auth_logger = logging.getLogger('auth')
auth_logger.setLevel(logging.INFO)

# Criação do blueprint
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Endpoint de login
    """
    # Capturar informações da requisição para logs
    client_ip = request.environ.get('HTTP_X_FORWARDED_FOR', request.environ.get('REMOTE_ADDR', 'unknown'))
    user_agent = request.headers.get('User-Agent', 'unknown')
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    data = request.get_json() or {}
    # Aceitar tanto 'username' quanto 'email' para compatibilidade com frontend
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Log da tentativa de login
    login_identifier = email or username or 'unknown'
    print(f"\n🔐 [LOGIN ATTEMPT] {timestamp}")
    print(f"   📧 Identifier: {login_identifier}")
    print(f"   🌐 IP: {client_ip}")
    print(f"   🖥️  User-Agent: {user_agent}")
    
    auth_logger.info(f"Login attempt - Identifier: {login_identifier}, IP: {client_ip}, User-Agent: {user_agent}")

    if (not username and not email) or not password:
        print(f"   ❌ FAILED: Missing credentials")
        auth_logger.warning(f"Login failed - Missing credentials for {login_identifier}")
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
        print(f"   ❌ FAILED: Invalid credentials")
        auth_logger.warning(f"Login failed - Invalid credentials for {login_identifier}")
        return jsonify({'error': 'Credenciais inválidas'}), 401

    # Login bem-sucedido
    access_token = create_access_token(identity=user.id)
    
    print(f"   ✅ SUCCESS: User logged in")
    print(f"   👤 User ID: {user.id}")
    print(f"   📝 Username: {user.username}")
    print(f"   📧 Email: {user.email}")
    print(f"   🎭 Role: {getattr(user, 'role', 'user')}")
    print(f"   🔑 Token generated: {access_token[:20]}...")
    
    auth_logger.info(f"Login successful - User: {user.username} (ID: {user.id}), Email: {user.email}")
    
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
    user_id = get_jwt_identity()
    user = db.session.query(User).get(user_id)
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    client_ip = request.environ.get('HTTP_X_FORWARDED_FOR', request.environ.get('REMOTE_ADDR', 'unknown'))
    
    if user:
        print(f"\n🚪 [LOGOUT] {timestamp}")
        print(f"   👤 User: {user.username} (ID: {user.id})")
        print(f"   📧 Email: {user.email}")
        print(f"   🌐 IP: {client_ip}")
        
        auth_logger.info(f"Logout - User: {user.username} (ID: {user.id}), Email: {user.email}")
    
    return jsonify({'message': 'Logout realizado com sucesso'}), 200


@auth_bp.route('/register', methods=['POST'])
def register():
    """Cadastro básico de usuário"""
    # Capturar informações da requisição para logs
    client_ip = request.environ.get('HTTP_X_FORWARDED_FOR', request.environ.get('REMOTE_ADDR', 'unknown'))
    user_agent = request.headers.get('User-Agent', 'unknown')
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Log da tentativa de registro
    print(f"\n📝 [REGISTER ATTEMPT] {timestamp}")
    print(f"   👤 Username: {username}")
    print(f"   📧 Email: {email}")
    print(f"   🌐 IP: {client_ip}")
    print(f"   🖥️  User-Agent: {user_agent}")
    
    auth_logger.info(f"Register attempt - Username: {username}, Email: {email}, IP: {client_ip}")

    if not username or not email or not password:
        print(f"   ❌ FAILED: Missing required fields")
        auth_logger.warning(f"Register failed - Missing fields for {username or email}")
        return jsonify({'error': 'username, email e password são obrigatórios'}), 400

    # Verificar se já existe
    existing_user = db.session.query(User).filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        print(f"   ❌ FAILED: User or email already exists")
        auth_logger.warning(f"Register failed - User/email already exists: {username}/{email}")
        return jsonify({'error': 'Usuário ou email já existe'}), 409

    # Criar usuário
    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)
    
    print(f"   ✅ SUCCESS: User registered")
    print(f"   👤 User ID: {user.id}")
    print(f"   📝 Username: {user.username}")
    print(f"   📧 Email: {user.email}")
    print(f"   🔑 Token generated: {access_token[:20]}...")
    
    auth_logger.info(f"Register successful - User: {user.username} (ID: {user.id}), Email: {user.email}")
    
    return jsonify({'access_token': access_token, 'user': user.to_dict()}), 201
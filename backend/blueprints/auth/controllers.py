"""
Blueprint de Autenticação
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# Criação do blueprint
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Endpoint de login
    """
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Username e password são obrigatórios'}), 400
    
    # TODO: Implementar validação real do usuário
    # Por enquanto, aceita qualquer usuário para teste
    username = data.get('username')
    
    # Criar token de acesso
    access_token = create_access_token(identity=username)
    
    return jsonify({
        'access_token': access_token,
        'user': {'username': username}
    }), 200


@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    """
    Endpoint para obter perfil do usuário autenticado
    """
    current_user = get_jwt_identity()
    
    return jsonify({
        'user': {'username': current_user}
    }), 200


@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """
    Endpoint de logout
    """
    return jsonify({'message': 'Logout realizado com sucesso'}), 200
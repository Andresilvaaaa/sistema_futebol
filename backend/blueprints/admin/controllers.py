"""
Blueprint de Administração
"""
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

# Criação do blueprint
admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')


@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    """
    Endpoint do dashboard administrativo
    """
    current_user = get_jwt_identity()
    
    return jsonify({
        'message': 'Dashboard administrativo',
        'user': current_user,
        'stats': {
            'total_players': 0,
            'total_teams': 0,
            'total_matches': 0
        }
    }), 200


@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def list_users():
    """
    Listar usuários do sistema
    """
    return jsonify({
        'users': [],
        'total': 0
    }), 200


@admin_bp.route('/system/health', methods=['GET'])
def system_health():
    """
    Verificar saúde do sistema
    """
    return jsonify({
        'status': 'healthy',
        'database': 'connected',
        'timestamp': '2024-01-01T00:00:00Z'
    }), 200
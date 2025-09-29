# Instruções para Desenvolvimento da API Backend

Este documento fornece orientações detalhadas para criar uma API backend que se integre perfeitamente com o frontend do Sistema de Gestão Esportiva.

## 🎯 Recomendação: Flask

**Recomendamos Flask** para este projeto pelos seguintes motivos:

### ✅ Vantagens do Flask
- **Simplicidade**: Ideal para APIs REST diretas
- **Flexibilidade**: Permite estrutura personalizada
- **Leveza**: Menos overhead, mais performance
- **Rapidez de desenvolvimento**: Setup mínimo
- **Compatibilidade**: Excelente para frontends React/Next.js
- **Comunidade**: Vasta documentação e extensões

### 📊 Flask vs Django

| Aspecto | Flask | Django |
|---------|-------|--------|
| Complexidade | Simples | Complexo |
| Setup inicial | Rápido | Demorado |
| Flexibilidade | Alta | Média |
| Admin panel | Manual | Automático |
| ORM | SQLAlchemy | Django ORM |
| Ideal para | APIs REST | Apps completos |

## 🏗️ Estrutura Recomendada da API

\`\`\`
backend/
├── app/
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── player.py
│   │   ├── monthly.py
│   │   ├── expense.py
│   │   └── user.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── players.py
│   │   ├── monthly.py
│   │   ├── expenses.py
│   │   ├── cashflow.py
│   │   └── auth.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── player_service.py
│   │   ├── monthly_service.py
│   │   └── expense_service.py
│   └── utils/
│       ├── __init__.py
│       ├── database.py
│       ├── auth.py
│       └── validators.py
├── migrations/
├── tests/
├── requirements.txt
├── config.py
└── run.py
\`\`\`

## 🛠️ Setup Inicial do Flask

### 1. Instalação e Dependências

\`\`\`bash
# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

# Instalar dependências
pip install flask flask-sqlalchemy flask-migrate flask-cors flask-jwt-extended python-dotenv
\`\`\`

### 2. requirements.txt
\`\`\`txt
Flask==3.0.0
Flask-SQLAlchemy==3.1.1
Flask-Migrate==4.0.5
Flask-CORS==4.0.0
Flask-JWT-Extended==4.6.0
python-dotenv==1.0.0
psycopg2-binary==2.9.9  # Para PostgreSQL
# ou
PyMySQL==1.1.0          # Para MySQL
\`\`\`

### 3. Configuração Básica (config.py)
\`\`\`python
import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///sports_management.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    CORS_ORIGINS = ["http://localhost:3000", "https://your-frontend-domain.com"]

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
\`\`\`

## 📊 Modelos de Dados

### 1. Player Model (app/models/player.py)
\`\`\`python
from app import db
from datetime import datetime

class Player(db.Model):
    __tablename__ = 'players'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    position = db.Column(db.String(50), nullable=True)
    monthly_fee = db.Column(db.Float, default=0.0)
    join_date = db.Column(db.Date, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    monthly_payments = db.relationship('MonthlyPayment', backref='player', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'position': self.position,
            'monthlyFee': self.monthly_fee,
            'joinDate': self.join_date.isoformat(),
            'isActive': self.is_active,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        }
\`\`\`

### 2. Monthly Payment Model
\`\`\`python
class MonthlyPayment(db.Model):
    __tablename__ = 'monthly_payments'
    
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), nullable=False)
    month = db.Column(db.String(7), nullable=False)  # YYYY-MM
    amount = db.Column(db.Float, nullable=False)
    paid_date = db.Column(db.Date, nullable=True)
    is_paid = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'playerId': self.player_id,
            'month': self.month,
            'amount': self.amount,
            'paidDate': self.paid_date.isoformat() if self.paid_date else None,
            'isPaid': self.is_paid,
            'createdAt': self.created_at.isoformat()
        }
\`\`\`

## 🛣️ Rotas da API

### 1. Players Routes (app/routes/players.py)
\`\`\`python
from flask import Blueprint, request, jsonify
from app.models.player import Player
from app.services.player_service import PlayerService
from flask_jwt_required import jwt_required

players_bp = Blueprint('players', __name__, url_prefix='/api/players')

@players_bp.route('', methods=['GET'])
@jwt_required()
def get_players():
    """Listar todos os jogadores"""
    active_only = request.args.get('active', 'true').lower() == 'true'
    players = PlayerService.get_all_players(active_only)
    return jsonify([player.to_dict() for player in players])

@players_bp.route('', methods=['POST'])
@jwt_required()
def create_player():
    """Criar novo jogador"""
    data = request.get_json()
    
    # Validação
    required_fields = ['name', 'email', 'joinDate']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} é obrigatório'}), 400
    
    try:
        player = PlayerService.create_player(data)
        return jsonify(player.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@players_bp.route('/<int:player_id>', methods=['PUT'])
@jwt_required()
def update_player(player_id):
    """Atualizar jogador"""
    data = request.get_json()
    
    try:
        player = PlayerService.update_player(player_id, data)
        if not player:
            return jsonify({'error': 'Jogador não encontrado'}), 404
        return jsonify(player.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@players_bp.route('/<int:player_id>/toggle-status', methods=['PATCH'])
@jwt_required()
def toggle_player_status(player_id):
    """Ativar/Inativar jogador"""
    try:
        player = PlayerService.toggle_status(player_id)
        if not player:
            return jsonify({'error': 'Jogador não encontrado'}), 404
        return jsonify(player.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 400
\`\`\`

### 2. Monthly Routes
\`\`\`python
@monthly_bp.route('/payments/<string:month>', methods=['GET'])
@jwt_required()
def get_monthly_payments(month):
    """Obter pagamentos do mês"""
    payments = MonthlyService.get_payments_by_month(month)
    return jsonify([payment.to_dict() for payment in payments])

@monthly_bp.route('/payments', methods=['POST'])
@jwt_required()
def create_payment():
    """Registrar pagamento"""
    data = request.get_json()
    payment = MonthlyService.create_payment(data)
    return jsonify(payment.to_dict()), 201

@monthly_bp.route('/fees/bulk-update', methods=['PUT'])
@jwt_required()
def bulk_update_fees():
    """Reajustar mensalidades em massa"""
    data = request.get_json()
    new_fee = data.get('newFee')
    
    if not new_fee:
        return jsonify({'error': 'newFee é obrigatório'}), 400
    
    updated_count = MonthlyService.bulk_update_fees(new_fee)
    return jsonify({'message': f'{updated_count} jogadores atualizados'})
\`\`\`

## 🔐 Autenticação JWT

### 1. Auth Routes (app/routes/auth.py)
\`\`\`python
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login do usuário"""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = AuthService.authenticate_user(email, password)
    if user:
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': user.to_dict()
        })
    
    return jsonify({'error': 'Credenciais inválidas'}), 401

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Obter perfil do usuário"""
    user_id = get_jwt_identity()
    user = AuthService.get_user_by_id(user_id)
    return jsonify(user.to_dict())
\`\`\`

## 🔄 Integração com Frontend

### 1. Configuração de CORS
\`\`\`python
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    # Configurar CORS
    CORS(app, origins=["http://localhost:3000"])
    
    return app
\`\`\`

### 2. Cliente HTTP no Frontend (lib/api.ts)
\`\`\`typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor() {
    this.baseURL = API_BASE_URL
    this.token = localStorage.getItem('access_token')
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  // Players
  async getPlayers(activeOnly = true) {
    return this.request(`/players?active=${activeOnly}`)
  }

  async createPlayer(playerData: any) {
    return this.request('/players', {
      method: 'POST',
      body: JSON.stringify(playerData),
    })
  }

  async updatePlayer(id: number, playerData: any) {
    return this.request(`/players/${id}`, {
      method: 'PUT',
      body: JSON.stringify(playerData),
    })
  }

  // Auth
  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    
    this.token = response.access_token
    localStorage.setItem('access_token', this.token!)
    
    return response
  }
}

export const apiClient = new ApiClient()
\`\`\`

## 🚀 Deploy e Produção

### 1. Variáveis de Ambiente (.env)
\`\`\`env
FLASK_APP=run.py
FLASK_ENV=production
SECRET_KEY=your-super-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=postgresql://user:password@localhost/sports_db
CORS_ORIGINS=https://your-frontend-domain.com
\`\`\`

### 2. Docker (Dockerfile)
\`\`\`dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]
\`\`\`

### 3. Deploy na Vercel/Railway/Heroku
\`\`\`bash
# Heroku
heroku create your-api-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main

# Railway
railway login
railway new
railway add postgresql
railway deploy
\`\`\`

## 📝 Próximos Passos

1. **Implementar autenticação completa**
2. **Adicionar validações robustas**
3. **Criar testes automatizados**
4. **Implementar cache (Redis)**
5. **Adicionar logs estruturados**
6. **Configurar monitoramento**
7. **Documentar API com Swagger**

## 🔧 Comandos Úteis

\`\`\`bash
# Inicializar banco de dados
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Executar em desenvolvimento
flask run --debug

# Executar testes
python -m pytest

# Gerar requirements
pip freeze > requirements.txt
\`\`\`

---

**Esta estrutura fornece uma base sólida para uma API Flask que se integra perfeitamente com o frontend Next.js existente.**

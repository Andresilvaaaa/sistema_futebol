"""
Testes para os endpoints da API
Testa todas as rotas e funcionalidades da API REST
"""

import pytest
from decimal import Decimal
from datetime import date
import json


class TestPlayersAPI:
    """Testes para endpoints de jogadores"""
    
    def test_get_players_empty(self, client, db_session, auth_headers, helpers):
        """Testa listagem de jogadores quando não há dados"""
        response = client.get('/api/players', headers=auth_headers)
        data = helpers.assert_api_success(response)
        
        assert data['data'] == []
        helpers.assert_pagination(data)
        assert data['pagination']['total'] == 0
    
    def test_get_players_with_data(self, client, db_session, sample_players, api_headers, helpers):
        """Testa listagem de jogadores com dados"""
        response = client.get('/api/players', headers=api_headers)
        data = helpers.assert_api_success(response)
        
        assert len(data['data']) == 3
        helpers.assert_pagination(data)
        assert data['pagination']['total'] == 3
        
        # Verificar estrutura dos dados
        player_data = data['data'][0]
        assert 'id' in player_data
        assert 'name' in player_data
        assert 'email' in player_data
        assert 'phone' in player_data
        assert 'position' in player_data
        assert 'monthly_fee' in player_data
        assert 'status' in player_data
    
    def test_get_players_pagination(self, client, db_session, sample_players, api_headers, helpers):
        """Testa paginação da listagem de jogadores"""
        response = client.get('/api/players?page=1&per_page=2', headers=api_headers)
        data = helpers.assert_api_success(response)
        
        assert len(data['data']) == 2
        assert data['pagination']['page'] == 1
        assert data['pagination']['per_page'] == 2
        assert data['pagination']['total'] == 3
        assert data['pagination']['pages'] == 2
    
    def test_create_player_success(self, client, db_session, api_headers, helpers, app):
        """Testa criação de jogador com sucesso"""
        Player = app.test_models['Player']
        
        player_data = {
            'name': 'Novo Jogador',
            'email': 'novo@example.com',
            'phone': '11555555555',
            'position': 'Goleiro',
            'monthly_fee': 120.00
        }
        
        response = client.post('/api/players', 
                             json=player_data, 
                             headers=api_headers)
        data = helpers.assert_api_success(response, 201)
        
        assert data['data']['name'] == player_data['name']
        assert data['data']['email'] == player_data['email']
        assert data['data']['phone'] == player_data['phone']
        assert data['data']['status'] == 'active'
        
        # Verificar se foi salvo no banco
        player = db_session.query(Player).filter_by(phone=player_data['phone']).first()
        assert player is not None
        assert player.name == player_data['name']
    
    def test_create_player_missing_fields(self, client, db_session, api_headers, helpers):
        """Testa criação de jogador com campos obrigatórios faltando"""
        player_data = {
            'name': 'Jogador Incompleto'
            # Faltam campos obrigatórios
        }
        
        response = client.post('/api/players', 
                             json=player_data, 
                             headers=api_headers)
        data = helpers.assert_api_error(response, 400)
        
        assert 'errors' in data
        assert len(data['errors']) > 0
    
    def test_create_player_duplicate_phone(self, client, db_session, sample_players, api_headers, helpers):
        """Testa criação de jogador com telefone duplicado"""
        player_data = {
            'name': 'Jogador Duplicado',
            'email': 'duplicado@example.com',
            'phone': '11999999999',  # Telefone já existe
            'position': 'Atacante',
            'monthly_fee': 100.00
        }
        
        response = client.post('/api/players', 
                             json=player_data, 
                             headers=api_headers)
        data = helpers.assert_api_error(response, 400)
        
        assert 'errors' in data
        assert any('telefone' in error.lower() or 'phone' in error.lower() 
                  for error in data['errors'])
    
    def test_get_player_success(self, client, db_session, sample_players, api_headers, helpers):
        """Testa busca de jogador por ID"""
        player = sample_players[0]
        
        response = client.get(f'/api/players/{player.id}', headers=api_headers)
        data = helpers.assert_api_success(response)
        
        assert data['data']['id'] == player.id
        assert data['data']['name'] == player.name
        assert data['data']['email'] == player.email
    
    def test_get_player_not_found(self, client, db_session, api_headers, helpers):
        """Testa busca de jogador inexistente"""
        response = client.get('/api/players/999', headers=api_headers)
        helpers.assert_api_error(response, 404)
    
    def test_update_player_success(self, client, db_session, sample_players, api_headers, helpers, app):
        """Testa atualização de jogador"""
        Player = app.test_models['Player']
        player = sample_players[0]
        update_data = {
            'name': 'Nome Atualizado',
            'position': 'Meio-campo'
        }
        
        response = client.put(f'/api/players/{player.id}', 
                            json=update_data, 
                            headers=api_headers)
        data = helpers.assert_api_success(response)
        
        assert data['data']['name'] == update_data['name']
        assert data['data']['position'] == update_data['position']
        
        # Verificar no banco
        updated_player = db_session.query(Player).get(player.id)
        assert updated_player.name == update_data['name']
        assert updated_player.position == update_data['position']
    
    def test_activate_player(self, client, db_session, sample_players, api_headers, helpers, app):
        """Testa ativação de jogador"""
        Player = app.test_models['Player']
        player = sample_players[2]  # Jogador inativo
        
        response = client.patch(f'/api/players/{player.id}/activate', 
                              headers=api_headers)
        data = helpers.assert_api_success(response)
        
        assert data['data']['status'] == 'active'
        
        # Verificar no banco
        updated_player = db_session.query(Player).get(player.id)
        assert updated_player.status == 'active'
    
    def test_deactivate_player(self, client, db_session, sample_players, api_headers, helpers, app):
        """Testa desativação de jogador"""
        Player = app.test_models['Player']
        player = sample_players[0]  # Jogador ativo
        
        response = client.patch(f'/api/players/{player.id}/deactivate', 
                              headers=api_headers)
        data = helpers.assert_api_success(response)
        
        assert data['data']['status'] == 'inactive'
        
        # Verificar no banco
        updated_player = db_session.query(Player).get(player.id)
        assert updated_player.status == 'inactive'
    
    def test_delete_player_success(self, client, db_session, sample_players, api_headers, helpers, app):
        """Testa exclusão de jogador sem pagamentos"""
        Player = app.test_models['Player']
        player = sample_players[2]  # Jogador sem pagamentos
        
        response = client.delete(f'/api/players/{player.id}', 
                               headers=api_headers)
        helpers.assert_api_success(response, 204)
        
        # Verificar se foi removido do banco
        deleted_player = db_session.query(Player).get(player.id)
        assert deleted_player is None


class TestMonthlyPaymentsAPI:
    """Testes para endpoints de pagamentos mensais"""
    
    def test_get_monthly_payments_empty(self, client, db_session, api_headers, helpers):
        """Testa listagem de pagamentos quando não há dados"""
        response = client.get('/api/monthly-payments', headers=api_headers)
        data = helpers.assert_api_success(response)
        
        assert data['data'] == []
        helpers.assert_pagination(data)
    
    def test_get_monthly_payments_with_data(self, client, db_session, sample_monthly_players, api_headers, helpers):
        """Testa listagem de pagamentos com dados"""
        response = client.get('/api/monthly-payments', headers=api_headers)
        data = helpers.assert_api_success(response)
        
        assert len(data['data']) > 0
        helpers.assert_pagination(data)
        
        # Verificar estrutura dos dados
        payment_data = data['data'][0]
        assert 'period' in payment_data
        assert 'monthly_players' in payment_data
        assert 'casual_players' in payment_data
    
    def test_create_monthly_period_success(self, client, db_session, api_headers, helpers, app):
        """Testa criação de período mensal"""
        MonthlyPeriod = app.test_models['MonthlyPeriod']
        
        period_data = {
            'year': 2024,
            'month': 4,
            'monthly_fee': 110.00
        }
        
        response = client.post('/api/monthly-payments/periods', 
                             json=period_data, 
                             headers=api_headers)
        data = helpers.assert_api_success(response, 201)
        
        assert data['data']['year'] == period_data['year']
        assert data['data']['month'] == period_data['month']
        assert float(data['data']['monthly_fee']) == period_data['monthly_fee']
        
        # Verificar no banco
        period = db_session.query(MonthlyPeriod).filter_by(
            year=period_data['year'], 
            month=period_data['month']
        ).first()
        assert period is not None
    
    def test_create_monthly_period_duplicate(self, client, db_session, sample_monthly_period, api_headers, helpers):
        """Testa criação de período duplicado"""
        period_data = {
            'year': sample_monthly_period.year,
            'month': sample_monthly_period.month,
            'monthly_fee': 100.00
        }
        
        response = client.post('/api/monthly-payments/periods', 
                             json=period_data, 
                             headers=api_headers)
        helpers.assert_api_error(response, 400)
    

    
    def test_update_custom_monthly_fee(self, client, db_session, sample_monthly_players, api_headers, helpers, app):
        """Testa atualização de taxa mensal customizada"""
        MonthlyPlayer = app.test_models['MonthlyPlayer']
        monthly_player = sample_monthly_players[0]
        
        response = client.patch(f'/api/monthly-payments/monthly-players/{monthly_player.id}/custom-fee', 
                              json={'custom_monthly_fee': 150.00}, 
                              headers=api_headers)
        data = helpers.assert_api_success(response)
        
        assert float(data['data']['custom_monthly_fee']) == 150.00
        assert float(data['data']['effective_monthly_fee']) == 150.00
        
        # Verificar no banco
        updated_player = db_session.query(MonthlyPlayer).get(monthly_player.id)
        assert updated_player.custom_monthly_fee == Decimal('150.00')
    
    def test_add_casual_player(self, client, db_session, sample_monthly_period, api_headers, helpers, app):
        """Testa adição de jogador avulso"""
        CasualPlayer = app.test_models['CasualPlayer']
        
        casual_data = {
            'player_name': 'Jogador Avulso Teste',
            'amount': 40.00,
            'play_date': '2024-03-20'
        }
        
        response = client.post(f'/api/monthly-payments/periods/{sample_monthly_period.id}/casual-players', 
                             json=casual_data, 
                             headers=api_headers)
        data = helpers.assert_api_success(response, 201)
        
        assert data['data']['player_name'] == casual_data['player_name']
        assert float(data['data']['amount']) == casual_data['amount']
        
        # Verificar no banco
        casual_player = db_session.query(CasualPlayer).filter_by(
            player_name=casual_data['player_name']
        ).first()
        assert casual_player is not None


class TestAPIErrorHandling:
    """Testes para tratamento de erros da API"""
    
    def test_invalid_json(self, client, api_headers, helpers):
        """Testa requisição com JSON inválido"""
        headers = api_headers.copy()
        response = client.post('/api/players', 
                             data='invalid json', 
                             headers=headers)
        helpers.assert_api_error(response, 400)
    
    def test_missing_content_type(self, client, helpers):
        """Testa requisição sem Content-Type"""
        response = client.post('/api/players', 
                             json={'name': 'Test'})
        # Deve funcionar pois Flask aceita JSON automaticamente
        # Mas vamos testar se a resposta tem o formato correto
        assert response.status_code in [200, 201, 400, 422]
    
    def test_method_not_allowed(self, client, helpers):
        """Testa método HTTP não permitido"""
        response = client.patch('/api/players')  # PATCH não permitido na rota base
        assert response.status_code == 405
    
    def test_route_not_found(self, client, helpers):
        """Testa rota inexistente"""
        response = client.get('/api/nonexistent')
        assert response.status_code == 404


class TestAPIValidation:
    """Testes para validação de dados da API"""
    
    def test_player_email_validation(self, client, db_session, api_headers, helpers):
        """Testa validação de email do jogador"""
        player_data = {
            'name': 'Jogador Teste',
            'email': 'email-invalido',  # Email inválido
            'phone': '11555555555',
            'position': 'Atacante',
            'monthly_fee': 100.00
        }
        
        response = client.post('/api/players', 
                             json=player_data, 
                             headers=api_headers)
        helpers.assert_api_error(response, 400)
    
    def test_player_phone_validation(self, client, db_session, api_headers, helpers):
        """Testa validação de telefone do jogador"""
        player_data = {
            'name': 'Jogador Teste',
            'email': 'teste@example.com',
            'phone': '123',  # Telefone muito curto
            'position': 'Atacante',
            'monthly_fee': 100.00
        }
        
        response = client.post('/api/players', 
                             json=player_data, 
                             headers=api_headers)
        helpers.assert_api_error(response, 400)
    
    def test_monthly_fee_validation(self, client, db_session, api_headers, helpers):
        """Testa validação de taxa mensal"""
        player_data = {
            'name': 'Jogador Teste',
            'email': 'teste@example.com',
            'phone': '11555555555',
            'position': 'Atacante',
            'monthly_fee': -10.00  # Taxa negativa
        }
        
        response = client.post('/api/players', 
                             json=player_data, 
                             headers=api_headers)
        helpers.assert_api_error(response, 400)
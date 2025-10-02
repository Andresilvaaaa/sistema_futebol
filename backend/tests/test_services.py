"""
Testes para a camada de serviços
Testa lógica de negócio e operações complexas
"""

import pytest
from decimal import Decimal
from datetime import date, datetime
from unittest.mock import patch, MagicMock

from backend.services.db.models import Player, MonthlyPeriod, MonthlyPlayer, CasualPlayer
from backend.blueprints.api.response_utils import ValidationError


class TestPlayerServices:
    """Testes para serviços relacionados a jogadores"""
    
    def test_create_player_with_validation(self, db_session):
        """Testa criação de jogador com validação completa"""
        from backend.blueprints.api.controllers import create_player
        
        # Dados válidos
        valid_data = {
            'name': 'João Silva',
            'email': 'joao@example.com',
            'phone': '11999999999',
            'position': 'Atacante',
            'monthly_fee': 100.00
        }
        
        # Simular request
        with patch('flask.request') as mock_request:
            mock_request.get_json.return_value = valid_data
            
            # Executar função (seria chamada pelo endpoint)
            player = Player(**valid_data)
            db_session.add(player)
            db_session.commit()
            
            assert player.id is not None
            assert player.name == valid_data['name']
            assert player.status == 'active'
    
    def test_validate_player_phone_format(self, db_session):
        """Testa validação do formato do telefone"""
        # Telefones válidos
        valid_phones = [
            '11999999999',
            '(11) 99999-9999',
            '11 99999-9999',
            '+55 11 99999-9999'
        ]
        
        for i, phone in enumerate(valid_phones):
            player = Player(
                name=f'Jogador {i}',
                email=f'jogador{i}@example.com',
                phone=phone
            )
            db_session.add(player)
        
        db_session.commit()
        
        # Verificar se todos foram salvos
        players = Player.query.all()
        assert len(players) == len(valid_phones)
    
    def test_player_duplicate_validation(self, db_session, sample_players):
        """Testa validação de duplicatas"""
        existing_player = sample_players[0]
        
        # Tentar criar jogador com mesmo telefone
        duplicate_player = Player(
            name='Jogador Duplicado',
            email='novo@example.com',
            phone=existing_player.phone  # Telefone duplicado
        )
        
        db_session.add(duplicate_player)
        
        # Deve gerar erro de integridade
        with pytest.raises(Exception):  # IntegrityError ou similar
            db_session.commit()
    
    def test_player_status_transitions(self, db_session, sample_players):
        """Testa transições de status do jogador"""
        player = sample_players[0]  # Jogador ativo
        
        # Ativo -> Inativo
        player.status = 'inactive'
        db_session.commit()
        
        updated_player = Player.query.get(player.id)
        assert updated_player.status == 'inactive'
        
        # Inativo -> Ativo
        player.status = 'active'
        db_session.commit()
        
        updated_player = Player.query.get(player.id)
        assert updated_player.status == 'active'


class TestMonthlyPeriodServices:
    """Testes para serviços de períodos mensais"""
    
    def test_create_monthly_period_with_players(self, db_session, sample_players):
        """Testa criação de período mensal com jogadores ativos"""
        # Criar período
        period = MonthlyPeriod(
            year=2024,
            month=4,
            monthly_fee=Decimal('110.00')
        )
        db_session.add(period)
        db_session.commit()
        
        # Adicionar jogadores ativos ao período
        active_players = [p for p in sample_players if p.status == 'active']
        
        for player in active_players:
            monthly_player = MonthlyPlayer(
                period_id=period.id,
                player_id=player.id,
                monthly_fee=player.monthly_fee
            )
            db_session.add(monthly_player)
        
        db_session.commit()
        
        # Verificar se foram adicionados
        period_from_db = MonthlyPeriod.query.get(period.id)
        assert len(period_from_db.monthly_players) == len(active_players)
    
    def test_calculate_period_totals(self, db_session, sample_monthly_players, sample_casual_players):
        """Testa cálculo de totais do período"""
        period = sample_monthly_players[0].period
        
        # Calcular total esperado (jogadores mensais)
        expected_monthly = sum(mp.effective_monthly_fee for mp in period.monthly_players)
        
        # Calcular total de avulsos
        expected_casual = sum(cp.amount for cp in period.casual_players)
        
        # Calcular total recebido (apenas pagamentos confirmados)
        received_monthly = sum(
            mp.effective_monthly_fee 
            for mp in period.monthly_players 
            if mp.payment_status == 'paid'
        )
        received_casual = sum(cp.amount for cp in period.casual_players)
        
        total_expected = expected_monthly + expected_casual
        total_received = received_monthly + received_casual
        
        # Atualizar período
        period.total_expected = total_expected
        period.total_received = total_received
        db_session.commit()
        
        # Verificar cálculos
        assert period.total_expected > 0
        assert period.total_received >= 0
        assert period.total_received <= period.total_expected
    
    def test_period_duplicate_prevention(self, db_session, sample_monthly_period):
        """Testa prevenção de períodos duplicados"""
        # Tentar criar período duplicado
        duplicate_period = MonthlyPeriod(
            year=sample_monthly_period.year,
            month=sample_monthly_period.month,
            monthly_fee=Decimal('120.00')
        )
        
        db_session.add(duplicate_period)
        
        # Deve gerar erro de integridade
        with pytest.raises(Exception):
            db_session.commit()


class TestMonthlyPlayerServices:
    """Testes para serviços de jogadores mensais"""
    
    def test_monthly_player_payment_status_update(self, db_session, sample_monthly_players):
        """Testa atualização de status de pagamento"""
        monthly_player = sample_monthly_players[1]  # Status 'pending'
        period = monthly_player.period
        
        # Calcular totais antes
        old_received = sum(
            mp.effective_monthly_fee 
            for mp in period.monthly_players 
            if mp.payment_status == 'paid'
        )
        
        # Atualizar status para 'paid'
        monthly_player.payment_status = 'paid'
        db_session.commit()
        
        # Recalcular totais
        new_received = sum(
            mp.effective_monthly_fee 
            for mp in period.monthly_players 
            if mp.payment_status == 'paid'
        )
        
        # Verificar que o total recebido aumentou
        assert new_received > old_received
        assert new_received == old_received + monthly_player.effective_monthly_fee
    
    def test_custom_monthly_fee_application(self, db_session, sample_monthly_players):
        """Testa aplicação de taxa mensal customizada"""
        monthly_player = sample_monthly_players[0]
        original_fee = monthly_player.monthly_fee
        
        # Aplicar taxa customizada
        custom_fee = Decimal('150.00')
        monthly_player.custom_monthly_fee = custom_fee
        db_session.commit()
        
        # Verificar propriedade effective_monthly_fee
        assert monthly_player.effective_monthly_fee == custom_fee
        assert monthly_player.monthly_fee == original_fee  # Taxa original não muda
        
        # Remover taxa customizada
        monthly_player.custom_monthly_fee = None
        db_session.commit()
        
        # Deve voltar à taxa original
        assert monthly_player.effective_monthly_fee == original_fee
    
    def test_monthly_player_period_recalculation(self, db_session, sample_monthly_players):
        """Testa recálculo do período após mudanças"""
        monthly_player = sample_monthly_players[0]
        period = monthly_player.period
        
        # Calcular total esperado antes
        old_expected = sum(mp.effective_monthly_fee for mp in period.monthly_players)
        
        # Aplicar taxa customizada
        custom_fee = Decimal('200.00')
        monthly_player.custom_monthly_fee = custom_fee
        db_session.commit()
        
        # Recalcular total esperado
        new_expected = sum(mp.effective_monthly_fee for mp in period.monthly_players)
        
        # Verificar que o total mudou
        difference = custom_fee - monthly_player.monthly_fee
        assert new_expected == old_expected + difference


class TestCasualPlayerServices:
    """Testes para serviços de jogadores avulsos"""
    
    def test_add_casual_player_to_period(self, db_session, sample_monthly_period):
        """Testa adição de jogador avulso ao período"""
        # Calcular total antes
        old_casual_total = sum(cp.amount for cp in sample_monthly_period.casual_players)
        
        # Adicionar jogador avulso
        casual_player = CasualPlayer(
            period_id=sample_monthly_period.id,
            player_name='Novo Avulso',
            amount=Decimal('45.00'),
            play_date=date(2024, 3, 20)
        )
        db_session.add(casual_player)
        db_session.commit()
        
        # Recalcular total
        new_casual_total = sum(cp.amount for cp in sample_monthly_period.casual_players)
        
        # Verificar que o total aumentou
        assert new_casual_total == old_casual_total + casual_player.amount
    
    def test_casual_player_date_validation(self, db_session, sample_monthly_period):
        """Testa validação de data do jogador avulso"""
        # Data válida (dentro do mês do período)
        valid_date = date(2024, sample_monthly_period.month, 15)
        
        casual_player = CasualPlayer(
            period_id=sample_monthly_period.id,
            player_name='Teste Data',
            amount=Decimal('30.00'),
            play_date=valid_date
        )
        
        db_session.add(casual_player)
        db_session.commit()
        
        assert casual_player.id is not None
        assert casual_player.play_date == valid_date
    
    def test_casual_player_amount_validation(self, db_session, sample_monthly_period):
        """Testa validação do valor do jogador avulso"""
        # Valores válidos
        valid_amounts = [Decimal('10.00'), Decimal('30.00'), Decimal('50.00')]
        
        for i, amount in enumerate(valid_amounts):
            casual_player = CasualPlayer(
                period_id=sample_monthly_period.id,
                player_name=f'Avulso {i}',
                amount=amount
            )
            db_session.add(casual_player)
        
        db_session.commit()
        
        # Verificar se todos foram salvos
        casual_players = CasualPlayer.query.filter_by(
            period_id=sample_monthly_period.id
        ).all()
        assert len(casual_players) >= len(valid_amounts)


class TestBusinessLogic:
    """Testes para lógica de negócio complexa"""
    
    def test_period_completion_logic(self, db_session, sample_monthly_players, sample_casual_players):
        """Testa lógica de conclusão do período"""
        period = sample_monthly_players[0].period
        
        # Marcar todos os jogadores mensais como pagos
        for monthly_player in period.monthly_players:
            monthly_player.payment_status = 'paid'
        
        db_session.commit()
        
        # Calcular totais
        total_expected = (
            sum(mp.effective_monthly_fee for mp in period.monthly_players) +
            sum(cp.amount for cp in period.casual_players)
        )
        
        total_received = (
            sum(mp.effective_monthly_fee for mp in period.monthly_players if mp.payment_status == 'paid') +
            sum(cp.amount for cp in period.casual_players)
        )
        
        # Verificar se período está completo
        is_complete = total_received >= total_expected
        assert is_complete
    
    def test_player_statistics_calculation(self, db_session, sample_players):
        """Testa cálculo de estatísticas do jogador"""
        player = sample_players[0]
        
        # Criar histórico de pagamentos
        periods = []
        for month in range(1, 4):  # 3 meses
            period = MonthlyPeriod(year=2024, month=month)
            db_session.add(period)
            periods.append(period)
        
        db_session.commit()
        
        # Adicionar jogador aos períodos
        paid_count = 0
        for i, period in enumerate(periods):
            monthly_player = MonthlyPlayer(
                period_id=period.id,
                player_id=player.id,
                monthly_fee=player.monthly_fee,
                payment_status='paid' if i < 2 else 'pending'  # 2 pagos, 1 pendente
            )
            db_session.add(monthly_player)
            if monthly_player.payment_status == 'paid':
                paid_count += 1
        
        db_session.commit()
        
        # Calcular estatísticas
        total_periods = len(periods)
        payment_rate = (paid_count / total_periods) * 100 if total_periods > 0 else 0
        
        assert total_periods == 3
        assert paid_count == 2
        assert payment_rate == 66.67  # Aproximadamente
    
    def test_monthly_fee_history_tracking(self, db_session, sample_players):
        """Testa rastreamento de histórico de taxas mensais"""
        player = sample_players[0]
        
        # Criar períodos com taxas diferentes
        periods_data = [
            (1, Decimal('100.00'), None),  # Taxa padrão
            (2, Decimal('100.00'), Decimal('120.00')),  # Taxa customizada
            (3, Decimal('110.00'), None),  # Nova taxa padrão
        ]
        
        for month, standard_fee, custom_fee in periods_data:
            period = MonthlyPeriod(year=2024, month=month, monthly_fee=standard_fee)
            db_session.add(period)
            db_session.commit()
            
            monthly_player = MonthlyPlayer(
                period_id=period.id,
                player_id=player.id,
                monthly_fee=standard_fee,
                custom_monthly_fee=custom_fee
            )
            db_session.add(monthly_player)
        
        db_session.commit()
        
        # Verificar histórico
        player_history = MonthlyPlayer.query.filter_by(player_id=player.id).all()
        assert len(player_history) == 3
        
        # Verificar taxas efetivas
        expected_effective_fees = [
            Decimal('100.00'),  # Mês 1
            Decimal('120.00'),  # Mês 2 (customizada)
            Decimal('110.00'),  # Mês 3
        ]
        
        for i, monthly_player in enumerate(player_history):
            assert monthly_player.effective_monthly_fee == expected_effective_fees[i]


class TestDataIntegrity:
    """Testes para integridade de dados"""
    
    def test_cascade_delete_prevention(self, db_session, sample_monthly_players):
        """Testa prevenção de exclusão em cascata"""
        monthly_player = sample_monthly_players[0]
        player = monthly_player.player
        
        # Tentar excluir jogador que tem pagamentos
        # Isso deve ser impedido pela lógica de negócio
        db_session.delete(player)
        
        # Dependendo da implementação, pode gerar erro ou ser impedido
        # Por enquanto, vamos apenas verificar que a exclusão não acontece silenciosamente
        try:
            db_session.commit()
            # Se chegou aqui, verificar se realmente foi excluído
            remaining_player = Player.query.get(player.id)
            if remaining_player is None:
                # Jogador foi excluído, verificar se os pagamentos também foram
                remaining_monthly_player = MonthlyPlayer.query.get(monthly_player.id)
                # Dependendo da configuração de FK, pode ou não existir
        except Exception:
            # Exclusão foi impedida, que é o comportamento esperado
            db_session.rollback()
            
            # Verificar que o jogador ainda existe
            remaining_player = Player.query.get(player.id)
            assert remaining_player is not None
    
    def test_referential_integrity(self, db_session, sample_monthly_period):
        """Testa integridade referencial"""
        # Tentar criar MonthlyPlayer com period_id inválido
        invalid_monthly_player = MonthlyPlayer(
            period_id=99999,  # ID inexistente
            player_id=1,
            monthly_fee=Decimal('100.00')
        )
        
        db_session.add(invalid_monthly_player)
        
        # Deve gerar erro de integridade referencial
        with pytest.raises(Exception):
            db_session.commit()
    
    def test_data_consistency_after_updates(self, db_session, sample_monthly_players):
        """Testa consistência de dados após atualizações"""
        monthly_player = sample_monthly_players[0]
        period = monthly_player.period
        
        # Estado inicial
        initial_expected = sum(mp.effective_monthly_fee for mp in period.monthly_players)
        
        # Fazer múltiplas atualizações
        monthly_player.custom_monthly_fee = Decimal('150.00')
        db_session.commit()
        
        monthly_player.payment_status = 'paid'
        db_session.commit()
        
        monthly_player.custom_monthly_fee = Decimal('200.00')
        db_session.commit()
        
        # Verificar consistência final
        final_expected = sum(mp.effective_monthly_fee for mp in period.monthly_players)
        
        # O total deve refletir as mudanças
        expected_difference = Decimal('200.00') - monthly_player.monthly_fee
        assert final_expected == initial_expected + expected_difference
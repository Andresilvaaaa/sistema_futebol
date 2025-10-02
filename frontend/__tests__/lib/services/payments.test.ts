/**
 * Testes para o serviço de pagamentos
 * Testa operações de períodos mensais, jogadores mensais e avulsos
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PaymentsService } from '../../../lib/services/payments'
import { ApiClient, ApiException } from '../../../lib/api'
import { 
  mockApiResponse, 
  mockPaginatedResponse, 
  mockApiError, 
  mockMonthlyPeriod,
  mockMonthlyPlayer,
  mockCasualPlayer
} from '../../setup'
import type { 
  MonthlyPeriod, 
  MonthlyPlayer, 
  CasualPlayer,
  CreateMonthlyPeriodRequest,
  UpdatePaymentStatusRequest,
  UpdateCustomMonthlyFeeRequest,
  AddCasualPlayerRequest
} from '../../../types/api'

// Mock do ApiClient
vi.mock('../../../lib/api')

describe('PaymentsService', () => {
  let paymentsService: PaymentsService
  let mockApiClient: vi.Mocked<ApiClient>

  beforeEach(() => {
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as any

    vi.mocked(ApiClient).mockImplementation(() => mockApiClient)
    paymentsService = new PaymentsService()
  })

  describe('getMonthlyPayments', () => {
    it('deve buscar pagamentos mensais com paginação', async () => {
      const mockPayments = [mockMonthlyPlayer, { ...mockMonthlyPlayer, id: 2 }]
      const mockResponse = mockPaginatedResponse(mockPayments, 1, 10, 2)

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await paymentsService.getMonthlyPayments({ page: 1, limit: 10 })

      expect(mockApiClient.get).toHaveBeenCalledWith('/monthly-payments', { page: 1, limit: 10 })
      expect(result).toEqual(mockResponse)
      expect(result.data).toHaveLength(2)
    })

    it('deve buscar pagamentos com filtros', async () => {
      const filters = {
        page: 1,
        limit: 20,
        year: 2024,
        month: 3,
        status: 'pending' as const
      }

      const mockResponse = mockPaginatedResponse([mockMonthlyPlayer])
      mockApiClient.get.mockResolvedValue(mockResponse)

      await paymentsService.getMonthlyPayments(filters)

      expect(mockApiClient.get).toHaveBeenCalledWith('/monthly-payments', filters)
    })

    it('deve usar parâmetros padrão quando não fornecidos', async () => {
      const mockResponse = mockPaginatedResponse([])
      mockApiClient.get.mockResolvedValue(mockResponse)

      await paymentsService.getMonthlyPayments()

      expect(mockApiClient.get).toHaveBeenCalledWith('/monthly-payments', {})
    })
  })

  describe('createMonthlyPeriod', () => {
    const validPeriodData: CreateMonthlyPeriodRequest = {
      year: 2024,
      month: 4,
      monthly_fee: 110.00
    }

    it('deve criar novo período mensal', async () => {
      const createdPeriod = { ...mockMonthlyPeriod, ...validPeriodData }
      const mockResponse = mockApiResponse(createdPeriod)
      mockApiClient.post.mockResolvedValue(mockResponse)

      const result = await paymentsService.createMonthlyPeriod(validPeriodData)

      expect(mockApiClient.post).toHaveBeenCalledWith('/monthly-periods', validPeriodData)
      expect(result).toEqual(mockResponse)
      expect(result.data.year).toBe(validPeriodData.year)
      expect(result.data.month).toBe(validPeriodData.month)
    })

    it('deve validar dados obrigatórios', async () => {
      const invalidData = { ...validPeriodData, year: 0 }

      await expect(paymentsService.createMonthlyPeriod(invalidData)).rejects.toThrow('Ano deve ser um valor válido')
    })

    it('deve validar mês', async () => {
      const invalidData = { ...validPeriodData, month: 13 }

      await expect(paymentsService.createMonthlyPeriod(invalidData)).rejects.toThrow('Mês deve estar entre 1 e 12')
    })

    it('deve validar taxa mensal', async () => {
      const invalidData = { ...validPeriodData, monthly_fee: -10 }

      await expect(paymentsService.createMonthlyPeriod(invalidData)).rejects.toThrow('Taxa mensal deve ser um valor positivo')
    })

    it('deve tratar período duplicado', async () => {
      const error = new ApiException('Period already exists', 409, ['Period for this month already exists'])
      mockApiClient.post.mockRejectedValue(error)

      await expect(paymentsService.createMonthlyPeriod(validPeriodData)).rejects.toThrow(ApiException)
    })
  })

  describe('updatePaymentStatus', () => {
    const updateData: UpdatePaymentStatusRequest = {
      payment_status: 'paid'
    }

    it('deve atualizar status de pagamento', async () => {
      const updatedPlayer = { ...mockMonthlyPlayer, payment_status: 'paid' as const }
      const mockResponse = mockApiResponse(updatedPlayer)
      mockApiClient.patch.mockResolvedValue(mockResponse)

      const result = await paymentsService.updatePaymentStatus(1, updateData)

      expect(mockApiClient.patch).toHaveBeenCalledWith('/monthly-payments/1/status', updateData)
      expect(result).toEqual(mockResponse)
      expect(result.data.payment_status).toBe('paid')
    })

    it('deve validar ID do pagamento', async () => {
      await expect(paymentsService.updatePaymentStatus(0, updateData)).rejects.toThrow('ID do pagamento deve ser um número positivo')
    })

    it('deve validar status de pagamento', async () => {
      const invalidData = { payment_status: 'invalid' as any }

      await expect(paymentsService.updatePaymentStatus(1, invalidData)).rejects.toThrow('Status de pagamento inválido')
    })

    it('deve permitir todos os status válidos', async () => {
      const validStatuses = ['pending', 'paid', 'overdue'] as const
      
      for (const status of validStatuses) {
        const data = { payment_status: status }
        const mockResponse = mockApiResponse({ ...mockMonthlyPlayer, payment_status: status })
        mockApiClient.patch.mockResolvedValue(mockResponse)

        await expect(paymentsService.updatePaymentStatus(1, data)).resolves.not.toThrow()
      }
    })
  })

  describe('updateCustomMonthlyFee', () => {
    const updateData: UpdateCustomMonthlyFeeRequest = {
      custom_monthly_fee: 150.00
    }

    it('deve atualizar taxa mensal customizada', async () => {
      const updatedPlayer = { 
        ...mockMonthlyPlayer, 
        custom_monthly_fee: 150.00,
        effective_monthly_fee: 150.00
      }
      const mockResponse = mockApiResponse(updatedPlayer)
      mockApiClient.patch.mockResolvedValue(mockResponse)

      const result = await paymentsService.updateCustomMonthlyFee(1, updateData)

      expect(mockApiClient.patch).toHaveBeenCalledWith('/monthly-payments/1/custom-fee', updateData)
      expect(result).toEqual(mockResponse)
      expect(result.data.custom_monthly_fee).toBe(150.00)
      expect(result.data.effective_monthly_fee).toBe(150.00)
    })

    it('deve validar ID do pagamento', async () => {
      await expect(paymentsService.updateCustomMonthlyFee(0, updateData)).rejects.toThrow('ID do pagamento deve ser um número positivo')
    })

    it('deve validar valor da taxa customizada', async () => {
      const invalidData = { custom_monthly_fee: -10 }

      await expect(paymentsService.updateCustomMonthlyFee(1, invalidData)).rejects.toThrow('Taxa mensal customizada deve ser um valor positivo')
    })

    it('deve permitir remover taxa customizada', async () => {
      const removeData = { custom_monthly_fee: null }
      const updatedPlayer = { 
        ...mockMonthlyPlayer, 
        custom_monthly_fee: null,
        effective_monthly_fee: mockMonthlyPlayer.monthly_fee
      }
      const mockResponse = mockApiResponse(updatedPlayer)
      mockApiClient.patch.mockResolvedValue(mockResponse)

      const result = await paymentsService.updateCustomMonthlyFee(1, removeData)

      expect(result.data.custom_monthly_fee).toBeNull()
      expect(result.data.effective_monthly_fee).toBe(mockMonthlyPlayer.monthly_fee)
    })
  })

  describe('addCasualPlayer', () => {
    const validCasualData: AddCasualPlayerRequest = {
      period_id: 1,
      player_name: 'Jogador Avulso',
      amount: 30.00,
      play_date: '2024-03-15'
    }

    it('deve adicionar jogador avulso', async () => {
      const createdCasual = { ...mockCasualPlayer, ...validCasualData }
      const mockResponse = mockApiResponse(createdCasual)
      mockApiClient.post.mockResolvedValue(mockResponse)

      const result = await paymentsService.addCasualPlayer(validCasualData)

      expect(mockApiClient.post).toHaveBeenCalledWith('/casual-players', validCasualData)
      expect(result).toEqual(mockResponse)
      expect(result.data.player_name).toBe(validCasualData.player_name)
    })

    it('deve validar dados obrigatórios', async () => {
      const invalidData = { ...validCasualData, player_name: '' }

      await expect(paymentsService.addCasualPlayer(invalidData)).rejects.toThrow('Nome do jogador é obrigatório')
    })

    it('deve validar ID do período', async () => {
      const invalidData = { ...validCasualData, period_id: 0 }

      await expect(paymentsService.addCasualPlayer(invalidData)).rejects.toThrow('ID do período deve ser um número positivo')
    })

    it('deve validar valor', async () => {
      const invalidData = { ...validCasualData, amount: -10 }

      await expect(paymentsService.addCasualPlayer(invalidData)).rejects.toThrow('Valor deve ser positivo')
    })

    it('deve validar formato da data', async () => {
      const invalidData = { ...validCasualData, play_date: 'data-inválida' }

      await expect(paymentsService.addCasualPlayer(invalidData)).rejects.toThrow('Data deve estar no formato YYYY-MM-DD')
    })
  })

  describe('getCasualPlayers', () => {
    it('deve buscar jogadores avulsos por período', async () => {
      const mockCasuals = [mockCasualPlayer, { ...mockCasualPlayer, id: 2 }]
      const mockResponse = mockPaginatedResponse(mockCasuals)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await paymentsService.getCasualPlayers(1)

      expect(mockApiClient.get).toHaveBeenCalledWith('/casual-players', { period_id: 1 })
      expect(result).toEqual(mockResponse)
      expect(result.data).toHaveLength(2)
    })

    it('deve validar ID do período', async () => {
      await expect(paymentsService.getCasualPlayers(0)).rejects.toThrow('ID do período deve ser um número positivo')
    })
  })

  describe('deleteCasualPlayer', () => {
    it('deve excluir jogador avulso', async () => {
      const mockResponse = mockApiResponse({ message: 'Casual player deleted successfully' })
      mockApiClient.delete.mockResolvedValue(mockResponse)

      const result = await paymentsService.deleteCasualPlayer(1)

      expect(mockApiClient.delete).toHaveBeenCalledWith('/casual-players/1')
      expect(result).toEqual(mockResponse)
    })

    it('deve validar ID do jogador avulso', async () => {
      await expect(paymentsService.deleteCasualPlayer(0)).rejects.toThrow('ID do jogador avulso deve ser um número positivo')
    })
  })

  describe('getMonthlyPeriods', () => {
    it('deve buscar períodos mensais', async () => {
      const mockPeriods = [mockMonthlyPeriod, { ...mockMonthlyPeriod, id: 2, month: 4 }]
      const mockResponse = mockPaginatedResponse(mockPeriods)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await paymentsService.getMonthlyPeriods()

      expect(mockApiClient.get).toHaveBeenCalledWith('/monthly-periods', {})
      expect(result).toEqual(mockResponse)
      expect(result.data).toHaveLength(2)
    })

    it('deve buscar períodos com filtros', async () => {
      const filters = { year: 2024 }
      const mockResponse = mockPaginatedResponse([mockMonthlyPeriod])
      mockApiClient.get.mockResolvedValue(mockResponse)

      await paymentsService.getMonthlyPeriods(filters)

      expect(mockApiClient.get).toHaveBeenCalledWith('/monthly-periods', filters)
    })
  })

  describe('getMonthlyPeriod', () => {
    it('deve buscar período mensal por ID', async () => {
      const mockResponse = mockApiResponse(mockMonthlyPeriod)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await paymentsService.getMonthlyPeriod(1)

      expect(mockApiClient.get).toHaveBeenCalledWith('/monthly-periods/1')
      expect(result).toEqual(mockResponse)
    })

    it('deve validar ID do período', async () => {
      await expect(paymentsService.getMonthlyPeriod(0)).rejects.toThrow('ID do período deve ser um número positivo')
    })
  })

  describe('Validação de dados', () => {
    describe('validateMonthlyPeriodData', () => {
      it('deve validar dados de período corretamente', () => {
        const validData = {
          year: 2024,
          month: 3,
          monthly_fee: 100.00
        }

        expect(() => paymentsService['validateMonthlyPeriodData'](validData)).not.toThrow()
      })

      it('deve rejeitar ano inválido', () => {
        const invalidData = { year: 1900, month: 3, monthly_fee: 100 }
        expect(() => paymentsService['validateMonthlyPeriodData'](invalidData)).toThrow('Ano deve ser um valor válido')
      })

      it('deve rejeitar mês inválido', () => {
        const invalidData = { year: 2024, month: 0, monthly_fee: 100 }
        expect(() => paymentsService['validateMonthlyPeriodData'](invalidData)).toThrow('Mês deve estar entre 1 e 12')
      })
    })

    describe('validateCasualPlayerData', () => {
      it('deve validar dados de jogador avulso corretamente', () => {
        const validData = {
          period_id: 1,
          player_name: 'Jogador Teste',
          amount: 30.00,
          play_date: '2024-03-15'
        }

        expect(() => paymentsService['validateCasualPlayerData'](validData)).not.toThrow()
      })

      it('deve rejeitar nome vazio', () => {
        const invalidData = { period_id: 1, player_name: '', amount: 30 }
        expect(() => paymentsService['validateCasualPlayerData'](invalidData)).toThrow('Nome do jogador é obrigatório')
      })

      it('deve rejeitar valor negativo', () => {
        const invalidData = { period_id: 1, player_name: 'Test', amount: -10 }
        expect(() => paymentsService['validateCasualPlayerData'](invalidData)).toThrow('Valor deve ser positivo')
      })
    })
  })

  describe('Tratamento de erros', () => {
    it('deve propagar ApiException corretamente', async () => {
      const apiError = new ApiException('Server error', 500, ['Internal server error'])
      mockApiClient.get.mockRejectedValue(apiError)

      try {
        await paymentsService.getMonthlyPayments()
      } catch (error) {
        expect(error).toBeInstanceOf(ApiException)
        expect((error as ApiException).message).toBe('Server error')
        expect((error as ApiException).status).toBe(500)
      }
    })

    it('deve converter erros genéricos em ApiException', async () => {
      const genericError = new Error('Generic error')
      mockApiClient.get.mockRejectedValue(genericError)

      try {
        await paymentsService.getMonthlyPayments()
      } catch (error) {
        expect(error).toBeInstanceOf(ApiException)
        expect((error as ApiException).message).toBe('Generic error')
      }
    })
  })

  describe('Cálculos e estatísticas', () => {
    it('deve calcular totais do período corretamente', async () => {
      const periodWithTotals = {
        ...mockMonthlyPeriod,
        total_expected: 500.00,
        total_received: 300.00
      }
      const mockResponse = mockApiResponse(periodWithTotals)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await paymentsService.getMonthlyPeriod(1)

      expect(result.data.total_expected).toBe(500.00)
      expect(result.data.total_received).toBe(300.00)
      
      // Calcular taxa de recebimento
      const paymentRate = (result.data.total_received / result.data.total_expected) * 100
      expect(paymentRate).toBe(60) // 300/500 = 60%
    })
  })

  describe('Integração entre serviços', () => {
    it('deve manter consistência entre jogadores mensais e avulsos', async () => {
      // Buscar período
      const mockResponse = mockApiResponse(mockMonthlyPeriod)
      mockApiClient.get.mockResolvedValue(mockResponse)
      
      const period = await paymentsService.getMonthlyPeriod(1)

      // Buscar jogadores mensais do período
      const monthlyResponse = mockPaginatedResponse([mockMonthlyPlayer])
      mockApiClient.get.mockResolvedValue(monthlyResponse)
      
      const monthlyPayments = await paymentsService.getMonthlyPayments({ period_id: 1 })

      // Buscar jogadores avulsos do período
      const casualResponse = mockPaginatedResponse([mockCasualPlayer])
      mockApiClient.get.mockResolvedValue(casualResponse)
      
      const casualPlayers = await paymentsService.getCasualPlayers(1)

      // Verificar consistência
      expect(period.data.id).toBe(1)
      expect(monthlyPayments.data[0].period_id).toBe(1)
      expect(casualPlayers.data[0].period_id).toBe(1)
    })
  })
})
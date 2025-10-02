/**
 * Testes para o serviço de jogadores
 * Testa operações CRUD, validação e tratamento de erros
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PlayersService } from '../../../lib/services/players'
import { ApiClient, ApiException } from '../../../lib/api'
import { 
  mockApiResponse, 
  mockPaginatedResponse, 
  mockApiError, 
  mockPlayer 
} from '../../setup'
import type { Player, CreatePlayerRequest, UpdatePlayerRequest } from '../../../types/api'

// Mock do ApiClient
vi.mock('../../../lib/api')

describe('PlayersService', () => {
  let playersService: PlayersService
  let mockApiClient: vi.Mocked<ApiClient>

  beforeEach(() => {
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as any

    // Mock do constructor do ApiClient
    vi.mocked(ApiClient).mockImplementation(() => mockApiClient)
    
    playersService = new PlayersService()
  })

  describe('getPlayers', () => {
    it('deve buscar lista de jogadores com paginação', async () => {
      const mockPlayers = [mockPlayer, { ...mockPlayer, id: 2, name: 'Maria Silva' }]
      const mockResponse = mockPaginatedResponse(mockPlayers, 1, 10, 2)

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await playersService.getPlayers({ page: 1, limit: 10 })

      expect(mockApiClient.get).toHaveBeenCalledWith('/players', { page: 1, limit: 10 })
      expect(result).toEqual(mockResponse)
      expect(result.data).toHaveLength(2)
    })

    it('deve buscar jogadores com filtros', async () => {
      const filters = {
        page: 2,
        limit: 5,
        search: 'João',
        status: 'active' as const
      }

      const mockResponse = mockPaginatedResponse([mockPlayer])
      mockApiClient.get.mockResolvedValue(mockResponse)

      await playersService.getPlayers(filters)

      expect(mockApiClient.get).toHaveBeenCalledWith('/players', filters)
    })

    it('deve usar parâmetros padrão quando não fornecidos', async () => {
      const mockResponse = mockPaginatedResponse([])
      mockApiClient.get.mockResolvedValue(mockResponse)

      await playersService.getPlayers()

      expect(mockApiClient.get).toHaveBeenCalledWith('/players', {})
    })

    it('deve tratar erro na busca de jogadores', async () => {
      const error = new ApiException('Server error', 500, ['Internal error'])
      mockApiClient.get.mockRejectedValue(error)

      await expect(playersService.getPlayers()).rejects.toThrow(ApiException)
    })
  })

  describe('getPlayer', () => {
    it('deve buscar jogador por ID', async () => {
      const mockResponse = mockApiResponse(mockPlayer)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await playersService.getPlayer(1)

      expect(mockApiClient.get).toHaveBeenCalledWith('/players/1')
      expect(result).toEqual(mockResponse)
      expect(result.data).toEqual(mockPlayer)
    })

    it('deve tratar jogador não encontrado', async () => {
      const error = new ApiException('Player not found', 404, ['Player not found'])
      mockApiClient.get.mockRejectedValue(error)

      await expect(playersService.getPlayer(999)).rejects.toThrow(ApiException)
    })

    it('deve validar ID do jogador', async () => {
      await expect(playersService.getPlayer(0)).rejects.toThrow('ID do jogador deve ser um número positivo')
      await expect(playersService.getPlayer(-1)).rejects.toThrow('ID do jogador deve ser um número positivo')
    })
  })

  describe('createPlayer', () => {
    const validPlayerData: CreatePlayerRequest = {
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '11999999999',
      position: 'Atacante',
      monthly_fee: 100.00
    }

    it('deve criar novo jogador', async () => {
      const createdPlayer = { ...mockPlayer, ...validPlayerData }
      const mockResponse = mockApiResponse(createdPlayer)
      mockApiClient.post.mockResolvedValue(mockResponse)

      const result = await playersService.createPlayer(validPlayerData)

      expect(mockApiClient.post).toHaveBeenCalledWith('/players', validPlayerData)
      expect(result).toEqual(mockResponse)
      expect(result.data.name).toBe(validPlayerData.name)
    })

    it('deve validar dados obrigatórios', async () => {
      const invalidData = { ...validPlayerData, name: '' }

      await expect(playersService.createPlayer(invalidData)).rejects.toThrow('Nome é obrigatório')
    })

    it('deve validar formato do email', async () => {
      const invalidData = { ...validPlayerData, email: 'email-inválido' }

      await expect(playersService.createPlayer(invalidData)).rejects.toThrow('Email deve ter um formato válido')
    })

    it('deve validar formato do telefone', async () => {
      const invalidData = { ...validPlayerData, phone: '123' }

      await expect(playersService.createPlayer(invalidData)).rejects.toThrow('Telefone deve ter pelo menos 10 dígitos')
    })

    it('deve validar valor da mensalidade', async () => {
      const invalidData = { ...validPlayerData, monthly_fee: -10 }

      await expect(playersService.createPlayer(invalidData)).rejects.toThrow('Mensalidade deve ser um valor positivo')
    })

    it('deve tratar erro de duplicação', async () => {
      const error = new ApiException('Player already exists', 409, ['Email already in use'])
      mockApiClient.post.mockRejectedValue(error)

      await expect(playersService.createPlayer(validPlayerData)).rejects.toThrow(ApiException)
    })
  })

  describe('updatePlayer', () => {
    const updateData: UpdatePlayerRequest = {
      name: 'João Silva Atualizado',
      position: 'Meio-campo'
    }

    it('deve atualizar jogador existente', async () => {
      const updatedPlayer = { ...mockPlayer, ...updateData }
      const mockResponse = mockApiResponse(updatedPlayer)
      mockApiClient.put.mockResolvedValue(mockResponse)

      const result = await playersService.updatePlayer(1, updateData)

      expect(mockApiClient.put).toHaveBeenCalledWith('/players/1', updateData)
      expect(result).toEqual(mockResponse)
      expect(result.data.name).toBe(updateData.name)
    })

    it('deve validar ID do jogador', async () => {
      await expect(playersService.updatePlayer(0, updateData)).rejects.toThrow('ID do jogador deve ser um número positivo')
    })

    it('deve validar dados de atualização', async () => {
      const invalidData = { name: '', email: 'email-inválido' }

      await expect(playersService.updatePlayer(1, invalidData)).rejects.toThrow()
    })

    it('deve permitir atualização parcial', async () => {
      const partialData = { name: 'Novo Nome' }
      const mockResponse = mockApiResponse({ ...mockPlayer, ...partialData })
      mockApiClient.put.mockResolvedValue(mockResponse)

      const result = await playersService.updatePlayer(1, partialData)

      expect(result.data.name).toBe(partialData.name)
      expect(result.data.email).toBe(mockPlayer.email) // Mantém dados originais
    })
  })

  describe('activatePlayer', () => {
    it('deve ativar jogador', async () => {
      const activatedPlayer = { ...mockPlayer, status: 'active' as const }
      const mockResponse = mockApiResponse(activatedPlayer)
      mockApiClient.patch.mockResolvedValue(mockResponse)

      const result = await playersService.activatePlayer(1)

      expect(mockApiClient.patch).toHaveBeenCalledWith('/players/1/activate')
      expect(result).toEqual(mockResponse)
      expect(result.data.status).toBe('active')
    })

    it('deve validar ID do jogador', async () => {
      await expect(playersService.activatePlayer(0)).rejects.toThrow('ID do jogador deve ser um número positivo')
    })

    it('deve tratar jogador já ativo', async () => {
      const error = new ApiException('Player already active', 400, ['Player is already active'])
      mockApiClient.patch.mockRejectedValue(error)

      await expect(playersService.activatePlayer(1)).rejects.toThrow(ApiException)
    })
  })

  describe('deactivatePlayer', () => {
    it('deve desativar jogador', async () => {
      const deactivatedPlayer = { ...mockPlayer, status: 'inactive' as const }
      const mockResponse = mockApiResponse(deactivatedPlayer)
      mockApiClient.patch.mockResolvedValue(mockResponse)

      const result = await playersService.deactivatePlayer(1)

      expect(mockApiClient.patch).toHaveBeenCalledWith('/players/1/deactivate')
      expect(result).toEqual(mockResponse)
      expect(result.data.status).toBe('inactive')
    })

    it('deve validar ID do jogador', async () => {
      await expect(playersService.deactivatePlayer(0)).rejects.toThrow('ID do jogador deve ser um número positivo')
    })
  })

  describe('deletePlayer', () => {
    it('deve excluir jogador', async () => {
      const mockResponse = mockApiResponse({ message: 'Player deleted successfully' })
      mockApiClient.delete.mockResolvedValue(mockResponse)

      const result = await playersService.deletePlayer(1)

      expect(mockApiClient.delete).toHaveBeenCalledWith('/players/1')
      expect(result).toEqual(mockResponse)
    })

    it('deve validar ID do jogador', async () => {
      await expect(playersService.deletePlayer(0)).rejects.toThrow('ID do jogador deve ser um número positivo')
    })

    it('deve tratar jogador com pagamentos associados', async () => {
      const error = new ApiException(
        'Cannot delete player with associated payments', 
        400, 
        ['Player has associated payments']
      )
      mockApiClient.delete.mockRejectedValue(error)

      await expect(playersService.deletePlayer(1)).rejects.toThrow(ApiException)
    })
  })

  describe('getPlayerStats', () => {
    it('deve buscar estatísticas do jogador', async () => {
      const mockStats = {
        total_periods: 12,
        paid_periods: 10,
        pending_periods: 2,
        payment_rate: 83.33,
        total_paid: 1000.00,
        total_pending: 200.00
      }
      const mockResponse = mockApiResponse(mockStats)
      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await playersService.getPlayerStats(1)

      expect(mockApiClient.get).toHaveBeenCalledWith('/players/1/stats')
      expect(result).toEqual(mockResponse)
      expect(result.data.payment_rate).toBe(83.33)
    })

    it('deve validar ID do jogador', async () => {
      await expect(playersService.getPlayerStats(0)).rejects.toThrow('ID do jogador deve ser um número positivo')
    })
  })

  describe('Validação de dados', () => {
    describe('validatePlayerData', () => {
      it('deve validar dados completos corretamente', () => {
        const validData = {
          name: 'João Silva',
          email: 'joao@example.com',
          phone: '11999999999',
          position: 'Atacante',
          monthly_fee: 100.00
        }

        expect(() => playersService['validatePlayerData'](validData)).not.toThrow()
      })

      it('deve rejeitar nome vazio', () => {
        const invalidData = { name: '', email: 'test@example.com' }
        expect(() => playersService['validatePlayerData'](invalidData)).toThrow('Nome é obrigatório')
      })

      it('deve rejeitar email inválido', () => {
        const invalidData = { name: 'Test', email: 'email-inválido' }
        expect(() => playersService['validatePlayerData'](invalidData)).toThrow('Email deve ter um formato válido')
      })

      it('deve rejeitar telefone muito curto', () => {
        const invalidData = { name: 'Test', phone: '123' }
        expect(() => playersService['validatePlayerData'](invalidData)).toThrow('Telefone deve ter pelo menos 10 dígitos')
      })

      it('deve rejeitar mensalidade negativa', () => {
        const invalidData = { name: 'Test', monthly_fee: -10 }
        expect(() => playersService['validatePlayerData'](invalidData)).toThrow('Mensalidade deve ser um valor positivo')
      })
    })

    describe('validateApiResponse', () => {
      it('deve validar resposta da API corretamente', () => {
        const validResponse = mockApiResponse(mockPlayer)
        expect(() => playersService['validateApiResponse'](validResponse)).not.toThrow()
      })

      it('deve rejeitar resposta sem campo success', () => {
        const invalidResponse = { data: mockPlayer }
        expect(() => playersService['validateApiResponse'](invalidResponse)).toThrow('Resposta da API inválida')
      })

      it('deve rejeitar resposta de erro', () => {
        const errorResponse = mockApiError('Validation failed')
        expect(() => playersService['validateApiResponse'](errorResponse)).toThrow('Validation failed')
      })
    })
  })

  describe('Tratamento de erros', () => {
    it('deve propagar ApiException corretamente', async () => {
      const apiError = new ApiException('Server error', 500, ['Internal server error'])
      mockApiClient.get.mockRejectedValue(apiError)

      try {
        await playersService.getPlayers()
      } catch (error) {
        expect(error).toBeInstanceOf(ApiException)
        expect((error as ApiException).message).toBe('Server error')
        expect((error as ApiException).status).toBe(500)
        expect((error as ApiException).errors).toEqual(['Internal server error'])
      }
    })

    it('deve converter erros genéricos em ApiException', async () => {
      const genericError = new Error('Generic error')
      mockApiClient.get.mockRejectedValue(genericError)

      try {
        await playersService.getPlayers()
      } catch (error) {
        expect(error).toBeInstanceOf(ApiException)
        expect((error as ApiException).message).toBe('Generic error')
        expect((error as ApiException).status).toBe(0)
      }
    })
  })

  describe('Integração com cache', () => {
    it('deve invalidar cache após criação', async () => {
      const mockResponse = mockApiResponse(mockPlayer)
      mockApiClient.post.mockResolvedValue(mockResponse)

      await playersService.createPlayer({
        name: 'Test Player',
        email: 'test@example.com',
        phone: '11999999999'
      })

      // Verificar que próxima busca não usa cache
      const listResponse = mockPaginatedResponse([mockPlayer])
      mockApiClient.get.mockResolvedValue(listResponse)

      await playersService.getPlayers()
      expect(mockApiClient.get).toHaveBeenCalledWith('/players', {})
    })
  })
})
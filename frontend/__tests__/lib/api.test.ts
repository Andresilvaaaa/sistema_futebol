/**
 * Testes para o cliente API
 * Testa comunicação HTTP, tratamento de erros e parsing de respostas
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ApiClient, ApiException } from '../../lib/api'
import { mockApiResponse, mockApiError, mockAuthToken } from '../setup'

// Mock do fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('ApiClient', () => {
  let apiClient: ApiClient
  const baseURL = 'http://localhost:5000/api'

  beforeEach(() => {
    apiClient = new ApiClient(baseURL)
    mockFetch.mockClear()
  })

  describe('Configuração inicial', () => {
    it('deve inicializar com URL base correta', () => {
      expect(apiClient['baseURL']).toBe(baseURL)
    })

    it('deve configurar headers padrão', () => {
      const headers = apiClient['getHeaders']()
      expect(headers['Content-Type']).toBe('application/json')
    })

    it('deve incluir token de autenticação quando disponível', () => {
      // Simular token no localStorage
      vi.mocked(localStorage.getItem).mockReturnValue(mockAuthToken)
      
      const headers = apiClient['getHeaders']()
      expect(headers['Authorization']).toBe(`Bearer ${mockAuthToken}`)
    })
  })

  describe('Tratamento de respostas', () => {
    it('deve processar resposta de sucesso corretamente', async () => {
      const mockData = { id: 1, name: 'Test' }
      const mockResponse = mockApiResponse(mockData)

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockResponse)
      })

      const result = await apiClient.get('/test')
      
      expect(result).toEqual(mockResponse)
      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Object)
        })
      )
    })

    it('deve processar resposta de erro da API corretamente', async () => {
      const mockErrorResponse = mockApiError('Validation failed', ['Name is required'])

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: vi.fn().mockResolvedValue(mockErrorResponse)
      })

      await expect(apiClient.get('/test')).rejects.toThrow(ApiException)
      
      try {
        await apiClient.get('/test')
      } catch (error) {
        expect(error).toBeInstanceOf(ApiException)
        expect((error as ApiException).message).toBe('Validation failed')
        expect((error as ApiException).errors).toEqual(['Name is required'])
        expect((error as ApiException).status).toBe(400)
      }
    })

    it('deve tratar erro de rede corretamente', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(apiClient.get('/test')).rejects.toThrow(ApiException)
      
      try {
        await apiClient.get('/test')
      } catch (error) {
        expect(error).toBeInstanceOf(ApiException)
        expect((error as ApiException).message).toBe('Network error')
        expect((error as ApiException).status).toBe(0)
      }
    })

    it('deve tratar resposta sem JSON corretamente', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON'))
      })

      await expect(apiClient.get('/test')).rejects.toThrow(ApiException)
      
      try {
        await apiClient.get('/test')
      } catch (error) {
        expect(error).toBeInstanceOf(ApiException)
        expect((error as ApiException).message).toBe('Erro interno do servidor')
        expect((error as ApiException).status).toBe(500)
      }
    })
  })

  describe('Métodos HTTP', () => {
    const mockSuccessResponse = mockApiResponse({ success: true })

    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockSuccessResponse)
      })
    })

    it('deve fazer requisição GET corretamente', async () => {
      await apiClient.get('/players')

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/players`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Object)
        })
      )
    })

    it('deve fazer requisição POST com dados', async () => {
      const postData = { name: 'New Player' }
      
      await apiClient.post('/players', postData)

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/players`,
        expect.objectContaining({
          method: 'POST',
          headers: expect.any(Object),
          body: JSON.stringify(postData)
        })
      )
    })

    it('deve fazer requisição PUT com dados', async () => {
      const putData = { name: 'Updated Player' }
      
      await apiClient.put('/players/1', putData)

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/players/1`,
        expect.objectContaining({
          method: 'PUT',
          headers: expect.any(Object),
          body: JSON.stringify(putData)
        })
      )
    })

    it('deve fazer requisição PATCH com dados', async () => {
      const patchData = { status: 'inactive' }
      
      await apiClient.patch('/players/1', patchData)

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/players/1`,
        expect.objectContaining({
          method: 'PATCH',
          headers: expect.any(Object),
          body: JSON.stringify(patchData)
        })
      )
    })

    it('deve fazer requisição DELETE', async () => {
      await apiClient.delete('/players/1')

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/players/1`,
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.any(Object)
        })
      )
    })
  })

  describe('Parâmetros de query', () => {
    it('deve adicionar parâmetros de query à URL', async () => {
      const params = { page: 1, limit: 10, search: 'João' }
      
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockApiResponse([]))
      })

      await apiClient.get('/players', params)

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/players?page=1&limit=10&search=Jo%C3%A3o`,
        expect.any(Object)
      )
    })

    it('deve ignorar parâmetros undefined/null', async () => {
      const params = { page: 1, limit: undefined, search: null }
      
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockApiResponse([]))
      })

      await apiClient.get('/players', params)

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/players?page=1`,
        expect.any(Object)
      )
    })
  })

  describe('Tratamento de autenticação', () => {
    it('deve incluir token de autenticação nas requisições', async () => {
      vi.mocked(localStorage.getItem).mockReturnValue(mockAuthToken)
      
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockApiResponse({}))
      })

      await apiClient.get('/protected')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': `Bearer ${mockAuthToken}`
          })
        })
      )
    })

    it('deve funcionar sem token de autenticação', async () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null)
      
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockApiResponse({}))
      })

      await apiClient.get('/public')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.not.objectContaining({
            'Authorization': expect.any(String)
          })
        })
      )
    })
  })

  describe('Códigos de status HTTP', () => {
    const testCases = [
      { status: 400, description: 'Bad Request' },
      { status: 401, description: 'Unauthorized' },
      { status: 403, description: 'Forbidden' },
      { status: 404, description: 'Not Found' },
      { status: 422, description: 'Unprocessable Entity' },
      { status: 500, description: 'Internal Server Error' }
    ]

    testCases.forEach(({ status, description }) => {
      it(`deve tratar status ${status} (${description}) corretamente`, async () => {
        const errorResponse = mockApiError(`${description} error`)

        mockFetch.mockResolvedValueOnce({
          ok: false,
          status,
          json: vi.fn().mockResolvedValue(errorResponse)
        })

        await expect(apiClient.get('/test')).rejects.toThrow(ApiException)
        
        try {
          await apiClient.get('/test')
        } catch (error) {
          expect((error as ApiException).status).toBe(status)
        }
      })
    })
  })

  describe('Timeout e retry', () => {
    it('deve tratar timeout de requisição', async () => {
      // Simular timeout
      mockFetch.mockImplementationOnce(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 100)
        )
      )

      await expect(apiClient.get('/slow-endpoint')).rejects.toThrow(ApiException)
    })
  })

  describe('Validação de dados', () => {
    it('deve validar formato de resposta da API', async () => {
      // Resposta inválida (sem campo success)
      const invalidResponse = { data: 'test' }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(invalidResponse)
      })

      // Deve ainda funcionar, mas pode gerar warning
      const result = await apiClient.get('/test')
      expect(result).toEqual(invalidResponse)
    })

    it('deve tratar resposta vazia corretamente', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204, // No Content
        json: vi.fn().mockRejectedValue(new Error('No JSON'))
      })

      // Para status 204, não deve tentar fazer parse do JSON
      const result = await apiClient.get('/test')
      expect(result).toEqual({ success: true, data: null })
    })
  })
})
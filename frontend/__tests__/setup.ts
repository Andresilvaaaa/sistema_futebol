/**
 * Configuração de setup para testes do frontend
 * Configura ambiente de teste, mocks globais e utilitários
 */

import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'
import { vi } from 'vitest'

// Configurar Testing Library
configure({
  testIdAttribute: 'data-testid',
})

// Mock do fetch global
global.fetch = vi.fn()

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Mock do sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.sessionStorage = sessionStorageMock

// Mock do window.location
delete (window as any).location
window.location = {
  ...window.location,
  assign: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
}

// Mock do console para testes mais limpos
global.console = {
  ...console,
  // Manter apenas erros importantes
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
}

// Configurações globais para testes
beforeEach(() => {
  // Limpar todos os mocks antes de cada teste
  vi.clearAllMocks()
  
  // Resetar localStorage e sessionStorage
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
  localStorageMock.clear.mockClear()
  
  sessionStorageMock.getItem.mockClear()
  sessionStorageMock.setItem.mockClear()
  sessionStorageMock.removeItem.mockClear()
  sessionStorageMock.clear.mockClear()
})

afterEach(() => {
  // Cleanup após cada teste
  vi.restoreAllMocks()
})

// Utilitários de teste globais
export const mockApiResponse = <T>(data: T, success = true) => ({
  success,
  data,
  errors: success ? [] : ['Mock error'],
  message: success ? 'Success' : 'Error'
})

export const mockPaginatedResponse = <T>(
  data: T[],
  page = 1,
  limit = 10,
  total = data.length
) => ({
  success: true,
  data,
  pagination: {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit)
  },
  errors: [],
  message: 'Success'
})

export const mockApiError = (message = 'Test error', errors = ['Test error']) => ({
  success: false,
  data: null,
  errors,
  message
})

// Mock de dados de teste
export const mockPlayer = {
  id: 1,
  name: 'João Silva',
  email: 'joao@example.com',
  phone: '11999999999',
  position: 'Atacante',
  monthly_fee: 100.00,
  status: 'active' as const,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
}

export const mockMonthlyPeriod = {
  id: 1,
  year: 2024,
  month: 3,
  monthly_fee: 100.00,
  total_expected: 500.00,
  total_received: 300.00,
  created_at: '2024-03-01T00:00:00Z'
}

export const mockMonthlyPlayer = {
  id: 1,
  period_id: 1,
  player_id: 1,
  monthly_fee: 100.00,
  custom_monthly_fee: null,
  effective_monthly_fee: 100.00,
  payment_status: 'pending' as const,
  player: mockPlayer,
  period: mockMonthlyPeriod
}

export const mockCasualPlayer = {
  id: 1,
  period_id: 1,
  player_name: 'Jogador Avulso',
  amount: 30.00,
  play_date: '2024-03-15',
  period: mockMonthlyPeriod
}

export const mockUser = {
  id: 1,
  username: 'admin',
  email: 'admin@example.com',
  is_active: true,
  created_at: '2024-01-01T00:00:00Z'
}

export const mockAuthToken = 'mock-jwt-token'

export const mockAuthHeaders = {
  'Authorization': `Bearer ${mockAuthToken}`,
  'Content-Type': 'application/json'
}
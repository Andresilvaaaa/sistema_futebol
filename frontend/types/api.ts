/**
 * Tipos TypeScript para as entidades e respostas da API
 * Baseados na estrutura do backend Flask/SQLAlchemy
 */

// ===== TIPOS BASE =====

export interface BaseEntity {
  id: string; // UUID from backend
  created_at: string;
  updated_at: string;
}

export interface SoftDeletableEntity extends BaseEntity {
  deleted_at?: string | null;
}

// ===== ENUMS =====

export enum PlayerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid'
}

// ===== ENTIDADES PRINCIPAIS =====

export interface Player extends SoftDeletableEntity {
  name: string;
  position: string;
  status: PlayerStatus;
  email: string;
  phone: string;
  monthly_fee: number; // Corrigido: number para consistência
  join_date: string;
  is_active: boolean;
}

export interface MonthlyPeriod extends BaseEntity {
  year: number;
  month: number;
  name: string;
  is_active: boolean;
  total_expected: number;
  total_received: number;
  players_count: number;
}

export interface MonthlyPlayer extends BaseEntity {
  player_id: string; // Corrigido: string (UUID)
  monthly_period_id: string; // Corrigido: string (UUID)
  player_name: string;
  position: string;
  phone: string;
  email: string;
  monthly_fee: number;
  custom_monthly_fee?: number;
  effective_monthly_fee: number;
  amount_paid: number;
  join_date: string;
  status: PaymentStatus; // Renomeado de payment_status
  payment_date?: string;
  pending_months_count: number;
  // Relacionamentos populados
  player?: Player;
  monthly_period?: MonthlyPeriod;
}

export interface CasualPlayer extends BaseEntity {
  player_name: string; // Corrigido: player_name (não name)
  monthly_period_id: string; // Corrigido: string (UUID)
  play_date: string;
  invited_by: string;
  amount: number;
  status: PaymentStatus;
  payment_date?: string;
  // Relacionamentos populados
  monthly_period?: MonthlyPeriod;
}

export interface Expense extends BaseEntity {
  description: string;
  amount: number;
  expense_date: string;
  category?: string | null;
}

// ===== TIPOS PARA REQUESTS =====

export interface CreatePlayerRequest {
  name: string;
  position: string;
  email: string;
  phone: string;
  monthly_fee: number; // Corrigido: number
  status?: PlayerStatus;
}

export interface UpdatePlayerRequest {
  name?: string;
  position?: string;
  email?: string;
  phone?: string;
  monthly_fee?: number; // Corrigido: number
  status?: PlayerStatus;
}

export interface CreateMonthlyPeriodRequest {
  year: number;
  month: number;
}

// Atualização de período mensal (mensalidade padrão e/ou status)
export interface UpdateMonthlyPeriodRequest {
  monthly_fee?: number;
  status?: 'active' | 'closed';
}

export interface UpdatePaymentStatusRequest {
  status: PaymentStatus; // Renomeado de payment_status
}

export interface CreateCasualPlayerRequest {
  player_name: string; // Corrigido: player_name
  monthly_period_id: string; // Corrigido: string (UUID)
  play_date: string;
  invited_by: string;
  amount: number;
}

export interface AddPlayersToMonthlyPeriodRequest {
  player_ids: string[]; // Novo: para adicionar jogadores selecionados
}

export interface UpdateCustomMonthlyFeeRequest {
  custom_monthly_fee: number;
}

export interface CreateExpenseRequest {
  description: string;
  amount: number;
  expense_date: string;
  category?: string;
}

export interface UpdateExpenseRequest {
  description?: string;
  amount?: number;
  date?: string;
  category?: string;
}

// ===== TIPOS PARA FILTROS E PAGINAÇÃO =====

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export interface PlayersFilters extends PaginationParams {
  status?: PlayerStatus;
  position?: string;
}

export interface MonthlyPaymentsFilters extends PaginationParams {
  year?: number;
  month?: number;
  player_id?: string; // Corrigido: string (UUID)
  status?: PaymentStatus;
}

// ===== TIPOS PARA RESPOSTAS PAGINADAS =====

export interface PaginatedResponse<T> {
  players: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// ===== TIPOS PARA ESTATÍSTICAS =====

export interface PlayerStats {
  total_players: number;
  active_players: number;
  inactive_players: number;
  players_by_position: Record<string, number>;
}

export interface PaymentStats {
  year: number;
  month: number;
  total_players: number;
  paid_players: number;
  pending_players: number;
  total_amount_expected: number;
  total_amount_received: number;
  payment_rate: number;
}

// ===== TIPOS PARA AUTENTICAÇÃO =====

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string; // Corrigido: string (UUID)
    username: string;
    email?: string;
  };
}

export interface UserProfile {
  id: string; // Corrigido: string (UUID)
  username: string;
  email?: string;
  created_at: string;
}

// ===== TIPOS PARA ERROS =====

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  status_code: number;
}

// ===== TIPOS UTILITÁRIOS =====

export type ApiEndpoints = {
  // Players
  players: () => string;
  player: (id: string) => string;
  activatePlayer: (id: string) => string;
  deactivatePlayer: (id: string) => string;
  
  // Monthly periods
  monthlyPeriods: () => string;
  monthlyPeriod: (id: string) => string;
  
  // Monthly payments
  monthlyPayments: () => string;
  
  // Monthly players
  monthlyPlayers: (periodId: string) => string;
  monthlyPlayer: (periodId: string, playerId: string) => string;
  
  // Casual players
  casualPlayers: (periodId: string) => string;
  casualPlayer: (periodId: string, id: string) => string;
  
  // Expenses
  expenses: (periodId: string) => string;
  expense: (periodId: string, id: string) => string;
  
  // Stats
  stats: () => string;
  playerStats: () => string;
  paymentStats: (periodId: string) => string;
};

// Constante com os endpoints
export const API_ENDPOINTS: ApiEndpoints = {
  // Players
  players: () => '/api/players',
  player: (id: string) => `/api/players/${id}`,
  activatePlayer: (id: string) => `/api/players/${id}/activate`,
  deactivatePlayer: (id: string) => `/api/players/${id}/deactivate`,
  
  // Monthly periods
  monthlyPeriods: () => '/api/monthly-periods',
  monthlyPeriod: (id: string) => `/api/monthly-periods/${id}`,
  
  // Monthly payments
  monthlyPayments: () => '/api/monthly-payments',
  
  // Monthly players
  monthlyPlayers: (periodId: string) => `/api/monthly-periods/${periodId}/players`,
  monthlyPlayer: (periodId: string, playerId: string) => `/api/monthly-periods/${periodId}/players/${playerId}`,
  
  // Casual players
  casualPlayers: (periodId: string) => `/api/monthly-periods/${periodId}/casual-players`,
  casualPlayer: (periodId: string, id: string) => `/api/monthly-periods/${periodId}/casual-players/${id}`,
  
  // Expenses
  expenses: (periodId: string) => `/api/monthly-periods/${periodId}/expenses`,
  expense: (periodId: string, id: string) => `/api/monthly-periods/${periodId}/expenses/${id}`,
  
  // Stats
  stats: () => '/api/stats',
  playerStats: () => '/api/stats/players',
  paymentStats: (periodId: string) => `/api/stats/payments/${periodId}`,
};
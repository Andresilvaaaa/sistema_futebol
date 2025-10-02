/**
 * Índice dos serviços da API
 * Centraliza todas as exportações dos serviços
 */

// Importa as classes e instâncias dos serviços
import { PlayersService, playersService } from './players';
import { PaymentsService, paymentsService } from './payments';
import { StatsService } from './stats';
import { statsService } from './stats';

// Exporta as classes
export { PlayersService } from './players';
export { PaymentsService } from './payments';
export { StatsService } from './stats';

// Cria e exporta instâncias dos serviços
export { playersService } from './players';
export { paymentsService } from './payments';
export { statsService } from './stats';

// Exporta tipos relacionados
export type {
  Player,
  MonthlyPlayer,
  MonthlyPeriod,
  CasualPlayer,
  Expense,
  CreatePlayerRequest,
  UpdatePlayerRequest,
  CreateMonthlyPeriodRequest,
  UpdatePaymentStatusRequest,
  PlayersFilters,
  MonthlyPaymentsFilters,
  PaginatedResponse,
  PlayerStats,
  PaymentStats,
  ApiErrorResponse
} from '../../types/api';

// Objeto com todos os serviços para uso conveniente
export const services = {
  players: playersService,
  payments: paymentsService,
  stats: statsService,
};

// Exportação padrão
export default services;
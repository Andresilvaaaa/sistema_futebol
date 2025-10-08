/**
 * Serviço para gerenciamento de pagamentos mensais
 * Implementa todas as operações relacionadas a períodos mensais e pagamentos com tipagem forte
 */

import { api, StandardApiResponse, PaginatedApiResponse, ApiException } from '../api';
import { toNum } from '../monthly-utils';
import {
  MonthlyPeriod,
  MonthlyPlayer,
  CasualPlayer,
  CreateMonthlyPeriodRequest,
  UpdateMonthlyPeriodRequest,
  CreateCasualPlayerRequest,
  UpdateCustomMonthlyFeeRequest,
  MonthlyPaymentsFilters,
  AddPlayersToMonthlyPeriodRequest
} from '../../types/api';

export class PaymentsService {
  private readonly baseEndpoint = '/api/monthly-periods';

  // === PERÍODOS MENSAIS ===

  /**
   * Lista períodos mensais com filtros e paginação
   */
  async getMonthlyPeriods(filters?: { year?: number; month?: number }): Promise<PaginatedApiResponse<MonthlyPeriod>> {
    try {
      const response = await api.get<MonthlyPeriod[] | PaginatedApiResponse<MonthlyPeriod>>(
        this.baseEndpoint,
        filters
      );

      // Backend retorna um array simples; adaptamos para o formato paginado esperado
      if (Array.isArray(response)) {
        const normalized = response.map((p) => ({
          ...p,
          year: toNum(p.year),
          month: toNum(p.month),
          total_expected: toNum(p.total_expected),
          total_received: toNum(p.total_received),
          players_count: toNum(p.players_count),
        }));
        return {
          success: true,
          data: normalized,
          pagination: {
            page: 1,
            pages: 1,
            per_page: normalized.length,
            total: normalized.length,
            has_next: false,
            has_prev: false,
          },
        } as PaginatedApiResponse<MonthlyPeriod>;
      }

      const typedResponse = response as PaginatedApiResponse<MonthlyPeriod>;
      this.validatePaginatedResponse(typedResponse);
      const data = (typedResponse.data || []).map((p) => ({
        ...p,
        year: toNum(p.year),
        month: toNum(p.month),
        total_expected: toNum(p.total_expected),
        total_received: toNum(p.total_received),
        players_count: toNum(p.players_count),
      }));
      return { ...typedResponse, data };
    } catch (error) {
      throw this.handleServiceError('Erro ao buscar períodos mensais', error);
    }
  }

  /**
   * Busca um período mensal específico por ID
   */
  async getMonthlyPeriod(id: string): Promise<StandardApiResponse<MonthlyPeriod>> {
    if (!id?.trim()) {
      throw new ApiException('ID do período é obrigatório', 400);
    }

    try {
      const response = await api.get<StandardApiResponse<MonthlyPeriod>>(
        `${this.baseEndpoint}/${id}`
      );
      
      this.validateStandardResponse(response);
      const normalized: MonthlyPeriod = {
        ...response.data,
        year: toNum(response.data.year),
        month: toNum(response.data.month),
        total_expected: toNum(response.data.total_expected),
        total_received: toNum(response.data.total_received),
        players_count: toNum(response.data.players_count),
      };
      return { ...response, data: normalized };
    } catch (error) {
      throw this.handleServiceError(`Erro ao buscar período ${id}`, error);
    }
  }

  /**
   * Cria um novo período mensal
   */
  async createMonthlyPeriod(periodData: CreateMonthlyPeriodRequest): Promise<StandardApiResponse<MonthlyPeriod>> {
    this.validateCreatePeriodData(periodData);

    // Garantir que apenas os campos esperados sejam enviados (year e month)
    const payload = {
      year: periodData.year,
      month: periodData.month,
    };

    try {
      // Criação de período ocorre em /monthly-payments no backend
      const response = await api.post<StandardApiResponse<MonthlyPeriod> | MonthlyPeriod>(
        '/api/monthly-payments',
        payload
      );

      // Backend pode retornar resposta padronizada ou objeto; normalizar
      if (response && typeof response === 'object' && 'success' in response) {
        const std = response as StandardApiResponse<MonthlyPeriod>;
        this.validateStandardResponse(std);
        const normalized: MonthlyPeriod = {
          ...std.data,
          year: toNum(std.data.year),
          month: toNum(std.data.month),
          total_expected: toNum(std.data.total_expected),
          total_received: toNum(std.data.total_received),
          players_count: toNum(std.data.players_count),
        };
        return { ...std, data: normalized };
      }

      // Caso retorne o objeto do período diretamente
      const normalized: MonthlyPeriod = {
        ...(response as MonthlyPeriod),
        year: toNum((response as MonthlyPeriod).year),
        month: toNum((response as MonthlyPeriod).month),
        total_expected: toNum((response as MonthlyPeriod).total_expected),
        total_received: toNum((response as MonthlyPeriod).total_received),
        players_count: toNum((response as MonthlyPeriod).players_count),
      };
      return {
        success: true,
        data: normalized,
        message: 'Período criado com sucesso',
      } as StandardApiResponse<MonthlyPeriod>;
    } catch (error) {
      throw this.handleServiceError('Erro ao criar período mensal', error);
    }
  }

  /**
   * Atualiza um período mensal existente
   */
  async updateMonthlyPeriod(id: string, periodData: UpdateMonthlyPeriodRequest): Promise<StandardApiResponse<MonthlyPeriod>> {
    if (!id?.trim()) {
      throw new ApiException('ID do período é obrigatório', 400);
    }

    this.validateUpdatePeriodData(periodData);

    try {
      const response = await api.put<StandardApiResponse<MonthlyPeriod>>(
        `${this.baseEndpoint}/${id}`,
        periodData
      );
      
      this.validateStandardResponse(response);
      const normalized: MonthlyPeriod = {
        ...response.data,
        year: toNum(response.data.year),
        month: toNum(response.data.month),
        total_expected: toNum(response.data.total_expected),
        total_received: toNum(response.data.total_received),
        players_count: toNum(response.data.players_count),
      };
      return { ...response, data: normalized };
    } catch (error) {
      throw this.handleServiceError(`Erro ao atualizar período ${id}`, error);
    }
  }

  /**
   * Remove um período mensal
   */
  async deleteMonthlyPeriod(id: string): Promise<StandardApiResponse<null>> {
    if (!id?.trim()) {
      throw new ApiException('ID do período é obrigatório', 400);
    }

    try {
      const response = await api.delete<StandardApiResponse<null>>(
        `${this.baseEndpoint}/${id}`
      );
      
      this.validateStandardResponse(response);
      
      return response;
    } catch (error) {
      throw this.handleServiceError(`Erro ao remover período ${id}`, error);
    }
  }

  // === JOGADORES MENSAIS ===

  /**
   * Lista jogadores de um período mensal com filtros
   */
  async getMonthlyPlayers(periodId: string, filters?: MonthlyPaymentsFilters): Promise<PaginatedApiResponse<MonthlyPlayer>> {
    if (!periodId?.trim()) {
      throw new ApiException('ID do período é obrigatório', 400);
    }

    try {
      const response = await api.get<MonthlyPlayer[] | PaginatedApiResponse<MonthlyPlayer>>(
        `/api/monthly-periods/${periodId}/players`,
        filters
      );

      // Backend retorna array simples; adaptar para paginado
      if (Array.isArray(response)) {
        const normalized = response.map((p) => ({
          ...p,
          monthly_fee: toNum(p.monthly_fee),
          custom_monthly_fee: p.custom_monthly_fee !== undefined ? toNum(p.custom_monthly_fee) : undefined,
          effective_monthly_fee: toNum(p.effective_monthly_fee),
          amount_paid: toNum(p.amount_paid),
          pending_months_count: toNum(p.pending_months_count),
        }));
        return {
          success: true,
          data: normalized,
          pagination: {
            page: 1,
            pages: 1,
            per_page: normalized.length,
            total: normalized.length,
            has_next: false,
            has_prev: false,
          },
        } as PaginatedApiResponse<MonthlyPlayer>;
      }

      const typedResponse = response as PaginatedApiResponse<MonthlyPlayer>;
      this.validatePaginatedResponse(typedResponse);
      const data = (typedResponse.data || []).map((p) => ({
        ...p,
        monthly_fee: toNum(p.monthly_fee),
        custom_monthly_fee: p.custom_monthly_fee !== undefined ? toNum(p.custom_monthly_fee) : undefined,
        effective_monthly_fee: toNum(p.effective_monthly_fee),
        amount_paid: toNum(p.amount_paid),
        pending_months_count: toNum(p.pending_months_count),
      }));
      return { ...typedResponse, data };
    } catch (error) {
      throw this.handleServiceError(`Erro ao buscar jogadores do período ${periodId}`, error);
    }
  }

  /**
   * Adiciona jogadores a um período mensal
   */
  async addPlayersToMonthlyPeriod(periodId: string, playersData: AddPlayersToMonthlyPeriodRequest): Promise<StandardApiResponse<MonthlyPlayer[]>> {
    console.log('[PaymentsService] addPlayersToMonthlyPeriod - INÍCIO');
    console.log('[PaymentsService] periodId:', periodId);
    console.log('[PaymentsService] playersData:', playersData);
    
    if (!periodId?.trim()) {
      console.error('[PaymentsService] Erro: ID do período é obrigatório');
      throw new ApiException('ID do período é obrigatório', 400);
    }

    this.validateAddPlayersData(playersData);
    console.log('[PaymentsService] Dados validados com sucesso');

    try {
      const endpoint = `/api/monthly-periods/${periodId}/players`;
      console.log('[PaymentsService] Endpoint da API:', endpoint);
      console.log('[PaymentsService] Dados a serem enviados:', JSON.stringify(playersData, null, 2));
      
      console.log('[PaymentsService] Chamando api.post...');
      const response = await api.post<StandardApiResponse<MonthlyPlayer[]>>(
        endpoint,
        playersData
      );
      
      console.log('[PaymentsService] Resposta recebida da API:', response);
      
      this.validateStandardResponse(response);
      console.log('[PaymentsService] Resposta validada com sucesso');
      
      const normalized = (response.data || []).map((p) => ({
        ...p,
        monthly_fee: toNum(p.monthly_fee),
        custom_monthly_fee: p.custom_monthly_fee !== undefined ? toNum(p.custom_monthly_fee) : undefined,
        effective_monthly_fee: toNum(p.effective_monthly_fee),
        amount_paid: toNum(p.amount_paid),
        pending_months_count: toNum(p.pending_months_count),
      }));
      
      console.log('[PaymentsService] Dados normalizados:', normalized);
      console.log('[PaymentsService] addPlayersToMonthlyPeriod - SUCESSO');
      
      return { ...response, data: normalized };
    } catch (error) {
      console.error('[PaymentsService] Erro ao adicionar jogadores:', error);
      console.error('[PaymentsService] Tipo do erro:', typeof error);
      console.error('[PaymentsService] Stack trace:', error instanceof Error ? error.stack : 'N/A');
      throw this.handleServiceError(`Erro ao adicionar jogadores ao período ${periodId}`, error);
    }
  }

  /**
   * Atualiza o status de pagamento de um jogador mensal
   */
  async updateMonthlyPlayerPayment(periodId: string, playerId: string, status: 'paid' | 'pending' | 'overdue'): Promise<StandardApiResponse<MonthlyPlayer>> {
    if (!periodId?.trim()) {
      throw new ApiException('ID do período é obrigatório', 400);
    }
    if (!playerId?.trim()) {
      throw new ApiException('ID do jogador é obrigatório', 400);
    }
    if (!['paid', 'pending', 'overdue'].includes(status)) {
      throw new ApiException('Status deve ser "paid", "pending" ou "overdue"', 400);
    }

    try {
      const response = await api.patch<StandardApiResponse<MonthlyPlayer>>(
        `/api/monthly-periods/${periodId}/players/${playerId}/payment`,
        { status }
      );
      
      this.validateStandardResponse(response);
      const normalized: MonthlyPlayer = {
        ...response.data,
        monthly_fee: toNum(response.data.monthly_fee),
        custom_monthly_fee: response.data.custom_monthly_fee !== undefined ? toNum(response.data.custom_monthly_fee) : undefined,
        effective_monthly_fee: toNum(response.data.effective_monthly_fee),
        amount_paid: toNum(response.data.amount_paid),
        pending_months_count: toNum(response.data.pending_months_count),
      };
      return { ...response, data: normalized };
    } catch (error) {
      throw this.handleServiceError(`Erro ao atualizar pagamento do jogador ${playerId}`, error);
    }
  }

  /**
   * Atualiza a mensalidade customizada de um jogador
   */
  async updateCustomMonthlyFee(periodId: string, playerId: string, feeData: UpdateCustomMonthlyFeeRequest): Promise<StandardApiResponse<MonthlyPlayer>> {
    if (!periodId?.trim()) {
      throw new ApiException('ID do período é obrigatório', 400);
    }
    if (!playerId?.trim()) {
      throw new ApiException('ID do jogador é obrigatório', 400);
    }

    this.validateCustomFeeData(feeData);

    try {
      const response = await api.patch<StandardApiResponse<MonthlyPlayer>>(
        `${this.baseEndpoint}/${periodId}/players/${playerId}/custom-fee`,
        feeData
      );
      
      this.validateStandardResponse(response);
      const normalized: MonthlyPlayer = {
        ...response.data,
        monthly_fee: toNum(response.data.monthly_fee),
        custom_monthly_fee: response.data.custom_monthly_fee !== undefined ? toNum(response.data.custom_monthly_fee) : undefined,
        effective_monthly_fee: toNum(response.data.effective_monthly_fee),
        amount_paid: toNum(response.data.amount_paid),
        pending_months_count: toNum(response.data.pending_months_count),
      };
      return { ...response, data: normalized };
    } catch (error) {
      throw this.handleServiceError(`Erro ao atualizar mensalidade customizada do jogador ${playerId}`, error);
    }
  }

  /**
   * Remove um jogador de um período mensal
   */
  async removePlayerFromMonthlyPeriod(periodId: string, playerId: string): Promise<StandardApiResponse<void>> {
    if (!periodId?.trim()) {
      throw new ApiException('ID do período é obrigatório', 400);
    }
    if (!playerId?.trim()) {
      throw new ApiException('ID do jogador é obrigatório', 400);
    }

    try {
      const response = await api.delete<StandardApiResponse<void>>(
        `/api/monthly-periods/${periodId}/players/${playerId}`
      );
      
      this.validateStandardResponse(response);
      
      return response;
    } catch (error) {
      throw this.handleServiceError(`Erro ao remover jogador ${playerId} do período ${periodId}`, error);
    }
  }

  // === JOGADORES AVULSOS ===

  /**
   * Lista jogadores avulsos de um período mensal
   */
  async getCasualPlayers(periodId: string): Promise<StandardApiResponse<CasualPlayer[]>> {
    if (!periodId?.trim()) {
      throw new ApiException('ID do período é obrigatório', 400);
    }

    try {
      const response = await api.get<CasualPlayer[] | StandardApiResponse<CasualPlayer[]>>(
        `${this.baseEndpoint}/${periodId}/casual-players`
      );

      // Backend retorna array direto; normalizar
      if (Array.isArray(response)) {
        const normalized = response.map((c) => ({
          ...c,
          amount: toNum(c.amount),
        }));
        return {
          success: true,
          data: normalized,
        } as StandardApiResponse<CasualPlayer[]>;
      }

      const typedResponse = response as StandardApiResponse<CasualPlayer[]>;
      this.validateStandardResponse(typedResponse);
      const normalized = (typedResponse.data || []).map((c) => ({
        ...c,
        amount: toNum(c.amount),
      }));
      return { ...typedResponse, data: normalized };
    } catch (error) {
      throw this.handleServiceError(`Erro ao buscar jogadores avulsos do período ${periodId}`, error);
    }
  }

  /**
   * Adiciona um jogador avulso a um período mensal
   */
  async addCasualPlayer(periodId: string, casualPlayerData: CreateCasualPlayerRequest): Promise<StandardApiResponse<CasualPlayer>> {
    if (!periodId?.trim()) {
      throw new ApiException('ID do período é obrigatório', 400);
    }

    this.validateCasualPlayerData(casualPlayerData);

    try {
      const response = await api.post<StandardApiResponse<CasualPlayer>>(
        `${this.baseEndpoint}/${periodId}/casual-players`,
        casualPlayerData
      );
      
      this.validateStandardResponse(response);
      const normalized: CasualPlayer = {
        ...response.data,
        amount: toNum(response.data.amount),
      };
      return { ...response, data: normalized };
    } catch (error) {
      throw this.handleServiceError(`Erro ao adicionar jogador avulso ao período ${periodId}`, error);
    }
  }

  /**
   * Remove um jogador avulso de um período mensal
   */
  async removeCasualPlayer(periodId: string, casualPlayerId: string): Promise<StandardApiResponse<null>> {
    if (!periodId?.trim()) {
      throw new ApiException('ID do período é obrigatório', 400);
    }
    if (!casualPlayerId?.trim()) {
      throw new ApiException('ID do jogador avulso é obrigatório', 400);
    }

    try {
      const response = await api.delete<StandardApiResponse<null>>(
        `${this.baseEndpoint}/${periodId}/casual-players/${casualPlayerId}`
      );
      
      this.validateStandardResponse(response);
      
      return response;
    } catch (error) {
      throw this.handleServiceError(`Erro ao remover jogador avulso ${casualPlayerId}`, error);
    }
  }

  /**
   * Atualiza o status de pagamento de um jogador avulso
   */
  async updateCasualPlayerPayment(
    periodId: string,
    casualPlayerId: string,
    status: 'paid' | 'pending'
  ): Promise<StandardApiResponse<CasualPlayer>> {
    if (!periodId?.trim()) {
      throw new ApiException('ID do período é obrigatório', 400);
    }
    if (!casualPlayerId?.trim()) {
      throw new ApiException('ID do jogador avulso é obrigatório', 400);
    }
    if (!['paid', 'pending'].includes(status)) {
      throw new ApiException('Status deve ser "paid" ou "pending"', 400);
    }

    try {
      const response = await api.patch<StandardApiResponse<CasualPlayer>>(
        `${this.baseEndpoint}/${periodId}/casual-players/${casualPlayerId}/payment`,
        { status }
      );

      this.validateStandardResponse(response);

      const normalized: CasualPlayer = {
        ...response.data,
        amount: toNum(response.data.amount),
      };

      return { ...response, data: normalized };
    } catch (error) {
      throw this.handleServiceError(
        `Erro ao atualizar pagamento do avulso ${casualPlayerId}`,
        error
      );
    }
  }

  // === MÉTODOS PRIVADOS DE VALIDAÇÃO ===

  /**
   * Valida dados para criação de período mensal
   */
  private validateCreatePeriodData(data: CreateMonthlyPeriodRequest): void {
    const errors: string[] = [];

    if (!data.year || data.year < 2020) {
      errors.push('Ano deve ser um valor válido');
    }

    if (!data.month || data.month < 1 || data.month > 12) {
      errors.push('Mês deve estar entre 1 e 12');
    }

    // monthly_fee não é aceito na criação do período pelo backend

    if (errors.length > 0) {
      throw new ApiException('Dados inválidos para criação do período', 400, { errors });
    }
  }

  /**
   * Valida dados para atualização de período mensal
   */
  private validateUpdatePeriodData(data: UpdateMonthlyPeriodRequest): void {
    const errors: string[] = [];

    if (data.monthly_fee !== undefined && (data.monthly_fee < 0 || data.monthly_fee > 9999.99)) {
      errors.push('Mensalidade deve estar entre 0 e 9999.99');
    }

    if (data.status && !['active', 'closed'].includes(data.status)) {
      errors.push('Status deve ser "active" ou "closed"');
    }

    if (errors.length > 0) {
      throw new ApiException('Dados inválidos para atualização do período', 400, { errors });
    }
  }

  /**
   * Valida dados para adicionar jogadores ao período
   */
  private validateAddPlayersData(data: AddPlayersToMonthlyPeriodRequest): void {
    const errors: string[] = [];

    if (!data.player_ids || !Array.isArray(data.player_ids) || data.player_ids.length === 0) {
      errors.push('Lista de IDs de jogadores é obrigatória');
    }

    if (data.player_ids?.some(id => !id?.trim())) {
      errors.push('Todos os IDs de jogadores devem ser válidos');
    }

    if (errors.length > 0) {
      throw new ApiException('Dados inválidos para adicionar jogadores', 400, { errors });
    }
  }

  /**
   * Valida dados de mensalidade customizada
   */
  private validateCustomFeeData(data: UpdateCustomMonthlyFeeRequest): void {
    const errors: string[] = [];

    if (data.custom_monthly_fee !== undefined && (data.custom_monthly_fee < 0 || data.custom_monthly_fee > 9999.99)) {
      errors.push('Mensalidade customizada deve estar entre 0 e 9999.99');
    }

    if (errors.length > 0) {
      throw new ApiException('Dados inválidos para mensalidade customizada', 400, { errors });
    }
  }

  /**
   * Valida dados de jogador avulso
   */
  private validateCasualPlayerData(data: CreateCasualPlayerRequest): void {
    const errors: string[] = [];

    if (!data.player_name?.trim()) {
      errors.push('Nome do jogador é obrigatório');
    }

    if (data.amount !== undefined && (data.amount < 0 || data.amount > 9999.99)) {
      errors.push('Valor deve estar entre 0 e 9999.99');
    }

    if (data.play_date && isNaN(Date.parse(data.play_date))) {
      errors.push('Data de jogo deve ser uma data válida');
    }

    if (errors.length > 0) {
      throw new ApiException('Dados inválidos para jogador avulso', 400, { errors });
    }
  }

  /**
   * Valida resposta padrão da API
   */
  private validateStandardResponse<T>(response: StandardApiResponse<T>): void {
    if (!response || typeof response !== 'object') {
      throw new ApiException('Resposta da API inválida', 500);
    }

    if (!response.success) {
      throw new ApiException(
        response.message || 'Operação falhou',
        500,
        response,
        response.errors
      );
    }
  }

  /**
   * Valida resposta paginada da API
   */
  private validatePaginatedResponse<T>(response: PaginatedApiResponse<T>): void {
    this.validateStandardResponse(response);

    if (!response.pagination || typeof response.pagination !== 'object') {
      throw new ApiException('Dados de paginação inválidos', 500);
    }

    const { pagination } = response;
    if (
      typeof pagination.page !== 'number' ||
      typeof pagination.pages !== 'number' ||
      typeof pagination.per_page !== 'number' ||
      typeof pagination.total !== 'number'
    ) {
      throw new ApiException('Estrutura de paginação inválida', 500);
    }
  }

  /**
   * Trata erros do serviço de forma consistente
   */
  private handleServiceError(message: string, error: unknown): ApiException {
    if (error instanceof ApiException) {
      return error;
    }

    if (error instanceof Error) {
      return new ApiException(
        `${message}: ${error.message}`,
        500,
        { originalError: error }
      );
    }

    return new ApiException(
      `${message}: Erro desconhecido`,
      500,
      { originalError: error }
    );
  }
}

// Instância singleton do serviço
export const paymentsService = new PaymentsService();

export default paymentsService;
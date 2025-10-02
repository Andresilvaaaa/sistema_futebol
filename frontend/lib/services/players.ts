/**
 * Serviço para gerenciamento de jogadores
 * Implementa todas as operações CRUD com tipagem forte e tratamento de erros consistente
 */

import { api, StandardApiResponse, PaginatedApiResponse, ApiException } from '../api';
import {
  Player,
  CreatePlayerRequest,
  UpdatePlayerRequest,
  PlayersFilters,
  PlayerStats
} from '../../types/api';

export class PlayersService {
  private readonly baseEndpoint = '/api/players';

  /**
   * Lista jogadores com filtros e paginação
   */
  async getPlayers(filters?: PlayersFilters): Promise<PaginatedApiResponse<Player>> {
    try {
      const response = await api.get<PaginatedApiResponse<Player>>(
        this.baseEndpoint,
        filters
      );
      
      // Valida estrutura da resposta
      this.validatePaginatedResponse(response);
      
      return response;
    } catch (error) {
      throw this.handleServiceError('Erro ao buscar jogadores', error);
    }
  }

  /**
   * Busca um jogador específico por ID
   */
  async getPlayer(id: string): Promise<StandardApiResponse<Player>> {
    if (!id?.trim()) {
      throw new ApiException('ID do jogador é obrigatório', 400);
    }

    try {
      const response = await api.get<StandardApiResponse<Player>>(
        `${this.baseEndpoint}/${id}`
      );
      
      this.validateStandardResponse(response);
      
      return response;
    } catch (error) {
      throw this.handleServiceError(`Erro ao buscar jogador ${id}`, error);
    }
  }

  /**
   * Cria um novo jogador
   */
  async createPlayer(playerData: CreatePlayerRequest): Promise<StandardApiResponse<Player>> {
    // Validação dos dados obrigatórios
    this.validateCreatePlayerData(playerData);

    try {
      const response = await api.post<StandardApiResponse<Player>>(
        this.baseEndpoint,
        playerData
      );
      
      this.validateStandardResponse(response);
      
      return response;
    } catch (error) {
      throw this.handleServiceError('Erro ao criar jogador', error);
    }
  }

  /**
   * Atualiza um jogador existente
   */
  async updatePlayer(id: string, playerData: UpdatePlayerRequest): Promise<StandardApiResponse<Player>> {
    if (!id?.trim()) {
      throw new ApiException('ID do jogador é obrigatório', 400);
    }

    // Validação dos dados de atualização
    this.validateUpdatePlayerData(playerData);

    try {
      const response = await api.put<StandardApiResponse<Player>>(
        `${this.baseEndpoint}/${id}`,
        playerData
      );
      
      this.validateStandardResponse(response);
      
      return response;
    } catch (error) {
      throw this.handleServiceError(`Erro ao atualizar jogador ${id}`, error);
    }
  }

  /**
   * Ativa um jogador
   */
  async activatePlayer(id: string): Promise<StandardApiResponse<Player>> {
    if (!id?.trim()) {
      throw new ApiException('ID do jogador é obrigatório', 400);
    }

    try {
      const response = await api.patch<StandardApiResponse<Player>>(
        `${this.baseEndpoint}/${id}/activate`
      );
      
      this.validateStandardResponse(response);
      
      return response;
    } catch (error) {
      throw this.handleServiceError(`Erro ao ativar jogador ${id}`, error);
    }
  }

  /**
   * Desativa um jogador
   */
  async deactivatePlayer(id: string): Promise<StandardApiResponse<Player>> {
    if (!id?.trim()) {
      throw new ApiException('ID do jogador é obrigatório', 400);
    }

    try {
      const response = await api.patch<StandardApiResponse<Player>>(
        `${this.baseEndpoint}/${id}/deactivate`
      );
      
      this.validateStandardResponse(response);
      
      return response;
    } catch (error) {
      throw this.handleServiceError(`Erro ao desativar jogador ${id}`, error);
    }
  }

  /**
   * Remove um jogador
   */
  async deletePlayer(id: string): Promise<StandardApiResponse<null>> {
    if (!id?.trim()) {
      throw new ApiException('ID do jogador é obrigatório', 400);
    }

    try {
      const response = await api.delete<StandardApiResponse<null>>(
        `${this.baseEndpoint}/${id}`
      );
      
      this.validateStandardResponse(response);
      
      return response;
    } catch (error) {
      throw this.handleServiceError(`Erro ao remover jogador ${id}`, error);
    }
  }

  /**
   * Busca estatísticas de um jogador
   */
  async getPlayerStats(id: string): Promise<StandardApiResponse<PlayerStats>> {
    if (!id?.trim()) {
      throw new ApiException('ID do jogador é obrigatório', 400);
    }

    try {
      const response = await api.get<StandardApiResponse<PlayerStats>>(
        `${this.baseEndpoint}/${id}/stats`
      );
      
      this.validateStandardResponse(response);
      
      return response;
    } catch (error) {
      throw this.handleServiceError(`Erro ao buscar estatísticas do jogador ${id}`, error);
    }
  }

  // Métodos privados de validação e tratamento de erros

  /**
   * Valida dados para criação de jogador
   */
  private validateCreatePlayerData(data: CreatePlayerRequest): void {
    const errors: string[] = [];

    if (!data.name?.trim()) {
      errors.push('Nome é obrigatório');
    }

    if (!data.phone?.trim()) {
      errors.push('Telefone é obrigatório');
    }

    if (data.monthly_fee !== undefined && (data.monthly_fee < 0 || data.monthly_fee > 9999.99)) {
      errors.push('Mensalidade deve estar entre 0 e 9999.99');
    }

    if (errors.length > 0) {
      throw new ApiException('Dados inválidos para criação do jogador', 400, { errors });
    }
  }

  /**
   * Valida dados para atualização de jogador
   */
  private validateUpdatePlayerData(data: UpdatePlayerRequest): void {
    const errors: string[] = [];

    if (data.name !== undefined && !data.name?.trim()) {
      errors.push('Nome não pode estar vazio');
    }

    if (data.phone !== undefined && !data.phone?.trim()) {
      errors.push('Telefone não pode estar vazio');
    }

    if (data.monthly_fee !== undefined && (data.monthly_fee < 0 || data.monthly_fee > 9999.99)) {
      errors.push('Mensalidade deve estar entre 0 e 9999.99');
    }

    if (data.status && !['active', 'inactive'].includes(data.status)) {
      errors.push('Status deve ser "active" ou "inactive"');
    }

    if (errors.length > 0) {
      throw new ApiException('Dados inválidos para atualização do jogador', 400, { errors });
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
export const playersService = new PlayersService();

export default playersService;
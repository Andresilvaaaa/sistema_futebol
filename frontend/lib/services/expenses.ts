/**
 * Serviço para gerenciamento de despesas mensais
 * Implementa operações CRUD com tratamento de erros consistente
 */

import { api, StandardApiResponse, ApiException } from '../api';
import type { Expense, CreateExpenseRequest, UpdateExpenseRequest } from '../../types/api';
import { API_ENDPOINTS } from '../../types/api';

export class ExpensesService {
  /**
   * Lista despesas de um período mensal
   */
  async getExpenses(periodId: string): Promise<StandardApiResponse<Expense[]>> {
    try {
      if (!periodId || typeof periodId !== 'string') {
        throw new ApiException('Período inválido para listar despesas', 400);
      }

      const response = await api.get<StandardApiResponse<Expense[]>>(API_ENDPOINTS.expenses(periodId));
      this.validateStandardResponse(response);
      return response;
    } catch (error) {
      throw this.handleServiceError('Erro ao buscar despesas', error);
    }
  }

  /**
   * Cria uma nova despesa em um período
   */
  async createExpense(periodId: string, data: CreateExpenseRequest): Promise<StandardApiResponse<Expense>> {
    try {
      if (!periodId || typeof periodId !== 'string') {
        throw new ApiException('Período inválido para criar despesa', 400);
      }

      this.validateCreateExpenseData(data);

      const response = await api.post<StandardApiResponse<Expense>>(API_ENDPOINTS.expenses(periodId), data);
      this.validateStandardResponse(response);
      return response;
    } catch (error) {
      throw this.handleServiceError('Erro ao criar despesa', error);
    }
  }

  /**
   * Atualiza uma despesa existente
   */
  async updateExpense(
    periodId: string,
    expenseId: string,
    data: UpdateExpenseRequest
  ): Promise<StandardApiResponse<Expense>> {
    try {
      if (!periodId || typeof periodId !== 'string') {
        throw new ApiException('Período inválido para atualizar despesa', 400);
      }
      if (!expenseId || typeof expenseId !== 'string') {
        throw new ApiException('ID da despesa inválido', 400);
      }

      // Normaliza campo de data para o backend (expense_date)
      const normalizedData: any = { ...data };
      if ((data as any).date && !data.expense_date) {
        normalizedData.expense_date = (data as any).date;
        delete normalizedData.date;
      }

      this.validateUpdateExpenseData(normalizedData);

      const response = await api.put<StandardApiResponse<Expense>>(API_ENDPOINTS.expense(periodId, expenseId), normalizedData);
      this.validateStandardResponse(response);
      return response;
    } catch (error) {
      throw this.handleServiceError('Erro ao atualizar despesa', error);
    }
  }

  /**
   * Remove uma despesa de um período
   */
  async deleteExpense(periodId: string, expenseId: string): Promise<StandardApiResponse<null>> {
    try {
      if (!periodId || typeof periodId !== 'string') {
        throw new ApiException('Período inválido para remover despesa', 400);
      }
      if (!expenseId || typeof expenseId !== 'string') {
        throw new ApiException('ID da despesa inválido', 400);
      }

      const response = await api.delete<StandardApiResponse<null>>(API_ENDPOINTS.expense(periodId, expenseId));
      this.validateStandardResponse(response);
      return response;
    } catch (error) {
      throw this.handleServiceError('Erro ao remover despesa', error);
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

  /**
   * Validação de criação de despesa
   */
  private validateCreateExpenseData(data: CreateExpenseRequest): void {
    const errors: string[] = [];

    if (!data.description || !data.description.trim()) {
      errors.push('Descrição é obrigatória');
    }

    if (data.amount === undefined || data.amount === null || isNaN(Number(data.amount))) {
      errors.push('Valor é obrigatório e deve ser numérico');
    } else if (data.amount < 0 || data.amount > 999999.99) {
      errors.push('Valor deve estar entre 0 e 999999.99');
    }

    if (!data.expense_date || isNaN(Date.parse(data.expense_date))) {
      errors.push('Data da despesa deve ser uma data válida');
    }

    if (errors.length > 0) {
      throw new ApiException('Dados inválidos para criação de despesa', 400, { errors });
    }
  }

  /**
   * Validação de atualização de despesa
   */
  private validateUpdateExpenseData(data: Partial<CreateExpenseRequest & { expense_date?: string }>): void {
    const errors: string[] = [];

    if (data.description !== undefined && !String(data.description).trim()) {
      errors.push('Descrição não pode ser vazia');
    }

    if (data.amount !== undefined) {
      const n = Number(data.amount);
      if (isNaN(n) || n < 0 || n > 999999.99) {
        errors.push('Valor deve estar entre 0 e 999999.99');
      }
    }

    if (data.expense_date !== undefined && isNaN(Date.parse(String(data.expense_date)))) {
      errors.push('Data da despesa deve ser uma data válida');
    }

    if (errors.length > 0) {
      throw new ApiException('Dados inválidos para atualização de despesa', 400, { errors });
    }
  }
}

// Instância singleton do serviço
export const expensesService = new ExpensesService();

export default expensesService;

// Reexporta tipos para conveniência no índice de serviços
export type { CreateExpenseRequest, UpdateExpenseRequest } from '../../types/api';

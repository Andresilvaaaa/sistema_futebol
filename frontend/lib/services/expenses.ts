/**
 * Serviço para gerenciamento de despesas
 * Implementa todas as operações CRUD relacionadas a despesas com tipagem forte
 */

import { api, StandardApiResponse, ApiException } from '../api';
import { Expense } from '../../types/api';

export interface CreateExpenseRequest {
  description: string;
  amount: number;
  category: string;
  expense_date: string; // YYYY-MM-DD format
  paid_by?: string;
  receipt_url?: string;
  notes?: string;
}

export interface UpdateExpenseRequest extends CreateExpenseRequest {}

export class ExpensesService {
  private readonly baseEndpoint = '/api/monthly-periods';

  /**
   * Lista despesas de um período mensal específico
   */
  async getExpenses(periodId: string): Promise<StandardApiResponse<Expense[]>> {
    try {
      const response = await api.get<Expense[]>(`${this.baseEndpoint}/${periodId}/expenses`);
      
      if (Array.isArray(response)) {
        return {
          success: true,
          data: response,
          message: 'Despesas carregadas com sucesso'
        };
      }

      throw new ApiException('Formato de resposta inválido', 500);
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(`Erro ao carregar despesas: ${error}`, 500);
    }
  }

  /**
   * Cria uma nova despesa
   */
  async createExpense(periodId: string, expenseData: CreateExpenseRequest): Promise<StandardApiResponse<Expense>> {
    try {
      if (!periodId) {
        throw new ApiException('ID do período é obrigatório', 400);
      }

      if (!expenseData) {
        throw new ApiException('Dados da despesa são obrigatórios', 400);
      }

      const response = await api.post<Expense>(
        `${this.baseEndpoint}/${periodId}/expenses`,
        expenseData
      );

      return {
        success: true,
        data: response,
        message: 'Despesa criada com sucesso'
      };
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(`Erro ao criar despesa: ${error}`, 500);
    }
  }

  /**
   * Atualiza uma despesa existente
   */
  async updateExpense(
    periodId: string, 
    expenseId: string, 
    expenseData: UpdateExpenseRequest
  ): Promise<StandardApiResponse<Expense>> {
    try {
      if (!periodId) {
        throw new ApiException('ID do período é obrigatório', 400);
      }

      if (!expenseId) {
        throw new ApiException('ID da despesa é obrigatório', 400);
      }

      if (!expenseData) {
        throw new ApiException('Dados da despesa são obrigatórios', 400);
      }

      const response = await api.put<Expense>(
        `${this.baseEndpoint}/${periodId}/expenses/${expenseId}`,
        expenseData
      );

      return {
        success: true,
        data: response,
        message: 'Despesa atualizada com sucesso'
      };
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(`Erro ao atualizar despesa: ${error}`, 500);
    }
  }

  /**
   * Remove uma despesa
   */
  async deleteExpense(periodId: string, expenseId: string): Promise<StandardApiResponse<null>> {
    try {
      if (!periodId) {
        throw new ApiException('ID do período é obrigatório', 400);
      }

      if (!expenseId) {
        throw new ApiException('ID da despesa é obrigatório', 400);
      }

      await api.delete(`${this.baseEndpoint}/${periodId}/expenses/${expenseId}`);

      return {
        success: true,
        data: null,
        message: 'Despesa removida com sucesso'
      };
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(`Erro ao remover despesa: ${error}`, 500);
    }
  }

  /**
   * Valida dados de despesa antes do envio
   */
  private validateExpenseData(data: CreateExpenseRequest | UpdateExpenseRequest): void {
    if (!data.description?.trim()) {
      throw new ApiException('Descrição é obrigatória', 400);
    }

    if (!data.amount || data.amount <= 0) {
      throw new ApiException('Valor deve ser maior que zero', 400);
    }

    if (!data.category?.trim()) {
      throw new ApiException('Categoria é obrigatória', 400);
    }

    if (!data.expense_date) {
      throw new ApiException('Data da despesa é obrigatória', 400);
    }

    // Validar formato da data (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.expense_date)) {
      throw new ApiException('Data deve estar no formato YYYY-MM-DD', 400);
    }
  }
}

// Instância singleton do serviço
export const expensesService = new ExpensesService();

// Exportação padrão
export default expensesService;
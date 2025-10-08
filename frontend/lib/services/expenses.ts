/**
 * Serviço para gerenciamento de despesas
 * Implementa todas as operações CRUD relacionadas a despesas com tipagem forte
 */

import { api, StandardApiResponse, ApiException } from '../api';
import { toNum } from '../monthly-utils';
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
        const normalized = response.map((e) => ({
          ...e,
          amount: toNum(e.amount),
        }));
        return {
          success: true,
          data: normalized,
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

      // Validar e normalizar dados antes do envio (converte data para ISO)
      this.validateExpenseData(expenseData)

      const response = await api.post<StandardApiResponse<Expense>>( 
        `${this.baseEndpoint}/${periodId}/expenses`,
        expenseData
      );

      // O cliente API já retorna a resposta padronizada do backend
      const normalized: Expense = {
        ...response.data,
        amount: toNum(response.data.amount),
      };
      return { ...response, data: normalized };
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

      // Validação flexível para atualizações (permite campos parciais)
      this.validateUpdateExpenseData(expenseData);

      const response = await api.put<StandardApiResponse<Expense>>(
        `${this.baseEndpoint}/${periodId}/expenses/${expenseId}`,
        expenseData
      );

      const normalized: Expense = {
        ...response.data,
        amount: toNum(response.data.amount),
      };
      return { ...response, data: normalized };
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
   * Converte data do formato brasileiro (DD/MM/YYYY ou DD/MM/YY) para ISO (YYYY-MM-DD)
   */
  private convertDateToISO(dateString: string): string {
    // Remove espaços em branco para evitar falhas de validação
    dateString = (dateString || '').trim();
    // Se já está no formato ISO (YYYY-MM-DD), retorna como está
    const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (isoRegex.test(dateString)) {
      return dateString;
    }

    // Se está no formato brasileiro (DD/MM/YYYY ou DD/MM/YY)
    const brRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/;
    const match = dateString.match(brRegex);
    
    if (match) {
      let [, day, month, year] = match;
      
      // Converte ano de 2 dígitos para 4 dígitos
      if (year.length === 2) {
        const currentYear = new Date().getFullYear();
        const currentCentury = Math.floor(currentYear / 100) * 100;
        const yearNum = parseInt(year);
        
        // Se o ano for menor que 50, assume século atual, senão século anterior
        if (yearNum <= 50) {
          year = (currentCentury + yearNum).toString();
        } else {
          year = (currentCentury - 100 + yearNum).toString();
        }
      }
      
      // Adiciona zeros à esquerda se necessário
      day = day.padStart(2, '0');
      month = month.padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    }

    // Se não conseguiu converter, retorna a string original
    return dateString;
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

    // Converte a data para formato ISO se necessário
    data.expense_date = this.convertDateToISO(data.expense_date);

    // Validar formato da data (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.expense_date)) {
      throw new ApiException('Data deve estar no formato DD/MM/YYYY, DD/MM/YY ou YYYY-MM-DD', 400);
    }

    // Validar se a data é válida
    const dateObj = new Date(data.expense_date);
    if (isNaN(dateObj.getTime())) {
      throw new ApiException('Data inválida', 400);
    }
  }

  /**
   * Valida dados para atualização (campos opcionais permitidos)
   */
  private validateUpdateExpenseData(data: Partial<UpdateExpenseRequest>): void {
    // Garante que há pelo menos um campo para atualizar
    const hasAnyField = (
      data.description !== undefined ||
      data.amount !== undefined ||
      data.category !== undefined ||
      data.expense_date !== undefined ||
      data.notes !== undefined ||
      data.paid_by !== undefined ||
      data.receipt_url !== undefined
    );
    if (!hasAnyField) {
      throw new ApiException('Nenhum campo para atualizar foi fornecido', 400);
    }

    if (data.description !== undefined && !data.description.trim()) {
      throw new ApiException('Descrição não pode estar vazia', 400);
    }

    if (data.amount !== undefined) {
      if (typeof data.amount !== 'number' || isNaN(data.amount) || data.amount <= 0) {
        throw new ApiException('Valor deve ser um número maior que zero', 400);
      }
    }

    if (data.category !== undefined && !data.category.trim()) {
      throw new ApiException('Categoria não pode estar vazia', 400);
    }

    if (data.expense_date !== undefined) {
      data.expense_date = this.convertDateToISO(data.expense_date);
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(data.expense_date)) {
        throw new ApiException('Data deve estar no formato DD/MM/YYYY, DD/MM/YY ou YYYY-MM-DD', 400);
      }
      const dateObj = new Date(data.expense_date);
      if (isNaN(dateObj.getTime())) {
        throw new ApiException('Data inválida', 400);
      }
    }
  }
}

// Instância singleton do serviço
export const expensesService = new ExpensesService();

// Exportação padrão
export default expensesService;
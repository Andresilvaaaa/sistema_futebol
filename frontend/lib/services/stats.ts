/**
 * Serviço para gerenciamento de estatísticas e relatórios
 * Implementa operações relacionadas às estatísticas do sistema
 */

import { api } from '../api';
import { 
  PlayerStats,
  PaymentStats,
  ApiPlayerStats,
  API_ENDPOINTS 
} from '../../types/api';

export class StatsService {
  
  /**
   * Obtém estatísticas gerais dos jogadores
   * @returns Promise com estatísticas dos jogadores
   */
  static async getPlayerStats(): Promise<PlayerStats> {
    try {
      const response = await api.get<ApiPlayerStats>(
        API_ENDPOINTS.playerStats()
      );
      // Mapear formato da API para formato interno
      const apiStats = (response as any).data ? (response as any).data as ApiPlayerStats : (response as ApiPlayerStats);
      const mapped: PlayerStats = {
        total_players: Number(apiStats.total ?? 0),
        active_players: Number(apiStats.active ?? 0),
        inactive_players: Number(apiStats.inactive ?? 0),
        pending_players: Number((apiStats as any).pending ?? 0),
        delayed_players: Number((apiStats as any).delayed ?? 0),
        // players_by_position não é retornado por este endpoint atualmente
        players_by_position: undefined,
      };
      // Se a resposta estiver no formato StandardApiResponse
      if ((response as any)?.success) {
        return mapped;
      }
      // Compatibilidade com formato antigo direto
      return mapped;
    } catch (error) {
      console.error('Erro ao buscar estatísticas dos jogadores:', error);
      throw error;
    }
  }

  /**
   * Obtém estatísticas de pagamentos para um mês específico
   * @param year - Ano
   * @param month - Mês (1-12)
   * @returns Promise com estatísticas de pagamentos
   */
  static async getPaymentStats(year: number, month: number): Promise<PaymentStats> {
    try {
      const response = await api.get<PaymentStats>(
        API_ENDPOINTS.paymentStats(year, month)
      );
      return response;
    } catch (error) {
      console.error(`Erro ao buscar estatísticas de pagamentos:`, error);
      throw error;
    }
  }

  /**
   * Obtém estatísticas de múltiplos meses para comparação
   * @param periods - Array de períodos {year, month}
   * @returns Promise com estatísticas de múltiplos períodos
   */
  static async getMultipleMonthsStats(
    periods: Array<{ year: number; month: number }>
  ): Promise<PaymentStats[]> {
    try {
      const promises = periods.map(period => 
        this.getPaymentStats(period.year, period.month)
      );
      
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      console.error('Erro ao buscar estatísticas de múltiplos meses:', error);
      throw error;
    }
  }

  /**
   * Obtém estatísticas do ano atual (todos os meses)
   * @param year - Ano desejado
   * @returns Promise com estatísticas de todos os meses do ano
   */
  static async getYearStats(year: number): Promise<PaymentStats[]> {
    const months = Array.from({ length: 12 }, (_, i) => ({
      year,
      month: i + 1
    }));

    return this.getMultipleMonthsStats(months);
  }

  /**
   * Obtém dashboard completo com todas as estatísticas
   * @param year - Ano atual
   * @param month - Mês atual
   * @returns Promise com dados completos do dashboard
   */
  static async getDashboardStats(year: number, month: number) {
    try {
      const [playerStats, currentMonthStats, yearStats] = await Promise.all([
        this.getPlayerStats(),
        this.getPaymentStats(year, month),
        this.getYearStats(year)
      ]);

      // Calcula estatísticas do ano
      const yearSummary = yearStats.reduce((acc, monthStat) => {
        acc.totalExpected += monthStat.total_amount_expected;
        acc.totalReceived += monthStat.total_amount_received;
        acc.totalPlayers += monthStat.total_players;
        acc.totalPaid += monthStat.paid_players;
        return acc;
      }, {
        totalExpected: 0,
        totalReceived: 0,
        totalPlayers: 0,
        totalPaid: 0
      });

      return {
        players: playerStats,
        currentMonth: currentMonthStats,
        yearStats,
        yearSummary: {
          ...yearSummary,
          averagePaymentRate: yearStats.length > 0 
            ? yearStats.reduce((acc, stat) => acc + stat.payment_rate, 0) / yearStats.length
            : 0
        }
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas do dashboard:', error);
      throw error;
    }
  }

  /**
   * Obtém tendências de pagamento (últimos 6 meses)
   * @returns Promise com dados de tendência
   */
  static async getPaymentTrends() {
    try {
      const now = new Date();
      const periods: Array<{ year: number; month: number }> = [];

      // Gera os últimos 6 meses
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        periods.push({
          year: date.getFullYear(),
          month: date.getMonth() + 1
        });
      }

      const stats = await this.getMultipleMonthsStats(periods);
      
      return stats.map((stat, index) => ({
        ...stat,
        period: `${periods[index].month}/${periods[index].year}`,
        monthName: new Date(periods[index].year, periods[index].month - 1)
          .toLocaleDateString('pt-BR', { month: 'long' })
      }));
    } catch (error) {
      console.error('Erro ao buscar tendências de pagamento:', error);
      throw error;
    }
  }

  /**
   * Obtém estatísticas por posição dos jogadores
   * @returns Promise com estatísticas agrupadas por posição
   */
  static async getPositionStats() {
    try {
      const playerStats = await this.getPlayerStats();
      const byPos = playerStats.players_by_position || {};
      const total = playerStats.total_players || 0;
      return Object.entries(byPos).map(([position, count]) => ({
        position,
        count,
        percentage: total > 0 ? (Number(count) / total) * 100 : 0
      }));
    } catch (error) {
      console.error('Erro ao buscar estatísticas por posição:', error);
      throw error;
    }
  }

  /**
   * Calcula KPIs principais do sistema
   * @param year - Ano atual
   * @param month - Mês atual
   * @returns Promise com KPIs calculados
   */
  static async getKPIs(year: number, month: number) {
    try {
      const [playerStats, paymentStats, trends] = await Promise.all([
        this.getPlayerStats(),
        this.getPaymentStats(year, month),
        this.getPaymentTrends()
      ]);

      // Calcula crescimento em relação ao mês anterior
      const previousMonth = trends[trends.length - 2];
      const currentMonth = trends[trends.length - 1];
      
      const paymentGrowth = previousMonth 
        ? ((currentMonth.payment_rate - previousMonth.payment_rate) / previousMonth.payment_rate) * 100
        : 0;

      const revenueGrowth = previousMonth
        ? ((currentMonth.total_amount_received - previousMonth.total_amount_received) / previousMonth.total_amount_received) * 100
        : 0;

      return {
        totalPlayers: playerStats.total_players,
        activePlayers: playerStats.active_players,
        paymentRate: paymentStats.payment_rate,
        monthlyRevenue: paymentStats.total_amount_received,
        paymentGrowth,
        revenueGrowth,
        averageRevenuePerPlayer: paymentStats.total_players > 0 
          ? paymentStats.total_amount_received / paymentStats.total_players 
          : 0
      };
    } catch (error) {
      console.error('Erro ao calcular KPIs:', error);
      throw error;
    }
  }
}

// Exporta instância para uso direto
export const statsService = StatsService;
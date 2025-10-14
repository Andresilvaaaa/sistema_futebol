import type { MonthlyFinancials, CashFlowSummary } from "@/types/cashflow"
import { paymentsService } from "./services/payments"
import { expensesService } from "./services/expenses"

const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export async function getCashflowByMonth(params?: { startYear?: number; endYear?: number }): Promise<MonthlyFinancials[]> {
  const periodsRes = await paymentsService.getMonthlyPeriods()
  const periods = periodsRes.data || []

  const filtered = periods.filter((p) => {
    if (params?.startYear && p.year < params.startYear) return false
    if (params?.endYear && p.year > params.endYear) return false
    return true
  })

  // Map to MonthlyFinancials base (income from monthly periods totals)
  const base: MonthlyFinancials[] = filtered
    .sort((a, b) => (a.year - b.year) || (a.month - b.month))
    .map((p) => ({
      month: MONTH_NAMES[p.month - 1] || String(p.month),
      year: p.year,
      monthNumber: p.month,
      income: p.total_received,
      expenses: 0,
      balance: 0,
      profit: 0,
    }))

  // Buscar despesas por período em paralelo e agregar
  const start = (typeof performance !== 'undefined') ? performance.now() : Date.now()
  const expensePromises = filtered.map(async (p) => {
    try {
      const expRes = await expensesService.getExpenses(p.id)
      const totalExpenses = (expRes.data || []).reduce((sum, e) => sum + (e.amount || 0), 0)
      return { period: p, totalExpenses }
    } catch (_e) {
      return { period: p, totalExpenses: 0 }
    }
  })

  const expenseResults = await Promise.all(expensePromises)
  expenseResults.forEach(({ period: p, totalExpenses }) => {
    const idx = base.findIndex((m) => m.year === p.year && m.monthNumber === p.month)
    if (idx >= 0) {
      base[idx].expenses = totalExpenses
      base[idx].balance = base[idx].income - base[idx].expenses
      base[idx].profit = base[idx].balance
    }
  })
  const end = (typeof performance !== 'undefined') ? performance.now() : Date.now()
  const duration = Math.round(end - start)
  try {
    console.log(`[Perf][Cashflow] Agregação de despesas (${filtered.length} períodos) -> ${duration}ms`)
    if (typeof window !== 'undefined') {
      ;(window as any).__perfMetrics = (window as any).__perfMetrics || []
      ;(window as any).__perfMetrics.push({
        type: 'cashflow', action: 'aggregate-expenses', periodsCount: filtered.length, duration, timestamp: Date.now()
      })
    }
  } catch (_e) {
    // silent
  }

  return base
}

export async function getCashflowSummary(financials?: MonthlyFinancials[]): Promise<CashFlowSummary> {
  const data = financials ?? await getCashflowByMonth()
  const totalIncome = data.reduce((sum, m) => sum + m.income, 0)
  const totalExpenses = data.reduce((sum, m) => sum + m.expenses, 0)
  const currentBalance = totalIncome - totalExpenses
  const totalProfit = currentBalance
  return { totalIncome, totalExpenses, currentBalance, totalProfit }
}

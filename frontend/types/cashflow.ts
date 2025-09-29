export interface MonthlyFinancials {
  month: string
  year: number
  monthNumber: number
  income: number
  expenses: number
  balance: number
  profit: number
}

export interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
  month: number
  year: number
}

export interface CashFlowSummary {
  totalIncome: number
  totalExpenses: number
  currentBalance: number
  totalProfit: number
}

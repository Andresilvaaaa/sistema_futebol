import type { MonthlyFinancials, Expense } from "@/types/cashflow"

export const mockExpenses: Expense[] = [
  {
    id: "1",
    description: "Aluguel do Campo",
    amount: 900,
    category: "Campo",
    date: "2024-08-01",
    month: 8,
    year: 2024,
  },
  {
    id: "2",
    description: "Bolas de Futebol",
    amount: 150,
    category: "Equipamentos",
    date: "2024-08-15",
    month: 8,
    year: 2024,
  },
  {
    id: "3",
    description: "Aluguel do Campo",
    amount: 900,
    category: "Campo",
    date: "2024-09-01",
    month: 9,
    year: 2024,
  },
  {
    id: "4",
    description: "Uniformes",
    amount: 300,
    category: "Equipamentos",
    date: "2024-09-10",
    month: 9,
    year: 2024,
  },
]

export const generateMockFinancials = (): MonthlyFinancials[] => {
  const months = [
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
  ]

  return months.map((month, index) => {
    const monthNumber = index < 5 ? index + 8 : index - 4
    const year = index < 5 ? 2024 : 2025

    // Mock income data - in real app this would come from monthly payments
    const baseIncome = 1000 + Math.random() * 500
    const income = Math.round(baseIncome / 10) * 10

    // Mock expenses data
    const baseExpenses = 800 + Math.random() * 300
    const expenses = Math.round(baseExpenses / 10) * 10

    const balance = income - expenses
    const profit = balance

    return {
      month,
      year,
      monthNumber,
      income,
      expenses,
      balance,
      profit,
    }
  })
}

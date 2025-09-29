"use client"

import { useState, useEffect } from "react"
import type { Expense } from "@/types/cashflow"
import { mockExpenses } from "@/lib/cashflow-data"
import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { ExpenseCategoriesSummary } from "@/components/expense-categories-summary"
import { ExpensesTable } from "@/components/expenses-table"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingDown, Calendar, DollarSign, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load expenses from localStorage or use mock data
    const savedExpenses = localStorage.getItem("expenses")
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    } else {
      setExpenses(mockExpenses)
      localStorage.setItem("expenses", JSON.stringify(mockExpenses))
    }
  }, [])

  const saveExpensesToStorage = (updatedExpenses: Expense[]) => {
    setExpenses(updatedExpenses)
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
  }

  const handleAddExpense = (newExpenseData: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...newExpenseData,
      id: Date.now().toString(),
    }
    const updatedExpenses = [...expenses, newExpense]
    saveExpensesToStorage(updatedExpenses)

    toast({
      title: "Despesa adicionada",
      description: `${newExpense.description} - R$ ${newExpense.amount.toLocaleString("pt-BR")}`,
    })
  }

  const handleDeleteExpense = (expenseId: string) => {
    const updatedExpenses = expenses.filter((e) => e.id !== expenseId)
    saveExpensesToStorage(updatedExpenses)

    toast({
      title: "Despesa excluída",
      description: "A despesa foi removida com sucesso",
    })
  }

  const handleEditExpense = (expenseId: string, updatedExpenseData: Omit<Expense, "id">) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === expenseId ? { ...updatedExpenseData, id: expenseId } : expense,
    )
    saveExpensesToStorage(updatedExpenses)

    toast({
      title: "Despesa atualizada",
      description: `${updatedExpenseData.description} foi editada com sucesso`,
    })
  }

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const monthlyExpenses = expenses
    .filter((e) => e.month === currentMonth && e.year === currentYear)
    .reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">GESTÃO DE DESPESAS</h1>
            <p className="text-muted-foreground mt-1">Controle e categorização de gastos mensais</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <AddExpenseDialog onAddExpense={handleAddExpense} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm text-muted-foreground">Total de Despesas</span>
            </div>
            <div className="text-2xl font-bold text-red-600">R$ {totalExpenses.toLocaleString("pt-BR")}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-sm text-muted-foreground">Despesas do Mês</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">R$ {monthlyExpenses.toLocaleString("pt-BR")}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm text-muted-foreground">Média Mensal</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">R$ {(totalExpenses / 12).toLocaleString("pt-BR")}</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ExpensesTable
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
              onEditExpense={handleEditExpense}
            />
          </div>
          <div>
            <ExpenseCategoriesSummary expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  )
}

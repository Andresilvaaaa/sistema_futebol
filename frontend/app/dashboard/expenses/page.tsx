"use client"

import { useState, useEffect } from "react"
import type { Expense } from "@/types/api"
import { expensesService, CreateExpenseRequest, UpdateExpenseRequest } from "@/lib/services"
import { paymentsService } from "@/lib/services"
import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { ExpenseCategoriesSummary } from "@/components/expense-categories-summary"
import { ExpensesTable } from "@/components/expenses-table"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingDown, Calendar, DollarSign, Download, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import AuthGuard from "@/components/auth-guard"

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPeriodId, setCurrentPeriodId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadCurrentPeriodAndExpenses()
  }, [])

  const loadCurrentPeriodAndExpenses = async () => {
    try {
      setLoading(true)
      
      // Buscar período atual (mês/ano atual)
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth() + 1
      const currentYear = currentDate.getFullYear()
      
      const periodsResponse = await paymentsService.getMonthlyPeriods({
        month: currentMonth,
        year: currentYear
      })
      
      if (periodsResponse.success && periodsResponse.data.length > 0) {
        const period = periodsResponse.data[0]
        setCurrentPeriodId(period.id)
        
        // Carregar despesas do período atual
        await loadExpenses(period.id)
      } else {
        // Se não há período atual, criar um vazio
        setExpenses([])
        toast({
          title: "Aviso",
          description: "Nenhum período mensal encontrado para o mês atual",
          variant: "default"
        })
      }
    } catch (error) {
      console.error('Erro ao carregar período e despesas:', error)
      toast({
        title: "Erro",
        description: "Erro ao carregar dados. Usando dados locais.",
        variant: "destructive"
      })
      
      // Fallback para dados locais
      loadLocalExpenses()
    } finally {
      setLoading(false)
    }
  }

  const loadExpenses = async (periodId: string) => {
    try {
      const response = await expensesService.getExpenses(periodId)
      if (response.success) {
        setExpenses(response.data)
      }
    } catch (error) {
      console.error('Erro ao carregar despesas:', error)
      toast({
        title: "Erro",
        description: "Erro ao carregar despesas",
        variant: "destructive"
      })
    }
  }

  const loadLocalExpenses = () => {
    // Fallback para dados locais (mock)
    const savedExpenses = localStorage.getItem("expenses")
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    } else {
      setExpenses([])
    }
  }

  const handleAddExpense = async (newExpenseData: CreateExpenseRequest) => {
    if (!currentPeriodId) {
      toast({
        title: "Erro",
        description: "Nenhum período mensal ativo encontrado",
        variant: "destructive"
      })
      return
    }

    try {
      const response = await expensesService.createExpense(currentPeriodId, newExpenseData)
      
      if (response.success) {
        setExpenses(prev => [...prev, response.data])
        toast({
          title: "Sucesso",
          description: response.message || "Despesa adicionada com sucesso"
        })
      }
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error)
      toast({
        title: "Erro",
        description: "Erro ao adicionar despesa",
        variant: "destructive"
      })
    }
  }

  const handleDeleteExpense = async (expenseId: string) => {
    if (!currentPeriodId) {
      toast({
        title: "Erro",
        description: "Nenhum período mensal ativo encontrado",
        variant: "destructive"
      })
      return
    }

    try {
      const response = await expensesService.deleteExpense(currentPeriodId, expenseId)
      
      if (response.success) {
        setExpenses(prev => prev.filter(e => e.id !== expenseId))
        toast({
          title: "Sucesso",
          description: response.message || "Despesa removida com sucesso"
        })
      }
    } catch (error) {
      console.error('Erro ao remover despesa:', error)
      toast({
        title: "Erro",
        description: "Erro ao remover despesa",
        variant: "destructive"
      })
    }
  }

  const handleEditExpense = async (expenseId: string, updatedExpenseData: UpdateExpenseRequest) => {
    if (!currentPeriodId) {
      toast({
        title: "Erro",
        description: "Nenhum período mensal ativo encontrado",
        variant: "destructive"
      })
      return
    }

    try {
      const response = await expensesService.updateExpense(currentPeriodId, expenseId, updatedExpenseData)
      
      if (response.success) {
        setExpenses(prev => prev.map(expense => 
          expense.id === expenseId ? response.data : expense
        ))
        toast({
          title: "Sucesso",
          description: response.message || "Despesa atualizada com sucesso"
        })
      }
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar despesa",
        variant: "destructive"
      })
    }
  }

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const monthlyExpenses = expenses
    .filter((e) => e.month === currentMonth && e.year === currentYear)
    .reduce((sum, expense) => sum + expense.amount, 0)

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background p-6 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Carregando despesas...</span>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
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
    </AuthGuard>
  )
}

"use client"

import { useState, useEffect } from "react"
import type { MonthlyFinancials, CashFlowSummary } from "@/types/cashflow"
import { generateMockFinancials } from "@/lib/cashflow-data"
import { FinancialSummaryCards } from "@/components/financial-summary-cards"
import { MonthlyBreakdown } from "@/components/monthly-breakdown"
import { Button } from "@/components/ui/button"
import { Filter, Download } from "lucide-react"

export default function CashFlowPage() {
  const [financials, setFinancials] = useState<MonthlyFinancials[]>([])
  const [summary, setSummary] = useState<CashFlowSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    currentBalance: 0,
    totalProfit: 0,
  })

  useEffect(() => {
    // Load or generate financial data
    const savedFinancials = localStorage.getItem("monthlyFinancials")
    let monthlyData: MonthlyFinancials[]

    if (savedFinancials) {
      monthlyData = JSON.parse(savedFinancials)
    } else {
      monthlyData = generateMockFinancials()
      localStorage.setItem("monthlyFinancials", JSON.stringify(monthlyData))
    }

    setFinancials(monthlyData)

    // Calculate summary
    const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0)
    const totalExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0)
    const currentBalance = totalIncome - totalExpenses
    const totalProfit = currentBalance

    setSummary({
      totalIncome,
      totalExpenses,
      currentBalance,
      totalProfit,
    })
  }, [])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">FLUXO DE CAIXA</h1>
            <p className="text-muted-foreground mt-1">Controle financeiro mensal e análise de receitas vs despesas</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <FinancialSummaryCards summary={summary} />

        {/* Monthly Breakdown */}
        <MonthlyBreakdown financials={financials} />
      </div>
    </div>
  )
}

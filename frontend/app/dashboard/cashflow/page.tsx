"use client"

import { useState, useEffect } from "react"
import type { MonthlyFinancials, CashFlowSummary } from "@/types/cashflow"
import { getCashflowByMonth, getCashflowSummary } from "@/lib/cashflow-data"
import { FinancialSummaryCards } from "@/components/financial-summary-cards"
import { MonthlyBreakdown } from "@/components/monthly-breakdown"
import { Button } from "@/components/ui/button"
import { Filter, Download } from "lucide-react"
import AuthGuard from "@/components/auth-guard"

export default function CashFlowPage() {
  const [financials, setFinancials] = useState<MonthlyFinancials[]>([])
  const [summary, setSummary] = useState<CashFlowSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    currentBalance: 0,
    totalProfit: 0,
  })

  useEffect(() => {
    const load = async () => {
      const monthlyData = await getCashflowByMonth()
      setFinancials(monthlyData)
      const s = await getCashflowSummary(monthlyData)
      setSummary(s)
    }
    load()
  }, [])

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background py-6 px-3">
      <div className="container-page">
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
    </AuthGuard>
  )
}

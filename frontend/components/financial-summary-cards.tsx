import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react"
import type { CashFlowSummary } from "@/types/cashflow"

interface FinancialSummaryCardsProps {
  summary: CashFlowSummary
}

export function FinancialSummaryCards({ summary }: FinancialSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <span className="text-sm text-muted-foreground">Total Receitas</span>
        </div>
        <div className="text-2xl font-bold text-green-600">R$ {summary.totalIncome.toLocaleString("pt-BR")}</div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-red-100 rounded-lg">
            <TrendingDown className="h-5 w-5 text-red-600" />
          </div>
          <span className="text-sm text-muted-foreground">Total Gastos</span>
        </div>
        <div className="text-2xl font-bold text-red-600">R$ {summary.totalExpenses.toLocaleString("pt-BR")}</div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <DollarSign className="h-5 w-5 text-blue-600" />
          </div>
          <span className="text-sm text-muted-foreground">Saldo Atual</span>
        </div>
        <div className="text-2xl font-bold text-blue-600">R$ {summary.currentBalance.toLocaleString("pt-BR")}</div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <PiggyBank className="h-5 w-5 text-purple-600" />
          </div>
          <span className="text-sm text-muted-foreground">Lucro Total</span>
        </div>
        <div className="text-2xl font-bold text-purple-600">R$ {summary.totalProfit.toLocaleString("pt-BR")}</div>
      </Card>
    </div>
  )
}

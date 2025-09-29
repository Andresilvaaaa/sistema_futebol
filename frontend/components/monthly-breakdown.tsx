import { Card } from "@/components/ui/card"
import type { MonthlyFinancials } from "@/types/cashflow"

interface MonthlyBreakdownProps {
  financials: MonthlyFinancials[]
}

export function MonthlyBreakdown({ financials }: MonthlyBreakdownProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">FLUXO DE CAIXA MENSAL</h3>
      <p className="text-sm text-muted-foreground">Análise detalhada mês a mês</p>

      {/* Income Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <span className="font-medium">RECEITAS</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {financials.map((month) => (
            <Card key={`income-${month.month}`} className="p-3 bg-green-50 border-green-200">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">{month.month}</div>
                <div className="font-semibold text-green-700">R$ {month.income.toLocaleString("pt-BR")}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Expenses Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
          <span className="font-medium">GASTOS</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {financials.map((month) => (
            <Card key={`expenses-${month.month}`} className="p-3 bg-red-50 border-red-200">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">{month.month}</div>
                <div className="font-semibold text-red-700">R$ {month.expenses.toLocaleString("pt-BR")}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Balance Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
          <span className="font-medium">SALDO ACUMULADO</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {financials.map((month, index) => {
            const accumulatedBalance = financials.slice(0, index + 1).reduce((sum, m) => sum + m.balance, 0)
            const isPositive = accumulatedBalance >= 0

            return (
              <Card key={`balance-${month.month}`} className="p-3 bg-blue-50 border-blue-200">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">{month.month}</div>
                  <div className={`font-semibold ${isPositive ? "text-blue-700" : "text-red-700"}`}>
                    R$ {accumulatedBalance.toLocaleString("pt-BR")}
                  </div>
                  <div className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    {isPositive ? "+" : ""}R$ {month.balance.toLocaleString("pt-BR")}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

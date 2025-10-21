import { Card } from "@/components/ui/card"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import type { MonthlyFinancials } from "@/types/cashflow"

interface MonthlyBreakdownProps {
  financials: MonthlyFinancials[]
  initialBalance?: number
}

export function MonthlyBreakdown({ financials, initialBalance = 0 }: MonthlyBreakdownProps) {
  // Garantir ordenação cronológica por ano e mês
  const ordered = [...financials].sort(
    (a, b) => (a.year - b.year) || (a.monthNumber - b.monthNumber)
  )
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
          {ordered.map((month, index) => {
            const includeInitial = index === 0 && (initialBalance || 0) !== 0
            const displayedIncome = includeInitial ? (month.income + (initialBalance || 0)) : month.income

            const CardContent = (
              <Card key={`income-${month.year}-${month.monthNumber}`} className="p-3 bg-green-50 border-green-200">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">{`${month.month} ${month.year}`}</div>
                  <div className="font-semibold text-green-700">R$ {displayedIncome.toLocaleString("pt-BR")}</div>
                  {includeInitial && (
                    <div className="text-[10px] text-muted-foreground mt-1">(inclui saldo inicial)</div>
                  )}
                </div>
              </Card>
            )

            if (includeInitial) {
              return (
                <Tooltip key={`income-${month.year}-${month.monthNumber}`}>
                  <TooltipTrigger asChild>{CardContent}</TooltipTrigger>
                  <TooltipContent>
                    <span>
                      R$ {displayedIncome.toLocaleString("pt-BR")} = R$ {month.income.toLocaleString("pt-BR")} (receitas) + R$ {(initialBalance || 0).toLocaleString("pt-BR")} (saldo inicial)
                    </span>
                  </TooltipContent>
                </Tooltip>
              )
            }

            return CardContent
          })}
        </div>
      </div>

      {/* Expenses Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
          <span className="font-medium">GASTOS</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {ordered.map((month) => (
            <Card key={`expenses-${month.year}-${month.monthNumber}`} className="p-3 bg-red-50 border-red-200">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">{`${month.month} ${month.year}`}</div>
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
          {ordered.map((month, index) => {
            const accumulatedBalance = (initialBalance || 0) + ordered.slice(0, index + 1).reduce((sum, m) => sum + m.balance, 0)
            const isAccumulatedPositive = accumulatedBalance >= 0
            const isMonthlyDeltaPositive = month.balance >= 0

            return (
              <Card key={`balance-${month.year}-${month.monthNumber}`} className="p-3 bg-blue-50 border-blue-200">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">{`${month.month} ${month.year}`}</div>
                  <div className={`font-semibold ${isAccumulatedPositive ? "text-blue-700" : "text-red-700"}`}>
                    R$ {accumulatedBalance.toLocaleString("pt-BR")}
                  </div>
                  <div className={`text-xs ${isMonthlyDeltaPositive ? "text-green-600" : "text-red-600"}`}>
                    {isMonthlyDeltaPositive ? "+" : ""}R$ {month.balance.toLocaleString("pt-BR")}
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

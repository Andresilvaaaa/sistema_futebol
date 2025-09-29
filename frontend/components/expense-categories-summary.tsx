import { Card } from "@/components/ui/card"
import type { Expense } from "@/types/cashflow"

interface ExpenseCategoriesSummaryProps {
  expenses: Expense[]
}

export function ExpenseCategoriesSummary({ expenses }: ExpenseCategoriesSummaryProps) {
  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const sortedCategories = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)

  const getCategoryColor = (category: string) => {
    const colors = {
      Campo: "bg-blue-500",
      Equipamentos: "bg-green-500",
      Uniformes: "bg-purple-500",
      Transporte: "bg-orange-500",
      Alimentação: "bg-red-500",
      Arbitragem: "bg-yellow-500",
      Manutenção: "bg-gray-500",
      Marketing: "bg-pink-500",
      Outros: "bg-indigo-500",
    }
    return colors[category as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Despesas por Categoria</h3>
      <div className="space-y-3">
        {sortedCategories.map(([category, total]) => (
          <div key={category} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getCategoryColor(category)}`}></div>
              <span className="font-medium">{category}</span>
            </div>
            <span className="font-bold">R$ {total.toLocaleString("pt-BR")}</span>
          </div>
        ))}
        {sortedCategories.length === 0 && (
          <p className="text-muted-foreground text-center py-4">Nenhuma despesa cadastrada</p>
        )}
      </div>
    </Card>
  )
}

"use client"

import { useState } from "react"
import type { Expense } from "@/types/cashflow"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditExpenseDialog } from "@/components/edit-expense-dialog"
import { Search, MoreHorizontal, Edit, Trash2 } from "lucide-react"

interface ExpensesTableProps {
  expenses: Expense[]
  onDeleteExpense: (expenseId: string) => void
  onEditExpense: (expenseId: string, updatedExpense: Omit<Expense, "id">) => void
}

export function ExpensesTable({ expenses, onDeleteExpense, onEditExpense }: ExpensesTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(expenses.map((e) => e.category)))

  const getCategoryColor = (category: string) => {
    const colors = {
      Campo: "bg-blue-100 text-blue-800",
      Equipamentos: "bg-green-100 text-green-800",
      Uniformes: "bg-purple-100 text-purple-800",
      Transporte: "bg-orange-100 text-orange-800",
      Alimentação: "bg-red-100 text-red-800",
      Arbitragem: "bg-yellow-100 text-yellow-800",
      Manutenção: "bg-gray-100 text-gray-800",
      Marketing: "bg-pink-100 text-pink-800",
      Outros: "bg-indigo-100 text-indigo-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense)
    setEditDialogOpen(true)
  }

  return (
    <>
      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar despesas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-4 font-medium">DESCRIÇÃO</th>
                <th className="p-4 font-medium">CATEGORIA</th>
                <th className="p-4 font-medium">VALOR</th>
                <th className="p-4 font-medium">DATA</th>
                <th className="p-4 font-medium">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <span className="font-medium">{expense.description}</span>
                  </td>
                  <td className="p-4">
                    <Badge className={getCategoryColor(expense.category)}>{expense.category}</Badge>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-red-600">R$ {expense.amount.toLocaleString("pt-BR")}</span>
                  </td>
                  <td className="p-4 text-muted-foreground">{new Date(expense.date).toLocaleDateString("pt-BR")}</td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditExpense(expense)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600"
                          onClick={() => onDeleteExpense(expense.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredExpenses.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Nenhuma despesa encontrada.</p>
          </div>
        )}
      </Card>

      <EditExpenseDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        expense={selectedExpense}
        onEditExpense={onEditExpense}
      />
    </>
  )
}

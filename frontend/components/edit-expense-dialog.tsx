"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Expense } from "@/types/api"
import type { UpdateExpenseRequest } from "@/lib/services"

interface EditExpenseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expense: Expense | null
  onEditExpense: (expenseId: string, updatedExpense: UpdateExpenseRequest) => void
}

// Categorias alinhadas com o backend (valores em inglês, labels em português)
const categories = [
  { label: "Equipamentos", value: "equipment" },
  { label: "Aluguel de Campo", value: "field_rental" },
  { label: "Arbitragem", value: "referee" },
  { label: "Transporte", value: "transportation" },
  { label: "Alimentação", value: "food" },
  { label: "Médico", value: "medical" },
  { label: "Manutenção", value: "maintenance" },
  { label: "Outros", value: "other" },
]

export function EditExpenseDialog({ open, onOpenChange, expense, onEditExpense }: EditExpenseDialogProps) {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (expense) {
      setDescription(expense.description)
      setAmount(expense.amount.toString())
      setCategory(expense.category)
      setDate(expense.expense_date)
    }
  }, [expense])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!expense) return

    setIsSubmitting(true)

    const amountValue = Number.parseFloat(amount.replace(",", "."))
    if (isNaN(amountValue) || amountValue <= 0) {
      setIsSubmitting(false)
      return
    }

    const updatedExpense: UpdateExpenseRequest = {
      description: description.trim(),
      amount: amountValue,
      category,
      expense_date: date,
    }

    onEditExpense(expense.id, updatedExpense)
    setIsSubmitting(false)
    onOpenChange(false)
  }

  const resetForm = () => {
    setDescription("")
    setAmount("")
    setCategory("")
    setDate("")
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm()
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Despesa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva a despesa..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                type="text"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input 
              id="date" 
              type="text" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              placeholder="DD/MM/YYYY ou DD/MM/YY"
              required 
            />
            <p className="text-xs text-muted-foreground">
              Formatos aceitos: DD/MM/YYYY, DD/MM/YY ou YYYY-MM-DD
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

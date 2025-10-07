"use client"

import type React from "react"

import { useState } from "react"
import type { CreateExpenseRequest } from "@/lib/services"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

interface AddExpenseDialogProps {
  onAddExpense: (expense: CreateExpenseRequest) => void
}

export function AddExpenseDialog({ onAddExpense }: AddExpenseDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: "", // Inicia vazio para permitir entrada manual
    notes: "",
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.description || !formData.amount || !formData.category) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const expense: CreateExpenseRequest = {
      description: formData.description.trim(),
      amount: Number.parseFloat(formData.amount.replace(',', '.')),
      category: formData.category,
      expense_date: formData.date, // Passa a data como string, o serviço fará a conversão
    }

    // Checagem adicional para evitar NaN ou valores inválidos
    if (isNaN(expense.amount) || expense.amount <= 0) {
      alert('Informe um valor válido maior que zero.')
      return
    }

    onAddExpense(expense)
    setFormData({
      description: "",
      amount: "",
      category: "",
      date: "", // Reseta para vazio
      notes: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Nova Despesa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Despesa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Ex: Aluguel do Campo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0,00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="DD/MM/YYYY ou DD/MM/YY"
              required
            />
            <p className="text-xs text-muted-foreground">
              Formatos aceitos: DD/MM/YYYY, DD/MM/YY ou use o seletor de data
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Informações adicionais..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Despesa</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

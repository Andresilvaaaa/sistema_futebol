"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, User, DollarSign, UserPlus } from "lucide-react"
import type { CasualPlayer } from "@/types/monthly"

interface AddCasualPlayerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  monthlyPeriodId: string
  onAddCasualPlayer: (casualPlayer: Omit<CasualPlayer, "id">) => void
}

export function AddCasualPlayerDialog({
  open,
  onOpenChange,
  monthlyPeriodId,
  onAddCasualPlayer,
}: AddCasualPlayerDialogProps) {
  const [formData, setFormData] = useState({
    playerName: "",
    playDate: "",
    invitedBy: "",
    amount: "",
    paymentDate: "",
    status: "pending" as "paid" | "pending",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.playerName || !formData.playDate || !formData.invitedBy || !formData.amount) {
      return
    }

    const casualPlayer: Omit<CasualPlayer, "id"> = {
      monthlyPeriodId,
      playerName: formData.playerName,
      playDate: formData.playDate,
      invitedBy: formData.invitedBy,
      amount: Number.parseFloat(formData.amount),
      paymentDate: formData.paymentDate || undefined,
      status: formData.status,
      createdAt: new Date().toISOString(),
    }

    onAddCasualPlayer(casualPlayer)

    // Reset form
    setFormData({
      playerName: "",
      playDate: "",
      invitedBy: "",
      amount: "",
      paymentDate: "",
      status: "pending",
    })

    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Incluir Jogador Avulso
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="playerName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nome do Jogador
            </Label>
            <Input
              id="playerName"
              value={formData.playerName}
              onChange={(e) => handleInputChange("playerName", e.target.value)}
              placeholder="Digite o nome do jogador"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="playDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Data que Jogou
            </Label>
            <Input
              id="playDate"
              type="date"
              value={formData.playDate}
              onChange={(e) => handleInputChange("playDate", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="invitedBy">Quem Convidou</Label>
            <Input
              id="invitedBy"
              value={formData.invitedBy}
              onChange={(e) => handleInputChange("invitedBy", e.target.value)}
              placeholder="Nome de quem convidou"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Valor (R$)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              placeholder="0,00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentDate">Data de Pagamento (opcional)</Label>
            <Input
              id="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={(e) => handleInputChange("paymentDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status do Pagamento</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="pending">Pendente</option>
              <option value="paid">Pago</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Adicionar Avulso
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

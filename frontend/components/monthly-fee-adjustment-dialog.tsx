"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { DollarSign, TrendingUp } from "lucide-react"

interface MonthlyFeeAdjustmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentFee: number
  playersCount: number
  onAdjustFee: (newFee: number) => void
}

export function MonthlyFeeAdjustmentDialog({
  open,
  onOpenChange,
  currentFee,
  playersCount,
  onAdjustFee,
}: MonthlyFeeAdjustmentDialogProps) {
  const [newFee, setNewFee] = useState(currentFee.toString())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const feeValue = Number.parseFloat(newFee.replace(",", "."))
    if (isNaN(feeValue) || feeValue <= 0) {
      setIsSubmitting(false)
      return
    }

    onAdjustFee(feeValue)
    setIsSubmitting(false)
    onOpenChange(false)
  }

  const feeValue = Number.parseFloat(newFee.replace(",", ".")) || 0
  const currentTotal = currentFee * playersCount
  const newTotal = feeValue * playersCount
  const difference = newTotal - currentTotal

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reajustar Mensalidade</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Valor Atual</span>
              </div>
              <div className="text-xl font-bold">R$ {currentFee.toFixed(2)}</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Jogadores</span>
              </div>
              <div className="text-xl font-bold">{playersCount}</div>
            </Card>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newFee">Nova Mensalidade</Label>
            <Input
              id="newFee"
              type="text"
              placeholder="0,00"
              value={newFee}
              onChange={(e) => setNewFee(e.target.value)}
              required
            />
          </div>

          {feeValue > 0 && (
            <Card className="p-4 bg-muted/50">
              <h4 className="font-medium mb-3">Resumo do Reajuste</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Receita atual (mês):</span>
                  <span className="font-medium">R$ {currentTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nova receita (mês):</span>
                  <span className="font-medium">R$ {newTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Diferença:</span>
                  <span className={`font-bold ${difference >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {difference >= 0 ? "+" : ""}R$ {difference.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || feeValue <= 0}>
              {isSubmitting ? "Aplicando..." : "Aplicar Reajuste"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

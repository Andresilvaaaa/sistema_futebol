"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Player } from "@/types/player"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface EditPlayerDialogProps {
  player: Player | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEditPlayer: (player: Player) => void
  loading?: boolean
}

export function EditPlayerDialog({ player, open, onOpenChange, onEditPlayer, loading = false }: EditPlayerDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
    monthlyFee: 150,
  })

  useEffect(() => {
    if (player) {
      setFormData({
        name: player.name,
        position: player.position,
        phone: player.phone,
        email: player.email,
        monthlyFee: player.monthlyFee,
      })
    }
  }, [player])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!player) return

    const updatedPlayer: Player = {
      ...player,
      ...formData,
    }

    onEditPlayer(updatedPlayer)
    onOpenChange(false)
  }

  if (!player) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Jogador</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-position">Posição</Label>
            <Select
              value={formData.position}
              onValueChange={(value) => setFormData({ ...formData, position: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a posição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="forward">Atacante</SelectItem>
                <SelectItem value="midfielder">Meio-campo</SelectItem>
                <SelectItem value="defender">Defensor</SelectItem>
                <SelectItem value="goalkeeper">Goleiro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-phone">Telefone</Label>
            <Input
              id="edit-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-monthlyFee">Mensalidade (R$)</Label>
            <Input
              id="edit-monthlyFee"
              type="number"
              value={formData.monthlyFee}
              onChange={(e) => setFormData({ ...formData, monthlyFee: Number(e.target.value) })}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

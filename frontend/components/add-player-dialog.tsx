"use client"

import type React from "react"

import { useState } from "react"
import type { Player } from "@/types/player"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"

interface AddPlayerDialogProps {
  onAddPlayer: (player: Omit<Player, "id">) => void
  loading?: boolean
}

export function AddPlayerDialog({ onAddPlayer, loading = false }: AddPlayerDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    position: "forward", // Set default position
    phone: "",
    email: "",
    monthlyFee: 150,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newPlayer: Omit<Player, "id"> = {
      ...formData,
      joinDate: new Date().toLocaleDateString("pt-BR"),
      status: "active",
    }

    onAddPlayer(newPlayer)
    setFormData({
      name: "",
      position: "forward", // Reset to default position
      phone: "",
      email: "",
      monthlyFee: 150,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Jogador
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Jogador</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Posição</Label>
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
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyFee">Mensalidade (R$)</Label>
            <Input
              id="monthlyFee"
              type="number"
              value={formData.monthlyFee}
              onChange={(e) => setFormData({ ...formData, monthlyFee: Number(e.target.value) })}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adicionando...
                </>
              ) : (
                'Adicionar'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

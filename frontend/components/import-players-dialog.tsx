"use client"

import { useState, useEffect } from "react"
import type { Player } from "@/types/player"
import type { MonthlyPlayer } from "@/types/monthly"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, Check } from "lucide-react"

interface ImportPlayersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  monthlyPeriodId: string
  onImportPlayers: (players: Omit<MonthlyPlayer, "id">[]) => void
}

export function ImportPlayersDialog({
  open,
  onOpenChange,
  monthlyPeriodId,
  onImportPlayers,
}: ImportPlayersDialogProps) {
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedPlayers, setSelectedPlayers] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (open) {
      const savedPlayers = localStorage.getItem("players")
      if (savedPlayers) {
        setPlayers(JSON.parse(savedPlayers))
      }
      setSelectedPlayers(new Set())
    }
  }, [open])

  const handlePlayerToggle = (playerId: string) => {
    const newSelected = new Set(selectedPlayers)
    if (newSelected.has(playerId)) {
      newSelected.delete(playerId)
    } else {
      newSelected.add(playerId)
    }
    setSelectedPlayers(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedPlayers.size === players.length) {
      setSelectedPlayers(new Set())
    } else {
      setSelectedPlayers(new Set(players.map((p) => p.id)))
    }
  }

  const handleImport = () => {
    const playersToImport = players
      .filter((player) => selectedPlayers.has(player.id))
      .map((player) => ({
        playerId: player.id,
        monthlyPeriodId,
        playerName: player.name,
        position: player.position,
        phone: player.phone,
        email: player.email,
        monthlyFee: player.monthlyFee,
        status: "pending" as const,
        joinDate: player.joinDate,
      }))

    onImportPlayers(playersToImport)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Importar Jogadores
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Selecione os jogadores para importar neste mês</p>
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {selectedPlayers.size === players.length ? "Desmarcar Todos" : "Selecionar Todos"}
            </Button>
          </div>

          <ScrollArea className="h-[300px] border rounded-md p-4">
            <div className="space-y-3">
              {players.map((player) => (
                <div key={player.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={player.id}
                    checked={selectedPlayers.has(player.id)}
                    onCheckedChange={() => handlePlayerToggle(player.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{player.name}</span>
                      <span className="text-xs bg-muted px-2 py-1 rounded">{player.position}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">R$ {player.monthlyFee}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleImport} disabled={selectedPlayers.size === 0}>
              <Check className="h-4 w-4 mr-2" />
              Importar {selectedPlayers.size} Jogador{selectedPlayers.size !== 1 ? "es" : ""}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

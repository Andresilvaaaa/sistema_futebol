"use client"

import { useState, useEffect } from "react"
import type { Player } from "@/types/player"
import type { MonthlyPlayer } from "@/types/monthly"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, Check, Loader2 } from "lucide-react"
import { playersService } from "@/lib/services"
import { useToast } from "@/hooks/use-toast"

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
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      console.log('🔍 [ImportPlayersDialog] Modal aberto, carregando jogadores...')
      console.log('🔍 [ImportPlayersDialog] monthlyPeriodId:', monthlyPeriodId)
      fetchPlayers()
    }
  }, [open])

  const fetchPlayers = async () => {
    console.log('🔍 [ImportPlayersDialog] Iniciando fetchPlayers...')
    setLoading(true)
    try {
      // Buscar jogadores ativos da API
      const response = await playersService.getPlayers({ 
        status: 'active',
        page: 1,
        per_page: 100 // Buscar todos os jogadores ativos
      })
      
      console.log('🔍 [ImportPlayersDialog] Resposta da API:', response)
      
      // Converter para o formato esperado pelo componente
       const formattedPlayers = response.data.map(player => ({
         id: player.id.toString(),
         name: player.name,
         position: player.position,
         phone: player.phone || '',
         email: player.email || '',
         monthlyFee: parseFloat(player.monthly_fee),
         joinDate: player.join_date
       }))
      
      console.log('🔍 [ImportPlayersDialog] Jogadores formatados:', formattedPlayers)
      setPlayers(formattedPlayers)
      setSelectedPlayers(new Set())
    } catch (error) {
      console.error('❌ [ImportPlayersDialog] Erro ao buscar jogadores:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os jogadores. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePlayerToggle = (playerId: string) => {
    console.log('🔍 [ImportPlayersDialog] Toggle jogador:', playerId)
    const newSelected = new Set(selectedPlayers)
    if (newSelected.has(playerId)) {
      newSelected.delete(playerId)
      console.log('🔍 [ImportPlayersDialog] Jogador desmarcado:', playerId)
    } else {
      newSelected.add(playerId)
      console.log('🔍 [ImportPlayersDialog] Jogador marcado:', playerId)
    }
    setSelectedPlayers(newSelected)
    console.log('🔍 [ImportPlayersDialog] Jogadores selecionados:', Array.from(newSelected))
  }

  const handleSelectAll = () => {
    console.log('🔍 [ImportPlayersDialog] Clique em Selecionar/Desmarcar Todos')
    console.log('🔍 [ImportPlayersDialog] Jogadores selecionados antes:', selectedPlayers.size)
    console.log('🔍 [ImportPlayersDialog] Total de jogadores:', players.length)
    
    if (selectedPlayers.size === players.length) {
      console.log('🔍 [ImportPlayersDialog] Desmarcando todos os jogadores')
      setSelectedPlayers(new Set())
    } else {
      console.log('🔍 [ImportPlayersDialog] Selecionando todos os jogadores')
      const allPlayerIds = players.map((p) => p.id)
      console.log('🔍 [ImportPlayersDialog] IDs de todos os jogadores:', allPlayerIds)
      setSelectedPlayers(new Set(allPlayerIds))
    }
  }

  const handleImport = () => {
    console.log('🚀 [ImportPlayersDialog] CLIQUE NO BOTÃO IMPORTAR!')
    console.log('🚀 [ImportPlayersDialog] Jogadores selecionados:', Array.from(selectedPlayers))
    console.log('🚀 [ImportPlayersDialog] monthlyPeriodId:', monthlyPeriodId)
    
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

    console.log('🚀 [ImportPlayersDialog] Dados dos jogadores para importar:', playersToImport)
    console.log('🚀 [ImportPlayersDialog] Chamando onImportPlayers...')
    
    onImportPlayers(playersToImport)
    
    console.log('🚀 [ImportPlayersDialog] Fechando modal...')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="import-players-dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Importar Jogadores
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Selecione os jogadores para importar neste mês</p>
            <Button variant="outline" size="sm" onClick={handleSelectAll} data-testid="select-all-players">
              {selectedPlayers.size === players.length ? "Desmarcar Todos" : "Selecionar Todos"}
            </Button>
          </div>

          <ScrollArea className="h-[300px] border rounded-md p-4" data-testid="players-scroll-area">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">Carregando jogadores...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {players.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum jogador ativo encontrado.
                  </p>
                ) : (
                  players.map((player) => (
                    <div key={player.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={player.id}
                        checked={selectedPlayers.has(player.id)}
                        onCheckedChange={() => handlePlayerToggle(player.id)}
                        data-testid={`player-checkbox-${player.id}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{player.name}</span>
                          <span className="text-xs bg-muted px-2 py-1 rounded">{player.position}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">R$ {player.monthlyFee}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </ScrollArea>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="cancel-import">
              Cancelar
            </Button>
            <Button onClick={handleImport} disabled={selectedPlayers.size === 0 || loading} data-testid="confirm-import">
              <Check className="h-4 w-4 mr-2" />
              Importar {selectedPlayers.size} Jogador{selectedPlayers.size !== 1 ? "es" : ""}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

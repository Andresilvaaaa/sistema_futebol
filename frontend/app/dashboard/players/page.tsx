"use client"

import { useState, useEffect } from "react"
import type { Player, PlayerStats } from "@/types/player"
import { playersService, statsService } from "@/lib/services"
import type { Player as ApiPlayer, PlayerStats as ApiPlayerStats } from "@/lib/services"
import { PlayerCard } from "@/components/player-card"
import { PlayersTable } from "@/components/players-table"
import { StatsCards } from "@/components/stats-cards"
import { AddPlayerDialog } from "@/components/add-player-dialog"
import { EditPlayerDialog } from "@/components/edit-player-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Grid, List, Users, UserX, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import AuthGuard from "@/components/auth-guard"

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  
  const { toast } = useToast()

  // Função para converter Player da API para o tipo local
  const convertApiPlayerToLocal = (apiPlayer: ApiPlayer): Player => ({
    id: apiPlayer.id.toString(),
    name: apiPlayer.name,
    position: apiPlayer.position,
    phone: apiPlayer.phone || '',
    email: apiPlayer.email || '',
    joinDate: new Date(apiPlayer.created_at).toLocaleDateString("pt-BR"),
    status: apiPlayer.status === 'active' ? 'active' : 'inactive',
    monthlyFee: Number(apiPlayer.monthly_fee ?? 0),
    isActive: apiPlayer.status === 'active',
  })

  // Função para converter PlayerStats da API para o tipo local
  const convertApiStatsToLocal = (apiStats: ApiPlayerStats): PlayerStats => ({
    total: apiStats.total_players,
    active: apiStats.active_players,
    pending: 0, // Calcular baseado nos dados reais
    delayed: 0, // Calcular baseado nos dados reais
    inactive: apiStats.inactive_players,
  })

  // Carrega jogadores da API
  const loadPlayers = async () => {
    try {
      setLoading(true)
      const response = await playersService.getPlayers({ per_page: 100 })
      const convertedPlayers = response.data.map(convertApiPlayerToLocal)
      setPlayers(convertedPlayers)
    } catch (error: any) {
      console.error('Erro ao carregar jogadores:', error)
      toast({
        title: "Erro ao carregar jogadores",
        description: error.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Carrega estatísticas da API
  const loadStats = async () => {
    try {
      const apiStats = await statsService.getPlayerStats()
      const convertedStats = convertApiStatsToLocal(apiStats)
      setPlayerStats(convertedStats)
    } catch (error: any) {
      console.error('Erro ao carregar estatísticas:', error)
      toast({
        title: "Erro ao carregar estatísticas",
        description: error.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    loadPlayers()
    loadStats()
  }, [])

  const handleAddPlayer = async (newPlayerData: Omit<Player, "id">) => {
    try {
      setActionLoading('add')
      const apiPlayerData = {
        name: newPlayerData.name,
        position: newPlayerData.position,
        email: newPlayerData.email,
        phone: newPlayerData.phone,
        monthly_fee: Number(newPlayerData.monthlyFee),
        status: newPlayerData.status === 'active' ? 'active' as const : 'inactive' as const
      }
      
      const createdPlayerResponse = await playersService.createPlayer(apiPlayerData)
      const convertedPlayer = convertApiPlayerToLocal(createdPlayerResponse.data)
      
      setPlayers(prev => [...prev, convertedPlayer])
      
      toast({
        title: "Jogador adicionado",
        description: `${createdPlayerResponse.data.name} foi adicionado com sucesso`,
      })
      
      // Recarrega estatísticas
      loadStats()
    } catch (error: any) {
      console.error('Erro ao adicionar jogador:', error)
      toast({
        title: "Erro ao adicionar jogador",
        description: error.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleEditPlayer = async (updatedPlayer: Player) => {
    try {
      setActionLoading(`edit-${updatedPlayer.id}`)
      const apiPlayerData = {
        name: updatedPlayer.name,
        position: updatedPlayer.position,
        email: updatedPlayer.email,
        phone: updatedPlayer.phone,
        monthly_fee: Number(updatedPlayer.monthlyFee),
        status: updatedPlayer.isActive ? 'active' as const : 'inactive' as const
      }
      
      const updatedResponse = await playersService.updatePlayer(
        updatedPlayer.id, 
        apiPlayerData
      )
      const convertedPlayer = convertApiPlayerToLocal(updatedResponse.data)
      
      setPlayers(prev => prev.map(p => p.id === updatedPlayer.id ? convertedPlayer : p))
      
      toast({
        title: "Jogador atualizado",
        description: `${updatedResponse.data.name} foi atualizado com sucesso`,
      })
      
      // Recarrega estatísticas
      loadStats()
    } catch (error: any) {
      console.error('Erro ao editar jogador:', error)
      toast({
        title: "Erro ao editar jogador",
        description: error.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleOpenEditDialog = (player: Player) => {
    setEditingPlayer(player)
    setEditDialogOpen(true)
  }

  const handleDeactivatePlayer = async (playerId: string) => {
    try {
      setActionLoading(`deactivate-${playerId}`)
      await playersService.deactivatePlayer(playerId)
      
      setPlayers(prev => prev.map(p => 
        p.id === playerId ? { ...p, isActive: false, status: 'inactive' } : p
      ))
      
      toast({
        title: "Jogador desativado",
        description: "Jogador foi desativado com sucesso",
      })
      
      // Recarrega estatísticas
      loadStats()
    } catch (error: any) {
      console.error('Erro ao desativar jogador:', error)
      toast({
        title: "Erro ao desativar jogador",
        description: error.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleActivatePlayer = async (playerId: string) => {
    try {
      setActionLoading(`activate-${playerId}`)
      await playersService.activatePlayer(playerId)
      
      setPlayers(prev => prev.map(p => 
        p.id === playerId ? { ...p, isActive: true, status: 'active' } : p
      ))
      
      toast({
        title: "Jogador ativado",
        description: "Jogador foi ativado com sucesso",
      })
      
      // Recarrega estatísticas
      loadStats()
    } catch (error: any) {
      console.error('Erro ao ativar jogador:', error)
      toast({
        title: "Erro ao ativar jogador",
        description: error.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const activePlayers = players.filter((p) => p.isActive)
  const inactivePlayers = players.filter((p) => !p.isActive)

  const getFilteredPlayers = (playersList: Player[]) => {
    return playersList.filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.position.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const filteredActivePlayers = getFilteredPlayers(activePlayers)
  const filteredInactivePlayers = getFilteredPlayers(inactivePlayers)

  // Usa as estatísticas da API ou calcula localmente como fallback
  const stats: PlayerStats = playerStats || {
    total: players.length,
    active: activePlayers.filter((p) => p.status === "active").length,
    pending: activePlayers.filter((p) => p.status === "pending").length,
    delayed: activePlayers.filter((p) => p.status === "delayed").length,
    inactive: inactivePlayers.length,
  }

  const renderPlayersList = (playersList: Player[], showInactive = false) => {
    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playersList.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onEdit={handleOpenEditDialog}
              onUpdate={() => {
                loadPlayers()
                loadStats()
              }}
            />
          ))}
        </div>
      )
    } else {
      return (
        <PlayersTable
          players={playersList}
          onEdit={handleOpenEditDialog}
          onDeactivate={handleDeactivatePlayer}
          onActivate={handleActivatePlayer}
          showInactive={showInactive}
          actionLoading={actionLoading}
        />
      )
    }
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Carregando jogadores...</span>
              </div>
            </div>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">GERENCIAR JOGADORES</h1>
            <p className="text-muted-foreground mt-1">Administre o elenco, pagamentos e estatísticas dos atletas</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <AddPlayerDialog 
              onAddPlayer={handleAddPlayer} 
              loading={actionLoading === 'add'}
            />
          </div>
        </div>

        <StatsCards stats={stats} />

        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar jogadores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Ativos ({activePlayers.length})
            </TabsTrigger>
            <TabsTrigger value="inactive" className="flex items-center gap-2">
              <UserX className="h-4 w-4" />
              Inativos ({inactivePlayers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            {renderPlayersList(filteredActivePlayers, false)}
            {filteredActivePlayers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum jogador ativo encontrado.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="inactive" className="mt-6">
            {renderPlayersList(filteredInactivePlayers, true)}
            {filteredInactivePlayers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum jogador inativo encontrado.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <EditPlayerDialog
          player={editingPlayer}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onEditPlayer={handleEditPlayer}
          loading={editingPlayer ? actionLoading === `edit-${editingPlayer.id}` : false}
        />
      </div>
    </div>
    </AuthGuard>
  )
}

"use client"

import { useState, useEffect } from "react"
import type { Player, PlayerStats } from "@/types/player"
import { mockPlayers } from "@/lib/mock-data"
import { PlayerCard } from "@/components/player-card"
import { PlayersTable } from "@/components/players-table"
import { StatsCards } from "@/components/stats-cards"
import { AddPlayerDialog } from "@/components/add-player-dialog"
import { EditPlayerDialog } from "@/components/edit-player-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Grid, List, Users, UserX } from "lucide-react"

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  useEffect(() => {
    // Load players from localStorage or use mock data
    const savedPlayers = localStorage.getItem("players")
    if (savedPlayers) {
      const parsedPlayers = JSON.parse(savedPlayers)
      const playersWithActiveStatus = parsedPlayers.map((player: any) => ({
        ...player,
        isActive: player.isActive !== undefined ? player.isActive : true,
      }))
      setPlayers(playersWithActiveStatus)
    } else {
      const playersWithActiveStatus = mockPlayers.map((player) => ({ ...player, isActive: true }))
      setPlayers(playersWithActiveStatus)
      localStorage.setItem("players", JSON.stringify(playersWithActiveStatus))
    }
  }, [])

  const savePlayersToStorage = (updatedPlayers: Player[]) => {
    setPlayers(updatedPlayers)
    localStorage.setItem("players", JSON.stringify(updatedPlayers))
  }

  const handleAddPlayer = (newPlayerData: Omit<Player, "id">) => {
    const newPlayer: Player = {
      ...newPlayerData,
      id: Date.now().toString(),
      isActive: true,
    }
    const updatedPlayers = [...players, newPlayer]
    savePlayersToStorage(updatedPlayers)
  }

  const handleEditPlayer = (updatedPlayer: Player) => {
    const updatedPlayers = players.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
    savePlayersToStorage(updatedPlayers)
  }

  const handleOpenEditDialog = (player: Player) => {
    setEditingPlayer(player)
    setEditDialogOpen(true)
  }

  const handleDeactivatePlayer = (playerId: string) => {
    const updatedPlayers = players.map((p) => (p.id === playerId ? { ...p, isActive: false } : p))
    savePlayersToStorage(updatedPlayers)
  }

  const handleActivatePlayer = (playerId: string) => {
    const updatedPlayers = players.map((p) => (p.id === playerId ? { ...p, isActive: true } : p))
    savePlayersToStorage(updatedPlayers)
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

  const stats: PlayerStats = {
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
              onDelete={showInactive ? handleActivatePlayer : handleDeactivatePlayer}
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
        />
      )
    }
  }

  return (
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
            <AddPlayerDialog onAddPlayer={handleAddPlayer} />
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
        />
      </div>
    </div>
  )
}

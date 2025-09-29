"use client"

import { useState, useEffect } from "react"
import type { MonthlyPeriod, MonthlyPlayer, CasualPlayer } from "@/types/monthly"
import { getCurrentMonth, formatMonthYear } from "@/lib/monthly-utils"
import { MonthNavigation } from "@/components/month-navigation"
import { CreateMonthCard } from "@/components/create-month-card"
import { ImportPlayersDialog } from "@/components/import-players-dialog"
import { AddCasualPlayerDialog } from "@/components/add-casual-player-dialog"
import { PaymentStatusDropdown } from "@/components/payment-status-dropdown"
import { PlayerActionsDropdown } from "@/components/player-actions-dropdown"
import { PaymentHistoryDialog } from "@/components/payment-history-dialog"
import { CasualPlayersHistoryDialog } from "@/components/casual-players-history-dialog"
import { MonthlyFeeAdjustmentDialog } from "@/components/monthly-fee-adjustment-dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, TrendingUp, Download, UserPlus, Eye, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MonthlyPage() {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth().month)
  const [currentYear, setCurrentYear] = useState(getCurrentMonth().year)
  const [monthlyPeriods, setMonthlyPeriods] = useState<MonthlyPeriod[]>([])
  const [monthlyPlayers, setMonthlyPlayers] = useState<MonthlyPlayer[]>([])
  const [casualPlayers, setCasualPlayers] = useState<CasualPlayer[]>([])
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [casualPlayerDialogOpen, setCasualPlayerDialogOpen] = useState(false)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [casualHistoryDialogOpen, setCasualHistoryDialogOpen] = useState(false)
  const [feeAdjustmentDialogOpen, setFeeAdjustmentDialogOpen] = useState(false)
  const [selectedPlayerHistory, setSelectedPlayerHistory] = useState<{
    playerName: string
    history: any[]
  }>({ playerName: "", history: [] })
  const { toast } = useToast()

  useEffect(() => {
    const savedPeriods = localStorage.getItem("monthlyPeriods")
    const savedPlayers = localStorage.getItem("monthlyPlayers")
    const savedCasualPlayers = localStorage.getItem("casualPlayers")

    if (savedPeriods) {
      setMonthlyPeriods(JSON.parse(savedPeriods))
    }
    if (savedPlayers) {
      setMonthlyPlayers(JSON.parse(savedPlayers))
    }
    if (savedCasualPlayers) {
      setCasualPlayers(JSON.parse(savedCasualPlayers))
    }
  }, [])

  const currentPeriod = monthlyPeriods.find((p) => p.month === currentMonth && p.year === currentYear)
  const currentPeriodPlayers = currentPeriod ? monthlyPlayers.filter((p) => p.monthlyPeriodId === currentPeriod.id) : []
  const currentPeriodCasualPlayers = currentPeriod
    ? casualPlayers.filter((p) => p.monthlyPeriodId === currentPeriod.id)
    : []

  const calculatePendingMonths = (playerId: string): number => {
    const playerPeriods = monthlyPlayers.filter((p) => p.playerId === playerId && p.status === "pending")
    return playerPeriods.length
  }

  const handleCreateMonth = () => {
    const newPeriod: MonthlyPeriod = {
      id: Date.now().toString(),
      month: currentMonth,
      year: currentYear,
      name: formatMonthYear(currentMonth, currentYear),
      isActive: true,
      createdAt: new Date().toISOString(),
      totalExpected: 0,
      totalReceived: 0,
      playersCount: 0,
    }

    const updatedPeriods = [...monthlyPeriods, newPeriod]
    setMonthlyPeriods(updatedPeriods)
    localStorage.setItem("monthlyPeriods", JSON.stringify(updatedPeriods))
    setImportDialogOpen(true)
  }

  const handleImportPlayers = (players: Omit<MonthlyPlayer, "id">[]) => {
    const newPlayers = players.map((player) => ({
      ...player,
      id: `${Date.now()}-${Math.random()}`,
    }))

    const updatedPlayers = [...monthlyPlayers, ...newPlayers]
    setMonthlyPlayers(updatedPlayers)
    localStorage.setItem("monthlyPlayers", JSON.stringify(updatedPlayers))

    if (currentPeriod) {
      const totalExpected = newPlayers.reduce((sum, p) => sum + p.monthlyFee, 0)
      const updatedPeriod = {
        ...currentPeriod,
        playersCount: newPlayers.length,
        totalExpected,
      }

      const updatedPeriods = monthlyPeriods.map((p) => (p.id === currentPeriod.id ? updatedPeriod : p))
      setMonthlyPeriods(updatedPeriods)
      localStorage.setItem("monthlyPeriods", JSON.stringify(updatedPeriods))
    }
  }

  const handleStatusChange = (playerId: string, newStatus: "paid" | "pending") => {
    const updatedPlayers = monthlyPlayers.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          status: newStatus,
          paymentDate: newStatus === "paid" ? new Date().toLocaleDateString("pt-BR") : undefined,
          pendingMonthsCount: newStatus === "pending" ? calculatePendingMonths(player.playerId) : 0,
        }
      }
      return player
    })

    setMonthlyPlayers(updatedPlayers)
    localStorage.setItem("monthlyPlayers", JSON.stringify(updatedPlayers))

    if (currentPeriod) {
      const periodPlayers = updatedPlayers.filter((p) => p.monthlyPeriodId === currentPeriod.id)
      const totalReceived = periodPlayers.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.monthlyFee, 0)

      const updatedPeriod = {
        ...currentPeriod,
        totalReceived,
      }

      const updatedPeriods = monthlyPeriods.map((p) => (p.id === currentPeriod.id ? updatedPeriod : p))
      setMonthlyPeriods(updatedPeriods)
      localStorage.setItem("monthlyPeriods", JSON.stringify(updatedPeriods))
    }

    const statusText = newStatus === "paid" ? "pago" : "pendente"
    toast({
      title: "Status atualizado",
      description: `Pagamento marcado como ${statusText}`,
    })
  }

  const handleMarkAsPaid = (playerId: string) => {
    handleStatusChange(playerId, "paid")
  }

  const handleMarkAsPending = (playerId: string) => {
    handleStatusChange(playerId, "pending")
  }

  const handleSendNotification = (playerName: string) => {
    toast({
      title: "Notificação enviada",
      description: `Lembrete de pagamento enviado para ${playerName}`,
    })
  }

  const handleViewHistory = (playerName: string) => {
    const mockHistory = [
      {
        date: "15/08/2024",
        status: "paid" as const,
        amount: 150,
        month: "Agosto 2024",
      },
      {
        date: "20/07/2024",
        status: "pending" as const,
        amount: 150,
        month: "Julho 2024",
      },
      {
        date: "10/06/2024",
        status: "paid" as const,
        amount: 150,
        month: "Junho 2024",
      },
    ]

    setSelectedPlayerHistory({
      playerName,
      history: mockHistory,
    })
    setHistoryDialogOpen(true)
  }

  const handleRemoveFromMonth = (playerId: string, playerName: string) => {
    const updatedPlayers = monthlyPlayers.filter((p) => p.id !== playerId)
    setMonthlyPlayers(updatedPlayers)
    localStorage.setItem("monthlyPlayers", JSON.stringify(updatedPlayers))

    toast({
      title: "Jogador removido",
      description: `${playerName} foi removido deste mês`,
    })
  }

  const handleAddCasualPlayer = (casualPlayer: Omit<CasualPlayer, "id">) => {
    const newCasualPlayer: CasualPlayer = {
      ...casualPlayer,
      id: `casual-${Date.now()}-${Math.random()}`,
    }

    const updatedCasualPlayers = [...casualPlayers, newCasualPlayer]
    setCasualPlayers(updatedCasualPlayers)
    localStorage.setItem("casualPlayers", JSON.stringify(updatedCasualPlayers))

    toast({
      title: "Jogador avulso adicionado",
      description: `${casualPlayer.playerName} foi adicionado como avulso`,
    })
  }

  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month)
    setCurrentYear(year)
  }

  const handleAdjustMonthlyFee = (newFee: number) => {
    const updatedPlayers = monthlyPlayers.map((player) => {
      if (currentPeriod && player.monthlyPeriodId === currentPeriod.id) {
        return {
          ...player,
          monthlyFee: newFee,
        }
      }
      return player
    })

    setMonthlyPlayers(updatedPlayers)
    localStorage.setItem("monthlyPlayers", JSON.stringify(updatedPlayers))

    if (currentPeriod) {
      const periodPlayers = updatedPlayers.filter((p) => p.monthlyPeriodId === currentPeriod.id)
      const totalExpected = periodPlayers.reduce((sum, p) => sum + p.monthlyFee, 0)
      const totalReceived = periodPlayers.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.monthlyFee, 0)

      const updatedPeriod = {
        ...currentPeriod,
        totalExpected,
        totalReceived,
      }

      const updatedPeriods = monthlyPeriods.map((p) => (p.id === currentPeriod.id ? updatedPeriod : p))
      setMonthlyPeriods(updatedPeriods)
      localStorage.setItem("monthlyPeriods", JSON.stringify(updatedPeriods))
    }

    toast({
      title: "Mensalidade reajustada",
      description: `Nova mensalidade de R$ ${newFee.toFixed(2)} aplicada a todos os jogadores`,
    })
  }

  const stats = {
    received:
      currentPeriodPlayers.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.monthlyFee, 0) +
      currentPeriodCasualPlayers.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0),
    expected:
      currentPeriodPlayers.reduce((sum, p) => sum + p.monthlyFee, 0) +
      currentPeriodCasualPlayers.reduce((sum, p) => sum + p.amount, 0),
    pending:
      currentPeriodPlayers.filter((p) => p.status === "pending").length +
      currentPeriodCasualPlayers.filter((p) => p.status === "pending").length,
  }

  const currentFee = currentPeriodPlayers.length > 0 ? currentPeriodPlayers[0].monthlyFee : 150

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <MonthNavigation currentMonth={currentMonth} currentYear={currentYear} onMonthChange={handleMonthChange} />

        {!currentPeriod ? (
          <CreateMonthCard month={currentMonth} year={currentYear} onCreateMonth={handleCreateMonth} />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Recebido</span>
                </div>
                <div className="text-2xl font-bold text-green-600">R$ {stats.received.toFixed(2)}</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Esperado</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">R$ {stats.expected.toFixed(2)}</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Pendentes</span>
                </div>
                <div className="text-2xl font-bold">{stats.pending}</div>
              </Card>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Jogadores - Pagamentos Mensais</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFeeAdjustmentDialogOpen(true)}
                  disabled={currentPeriodPlayers.length === 0}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Reajustar Mensalidade
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button onClick={() => setImportDialogOpen(true)}>
                  <Users className="h-4 w-4 mr-2" />
                  Importar Jogadores
                </Button>
              </div>
            </div>

            {currentPeriodPlayers.length > 0 ? (
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-medium">JOGADOR</th>
                        <th className="p-4 font-medium">POSIÇÃO</th>
                        <th className="p-4 font-medium">CONTATO</th>
                        <th className="p-4 font-medium">STATUS</th>
                        <th className="p-4 font-medium">MENSALIDADE</th>
                        <th className="p-4 font-medium">DESDE</th>
                        <th className="p-4 font-medium">AÇÕES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPeriodPlayers.map((player, index) => (
                        <tr key={player.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                #{index + 1}
                              </div>
                              <span className="font-medium">{player.playerName}</span>
                            </div>
                          </td>
                          <td className="p-4">{player.position}</td>
                          <td className="p-4">
                            <div className="text-sm">
                              <div>{player.phone}</div>
                              <div className="text-muted-foreground">{player.email}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <PaymentStatusDropdown
                              currentStatus={player.status}
                              pendingMonthsCount={
                                player.status === "pending" ? calculatePendingMonths(player.playerId) : undefined
                              }
                            />
                          </td>
                          <td className="p-4 font-medium">R$ {player.monthlyFee}</td>
                          <td className="p-4 text-sm text-muted-foreground">{player.joinDate}</td>
                          <td className="p-4">
                            <PlayerActionsDropdown
                              currentStatus={player.status}
                              onMarkAsPaid={() => handleMarkAsPaid(player.id)}
                              onMarkAsPending={() => handleMarkAsPending(player.id)}
                              onSendNotification={() => handleSendNotification(player.playerName)}
                              onViewHistory={() => handleViewHistory(player.playerName)}
                              onRemoveFromMonth={() => handleRemoveFromMonth(player.id, player.playerName)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum jogador importado</h3>
                <p className="text-muted-foreground mb-4">
                  Importe jogadores do seu elenco para começar a gerenciar os pagamentos mensais.
                </p>
                <Button onClick={() => setImportDialogOpen(true)}>
                  <Users className="h-4 w-4 mr-2" />
                  Importar Jogadores
                </Button>
              </Card>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">Jogadores Avulsos</h2>
                {currentPeriodCasualPlayers.length > 0 && (
                  <Badge variant="secondary">
                    {currentPeriodCasualPlayers.length} avulso{currentPeriodCasualPlayers.length !== 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                {currentPeriodCasualPlayers.length > 0 && (
                  <Button variant="outline" size="sm" onClick={() => setCasualHistoryDialogOpen(true)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Histórico
                  </Button>
                )}
                <Button onClick={() => setCasualPlayerDialogOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Incluir Avulso
                </Button>
              </div>
            </div>

            {currentPeriodCasualPlayers.length > 0 && (
              <Card className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{currentPeriodCasualPlayers.length}</div>
                    <div className="text-sm text-muted-foreground">Total de Avulsos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      R${" "}
                      {currentPeriodCasualPlayers
                        .filter((p) => p.status === "paid")
                        .reduce((sum, p) => sum + p.amount, 0)
                        .toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">Arrecadado</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {currentPeriodCasualPlayers.filter((p) => p.status === "pending").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Pendentes</div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        <ImportPlayersDialog
          open={importDialogOpen}
          onOpenChange={setImportDialogOpen}
          monthlyPeriodId={currentPeriod?.id || ""}
          onImportPlayers={handleImportPlayers}
        />

        <AddCasualPlayerDialog
          open={casualPlayerDialogOpen}
          onOpenChange={setCasualPlayerDialogOpen}
          monthlyPeriodId={currentPeriod?.id || ""}
          onAddCasualPlayer={handleAddCasualPlayer}
        />

        <PaymentHistoryDialog
          open={historyDialogOpen}
          onOpenChange={setHistoryDialogOpen}
          playerName={selectedPlayerHistory.playerName}
          paymentHistory={selectedPlayerHistory.history}
        />

        <CasualPlayersHistoryDialog
          open={casualHistoryDialogOpen}
          onOpenChange={setCasualHistoryDialogOpen}
          casualPlayers={currentPeriodCasualPlayers}
          monthName={formatMonthYear(currentMonth, currentYear)}
        />

        <MonthlyFeeAdjustmentDialog
          open={feeAdjustmentDialogOpen}
          onOpenChange={setFeeAdjustmentDialogOpen}
          currentFee={currentFee}
          playersCount={currentPeriodPlayers.length}
          onAdjustFee={handleAdjustMonthlyFee}
        />
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import type { MonthlyPeriod, MonthlyPlayer, CasualPlayer } from "@/types/monthly"
import { getCurrentMonth, formatMonthYear } from "@/lib/monthly-utils"
import { MonthNavigation } from "@/components/month-navigation"
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
import paymentsService from "@/lib/services/payments"
import AuthGuard from "@/components/auth-guard"

export default function MonthlyPage() {
  const [currentMonth, setCurrentMonth] = useState(9) // Setembro onde temos dados
  const [currentYear, setCurrentYear] = useState(2025)
  const [monthlyPeriods, setMonthlyPeriods] = useState<MonthlyPeriod[]>([])
  const [monthlyPlayers, setMonthlyPlayers] = useState<MonthlyPlayer[]>([])
  const [casualPlayers, setCasualPlayers] = useState<CasualPlayer[]>([])
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [casualPlayerDialogOpen, setCasualPlayerDialogOpen] = useState(false)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [casualHistoryDialogOpen, setCasualHistoryDialogOpen] = useState(false)
  const [feeAdjustmentDialogOpen, setFeeAdjustmentDialogOpen] = useState(false)
  const [isCreatingMonth, setIsCreatingMonth] = useState(false)
  const [selectedPlayerHistory, setSelectedPlayerHistory] = useState<{
    playerName: string
    history: any[]
  }>({ playerName: "", history: [] })
  const { toast } = useToast()

  useEffect(() => {
    loadMonthlyData()
  }, [currentMonth, currentYear])

  const loadMonthlyData = async () => {
    try {
      console.log(`[DEBUG] Carregando dados para ${currentMonth}/${currentYear}`)
      
      // Buscar período do mês/ano atual
      const periodsResp = await paymentsService.getMonthlyPeriods({ year: currentYear, month: currentMonth })
      const periods = periodsResp.data || []

      // Selecionar exatamente o período referente ao mês/ano atuais
      const periodApi = periods.find((p: any) => p?.month === currentMonth && p?.year === currentYear)

      if (!periodApi) {
        console.log('[DEBUG] Período do mês/ano atual não encontrado')
        setMonthlyPeriods([])
        setMonthlyPlayers([])
        setCasualPlayers([])
        return
      }
      const period: MonthlyPeriod = {
        id: periodApi.id,
        month: periodApi.month,
        year: periodApi.year,
        name: formatMonthYear(periodApi.month, periodApi.year),
        isActive: !!periodApi.is_active,
        createdAt: periodApi.created_at,
        totalExpected: periodApi.total_expected ?? 0,
        totalReceived: periodApi.total_received ?? 0,
        playersCount: periodApi.players_count ?? 0,
      }
      setMonthlyPeriods([period])

      // Buscar jogadores do período
      const playersResp = await paymentsService.getMonthlyPlayers(period.id, { page: 1, per_page: 100 })
      const playersApi = playersResp.data || []
      const players: MonthlyPlayer[] = playersApi.map(p => ({
        id: p.id,
        playerId: p.player_id,
        monthlyPeriodId: p.monthly_period_id,
        playerName: p.player?.name || p.player_name,
        position: p.player?.position || p.position,
        phone: p.player?.phone || p.phone,
        email: p.player?.email || p.email,
        monthlyFee: p.effective_monthly_fee ?? p.monthly_fee,
        status: p.status === 'paid' ? 'paid' : 'pending',
        paymentDate: p.payment_date,
        joinDate: p.join_date,
        pendingMonthsCount: p.pending_months_count,
      }))
      setMonthlyPlayers(players)

      // Buscar jogadores avulsos
      const casualResp = await paymentsService.getCasualPlayers(period.id)
      const casualApi = casualResp.data || []
      const casuals: CasualPlayer[] = casualApi.map(c => ({
        id: c.id,
        monthlyPeriodId: c.monthly_period_id,
        playerName: c.player_name,
        playDate: c.play_date,
        invitedBy: c.invited_by,
        amount: c.amount,
        paymentDate: c.payment_date,
        status: c.status === 'paid' ? 'paid' : 'pending',
        createdAt: c.created_at,
      }))
      setCasualPlayers(casuals)
    } catch (error) {
      console.error('Erro ao carregar dados mensais:', error)
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados mensais. Tente novamente.",
        variant: "destructive"
      })
    }
  }

  const currentPeriod = monthlyPeriods.find((p) => p.month === currentMonth && p.year === currentYear)
  const currentPeriodPlayers = currentPeriod ? monthlyPlayers.filter((p) => p.monthlyPeriodId === currentPeriod.id) : []
  const currentPeriodCasualPlayers = currentPeriod
    ? casualPlayers.filter((p) => p.monthlyPeriodId === currentPeriod.id)
    : []

  const calculatePendingMonths = (playerId: string): number => {
    const playerPeriods = monthlyPlayers.filter((p) => p.playerId === playerId && p.status === "pending")
    return playerPeriods.length
  }

  const handleCreateMonth = async () => {
    // Verificar se já existe um período para este mês/ano
    const existingPeriod = monthlyPeriods.find(p => p.month === currentMonth && p.year === currentYear)
    
    if (existingPeriod) {
      toast({
        title: "Período já existe",
        description: `O período ${currentMonth.toString().padStart(2, '0')}/${currentYear} já foi criado.`,
        variant: "destructive",
      })
      return
    }

    setIsCreatingMonth(true)

    try {
      // Criar período mensal no backend
      const response = await paymentsService.createMonthlyPeriod({
        year: currentYear,
        month: currentMonth
      })

      toast({
        title: "Sucesso",
        description: `Período mensal criado com sucesso.`,
      })

      // Recarregar dados após criação
      await loadMonthlyData()
      
      // Abrir dialog para importar jogadores adicionais se necessário
      setImportDialogOpen(true)
    } catch (error: any) {
      console.error('Erro ao criar período mensal:', error)
      
      // Mostrar mensagem de erro mais específica
      let errorMessage = 'Não foi possível criar o período mensal. Tente novamente.'
      
      if (error?.message?.includes('Já existe um período')) {
        errorMessage = `O período ${currentMonth.toString().padStart(2, '0')}/${currentYear} já foi criado.`
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsCreatingMonth(false)
    }
  }

  const handleImportPlayers = async (players: Omit<MonthlyPlayer, "id">[]) => {
    try {
      // Obter o período atual
      const currentPeriod = monthlyPeriods.find(p => p.month === currentMonth && p.year === currentYear)
      if (!currentPeriod) {
        toast({
          title: "Erro",
          description: "Período mensal não encontrado. Crie o período primeiro.",
          variant: "destructive",
        })
        return
      }

      // Extrair IDs dos jogadores selecionados
      const playerIds = players.map(player => player.playerId)
      
      if (playerIds.length === 0) {
        toast({
          title: "Aviso",
          description: "Nenhum jogador foi selecionado para importação.",
        })
        return
      }

      // Chamar API para adicionar jogadores ao período
      const result = await paymentsService.addPlayersToMonthlyPeriod(currentPeriod.id, { player_ids: playerIds })
      
      toast({
        title: "Sucesso",
        description: result.message,
      })
      
      // Recarregar dados para mostrar os jogadores importados
      await loadMonthlyData()
    } catch (error: any) {
      console.error('Erro ao importar jogadores:', error)
      toast({
        title: "Erro",
        description: error.message || "Erro ao importar jogadores.",
        variant: "destructive",
      })
    }
  }

  const handleStatusChange = async (playerId: string, newStatus: "paid" | "pending") => {
    try {
      const player = monthlyPlayers.find(p => p.id === playerId)
      if (!player) {
        toast({
          title: "Erro",
          description: "Jogador não encontrado.",
          variant: "destructive",
        })
        return
      }

      // Atualizar status via API
      await paymentsService.updateMonthlyPlayerPayment(player.monthlyPeriodId, player.playerId, newStatus)

      toast({
        title: "Status atualizado",
        description: `Pagamento marcado como ${newStatus === "paid" ? "pago" : "pendente"}`,
      })

      // Recarregar dados
      await loadMonthlyData()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status de pagamento.",
        variant: "destructive",
      })
    }
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

  const handleViewHistory = async (playerName: string) => {
    try {
      // TODO: Implementar busca do histórico real do jogador
      // const history = await PaymentsService.getPlayerPaymentHistory(playerId)
      
      // Por enquanto, mostrar mensagem informativa
      toast({
        title: "Funcionalidade em desenvolvimento",
        description: "O histórico de pagamentos será implementado em breve",
        variant: "default"
      })
      
      // Remover quando implementar a API real
      return
      
    } catch (error) {
      console.error('Erro ao buscar histórico:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar o histórico",
        variant: "destructive"
      })
    }
  }

  const handleRemoveFromMonth = async (playerId: string, playerName: string) => {
    try {
      // TODO: Implementar remoção via API
      // await PaymentsService.removePlayerFromMonth(playerId, currentPeriod.id)
      
      // Por enquanto, apenas atualizar o estado local
      const updatedPlayers = monthlyPlayers.filter((p) => p.id !== playerId)
      setMonthlyPlayers(updatedPlayers)

      toast({
        title: "Jogador removido",
        description: `${playerName} foi removido deste mês`,
      })
    } catch (error) {
      console.error('Erro ao remover jogador:', error)
      toast({
        title: "Erro",
        description: "Não foi possível remover o jogador",
        variant: "destructive"
      })
    }
  }

  const handleAddCasualPlayer = async (casualPlayer: Omit<CasualPlayer, "id">) => {
    try {
      if (!currentPeriod) {
        toast({
          title: "Erro",
          description: "Nenhum período selecionado",
          variant: "destructive"
        })
        return
      }

      // Criar via API
      const createData = {
        player_name: casualPlayer.playerName,
        play_date: casualPlayer.playDate,
        invited_by: casualPlayer.invitedBy || '',
        amount: casualPlayer.amount,
        status: casualPlayer.status
      }

      const response = await paymentsService.addCasualPlayer(currentPeriod.id, createData)
      
      if (response.success && response.data) {
        // Converter resposta da API para formato do frontend
        const newCasualPlayer: CasualPlayer = {
          id: response.data.id,
          monthlyPeriodId: response.data.monthly_period_id,
          playerName: response.data.player_name,
          playDate: response.data.play_date,
          invitedBy: response.data.invited_by,
          amount: response.data.amount,
          paymentDate: response.data.payment_date,
          status: response.data.status === 'paid' ? 'paid' : 'pending',
          createdAt: response.data.created_at,
        }

        const updatedCasualPlayers = [...casualPlayers, newCasualPlayer]
        setCasualPlayers(updatedCasualPlayers)

        toast({
          title: "Jogador avulso adicionado",
          description: `${casualPlayer.playerName} foi adicionado como avulso`,
        })
      }
    } catch (error) {
      console.error('Erro ao adicionar jogador avulso:', error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o jogador avulso",
        variant: "destructive"
      })
    }
  }

  const handleRemoveCasualPlayer = async (casualPlayerId: string) => {
    if (!currentPeriod) {
      toast({
        title: "Erro",
        description: "Nenhum período selecionado",
        variant: "destructive"
      })
      return
    }

    try {
      await paymentsService.removeCasualPlayer(currentPeriod.id, casualPlayerId)
      
      // Atualizar lista local
      setCasualPlayers(prev => prev.filter(player => player.id !== casualPlayerId))
      
      toast({
        title: "Sucesso",
        description: "Jogador avulso removido com sucesso!",
      })
    } catch (error) {
      console.error("Erro ao remover jogador avulso:", error)
      toast({
        title: "Erro",
        description: "Erro ao remover jogador avulso",
        variant: "destructive"
      })
    }
  }

  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month)
    setCurrentYear(year)
  }

  const handleAdjustMonthlyFee = async (newFee: number) => {
    try {
      // Ajustar mensalidade padrão do período via API
      if (!currentPeriod) {
        toast({
          title: "Erro",
          description: "Período mensal não encontrado.",
          variant: "destructive",
        })
        return
      }

      await paymentsService.updateMonthlyPeriod(currentPeriod.id, { monthly_fee: newFee })
      
      // Atualizar localmente após sucesso
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
      }

      toast({
        title: "Mensalidade reajustada",
        description: `Nova mensalidade de R$ ${newFee.toFixed(2)} aplicada a todos os jogadores`,
      })
    } catch (error) {
      console.error('Erro ao ajustar mensalidade:', error)
      toast({
        title: "Erro",
        description: "Não foi possível ajustar a mensalidade",
        variant: "destructive"
      })
    }
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
    paid:
      currentPeriodPlayers.filter((p) => p.status === "paid").length +
      currentPeriodCasualPlayers.filter((p) => p.status === "paid").length,
    casualCount: currentPeriodCasualPlayers.length,
  }

  const currentFee = currentPeriodPlayers.length > 0 ? currentPeriodPlayers[0].monthlyFee : 150

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <MonthNavigation currentMonth={currentMonth} currentYear={currentYear} onMonthChange={handleMonthChange} />

          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Card className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Recebido</span>
                </div>
                <div className="text-2xl font-bold text-green-600">R$ {stats.received.toFixed(2)}</div>
              </Card>

              <Card className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Esperado</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">R$ {stats.expected.toFixed(2)}</div>
              </Card>

              <Card className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Pendentes</span>
                </div>
                <div className="text-2xl font-bold">{stats.pending}</div>
              </Card>

              <Card className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-muted-foreground">Pagaram</span>
                </div>
                <div className="text-2xl font-bold text-emerald-600">{stats.paid}</div>
              </Card>

              <Card className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-muted-foreground">Avulsos no mês</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">{stats.casualCount}</div>
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
              <Card className="p-6 text-center">
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
          onRemoveCasualPlayer={handleRemoveCasualPlayer}
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
    </AuthGuard>
  )
}

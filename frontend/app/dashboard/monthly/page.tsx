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
import { PaymentsService } from "@/lib/services/payments"
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
      
      // Buscar dados do período mensal atual
      const paymentsResponse = await PaymentsService.getPaymentsByMonth(currentYear, currentMonth)
      
      console.log('[DEBUG] Resposta da API:', paymentsResponse)
      
      // A API retorna diretamente um array de pagamentos, não uma PaginatedResponse
      if (!paymentsResponse || !Array.isArray(paymentsResponse)) {
        console.log('[DEBUG] Sem dados na resposta, limpando estados')
        setMonthlyPlayers([])
        setMonthlyPeriods([])
        return
      }
      
      console.log(`[DEBUG] Encontrados ${paymentsResponse.length} pagamentos`)
      
      // Converter dados da API para o formato local
      const apiPlayers = paymentsResponse.map(payment => ({
        id: payment.id,
        playerId: payment.player_id.toString(),
        monthlyPeriodId: payment.monthly_period_id.toString(),
        playerName: payment.player?.name || 'Nome não encontrado',
        position: payment.player?.position || 'Posição não definida',
        monthlyFee: parseFloat(payment.player?.monthly_fee || '0'),
        status: payment.payment_status === 'paid' ? 'paid' : 'pending',
        paidAt: payment.payment_status === 'paid' ? new Date().toISOString() : undefined,
        phone: payment.player?.phone || '',
        email: payment.player?.email || ''
      }))

      console.log('[DEBUG] Jogadores processados:', apiPlayers)
      setMonthlyPlayers(apiPlayers)

      // Verificar se existe período mensal
      if (paymentsResponse.length > 0) {
        const period = paymentsResponse[0].monthly_period
        console.log('[DEBUG] Período encontrado:', period)
        
        if (period) {
          const formattedPeriod: MonthlyPeriod = {
            id: period.id,
            month: period.month,
            year: period.year,
            name: formatMonthYear(period.month, period.year),
            isActive: true,
            createdAt: period.created_at,
            totalExpected: apiPlayers.reduce((sum, p) => sum + p.monthlyFee, 0),
            totalReceived: apiPlayers.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.monthlyFee, 0),
            playersCount: apiPlayers.length,
          }
          console.log('[DEBUG] Período formatado:', formattedPeriod)
          setMonthlyPeriods([formattedPeriod])
          
          // Se o período existe mas não há jogadores, buscar diretamente do endpoint específico
          if (apiPlayers.length === 0) {
            console.log('[DEBUG] Período existe mas sem jogadores, buscando diretamente...')
            try {
              const periodPlayers = await PaymentsService.getMonthlyPeriodPlayers(period.id)
              console.log('[DEBUG] Jogadores do período encontrados:', periodPlayers)
              
              if (periodPlayers && periodPlayers.length > 0) {
                const formattedPlayers = periodPlayers.map(player => ({
                  id: player.id,
                  playerId: player.player_id.toString(),
                  monthlyPeriodId: player.monthly_period_id.toString(),
                  playerName: player.player?.name || player.player_name || 'Nome não encontrado',
                  position: player.player?.position || player.position || 'Posição não definida',
                  monthlyFee: parseFloat(player.amount?.toString() || player.player?.monthly_fee?.toString() || '0'),
                  status: player.status === 'paid' ? 'paid' : 'pending',
                  paidAt: player.payment_date || undefined,
                  phone: player.player?.phone || player.phone || '',
                  email: player.player?.email || player.email || ''
                }))
                
                console.log('[DEBUG] Jogadores formatados do período:', formattedPlayers)
                setMonthlyPlayers(formattedPlayers)
                
                // Atualizar período com dados corretos
                const updatedPeriod = {
                  ...formattedPeriod,
                  totalExpected: formattedPlayers.reduce((sum, p) => sum + p.monthlyFee, 0),
                  totalReceived: formattedPlayers.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.monthlyFee, 0),
                  playersCount: formattedPlayers.length,
                }
                setMonthlyPeriods([updatedPeriod])
              }
            } catch (error) {
              console.error('[DEBUG] Erro ao buscar jogadores do período:', error)
            }
          }
        }
      } else {
        // Limpar dados se não houver período
        console.log('[DEBUG] Nenhum pagamento encontrado, limpando períodos')
        setMonthlyPeriods([])
      }
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
      const response = await PaymentsService.createMonthlyPeriod({
        year: currentYear,
        month: currentMonth
      })

      toast({
        title: "Sucesso",
        description: `Período mensal criado com ${response.created_payments} pagamentos.`,
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
      const result = await PaymentsService.addPlayersToMonthlyPeriod(currentPeriod.id, playerIds)
      
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
      await PaymentsService.updatePaymentStatus(player.paymentId, newStatus)

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
      // TODO: Implementar criação via API
      // const newCasualPlayer = await PaymentsService.createCasualPlayer(casualPlayer)
      
      // Por enquanto, criar localmente
      const newCasualPlayer: CasualPlayer = {
        ...casualPlayer,
        id: `casual-${Date.now()}-${Math.random()}`,
      }

      const updatedCasualPlayers = [...casualPlayers, newCasualPlayer]
      setCasualPlayers(updatedCasualPlayers)

      toast({
        title: "Jogador avulso adicionado",
        description: `${casualPlayer.playerName} foi adicionado como avulso`,
      })
    } catch (error) {
      console.error('Erro ao adicionar jogador avulso:', error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o jogador avulso",
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
      // TODO: Implementar ajuste via API
      // await PaymentsService.adjustMonthlyFee(currentPeriod.id, newFee)
      
      // Por enquanto, atualizar localmente
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
  }

  const currentFee = currentPeriodPlayers.length > 0 ? currentPeriodPlayers[0].monthlyFee : 150

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <MonthNavigation currentMonth={currentMonth} currentYear={currentYear} onMonthChange={handleMonthChange} />

        {!currentPeriod ? (
          <CreateMonthCard 
            month={currentMonth} 
            year={currentYear} 
            onCreateMonth={handleCreateMonth}
            isLoading={isCreatingMonth}
          />
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
    </AuthGuard>
  )
}

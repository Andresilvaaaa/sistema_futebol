"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, User, DollarSign, UserCheck, MoreHorizontal, Trash2, Check, Clock, Loader2 } from "lucide-react"
import type { CasualPlayer } from "@/types/monthly"

interface CasualPlayersHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  casualPlayers: CasualPlayer[]
  monthName: string
  onRemoveCasualPlayer?: (casualPlayerId: string) => void
  onUpdateCasualPlayerStatus?: (casualPlayerId: string, status: "paid" | "pending") => void
  updatingCasualId?: string
}

export function CasualPlayersHistoryDialog({
  open,
  onOpenChange,
  casualPlayers,
  monthName,
  onRemoveCasualPlayer,
  onUpdateCasualPlayerStatus,
  updatingCasualId,
}: CasualPlayersHistoryDialogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount)
  }

  const totalAmount = casualPlayers.reduce((sum, player) => sum + player.amount, 0)
  const paidAmount = casualPlayers
    .filter((player) => player.status === "paid")
    .reduce((sum, player) => sum + player.amount, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            Histórico de Avulsos - {monthName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Total Arrecadado</span>
              </div>
              <div className="text-xl font-bold text-green-600">{formatCurrency(paidAmount)}</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Total de Avulsos</span>
              </div>
              <div className="text-xl font-bold">{casualPlayers.length}</div>
            </Card>
          </div>

          {/* Players List */}
          <div className="space-y-3">
            {casualPlayers.length === 0 ? (
              <Card className="p-6 text-center">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum jogador avulso registrado neste mês.</p>
              </Card>
            ) : (
              casualPlayers.map((player) => (
                <Card key={player.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{player.playerName}</h4>
                        <Badge variant={player.status === "paid" ? "default" : "secondary"}>
                          {player.status === "paid" ? "Pago" : "Pendente"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>Jogou em: {formatDate(player.playDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          <span>Convidado por: {player.invitedBy}</span>
                        </div>
                      </div>

                      {player.paymentDate && (
                        <div className="text-sm text-muted-foreground">
                          <span>Pago em: {formatDate(player.paymentDate)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-lg font-bold flex items-center gap-2">
                          {formatCurrency(player.amount)}
                          {updatingCasualId === player.id && (
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      
                      {(onRemoveCasualPlayer || onUpdateCasualPlayerStatus) && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" disabled={updatingCasualId === player.id}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {onUpdateCasualPlayerStatus && (
                              <>
                                {player.status !== "paid" && (
                                  <DropdownMenuItem 
                                    onClick={() => onUpdateCasualPlayerStatus(player.id, "paid")}
                                    disabled={updatingCasualId === player.id}
                                    className="cursor-pointer"
                                  >
                                    <Check className="h-4 w-4 mr-2 text-green-600" />
                                    Marcar como Pago
                                  </DropdownMenuItem>
                                )}
                                {player.status !== "pending" && (
                                  <DropdownMenuItem 
                                    onClick={() => onUpdateCasualPlayerStatus(player.id, "pending")}
                                    disabled={updatingCasualId === player.id}
                                    className="cursor-pointer"
                                  >
                                    <Clock className="h-4 w-4 mr-2 text-orange-600" />
                                    Marcar como Pendente
                                  </DropdownMenuItem>
                                )}
                              </>
                            )}
                            {onRemoveCasualPlayer && (
                              <DropdownMenuItem 
                                onClick={() => onRemoveCasualPlayer(player.id)}
                                disabled={updatingCasualId === player.id}
                                className="cursor-pointer text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remover Avulso
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

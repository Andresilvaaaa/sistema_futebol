"use client"

import * as React from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Users, UserCheck, UserX, Timer, Clock } from "lucide-react"

type PlayerSummary = {
  id: string
  name: string
  status: string
  monthlyFee: number
}

type PlayerStats = {
  total: number
  active: number
  pending: number
  delayed: number
  inactive: number
}

interface PlayersDetailsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  stats: PlayerStats
  players: PlayerSummary[]
}

export default function PlayersDetailsDrawer({ open, onOpenChange, stats, players }: PlayersDetailsDrawerProps) {
  const formatCurrency = (value: number) => {
    try {
      return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value || 0)
    } catch {
      return `R$ ${(value || 0).toFixed(2)}`
    }
  }

  const activePlayers = players.filter(p => p.status === "active")
  const inactivePlayers = players.filter(p => p.status === "inactive")
  const pendingPlayers = players.filter(p => p.status === "pending")
  const delayedPlayers = players.filter(p => p.status === "delayed")

  const totalMonthlyFees = players.reduce((sum, p) => sum + Number(p.monthlyFee || 0), 0)

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="sm:max-w-xl">
        <DrawerHeader>
          <DrawerTitle>Detalhes dos Jogadores</DrawerTitle>
          <DrawerDescription>
            Visão geral rápida de estatísticas e valores de mensalidades
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Total:</span>
                  <span className="ml-auto font-medium">{stats.total ?? players.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  <span className="text-sm">Ativos:</span>
                  <span className="ml-auto font-medium">{stats.active ?? activePlayers.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  <span className="text-sm">Pendentes:</span>
                  <span className="ml-auto font-medium">{stats.pending ?? pendingPlayers.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Atrasados:</span>
                  <span className="ml-auto font-medium">{stats.delayed ?? delayedPlayers.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserX className="h-4 w-4" />
                  <span className="text-sm">Inativos:</span>
                  <span className="ml-auto font-medium">{stats.inactive ?? inactivePlayers.length}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Mensalidades totais (lista atual)</span>
                <span className="font-semibold">{formatCurrency(totalMonthlyFees)}</span>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-sm font-medium mb-2">Jogadores</h3>
            <div className="max-h-64 overflow-auto rounded-md border">
              {players.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">Nenhum jogador encontrado</div>
              ) : (
                <ul>
                  {players.map((p) => (
                    <li key={p.id} className="flex items-center justify-between px-3 py-2 border-b last:border-b-0">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{p.name}</span>
                        <span className="text-xs text-muted-foreground capitalize">{p.status}</span>
                      </div>
                      <span className="text-sm font-semibold">{formatCurrency(Number(p.monthlyFee || 0))}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="default">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
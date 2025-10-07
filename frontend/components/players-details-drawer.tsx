"use client"

import { useMemo } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

type PlayerStatus = "active" | "pending" | "delayed" | "inactive" | "paid" | "partial"

interface PlayerLite {
  id: string
  name: string
  status: PlayerStatus
  monthlyFee?: number
}

interface PlayersDetailsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  stats: { total: number; active: number; pending: number; delayed: number; inactive: number }
  players: PlayerLite[]
}

export default function PlayersDetailsDrawer({ open, onOpenChange, stats, players }: PlayersDetailsDrawerProps) {
  const pieSegments = useMemo(() => {
    const totalNum = Number(stats?.total ?? 0)
    const paidCount = Number(stats?.active ?? 0) // usando "Em Dia" como pagos
    const pendingCount = Number(stats?.pending ?? 0)
    const delayedCount = Number(stats?.delayed ?? 0)

    const totalForPct = Math.max(totalNum, 1)
    const paidPct = (paidCount / totalForPct) * 100
    const pendingPct = (pendingCount / totalForPct) * 100
    const delayedPct = (delayedCount / totalForPct) * 100

    // cores: pago=green, pendente=orange, atrasado=red
    const gradient = `conic-gradient(
      #22c55e 0% ${paidPct}%,
      #f59e0b ${paidPct}% ${paidPct + pendingPct}%,
      #ef4444 ${paidPct + pendingPct}% ${paidPct + pendingPct + delayedPct}%,
      #374151 ${paidPct + pendingPct + delayedPct}% 100%
    )`

    return { gradient }
  }, [stats])

  const riskPlayers = useMemo(() => {
    // Regra simples: jogadores pendentes ou atrasados primeiro
    const risky = players.filter((p) => p.status === "pending" || p.status === "delayed")
    // Ordena: atrasados antes, e depois pendentes, mantendo nome como secundário
    return risky.sort((a, b) => {
      const score = (s: PlayerStatus) => (s === "delayed" ? 2 : s === "pending" ? 1 : 0)
      return score(b.status) - score(a.status) || a.name.localeCompare(b.name)
    })
  }, [players])

  const totalSafe = Number(stats?.total ?? 0)
  const activeSafe = Number(stats?.active ?? 0)
  const pendingSafe = Number(stats?.pending ?? 0)
  const delayedSafe = Number(stats?.delayed ?? 0)
  const inactiveSafe = Number(stats?.inactive ?? Math.max(totalSafe - (activeSafe + pendingSafe + delayedSafe), 0))

  const legendItems = [
    { label: "Em Dia", color: "#22c55e", value: activeSafe },
    { label: "Pendente", color: "#f59e0b", value: pendingSafe },
    { label: "Atrasado", color: "#ef4444", value: delayedSafe },
    { label: "Outros", color: "#374151", value: inactiveSafe },
  ]

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="sm:max-w-md">
        <DrawerHeader>
          <DrawerTitle>Detalhes dos Jogadores</DrawerTitle>
          <DrawerDescription>Visão rápida de status e risco</DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <div
                className="w-40 h-40 rounded-full"
                style={{ backgroundImage: pieSegments.gradient }}
                aria-label="Gráfico de status dos jogadores"
                title={`Em Dia: ${stats.active} | Pendente: ${stats.pending} | Atrasado: ${stats.delayed}`}
              />
              <div className="grid grid-cols-2 gap-2 mt-4 w-full">
                {legendItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="ml-auto text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Jogadores com risco de atraso</h3>
              <div className="space-y-2">
                {riskPlayers.length === 0 && (
                  <p className="text-sm text-muted-foreground">Nenhum jogador com risco no momento.</p>
                )}
                {riskPlayers.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-md border p-2">
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">Status: {p.status === "delayed" ? "Atrasado" : "Pendente"}</p>
                    </div>
                    <Badge className={p.status === "delayed" ? "bg-red-500 text-white" : "bg-orange-500 text-white"}>
                      {p.status === "delayed" ? "Atrasado" : "Pendente"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-2" />
          <div className="text-xs text-muted-foreground">
            Clique nos cards de status para filtrar a lista abaixo.
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
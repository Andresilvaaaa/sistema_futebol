import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { PlayerStats } from "@/types/player"

interface StatsCardsProps {
  stats: PlayerStats
  onOpenDetails?: () => void
}

export function StatsCards({ stats, onOpenDetails }: StatsCardsProps) {
  return (
    <div className="mb-6">
      {onOpenDetails && (
        <div className="flex justify-end mb-2">
          <Button variant="outline" size="sm" onClick={onOpenDetails}>
            Ver Detalhes
          </Button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-4 border-l-4 border-l-blue-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-muted-foreground">Total</span>
        </div>
        <div className="text-2xl font-bold mt-1">{stats.total}</div>
      </Card>

      <Card className="p-4 border-l-4 border-l-green-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-muted-foreground">Em Dia</span>
        </div>
        <div className="text-2xl font-bold mt-1">{stats.active}</div>
      </Card>

      <Card className="p-4 border-l-4 border-l-orange-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-muted-foreground">Pendente</span>
        </div>
        <div className="text-2xl font-bold mt-1">{stats.pending}</div>
      </Card>

      <Card className="p-4 border-l-4 border-l-red-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-sm text-muted-foreground">Atrasado</span>
        </div>
        <div className="text-2xl font-bold mt-1">{stats.delayed}</div>
      </Card>
      </div>
      </div>
    )
  }

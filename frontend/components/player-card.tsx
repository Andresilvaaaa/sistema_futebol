"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Power, PowerOff } from "lucide-react"
import { Player } from "@/types/player"
import { playersService } from "@/lib/services/players"
import { toast } from "sonner"

interface PlayerCardProps {
  player: Player
  onEdit?: (player: Player) => void
  onUpdate?: () => void
}

export function PlayerCard({ player, onEdit, onUpdate }: PlayerCardProps) {
  const handleActivate = async () => {
    try {
      await playersService.activatePlayer(player.id)
      toast.success("Jogador ativado com sucesso!")
      onUpdate?.()
    } catch (error) {
      toast.error("Erro ao ativar jogador")
      console.error("Erro ao ativar jogador:", error)
    }
  }

  const handleDeactivate = async () => {
    try {
      await playersService.deactivatePlayer(player.id)
      toast.success("Jogador inativado com sucesso!")
      onUpdate?.()
    } catch (error) {
      toast.error("Erro ao inativar jogador")
      console.error("Erro ao inativar jogador:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: "Ativo", variant: "default" as const },
      inactive: { label: "Inativo", variant: "secondary" as const },
      pending: { label: "Pendente", variant: "outline" as const },
      suspended: { label: "Suspenso", variant: "destructive" as const },
    }
    
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: "outline" as const }
  }

  const statusInfo = getStatusBadge(player.status)

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
            {player.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{player.name}</h3>
            <Badge variant={statusInfo.variant} className="text-xs">
              {statusInfo.label}
            </Badge>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(player)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            {player.status === 'active' ? (
              <DropdownMenuItem onClick={handleDeactivate}>
                <PowerOff className="mr-2 h-4 w-4" />
                Inativar
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleActivate}>
                <Power className="mr-2 h-4 w-4" />
                Ativar
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <span className="font-medium">📞</span>
            <span className="ml-2">{player.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">✉️</span>
            <span className="ml-2">{player.email}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">📅</span>
            <span className="ml-2">Desde {new Date(player.created_at).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

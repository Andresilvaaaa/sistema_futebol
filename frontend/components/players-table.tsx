"use client"

import type { Player } from "@/types/player"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Phone, Mail, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PlayersTableProps {
  players: Player[]
  onEdit?: (player: Player) => void
  onDeactivate?: (playerId: string) => void
  onActivate?: (playerId: string) => void
  showInactive?: boolean
}

export function PlayersTable({ players, onEdit, onDeactivate, onActivate, showInactive = false }: PlayersTableProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getAvatarColor = (name: string) => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-red-500", "bg-teal-500"]
    const index = name.length % colors.length
    return colors[index]
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">#</TableHead>
            <TableHead>Jogador</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Desde</TableHead>
            <TableHead className="w-[50px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={player.id}>
              <TableCell>
                <div
                  className={`w-8 h-8 rounded-full ${getAvatarColor(player.name)} flex items-center justify-center text-white font-bold text-xs`}
                >
                  {getInitials(player.name)}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{player.name}</div>
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>{player.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <span>{player.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{player.joinDate}</span>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit?.(player)}>Editar</DropdownMenuItem>
                    {showInactive ? (
                      <DropdownMenuItem onClick={() => onActivate?.(player.id)}>Reativar</DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onDeactivate?.(player.id)}>Inativar</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

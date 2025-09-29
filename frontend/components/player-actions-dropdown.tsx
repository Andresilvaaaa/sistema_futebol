"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Check, Clock, History, Send, Trash2 } from "lucide-react"

interface PlayerActionsDropdownProps {
  currentStatus: "paid" | "pending"
  onMarkAsPaid: () => void
  onMarkAsPending: () => void
  onSendNotification: () => void
  onViewHistory: () => void
  onRemoveFromMonth: () => void
}

export function PlayerActionsDropdown({
  currentStatus,
  onMarkAsPaid,
  onMarkAsPending,
  onSendNotification,
  onViewHistory,
  onRemoveFromMonth,
}: PlayerActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currentStatus !== "paid" && (
          <DropdownMenuItem onClick={onMarkAsPaid} className="cursor-pointer">
            <Check className="h-4 w-4 mr-2 text-green-600" />
            Marcar como Pago
          </DropdownMenuItem>
        )}
        {currentStatus !== "pending" && (
          <DropdownMenuItem onClick={onMarkAsPending} className="cursor-pointer">
            <Clock className="h-4 w-4 mr-2 text-orange-600" />
            Marcar como Pendente
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onSendNotification} className="cursor-pointer">
          <Send className="h-4 w-4 mr-2 text-blue-600" />
          Enviar Notificação
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onViewHistory} className="cursor-pointer">
          <History className="h-4 w-4 mr-2 text-purple-600" />
          Ver Histórico
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRemoveFromMonth} className="cursor-pointer text-red-600">
          <Trash2 className="h-4 w-4 mr-2" />
          Remover do Mês
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

"use client"

import { Badge } from "@/components/ui/badge"
import { Check, Clock } from "lucide-react"

interface PaymentStatusDropdownProps {
  currentStatus: "paid" | "pending"
  pendingMonthsCount?: number
}

export function PaymentStatusDropdown({ currentStatus, pendingMonthsCount }: PaymentStatusDropdownProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "paid":
        return {
          label: "Em dia",
          icon: Check,
          className: "bg-green-500 text-white",
          color: "text-green-600",
        }
      case "pending":
        return {
          label: pendingMonthsCount && pendingMonthsCount > 1 ? `Pendente (${pendingMonthsCount} meses)` : "Pendente",
          icon: Clock,
          className: "bg-orange-500 text-white",
          color: "text-orange-600",
        }
      default:
        return {
          label: status,
          icon: Clock,
          className: "bg-gray-500 text-white",
          color: "text-gray-600",
        }
    }
  }

  const currentConfig = getStatusConfig(currentStatus)
  const CurrentIcon = currentConfig.icon

  return (
    <Badge className={currentConfig.className}>
      <CurrentIcon className="h-3 w-3 mr-1" />
      {currentConfig.label}
    </Badge>
  )
}

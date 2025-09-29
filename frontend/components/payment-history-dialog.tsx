"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Check, Clock, AlertTriangle } from "lucide-react"

interface PaymentRecord {
  date: string
  status: "paid" | "pending" | "delayed"
  amount: number
  month: string
  note?: string
}

interface PaymentHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  playerName: string
  paymentHistory: PaymentRecord[]
}

export function PaymentHistoryDialog({ open, onOpenChange, playerName, paymentHistory }: PaymentHistoryDialogProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "paid":
        return {
          label: "Pago",
          icon: Check,
          className: "bg-green-500 text-white",
        }
      case "pending":
        return {
          label: "Pendente",
          icon: Clock,
          className: "bg-orange-500 text-white",
        }
      case "delayed":
        return {
          label: "Atrasado",
          icon: AlertTriangle,
          className: "bg-red-500 text-white",
        }
      default:
        return {
          label: status,
          icon: Clock,
          className: "bg-gray-500 text-white",
        }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Histórico de Pagamentos - {playerName}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {paymentHistory.length > 0 ? (
              paymentHistory.map((record, index) => {
                const config = getStatusConfig(record.status)
                const StatusIcon = config.icon

                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{record.month}</span>
                        <span className="text-sm text-muted-foreground">{record.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">R$ {record.amount.toFixed(2)}</span>
                      <Badge className={config.className}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum histórico de pagamento encontrado.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

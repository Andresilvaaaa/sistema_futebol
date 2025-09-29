"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Plus } from "lucide-react"

interface CreateMonthCardProps {
  month: number
  year: number
  onCreateMonth: () => void
}

export function CreateMonthCard({ month, year, onCreateMonth }: CreateMonthCardProps) {
  return (
    <div className="max-w-md mx-auto">
      <Card className="p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Mês não criado</h3>
          <p className="text-muted-foreground">
            Este mês ainda não foi configurado. Crie o mês para começar a gerenciar os pagamentos.
          </p>
        </div>

        <Button onClick={onCreateMonth} className="w-full bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Criar Mês
        </Button>
      </Card>
    </div>
  )
}

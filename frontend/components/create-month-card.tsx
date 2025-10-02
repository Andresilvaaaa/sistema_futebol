"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Plus } from "lucide-react"

interface CreateMonthCardProps {
  month: number
  year: number
  onCreateMonth: () => void
  isLoading?: boolean
}

export function CreateMonthCard({ month, year, onCreateMonth, isLoading = false }: CreateMonthCardProps) {
  const monthName = new Date(year, month - 1).toLocaleDateString('pt-BR', { month: 'long' })
  
  return (
    <div className="max-w-md mx-auto">
      <Card className="p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {monthName.charAt(0).toUpperCase() + monthName.slice(1)} de {year} não criado
          </h3>
          <p className="text-muted-foreground">
            Este período ainda não foi configurado. Crie o período para começar a gerenciar os pagamentos mensais.
          </p>
        </div>

        <Button 
          onClick={onCreateMonth} 
          className="w-full bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          {isLoading ? 'Criando...' : `Criar ${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`}
        </Button>
      </Card>
    </div>
  )
}

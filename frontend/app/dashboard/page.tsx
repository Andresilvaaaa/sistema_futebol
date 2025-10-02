"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Calendar, DollarSign, Receipt, TrendingUp, BarChart3 } from "lucide-react"
import Link from "next/link"
import AuthGuard from "@/components/auth-guard"

export default function HomePage() {
  return (
    <AuthGuard>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Dashboard</h1>
          <p className="text-xl text-muted-foreground">Visão geral do seu sistema de gestão esportiva</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">6</h3>
                <p className="text-sm text-muted-foreground">Jogadores Ativos</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">R$ 1.680</h3>
                <p className="text-sm text-muted-foreground">Saldo Atual</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">R$ 900</h3>
                <p className="text-sm text-muted-foreground">Receita Mensal</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/dashboard/players">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Gestão de Jogadores</h3>
                  <p className="text-muted-foreground">Cadastre e gerencie todos os jogadores, com histórico de pagamentos e status</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/monthly">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
                  <Calendar className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Controle Mensal</h3>
                  <p className="text-muted-foreground">Acompanhe mensalidades, presenças e pagamentos mês a mês</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/cashflow">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30 transition-colors">
                  <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fluxo de Caixa</h3>
                  <p className="text-muted-foreground">Análise financeira detalhada com receitas e despesas</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/expenses">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-900/30 transition-colors">
                  <Receipt className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Controle de Despesas</h3>
                  <p className="text-muted-foreground">Gerencie gastos com campo, equipamentos e outros custos</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        <div className="text-center pt-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Pronto para começar?</h2>
            <p className="text-muted-foreground">Escolha uma das opções acima ou comece gerenciando seus jogadores</p>
            <Link href="/dashboard/players">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Gerenciar Jogadores
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

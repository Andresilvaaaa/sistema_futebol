'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar } from 'recharts'

// Mock data para demonstração
const monthlyData = [
  { month: 'Jan', receita: 1680, despesas: 780, saldo: 900 },
  { month: 'Fev', receita: 1680, despesas: 850, saldo: 830 },
  { month: 'Mar', receita: 1680, despesas: 720, saldo: 960 },
  { month: 'Abr', receita: 1680, despesas: 800, saldo: 880 },
  { month: 'Mai', receita: 1680, despesas: 780, saldo: 900 },
  { month: 'Jun', receita: 1680, despesas: 750, saldo: 930 },
]

const expenseCategories = [
  { name: 'Campo', value: 400, color: '#8884d8' },
  { name: 'Equipamentos', value: 200, color: '#82ca9d' },
  { name: 'Arbitragem', value: 150, color: '#ffc658' },
  { name: 'Outros', value: 30, color: '#ff7300' },
]

const playerStats = [
  { name: 'João Silva', pagamentos: 6, status: 'Em dia' },
  { name: 'Pedro Santos', pagamentos: 6, status: 'Em dia' },
  { name: 'Carlos Lima', pagamentos: 5, status: 'Pendente' },
  { name: 'Rafael Costa', pagamentos: 6, status: 'Em dia' },
  { name: 'Lucas Oliveira', pagamentos: 6, status: 'Em dia' },
  { name: 'André Souza', pagamentos: 6, status: 'Em dia' },
]

export default function PublicDashboard() {
  const currentMonth = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const totalReceita = 1680
  const totalDespesas = 780
  const saldoAtual = totalReceita - totalDespesas
  const jogadoresAtivos = playerStats.length
  const jogadoresEmDia = playerStats.filter(p => p.status === 'Em dia').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/landing">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard Público
              </h1>
            </div>
            <Badge variant="secondary">
              {currentMonth}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                R$ {totalReceita.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +2.5% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                R$ {totalDespesas.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline h-3 w-3 mr-1" />
                -5.1% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                R$ {saldoAtual.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +15.4% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jogadores Ativos</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {jogadoresAtivos}
              </div>
              <p className="text-xs text-muted-foreground">
                <Activity className="inline h-3 w-3 mr-1" />
                {jogadoresEmDia} em dia com pagamentos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Evolução Financeira */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução Financeira</CardTitle>
              <CardDescription>
                Receitas, despesas e saldo dos últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `R$ ${value}`} />
                  <Line 
                    type="monotone" 
                    dataKey="receita" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Receita"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="despesas" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Despesas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="saldo" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Saldo"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Distribuição de Despesas */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Despesas</CardTitle>
              <CardDescription>
                Categorias de gastos do mês atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${value}`} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Status dos Jogadores */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Status dos Jogadores</CardTitle>
            <CardDescription>
              Situação atual dos pagamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {playerStats.map((player, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm text-gray-600">
                      {player.pagamentos}/6 pagamentos
                    </p>
                  </div>
                  <Badge 
                    variant={player.status === 'Em dia' ? 'default' : 'destructive'}
                  >
                    {player.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas Resumidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Taxa de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {Math.round((jogadoresEmDia / jogadoresAtivos) * 100)}%
              </div>
              <p className="text-sm text-gray-600">
                {jogadoresEmDia} de {jogadoresAtivos} jogadores em dia
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Receita Média</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                R$ {Math.round(totalReceita / jogadoresAtivos)}
              </div>
              <p className="text-sm text-gray-600">
                Por jogador/mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próxima Cobrança</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                15
              </div>
              <p className="text-sm text-gray-600">
                Dias para próximo vencimento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Quer acesso completo?</CardTitle>
              <CardDescription>
                Entre no sistema para gerenciar todos os aspectos do seu time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                <Link href="/landing#auth">
                  Acessar Sistema Completo
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
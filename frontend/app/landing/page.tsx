'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Trophy, 
  Users, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Calendar,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Loader2,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'

export default function LandingPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' })
  
  const { login, register } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await login(loginData.username, loginData.password)
      if (result.success) {
        router.push('/dashboard')
      } else {
        setError(result.error || 'Erro ao fazer login')
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await register(registerData.name, registerData.email, registerData.password)
      if (result.success) {
        router.push('/dashboard')
      } else {
        setError(result.error || 'Erro ao fazer cadastro')
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }
  const [isLoginMode, setIsLoginMode] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sistema Futebol
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
              Recursos
            </Link>
            <Link href="#public-dashboard" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
              Dashboard Público
            </Link>
            <Link href="#auth" className="text-gray-600 hover:text-green-600 dark:text-gray-300">
              Entrar
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Sistema de Gestão Esportiva
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Gerencie seu time de futebol
            <span className="text-green-600 block">de forma profissional</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Controle completo de jogadores, mensalidades, despesas e fluxo de caixa. 
            Tudo em um só lugar, com relatórios detalhados e dashboards interativos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="#auth">
                <LogIn className="mr-2 h-5 w-5" />
                Acessar Sistema
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#public-dashboard">
                <Eye className="mr-2 h-5 w-5" />
                Ver Dashboard Público
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Recursos Principais
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Gestão de Jogadores</CardTitle>
                <CardDescription>
                  Cadastre e gerencie todos os jogadores, com histórico de pagamentos e status
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Controle Mensal</CardTitle>
                <CardDescription>
                  Acompanhe mensalidades, presenças e ajustes mês a mês
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Fluxo de Caixa</CardTitle>
                <CardDescription>
                  Controle completo de receitas e despesas com relatórios detalhados
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-orange-600 mb-2" />
                <CardTitle>Relatórios</CardTitle>
                <CardDescription>
                  Dashboards interativos com métricas e análises financeiras
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-red-600 mb-2" />
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Sistema seguro com autenticação e controle de acesso
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Eye className="h-10 w-10 text-teal-600 mb-2" />
                <CardTitle>Dashboard Público</CardTitle>
                <CardDescription>
                  Compartilhe informações públicas com transparência
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Public Dashboard Preview */}
      <section id="public-dashboard" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Dashboard Público
          </h3>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-green-600" />
                  Resumo Financeiro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Receita Mensal</span>
                    <span className="font-semibold text-green-600">R$ 1.680</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Despesas</span>
                    <span className="font-semibold text-red-600">R$ 780</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Saldo</span>
                    <span className="font-bold text-green-600">R$ 900</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-600" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jogadores Ativos</span>
                    <span className="font-semibold">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de Pagamento</span>
                    <span className="font-semibold text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Próximo Jogo</span>
                    <span className="font-semibold">15/01</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/public/dashboard">
                <BarChart3 className="mr-2 h-4 w-4" />
                Ver Dashboard Completo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth" className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Acesso ao Sistema</CardTitle>
              <CardDescription>
                Entre com sua conta ou crie uma nova
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Cadastro</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fazer Login</CardTitle>
                      <CardDescription>
                        Entre com suas credenciais para acessar o sistema
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                            {error}
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="login-username">Username</Label>
                          <Input
                            id="login-username"
                            type="text"
                            placeholder="admin"
                            value={loginData.username}
                            onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Senha</Label>
                          <div className="relative">
                            <Input
                              id="login-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Sua senha"
                              value={loginData.password}
                              onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                              required
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Entrando...
                            </>
                          ) : (
                            'Entrar'
                          )}
                        </Button>
                        
                        <div className="text-sm text-center text-muted-foreground">
                          <p>Credenciais de teste:</p>
                          <p><strong>Admin:</strong> admin@futebol.com / admin123</p>
                          <p><strong>Usuário:</strong> user@futebol.com / user123</p>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="register">
                  <Card>
                    <CardHeader>
                      <CardTitle>Criar Conta</CardTitle>
                      <CardDescription>
                        Cadastre-se para começar a usar o sistema
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleRegister} className="space-y-4">
                        {error && (
                          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                            {error}
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Nome</Label>
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="Seu nome completo"
                            value={registerData.name}
                            onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="seu@email.com"
                            value={registerData.email}
                            onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="register-password">Senha</Label>
                          <div className="relative">
                            <Input
                              id="register-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Mínimo 6 caracteres"
                              value={registerData.password}
                              onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                              required
                              disabled={isLoading}
                              minLength={6}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Cadastrando...
                            </>
                          ) : (
                            'Criar Conta'
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">Sistema Futebol</span>
          </div>
          <p className="text-gray-400">
            © 2024 Sistema Futebol. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
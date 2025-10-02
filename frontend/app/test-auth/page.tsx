'use client'

import { useState, useEffect } from 'react'
import { AuthService, useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export default function TestAuthPage() {
  const { isAuthenticated, user, login, logout } = useAuth()
  const [email, setEmail] = useState('admin@futebol.com')
  const [password, setPassword] = useState('admin123')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [authInfo, setAuthInfo] = useState<any>(null)

  useEffect(() => {
    // Verifica informações de autenticação
    const checkAuthInfo = () => {
      const token = AuthService.getToken()
      const currentUser = AuthService.getCurrentUser()
      const isAuth = AuthService.isAuthenticated()
      
      setAuthInfo({
        token: token ? token.substring(0, 50) + '...' : null,
        user: currentUser,
        isAuthenticated: isAuth,
        localStorage: typeof window !== 'undefined' ? localStorage.getItem('futebol_auth') : null,
        cookies: typeof window !== 'undefined' ? document.cookie : null
      })
    }

    checkAuthInfo()
    const interval = setInterval(checkAuthInfo, 1000)
    return () => clearInterval(interval)
  }, [isAuthenticated])

  const handleLogin = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const result = await login(email, password)
      if (!result.success) {
        setError(result.error || 'Erro no login')
      }
    } catch (err) {
      setError('Erro inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  const clearStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear()
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      })
      window.location.reload()
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Teste de Autenticação</h1>
        <p className="text-muted-foreground">Página para testar o sistema de autenticação</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status da Autenticação */}
        <Card>
          <CardHeader>
            <CardTitle>Status da Autenticação</CardTitle>
            <CardDescription>Estado atual do sistema de auth</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Label>Status:</Label>
              <Badge variant={isAuthenticated ? "default" : "destructive"}>
                {isAuthenticated ? "Autenticado" : "Não Autenticado"}
              </Badge>
            </div>
            
            {user && (
              <div className="space-y-2">
                <div><strong>Nome:</strong> {user.name}</div>
                <div><strong>Email:</strong> {user.email}</div>
                <div><strong>Role:</strong> {user.role}</div>
                <div><strong>ID:</strong> {user.id}</div>
              </div>
            )}

            {isAuthenticated && (
              <Button onClick={handleLogout} variant="outline">
                Fazer Logout
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Formulário de Login */}
        {!isAuthenticated && (
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Faça login para testar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@futebol.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <Button 
                onClick={handleLogin} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Fazendo Login..." : "Login"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Informações Técnicas */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informações Técnicas</CardTitle>
            <CardDescription>Dados internos do sistema de autenticação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Token JWT (primeiros 50 chars):</Label>
                <div className="bg-muted p-2 rounded text-sm font-mono">
                  {authInfo?.token || 'Nenhum token'}
                </div>
              </div>

              <div>
                <Label>LocalStorage (futebol_auth):</Label>
                <div className="bg-muted p-2 rounded text-sm font-mono max-h-32 overflow-auto">
                  {authInfo?.localStorage || 'Vazio'}
                </div>
              </div>

              <div>
                <Label>Cookies:</Label>
                <div className="bg-muted p-2 rounded text-sm font-mono max-h-32 overflow-auto">
                  {authInfo?.cookies || 'Nenhum cookie'}
                </div>
              </div>

              <Button onClick={clearStorage} variant="destructive" size="sm">
                Limpar Tudo (Storage + Cookies)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
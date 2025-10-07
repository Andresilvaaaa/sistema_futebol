'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function AutoLoginPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const performAutoLogin = async () => {
      try {
        // Se já estiver autenticado, redireciona
        if (isAuthenticated) {
          setStatus('success')
          setMessage('Usuário já está autenticado!')
          setTimeout(() => router.push('/dashboard/monthly'), 1000)
          return
        }

        setMessage('Fazendo login automático...')
        
        // Tenta fazer login com credenciais padrão
        const result = await login('admin', 'admin123')
        
        if (result.success) {
          setStatus('success')
          setMessage('Login realizado com sucesso! Redirecionando...')
          setTimeout(() => router.push('/dashboard/monthly'), 1500)
        } else {
          setStatus('error')
          setMessage(result.error || 'Erro no login automático')
        }
      } catch (error) {
        setStatus('error')
        setMessage('Erro inesperado durante o login')
        console.error('Erro no auto-login:', error)
      }
    }

    performAutoLogin()
  }, [login, isAuthenticated, router])

  const handleManualRedirect = () => {
    router.push('/dashboard/monthly')
  }

  const handleGoToLogin = () => {
    router.push('/landing')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Auto Login</CardTitle>
          <CardDescription>
            Fazendo login automático para desenvolvimento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            {status === 'loading' && (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span className="text-sm text-muted-foreground">Carregando...</span>
              </>
            )}
            {status === 'success' && (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-600">Sucesso!</span>
              </>
            )}
            {status === 'error' && (
              <>
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm text-red-600">Erro</span>
              </>
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            {message}
          </div>

          {status === 'success' && (
            <Button onClick={handleManualRedirect} className="w-full">
              Ir para Dashboard
            </Button>
          )}

          {status === 'error' && (
            <div className="space-y-2">
              <Button onClick={handleGoToLogin} className="w-full">
                Ir para Página de Login
              </Button>
              <Button onClick={handleManualRedirect} variant="outline" className="w-full">
                Tentar Dashboard Mesmo Assim
              </Button>
            </div>
          )}

          <div className="text-xs text-center text-muted-foreground">
            <p>Credenciais de desenvolvimento:</p>
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
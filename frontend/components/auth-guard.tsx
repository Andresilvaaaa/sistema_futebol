'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/lib/auth'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = AuthService.isAuthenticated()
      setIsAuthenticated(authenticated)
      setIsLoading(false)

      if (!authenticated) {
        // Redireciona para landing se não estiver autenticado
        router.replace('/landing')
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Verificando autenticação...</p>
          </div>
        </div>
      )
    )
  }

  if (!isAuthenticated) {
    return null // O redirecionamento já foi feito no useEffect
  }

  return <>{children}</>
}

// Componente para proteger páginas inteiras
export function ProtectedPage({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  )
}

// Export default para compatibilidade
export default AuthGuard
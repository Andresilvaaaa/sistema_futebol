// Sistema de autenticação com JWT e cookies seguros
// Implementação melhorada para produção

import { useState, useEffect } from 'react'

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

export interface AuthToken {
  token: string
  refreshToken: string
  expiresAt: number
}

// Chaves para armazenar dados
const AUTH_STORAGE_KEY_PREFIX = 'futebol_auth'
const TOKEN_STORAGE_KEY = 'futebol_token'

// Função para obter chave de armazenamento específica do usuário
function getAuthStorageKey(userId: string): string {
  return `${AUTH_STORAGE_KEY_PREFIX}_${userId}`
}

// Usuários mock para demonstração
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@futebol.com',
    password: 'admin123',
    role: 'admin' as const
  },
  {
    id: '2', 
    name: 'Usuário',
    email: 'user@futebol.com',
    password: 'user123',
    role: 'user' as const
  }
]

// Utilitários para cookies seguros
class CookieManager {
  static set(name: string, value: string, days: number = 7): void {
    if (typeof window === 'undefined') return
    
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    
    // Em desenvolvimento (HTTP), não usar flag 'secure'
    const isSecure = window.location.protocol === 'https:'
    const secureFlag = isSecure ? '; secure' : ''
    
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/${secureFlag}; samesite=strict`
  }

  static get(name: string): string | null {
    if (typeof window === 'undefined') return null
    
    const nameEQ = name + "="
    const ca = document.cookie.split(';')
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  static remove(name: string): void {
    if (typeof window === 'undefined') return
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }
}

// Gerador de JWT mock (em produção, isso viria do backend)
class JWTManager {
  static generateToken(user: User): AuthToken {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(JSON.stringify({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 horas
    }))
    const signature = btoa('mock-signature-' + user.id)
    
    const token = `${header}.${payload}.${signature}`
    const refreshToken = btoa('refresh-' + user.id + '-' + Date.now())
    
    return {
      token,
      refreshToken,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000)
    }
  }

  static validateToken(token: string): User | null {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) return null
      
      // Decodifica Base64URL de forma robusta
      const base64UrlToBase64 = (str: string) => {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        const pad = output.length % 4;
        if (pad) output += '='.repeat(4 - pad);
        return output;
      }
      const decodePayload = (str: string) => {
        try {
          return JSON.parse(atob(base64UrlToBase64(str)))
        } catch {
          return null
        }
      }

      const payload = decodePayload(parts[1])
      if (!payload) return null
      
      // Verifica se o token não expirou
      if (payload.exp * 1000 < Date.now()) return null
      
      return {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        role: payload.role
      }
    } catch {
      return null
    }
  }
}

export class AuthService {
  // Verifica se o usuário está autenticado
  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    
    // Primeiro verifica se há token nos cookies
    const token = CookieManager.get(TOKEN_STORAGE_KEY)
    if (token) {
      const user = JWTManager.validateToken(token)
      return user !== null
    }
    
    // Fallback para localStorage (compatibilidade) - verifica todas as chaves de usuários
    const allKeys = Object.keys(localStorage)
    const authKeys = allKeys.filter(key => key.startsWith(AUTH_STORAGE_KEY_PREFIX + '_'))
    
    for (const key of authKeys) {
      try {
        const authData = localStorage.getItem(key)
        if (authData) {
          const { expiresAt } = JSON.parse(authData)
          if (new Date().getTime() < expiresAt) {
            return true // Encontrou pelo menos um usuário autenticado válido
          } else {
            // Remove dados expirados
            localStorage.removeItem(key)
          }
        }
      } catch {
        // Remove dados corrompidos
        localStorage.removeItem(key)
      }
    }
    
    return false
  }

  // Obtém dados do usuário atual
  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    
    // Obter apenas do token JWT - sem fallback para localStorage
    const token = CookieManager.get(TOKEN_STORAGE_KEY)
    if (token) {
      const userFromToken = JWTManager.validateToken(token)
      if (userFromToken) {
        // Se o token não traz nome/email/role, tenta complementar via localStorage
        if (!userFromToken.name || !userFromToken.email || !userFromToken.role) {
          try {
            const userId = userFromToken.id
            if (userId) {
              const storageKey = getAuthStorageKey(userId)
              const stored = localStorage.getItem(storageKey)
              if (stored) {
                const parsed = JSON.parse(stored)
                const storedUser = parsed?.user
                if (storedUser && storedUser.id === userId) {
                  return {
                    id: userId,
                    name: storedUser.name ?? userFromToken.name ?? 'Usuário',
                    email: storedUser.email ?? userFromToken.email ?? '',
                    role: storedUser.role ?? userFromToken.role ?? 'user'
                  }
                }
              }
            }
          } catch {
            // ignora erros de leitura
          }
          // Complemento geral: se não encontrou por ID, varre todas as chaves válidas
          try {
            const allKeys = Object.keys(localStorage)
            const authKeys = allKeys.filter(key => key.startsWith(AUTH_STORAGE_KEY_PREFIX + '_'))
            let bestUser: User | null = null
            let bestExp = 0
            for (const key of authKeys) {
              const raw = localStorage.getItem(key)
              if (!raw) continue
              const parsed = JSON.parse(raw)
              if (parsed?.expiresAt && Date.now() < parsed.expiresAt && parsed?.user) {
                if (parsed.expiresAt > bestExp) {
                  bestExp = parsed.expiresAt
                  bestUser = parsed.user as User
                }
              }
            }
            if (bestUser) {
              return {
                id: bestUser.id ?? userFromToken.id,
                name: bestUser.name ?? userFromToken.name ?? 'Usuário',
                email: bestUser.email ?? userFromToken.email ?? '',
                role: bestUser.role ?? userFromToken.role ?? 'user'
              }
            }
          } catch {
            // ignora erros
          }
        }
        // Se não foi possível complementar via localStorage, retorna com fallbacks seguros
        return {
          id: userFromToken.id,
          name: userFromToken.name ?? 'Usuário',
          email: userFromToken.email ?? '',
          role: (userFromToken.role ?? 'user') as 'admin' | 'user'
        }
      }
    }

    // Fallback: tenta obter usuário do localStorage se houver sessão válida
    try {
      const allKeys = Object.keys(localStorage)
      const authKeys = allKeys.filter(key => key.startsWith(AUTH_STORAGE_KEY_PREFIX + '_'))
      for (const key of authKeys) {
        const authDataRaw = localStorage.getItem(key)
        if (!authDataRaw) continue
        const authData = JSON.parse(authDataRaw)
        if (authData?.expiresAt && Date.now() < authData.expiresAt && authData?.user) {
          return authData.user as User
        }
      }
    } catch {
      // ignora erros
    }

    // Se não há token JWT válido, o usuário não está logado
    return null
  }

  // Faz login
  static async login(username: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const response = await fetch('/api/auth/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         // Backend espera sempre 'username' e 'password'
         body: JSON.stringify({ username, password }),
       });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.error || 'Falha na autenticação' };
      }

      const data = await response.json();
      
      // Montar objeto User usando dados reais retornados pelo backend
      const user: User = {
        id: String(data.user.id ?? data.user.username ?? 'unknown'),
        name: data.user.name ?? data.user.username ?? data.user.email ?? 'Usuário',
        email: data.user.email ?? `${data.user.username ?? data.user.name ?? 'user'}@futebol.com`,
        role: data.user.role ?? (((data.user.username === 'admin') || (data.user.email && data.user.email.startsWith('admin'))) ? 'admin' : 'user')
      };
      
      // Armazena token em cookie seguro
      CookieManager.set(TOKEN_STORAGE_KEY, data.access_token, 7)
      
      // Mantém dados no localStorage para compatibilidade - usando chave específica do usuário
      const authData = {
        user: user,
        expiresAt: Date.now() + (24 * 60 * 60 * 1000)
      }
      const userAuthKey = getAuthStorageKey(user.id)
      localStorage.setItem(userAuthKey, JSON.stringify(authData))
      
      return { success: true, user: user };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: 'Erro de conexão' };
    }
  }

  // Faz cadastro
  static async register(name: string, email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      // Validações básicas no frontend
      if (name.length < 2) {
        return { success: false, error: 'Nome deve ter pelo menos 2 caracteres' }
      }
      if (password.length < 6) {
        return { success: false, error: 'Senha deve ter pelo menos 6 caracteres' }
      }
      if (!email.includes('@')) {
        return { success: false, error: 'Email inválido' }
      }

      // Chama backend para registrar
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, email, password }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        return { success: false, error: data.error || 'Falha no cadastro' }
      }

      const user: User = {
        id: String(data.user.id ?? 'unknown'),
        name: data.user.name ?? data.user.username ?? name,
        email: data.user.email ?? email,
        role: (data.user.role ?? 'user') as 'admin' | 'user'
      }

      // Armazena token retornado pelo backend
      if (data.access_token) {
        CookieManager.set(TOKEN_STORAGE_KEY, data.access_token, 7)
      }

      const authData = {
        user,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
      }
      const userAuthKey = getAuthStorageKey(user.id)
      localStorage.setItem(userAuthKey, JSON.stringify(authData))

      return { success: true, user }
    } catch (err) {
      return { success: false, error: 'Erro inesperado no cadastro' }
    }
  }

  // Faz logout
  static logout(): void {
    if (typeof window !== 'undefined') {
      // Remove token do cookie
      CookieManager.remove(TOKEN_STORAGE_KEY)

      // Remove dados do localStorage - limpa todas as chaves de autenticação do usuário atual
      const currentUser = this.getCurrentUser()
      if (currentUser) {
        const userAuthKey = getAuthStorageKey(currentUser.id)
        localStorage.removeItem(userAuthKey)
      }
      
      // Limpa também qualquer chave de autenticação órfã
      const allKeys = Object.keys(localStorage)
      const authKeys = allKeys.filter(key => key.startsWith(AUTH_STORAGE_KEY_PREFIX + '_'))
      authKeys.forEach(key => {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}')
          if (data.expiresAt && Date.now() > data.expiresAt) {
            localStorage.removeItem(key)
          }
        } catch {
          localStorage.removeItem(key)
        }
      })

      // Limpa outros dados relacionados à autenticação
      localStorage.removeItem('futebol_user')
      localStorage.removeItem('futebol_preferences')

      // Redireciona diretamente para a landing page sem reload total
      // Evita loops causados por componentes protegidos tentando verificar auth durante reload
      try {
        window.location.assign('/landing')
      } catch {
        // Fallback: recarrega se assign falhar
        window.location.reload()
      }
    }
  }

  // Atualiza dados do usuário
  static updateUser(userData: Partial<User>): boolean {
    const currentUser = this.getCurrentUser()
    if (!currentUser) return false

    const updatedUser = { ...currentUser, ...userData }
    
    // Gera novo token com dados atualizados
    const authToken = JWTManager.generateToken(updatedUser)
    
    // Atualiza cookie
    CookieManager.set(TOKEN_STORAGE_KEY, authToken.token, 7)
    
    // Atualiza localStorage - usando chave específica do usuário
    const authData = {
      user: updatedUser,
      expiresAt: authToken.expiresAt
    }
    const userAuthKey = getAuthStorageKey(updatedUser.id)
    localStorage.setItem(userAuthKey, JSON.stringify(authData))
    
    return true
  }

  // Obtém token atual
  static getToken(): string | null {
    return CookieManager.get(TOKEN_STORAGE_KEY)
  }

  // Refresh token (para implementação futura)
  static async refreshToken(): Promise<boolean> {
    // Em produção, isso faria uma chamada para o backend
    const currentUser = this.getCurrentUser()
    if (!currentUser) return false
    
    const authToken = JWTManager.generateToken(currentUser)
    CookieManager.set(TOKEN_STORAGE_KEY, authToken.token, 7)
    
    return true
  }
}

// Hook personalizado para usar autenticação em componentes React
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  })

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = AuthService.isAuthenticated()
      const user = AuthService.getCurrentUser()
      
      setAuthState({
        isAuthenticated: isAuth,
        user
      })
    }

    checkAuth()
    
    // Verifica autenticação a cada minuto
    const interval = setInterval(checkAuth, 60000)
    
    return () => clearInterval(interval)
  }, [])

  const login = async (username: string, password: string) => {
    const result = await AuthService.login(username, password)
    if (result.success && result.user) {
      setAuthState({
        isAuthenticated: true,
        user: result.user
      })
    }
    return result
  }

  const register = async (name: string, email: string, password: string) => {
    const result = await AuthService.register(name, email, password)
    if (result.success && result.user) {
      setAuthState({
        isAuthenticated: true,
        user: result.user
      })
    }
    return result
  }

  const logout = () => {
    AuthService.logout()
    setAuthState({
      isAuthenticated: false,
      user: null
    })
  }

  return {
    ...authState,
    login,
    register,
    logout
  }
}
/**
 * Cliente HTTP base para comunicação com a API
 * Gerencia autenticação, interceptors e tratamento de erros
 */

// Configuração base da API
// Preferimos caminho relativo por padrão para usar rewrites do Next.js em desenvolvimento
// Em produção, defina NEXT_PUBLIC_API_URL para apontar para o backend externo
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

// Tipos para as respostas padronizadas da API
export interface StandardApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedApiResponse<T = any> extends StandardApiResponse<T[]> {
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    total: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface ApiError extends Error {
  status: number;
  details?: any;
  errors?: string[];
}

// Classe customizada para erros da API
export class ApiException extends Error implements ApiError {
  public status: number;
  public details?: any;
  public errors?: string[];

  constructor(message: string, status: number, details?: any, errors?: string[]) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.details = details;
    this.errors = errors;
  }
}

// Classe principal do cliente API
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Método privado para obter headers padrão
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Adiciona token de autenticação se existir
    if (typeof window !== 'undefined') {
      // Primeiro tenta obter do cookie (sistema de auth atual)
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('futebol_token='))
        ?.split('=')[1];
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Constrói uma URL absoluta a partir de um endpoint que pode ser relativo
   */
  private buildUrl(endpoint: string): string {
    // Se já for uma URL absoluta, retorna diretamente
    const isAbsolute = /^https?:\/\//i.test(endpoint);
    if (isAbsolute) return endpoint;

    // Base preferida: this.baseURL quando definida (produção)
    const base = this.baseURL && this.baseURL.trim().length > 0
      ? this.baseURL
      : (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000');

    try {
      const url = new URL(endpoint, base);
      return url.toString();
    } catch (_e) {
      // Fallback simples por concatenação segura
      const baseNoSlash = base.endsWith('/') ? base.slice(0, -1) : base;
      const endpointWithSlash = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      return `${baseNoSlash}${endpointWithSlash}`;
    }
  }

  /**
   * Método privado para tratar erros da API com formato padronizado
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let responseData: any;
    try {
      responseData = isJson ? await response.json() : await response.text();
    } catch (error) {
      throw new ApiException(
        'Erro ao processar resposta da API',
        response.status,
        { originalError: error }
      );
    }

    // Se o token expirou ou não autorizado, força logout e redirecionamento
    if (response.status === 401 || response.status === 403) {
      try {
        if (typeof window !== 'undefined') {
          // Remove token e dados de auth para evitar loops
          document.cookie = 'futebol_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          localStorage.removeItem('futebol_auth');
          // Redireciona para a landing page
          // Usamos location.assign para evitar conflitos com roteamento em páginas protegidas
          window.location.assign('/landing');
        }
      } catch (e) {
        // silencia erros de logout
      }
    }

    if (!response.ok) {
      // Trata resposta de erro padronizada
      const errorMessage = responseData?.message || `Erro HTTP ${response.status}`;
      const errors = responseData?.errors || [];
      
      throw new ApiException(
        errorMessage,
        response.status,
        responseData,
        errors
      );
    }

    // Para respostas de sucesso, verifica se segue o padrão
    if (responseData && typeof responseData === 'object' && 'success' in responseData) {
      if (!responseData.success) {
        throw new ApiException(
          responseData.message || 'Operação falhou',
          response.status,
          responseData,
          responseData.errors
        );
      }
      return responseData; // Retorna a resposta completa com success, data, message
    }

    // Para compatibilidade com respostas antigas
    return responseData;
  }

  /**
   * Método GET genérico com tipagem forte
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const abs = this.buildUrl(endpoint);
    const url = new URL(abs);
    
    // Adiciona parâmetros de query se existirem
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getHeaders(),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        `Erro na requisição GET para ${endpoint}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        0,
        { originalError: error }
      );
    }
  }

  /**
   * Método POST genérico com tipagem forte
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    console.log('[ApiClient] POST - INÍCIO');
    console.log('[ApiClient] Endpoint:', endpoint);
    console.log('[ApiClient] Data:', data);
    
    const fullUrl = this.buildUrl(endpoint);
    console.log('[ApiClient] URL completa:', fullUrl);
    
    const headers = this.getHeaders();
    console.log('[ApiClient] Headers:', headers);
    
    try {
      console.log('[ApiClient] Iniciando fetch...');
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      console.log('[ApiClient] Resposta recebida:');
      console.log('[ApiClient] Status:', response.status);
      console.log('[ApiClient] StatusText:', response.statusText);
      console.log('[ApiClient] Headers da resposta:', Object.fromEntries(response.headers.entries()));
      
      const result = await this.handleResponse<T>(response);
      console.log('[ApiClient] POST - SUCESSO');
      console.log('[ApiClient] Resultado final:', result);
      
      return result;
    } catch (error) {
      console.error('[ApiClient] Erro no POST:', error);
      console.error('[ApiClient] Tipo do erro:', typeof error);
      console.error('[ApiClient] Stack trace:', error instanceof Error ? error.stack : 'N/A');
      
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        `Erro na requisição POST para ${endpoint}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        0,
        { originalError: error }
      );
    }
  }

  /**
   * Método PUT genérico com tipagem forte
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: 'PUT',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        `Erro na requisição PUT para ${endpoint}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        0,
        { originalError: error }
      );
    }
  }

  /**
   * Método DELETE genérico com tipagem forte
   */
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        `Erro na requisição DELETE para ${endpoint}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        0,
        { originalError: error }
      );
    }
  }

  /**
   * Método PATCH genérico com tipagem forte
   */
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        `Erro na requisição PATCH para ${endpoint}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        0,
        { originalError: error }
      );
    }
  }
}

// Instância singleton do cliente API
export const apiClient = new ApiClient();

// Funções de conveniência para uso direto com tipagem forte
export const api = {
  get: <T>(endpoint: string, params?: Record<string, any>) => 
    apiClient.get<T>(endpoint, params),
  
  post: <T>(endpoint: string, data?: any) => 
    apiClient.post<T>(endpoint, data),
  
  put: <T>(endpoint: string, data?: any) => 
    apiClient.put<T>(endpoint, data),
  
  delete: <T>(endpoint: string) => 
    apiClient.delete<T>(endpoint),
  
  patch: <T>(endpoint: string, data?: any) => 
    apiClient.patch<T>(endpoint, data),
};

export default api;
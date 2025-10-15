/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig = {
  // Gera artefatos 'standalone' para execução em contêiner
  output: 'standalone',
  // Define explicitamente a raiz de tracing para evitar aviso de múltiplos lockfiles
  outputFileTracingRoot: path.join(__dirname, '../../'),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    // Proxy de API para o backend Flask em dev/preview
    // Permitir que NEXT_PUBLIC_API_URL seja definido como host ou host+path;
    // normalizar para sempre conter "/api" no destino.
    const rawBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:5000'
    const baseNoSlash = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase
    const apiBase = baseNoSlash.endsWith('/api') ? baseNoSlash : `${baseNoSlash}/api`
    return [
      {
        source: '/api/:path*',
        destination: `${apiBase}/:path*`,
      },
      // Servir favicon usando um asset existente para evitar 404
      {
        source: '/favicon.ico',
        destination: '/placeholder-logo.png',
      },
    ]
  },
}

export default nextConfig

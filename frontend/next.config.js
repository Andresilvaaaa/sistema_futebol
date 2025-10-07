/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  // Define explicitamente a raiz de tracing para evitar aviso de múltiplos lockfiles
  outputFileTracingRoot: path.join(__dirname, '../../'),
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
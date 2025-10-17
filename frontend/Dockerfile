# Frontend Next.js - Production Dockerfile
# Build testado e funcionando no VPS em 17/10/2025

FROM node:20-alpine

WORKDIR /app

# Instalar pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar arquivos de dependências
COPY frontend/package.json frontend/pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código fonte completo
COPY frontend/ ./

# Argumentos de build para configurar API URL
ARG NEXT_PUBLIC_API_URL=http://backend:5000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=production

# Build da aplicação Next.js
RUN pnpm build

# Expor porta 3000
EXPOSE 3000

# Definir porta padrão
ENV PORT=3000

# Iniciar aplicação usando pnpm start
# Nota: Funciona com output: 'standalone' no next.config.mjs
CMD ["pnpm", "start"]
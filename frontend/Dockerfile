# Frontend Next.js - Production Dockerfile (multi-stage)

# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app/frontend

# Enable pnpm via corepack
RUN corepack enable

# Dependencies first for better caching
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source
COPY frontend .

# Build-time API base (used by next.config.mjs rewrites)
ARG NEXT_PUBLIC_API_URL=http://backend:5000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build app (expects next.config.mjs with output: 'standalone')
RUN pnpm build

# ---- Runtime stage ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000

# Copy standalone server build output
COPY --from=builder /app/frontend/.next/standalone ./
COPY --from=builder /app/frontend/.next/static ./frontend/.next/static
COPY --from=builder /app/frontend/public ./frontend/public

EXPOSE 3000
CMD ["node", "server.js"]
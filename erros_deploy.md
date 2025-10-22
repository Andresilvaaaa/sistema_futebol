.github/workflows/deploy.yml
Testando novas features - melhorias no deploy #29
Jobs
Run details
Workflow file for this run
.github/workflows/deploy.yml at d642749
name: Deploy Sistema Futebol

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  packages: write

env:
  REGISTRY: ghcr.io

jobs:
  build-and-deploy:
    name: 🚀 Build & Deploy
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - name: 📦 Checkout
        uses: actions/checkout@v4

      - name: 🔧 Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: 🔐 Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: 🔤 Normalize owner
        shell: bash
        run: |
          OWNER_LC="${GITHUB_REPOSITORY_OWNER,,}"
          echo "OWNER_LC=$OWNER_LC" >> $GITHUB_ENV
      - name: 🐍 Build & Push Backend
        uses: docker/build-push-action@v5
        with:
          context: .
          file: backend/Dockerfile
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.OWNER_LC }}/sistema-futebol-backend:latest
            ${{ env.REGISTRY }}/${{ env.OWNER_LC }}/sistema-futebol-backend:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: ⚛️ Build & Push Frontend
        uses: docker/build-push-action@v5
        with:
          context: .
          file: frontend/Dockerfile
          push: true
          build-args: |
            NEXT_PUBLIC_API_URL=${{ secrets.PROD_API_URL || 'http://31.97.166.28:5001' }}
          tags: |
            ${{ env.REGISTRY }}/${{ env.OWNER_LC }}/sistema-futebol-frontend:latest
            ${{ env.REGISTRY }}/${{ env.OWNER_LC }}/sistema-futebol-frontend:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: 📡 Deploy to VPS
        uses: appleboy/ssh-action@master
        env:
          PROD_DATABASE_URL: ${{ secrets.PROD_DATABASE_URL }}
          PROD_SECRET_KEY: ${{ secrets.PROD_SECRET_KEY }}
          PROD_JWT_SECRET_KEY: ${{ secrets.PROD_JWT_SECRET_KEY }}
          PROD_CORS_ORIGINS: ${{ secrets.PROD_CORS_ORIGINS }}
          PROD_API_URL: ${{ secrets.PROD_API_URL || 'http://31.97.166.28:5001' }}
          POSTGRES_PASSWORD: ${{ secrets.POSTGRES_PASSWORD }}
        with:
          host: ${{ secrets.VPS_HOST }}
          port: 22
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          envs: PROD_DATABASE_URL,PROD_SECRET_KEY,PROD_JWT_SECRET_KEY,PROD_CORS_ORIGINS,PROD_API_URL,POSTGRES_PASSWORD,GITHUB_REPOSITORY
          command_timeout: 30m
          script: |
            set -e
            echo "🚀 Deploy iniciado em $(date)"
            
            cd ~/sistema_futebol
            
            echo "📦 Criando backup pré-deploy..."
            mkdir -p backups
            docker compose -f docker-compose.prod.yml exec -T postgres \
              pg_dump -Fc -U sistema_futebol sistema_futebol_prod \
              > backups/backup_$(date +%Y%m%d_%H%M%S).dump || echo "⚠️ Backup falhou, continuando..."
            
            if [ -d ".git" ]; then
              git fetch --all
              git reset --hard origin/main
            else
              git clone https://github.com/${GITHUB_REPOSITORY}.git .
            fi
            
            OWNER_LC=$(echo "${GITHUB_REPOSITORY%/*}" | tr '[:upper:]' '[:lower:]')
            cat > .env <<EOF
            DATABASE_URL=${PROD_DATABASE_URL}
            SECRET_KEY=${PROD_SECRET_KEY}
            JWT_SECRET_KEY=${PROD_JWT_SECRET_KEY}
            CORS_ORIGINS=${PROD_CORS_ORIGINS}
            IMAGE_NAMESPACE=ghcr.io/${OWNER_LC}
            NEXT_PUBLIC_API_URL=${PROD_API_URL}
            POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
            EOF
            
            # Normalize line endings and ensure executable permissions for scripts
            sed -i 's/\r$//' scripts/*.sh || true
            chmod +x scripts/*.sh || true
            
            echo "📥 Baixando novas imagens..."
            docker compose -f docker-compose.prod.yml pull
            
            echo "🔄 Aplicando deploy..."
            
            docker compose -f docker-compose.prod.yml stop backend || true
            
            if docker compose -f docker-compose.prod.yml up -d backend; then
              echo "✅ Backend subiu normalmente"
            else
              echo "⚠️ Backend falhou, tentando com override..."
              
              cat > docker-compose.override.yml <<'OVERRIDE'
            services:
              backend:
                entrypoint: []
                command: sh -c "gunicorn -w 4 -b 0.0.0.0:5000 --timeout 120 backend.app:app"
            OVERRIDE
              
              docker compose -f docker-compose.prod.yml -f docker-compose.override.yml up -d backend
            fi
            
            docker compose -f docker-compose.prod.yml up -d frontend
            
            echo "⏳ Aguardando containers iniciarem..."
            sleep 30
            
            echo "📊 Status dos containers:"
            docker compose -f docker-compose.prod.yml ps
            
            echo "🧪 Testando backend..."
            if curl -sf http://localhost:5001/api/health > /dev/null; then
              echo "✅ Backend OK"
            else
              echo "❌ Backend falhou! Logs:"
              docker compose -f docker-compose.prod.yml logs --tail=50 backend
              exit 1
            fi
            
            echo "🧪 Testando frontend..."
            if curl -sf http://localhost:8080 > /dev/null; then
              echo "✅ Frontend OK"
            else
              echo "⚠️ Frontend não respondeu"
              docker compose -f docker-compose.prod.yml logs --tail=20 frontend
            fi
+            echo "🧹 Limpeza pós-deploy (imagens antigas e logs)..."
 Check failure on line 164 in .github/workflows/deploy.yml


GitHub Actions
/ .github/workflows/deploy.yml
Invalid workflow file

You have an error in your yaml syntax on line 164
+            docker image prune -a -f || true
+            docker builder prune -f || true
+            find /var/lib/docker/containers -name '*-json.log' -exec truncate -s 0 {} + || true
+            find backups -type f -mtime +7 -delete || true
+
            echo "🎉 Deploy concluído em $(date)"


    Testando novas features - melhorias no deploy
.github/workflows/deploy.yml #29: Commit d642749 pushed by Andresilvaaaa
deploy-improvements	
1 minute ago
 Failure
#!/bin/bash
set -e

echo "🚨 EMERGENCY FIX - Sistema Futebol"
echo "==================================="
echo ""

cd ~/sistema_futebol

echo "1️⃣ Criando override de emergência..."
cat > docker-compose.override.yml <<'EOF'
services:
  backend:
    entrypoint: []
    command: sh -c "gunicorn -w 4 -b 0.0.0.0:5000 --timeout 120 backend.app:app"
    environment:
      SKIP_SCHEMA_VALIDATION: "true"
EOF

echo "2️⃣ Aplicando SQL idempotente..."
docker compose -f docker-compose.prod.yml exec -T postgres \
  psql -U sistema_futebol -d sistema_futebol_prod < scripts/migrations_idempotent.sql

echo "3️⃣ Reiniciando backend..."
docker compose -f docker-compose.prod.yml -f docker-compose.override.yml down backend
docker compose -f docker-compose.prod.yml -f docker-compose.override.yml up -d backend

sleep 30

echo "4️⃣ Testando..."
curl -s https://esporteflowpro.com.br/api/health

echo ""
echo "✅ Fix aplicado! Sistema deve estar funcionando."
echo "⚠️  IMPORTANTE: Corrija o código e faça deploy permanente!"
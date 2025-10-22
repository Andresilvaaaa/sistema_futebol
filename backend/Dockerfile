# syntax=docker/dockerfile:1

# Backend Flask - Production Dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FLASK_ENV=production

WORKDIR /app

# System deps (runtime libs and Postgres client tools for migrations)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    poppler-utils \
    build-essential \
    postgresql-client \
    curl \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps first to leverage cache
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --upgrade pip && pip install -r backend/requirements.txt

# Copy application source
COPY backend ./backend
COPY migrations ./migrations
COPY wsgi.py ./wsgi.py

# Create required directories
RUN mkdir -p /app/logs /app/uploads /app/instance

# Copy and setup entrypoint script
COPY backend/docker-entrypoint.sh /app/docker-entrypoint.sh
# Normalize line endings (Windows to Unix) and make executable
RUN sed -i 's/\r$//' /app/docker-entrypoint.sh && chmod +x /app/docker-entrypoint.sh

EXPOSE 5000

# Use entrypoint script with Gunicorn as default command
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["gunicorn", "-w", "3", "-b", "0.0.0.0:5000", "backend.app:app"]
# Backend Flask - Production Dockerfile
FROM python:3.11-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    FLASK_ENV=production

WORKDIR /app

# System deps (runtime libs for opencv, pdf2image, psycopg2)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    poppler-utils \
    build-essential \
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

EXPOSE 5000

# Gunicorn entrypoint using app factory created in backend/app.py
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "backend.app:app"]
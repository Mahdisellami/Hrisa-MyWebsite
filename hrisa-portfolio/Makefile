.PHONY: help install dev build start lint clean docker-dev docker-prod docker-build docker-stop

# Default target
help:
	@echo "Hrisa Portfolio - Available Commands"
	@echo "===================================="
	@echo "Local Development:"
	@echo "  make install      - Install dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make start        - Start production server"
	@echo "  make lint         - Run ESLint"
	@echo ""
	@echo "Docker Commands:"
	@echo "  make docker-dev   - Start development server in Docker"
	@echo "  make docker-prod  - Start production server in Docker"
	@echo "  make docker-build - Build production Docker image"
	@echo "  make docker-stop  - Stop all Docker containers"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean        - Clean build artifacts"
	@echo "  make format       - Format code (if prettier configured)"

# Install dependencies
install:
	npm install

# Development server
dev:
	npm run dev

# Production build
build:
	npm run build

# Start production server
start:
	npm start

# Lint code
lint:
	npm run lint

# Clean build artifacts
clean:
	rm -rf .next
	rm -rf out
	rm -rf node_modules
	rm -rf .cache

# Docker development
docker-dev:
	docker-compose up dev

# Docker production (for local testing)
docker-prod:
	docker-compose --profile production up prod

# Build production Docker image
docker-build:
	docker build -t hrisa-portfolio:latest .

# Stop Docker containers
docker-stop:
	docker-compose down

# Rebuild and restart Docker dev
docker-restart:
	docker-compose down
	docker-compose up dev --build

# Format code (requires prettier)
format:
	@echo "Prettier not configured yet"
	@echo "Add prettier to package.json if needed"

# Quick test (build + lint)
test: lint build
	@echo "Build and lint successful!"

# ==============================================================================
# Multi-Stage Dockerfile for Folio Academic OS
# Built with Node.js 22 Alpine, non-root user, and hardened security
# ==============================================================================

# Stage 1: Build Dependencies & Compile Application
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies if needed
RUN apk add --no-cache libc6-compat

# Leverage Docker layer caching for dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project source files
COPY . .

# Run production build and generate static/SSR assets
RUN npm run build && \
    cp -r node_modules/@electric-sql/pglite/dist/* .vercel/output/functions/__server.func/_libs/ 2>/dev/null || true

# Stage 2: Production Runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0

# Install wget/curl for health checks
RUN apk add --no-cache curl wget

# Create non-root system group and user (least privilege)
RUN addgroup --system --gid 10001 nodejs && \
    adduser --system --uid 10001 appuser

# Copy application files and built artifacts with correct ownership
COPY --chown=appuser:nodejs package.json package-lock.json ./
COPY --chown=appuser:nodejs --from=builder /app/node_modules ./node_modules
COPY --chown=appuser:nodejs --from=builder /app/.vercel ./.vercel
COPY --chown=appuser:nodejs --from=builder /app/src ./src
COPY --chown=appuser:nodejs --from=builder /app/scripts ./scripts
COPY --chown=appuser:nodejs --from=builder /app/public ./public
COPY --chown=appuser:nodejs --from=builder /app/server ./server
COPY --chown=appuser:nodejs --from=builder /app/migrations ./migrations
COPY --chown=appuser:nodejs --from=builder /app/.grok ./.grok
COPY --chown=appuser:nodejs --from=builder /app/vite.config.ts ./vite.config.ts

# Switch to unprivileged user
USER appuser

# Expose standard application port
EXPOSE 8080

# Container healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/ || exit 1

# Start production server
CMD ["npm", "start"]

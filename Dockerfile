# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Cache dependencies
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Build arguments
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:1.25-alpine

# Add metadata
LABEL maintainer="DevOps Team"
LABEL version="1.0"
LABEL description="Production frontend image"

# Security: Set up permissions for non-root user (nginx)
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

# Switch to non-root user
USER nginx

# Copy built assets
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

# Healthcheck to monitor container status
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://localhost:8080/ || exit 1

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
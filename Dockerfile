########################################
# Stage 1: Build (Frontend)
########################################
FROM node:20-alpine AS build

WORKDIR /app

# Avoid npm network flakiness
RUN npm config set fetch-retry-maxtimeout 120000 && \
  npm config set fetch-retry-mintimeout 20000

# Install dependencies (cached layer)
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Build-time environment variables (Vite)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_BUILD_VERSION

# Copy source
COPY . .

# Force rebuild (prevents Docker cache causing stale UI)
RUN echo "BUILD_VERSION=${VITE_BUILD_VERSION:-local}" > /build.txt

# Build frontend
RUN npm run build


########################################
# Stage 2: Runtime (NGINX)
########################################
FROM nginx:1.25-alpine

# Metadata
LABEL maintainer="DevOps Team"
LABEL description="Cloud Run frontend (NGINX + Vite)"
LABEL runtime="cloud-run"

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config (Cloud Run safe)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built static assets
COPY --from=build /app/dist /usr/share/nginx/html

# Ensure writable dirs for non-root execution
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/run && \
  chown -R nginx:nginx /var/cache/nginx /var/log/nginx /var/run /etc/nginx/conf.d /tmp /usr/share/nginx/html

# Run as non-root (Cloud Run best practice)
USER nginx

# Cloud Run port
EXPOSE 8080

# Health check (Cloud Run friendly)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://localhost:8080/ || exit 1

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

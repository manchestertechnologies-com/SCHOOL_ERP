# ==========================================
# STAGE 1: Build NestJS application
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy dependency files
COPY backend/package*.json ./

# Install development dependencies
RUN npm ci

# Copy source code files
COPY backend/ .

# Build code (compiled to dist/)
RUN npm run build

# Remove development dependencies to keep image lean
RUN npm prune --production

# ==========================================
# STAGE 2: Run NestJS application
# ==========================================
FROM node:18-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy built app files and node_modules from builder
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]

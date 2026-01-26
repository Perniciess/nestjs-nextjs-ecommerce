# === ЭТАП 1: Сборка ===
FROM node:22-alpine AS builder
WORKDIR /app

# Копируем зависимости
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем исходники
COPY . .

# Сборка в standalone режиме
RUN yarn build

# === ЭТАП 2: Runner (минимальный образ) ===
FROM node:22-alpine AS runner
WORKDIR /app

# Создаём непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем только необходимое для standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

CMD ["node", "server.js"]

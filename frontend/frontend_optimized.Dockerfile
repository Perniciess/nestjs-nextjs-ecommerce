# === ЭТАП 1: Сборка ===
FROM node:22-alpine AS builder
WORKDIR /usr/src/app

# Копируем только зависимости
COPY package.json yarn.lock ./

# Устанавливаем ВСЁ (dev + prod), т.к. нужны для build
RUN yarn install --frozen-lockfile

# Копируем исходники
COPY . .

# Сборка
RUN yarn build

# === ЭТАП 2: Запуск (минимальный) ===
FROM node:22-alpine AS runner
WORKDIR /usr/src/app

# Копируем только то, что нужно для запуска
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/public ./public

# Опционально: next.config.js, если есть кастомные настройки
# COPY --from=builder /usr/src/app/next.config.js ./

EXPOSE 3001
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

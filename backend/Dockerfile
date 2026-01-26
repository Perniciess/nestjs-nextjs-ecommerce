# === ЭТАП 1: Сборка ===
FROM node:22-alpine AS builder
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Устанавливаем все зависимости (нужны dev для сборки)
RUN yarn install --frozen-lockfile

# Генерируем Prisma Client
RUN npx prisma generate

# Копируем исходники и собираем
COPY src ./src
COPY tsconfig*.json ./
RUN yarn build

# === ЭТАП 2: Runner ===
FROM node:22-alpine AS runner
WORKDIR /app

# Создаём непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Копируем package.json для runtime
COPY package.json yarn.lock ./

# Устанавливаем production зависимости
RUN yarn install --frozen-lockfile --production

# Копируем Prisma из builder (клиент + CLI для миграций)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma

# Копируем prisma схему (нужна для миграций)
COPY prisma ./prisma/

# Копируем собранное приложение
COPY --from=builder /app/dist ./dist

# Папка для загрузок
RUN mkdir -p uploads && chown nestjs:nodejs uploads

USER nestjs

EXPOSE 3000
ENV NODE_ENV=production

# Миграции + запуск
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]

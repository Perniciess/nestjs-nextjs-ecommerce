# ========== Stage 1: Builder ==========
FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN yarn build

# ========== Stage 2: Runtime ==========
FROM node:22-bookworm-slim AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/uploads ./uploads 

RUN yarn install --production --frozen-lockfile && \
    yarn cache clean && \
    rm -rf /var/cache/apk/*

RUN mkdir -p ./uploads

EXPOSE 3000

# ENV НЕ ЗАДАЁМ — только через docker-compose

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]

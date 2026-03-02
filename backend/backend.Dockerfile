# ========== Stage 1: Builder ==========
FROM node:22-bookworm-slim AS builder
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN yarn build

# ========== Stage 2: Runtime ==========
FROM node:22-bookworm-slim AS runner
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/uploads ./uploads 

RUN yarn install --production --frozen-lockfile && \
    yarn cache clean

RUN mkdir -p ./uploads

EXPOSE 3000 5555

# ENV НЕ ЗАДАЁМ — только через docker-compose

# db push, затем Prisma Studio на 5555 в фоне и основной процесс Nest
CMD ["sh", "-c", "for i in 1 2 3 4 5 6 7 8 9 10; do npx prisma db push --accept-data-loss && (npx prisma studio --port 5555 --browser none --hostname 0.0.0.0 &) && exec node dist/main.js; echo 'DB not ready, retry in 5s...'; sleep 5; done; exit 1"]

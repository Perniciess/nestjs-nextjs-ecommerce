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

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]

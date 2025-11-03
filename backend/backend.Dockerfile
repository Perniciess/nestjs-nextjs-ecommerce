FROM node:21-alpine

WORKDIR /usr/src/app

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

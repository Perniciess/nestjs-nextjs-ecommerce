FROM node:21-alpine

WORKDIR /usr/src/app

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

RUN yarn build

ENV HOSTNAME="0.0.0.0"

EXPOSE 3001

CMD ["yarn", "start"]

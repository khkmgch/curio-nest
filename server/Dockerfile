FROM node:18.16.0-alpine3.17 AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn prisma generate

RUN yarn build

##########################################################

FROM node:18.16.0-alpine3.17 AS runner

ENV NODE_ENV=production

EXPOSE 8080 

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

CMD ["yarn", "run", "start:migrate:prod"]
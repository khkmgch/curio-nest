FROM node:18.16.0-alpine3.17 AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma

RUN yarn install --frozen-lockfile

RUN yarn prisma generate

COPY . .

RUN yarn build

##########################################################

FROM node:18.16.0-alpine3.17 AS runner

USER node

ENV NODE_ENV production

EXPOSE 8080 

WORKDIR /app

COPY --from=builder --chown=node:node /app/package.json ./
COPY --from=builder --chown=node:node /app/yarn.lock ./

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/prisma ./prisma

CMD ["yarn", "run", "start:prod"]
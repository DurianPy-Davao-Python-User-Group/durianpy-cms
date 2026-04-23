FROM node:24-alpine

RUN apk add --no-cache libc6-compat git bash curl

WORKDIR /app

RUN chown node:node /app

USER node

COPY --chown=node:node package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

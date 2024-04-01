ARG NODE_VERSION=16.20.2

FROM node:${NODE_VERSION}-alpine as runtime

WORKDIR /app

COPY package.json package-lock.json .
RUN npm install --omit=dev && npm cache clean --force

COPY . .

ENTRYPOINT ["node", "index.js"]

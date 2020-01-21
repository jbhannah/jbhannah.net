FROM node:erbium-alpine AS base
WORKDIR /app

RUN apk add --no-cache build-base git

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm build

FROM nginx:alpine
COPY --from=base /app/public /usr/share/nginx/html/

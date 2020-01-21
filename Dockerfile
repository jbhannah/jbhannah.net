FROM node:erbium-alpine AS base

RUN apk add --no-cache build-base git

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM base AS build
COPY . ./
RUN npm build

FROM nginx:alpine
COPY --from=build /app/public /usr/share/nginx/html/

FROM jbhannah/jbhannah.net:base AS build
WORKDIR /app
COPY . ./
RUN npm build

FROM nginx:alpine
COPY --from=build /app/public /usr/share/nginx/html/

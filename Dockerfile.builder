FROM jbhannah/jbhannah.net:base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

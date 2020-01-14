FROM jbhannah/jbhannah.net:builder
COPY . ./
RUN npm run build

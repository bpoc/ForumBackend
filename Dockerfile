FROM node:16
EXPOSE 3333
WORKDIR /app
VOLUME /app
CMD echo "GETTING STARTED" && npm i && node ace migration:run && node ace serve --watch

FROM node:latest

##BUILD
WORKDIR /back

COPY ./back/package*.json ./

RUN npm install

COPY ./back/ .

## RUN

CMD ["node", "index.js"]

EXPOSE 8081 
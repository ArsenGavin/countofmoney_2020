# build before prod
FROM node:13.12.0-alpine as build

WORKDIR /front

COPY ./front/package*.json ./

RUN npm ci --silent

RUN npm install react-script --silent

COPY ./front/ ./

RUN npm run build


#production environement

FROM nginx:stable-alpine

COPY --from=build /front/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
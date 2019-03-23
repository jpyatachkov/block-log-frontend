FROM node:lts-alpine as build-stage

RUN mkdir -p /var/www/block-log-frontend/

WORKDIR /var/www/block-log-frontend/

COPY package*.json ./

RUN yarn install

COPY ./ ./

RUN yarn build


FROM nginx:latest as prod-stage

RUN mkdir -p /var/www/block-log-frontend/dist/

COPY --from=build-stage /var/www/block-log-frontend/dist/ /var/www/block-log-frontend/dist/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

FROM node:lts-alpine

RUN mkdir -p /var/www/block-log-frontend/ && mkdir -p /var/www/block-log-frontend/dist

WORKDIR /var/www/block-log-frontend/

RUN apk update

COPY package*.json ./

RUN yarn install

COPY ./ ./

CMD yarn build

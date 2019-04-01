FROM node:lts-alpine

RUN mkdir -p /var/www/block-log-frontend/

WORKDIR /var/www/block-log-frontend/

RUN apk update

COPY package*.json ./

RUN yarn install

COPY ./ ./

RUN yarn build

CMD ["sh", "-c", "tail -f /dev/null"]

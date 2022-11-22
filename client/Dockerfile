FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ./package*.json ./
#RUN apk add --update python3 make g++\
#   && rm -rf /var/cache/apk/*
RUN npm install
RUN mkdir /usr/src/app/node_modules/.cache && chmod -R 777 /usr/src/app/node_modules/.cache

COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]

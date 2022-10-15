FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
RUN mkdir /usr/src/app/node_modules/.cache && chmod -R 777 /usr/src/app/node_modules/.cache

COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]

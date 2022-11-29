FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

RUN mkdir /usr/src/app/node_modules/.cache && chmod -R 777 /usr/src/app/node_modules/.cache


COPY . .

#ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
ADD ./wait /wait
RUN chmod +x /wait

EXPOSE 4000
CMD /wait && npm run dev

FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

EXPOSE 4000
CMD ["pm2-runtime", "src/index.js"]
FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 3000

ENV SECRET_KEY = "secretkey"

ENV KEY_GOOGLE="KEY ENVIADA AL CORREO"

CMD ["npm", "start"]

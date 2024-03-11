FROM node:18-alpine

EXPOSE 3333

WORKDIR /

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
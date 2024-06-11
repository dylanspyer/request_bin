FROM node:20 AS build
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build

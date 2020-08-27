FROM node:alpine AS builder
WORKDIR /app
COPY ./package.json ./
# RUN npm install
# COPY ./ ./
# RUN npm run build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d
COPY ./nginx/index.html /usr/share/nginx/html
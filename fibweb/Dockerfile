FROM node:alpine AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./src ./src
COPY ./public ./public
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d
COPY --from=builder /app/build /usr/share/nginx/html
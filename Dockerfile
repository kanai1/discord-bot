FROM node:22-alpine
WORKDIR /app

# docker CLI 설치
RUN apk add --no-cache docker-cli-compose
FROM node:18
WORKDIR /app

# 필요 패키지 설치
RUN apt-get update && apt-get install -y docker-cli
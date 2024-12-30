docker container 1개로 실행하는 것은 현재 규모에서 충분히 가능한 방법입니다. 구성 방법을 상세히 설명해드리겠습니다:

1. **Dockerfile 설정**

```dockerfile
# Node.js 베이스 이미지
FROM node:18-alpine

# Nginx 설치
RUN apk add --no-cache nginx

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 소스 복사
COPY . .

# Next.js 빌드
RUN yarn build

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/http.d/default.conf

# 시작 스크립트 복사
COPY start.sh /start.sh
RUN chmod +x /start.sh

# 포트 노출
EXPOSE 80 3000

# 시작 스크립트 실행
CMD ["/start.sh"]
```

2. **Nginx 설정 (nginx.conf)**

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **시작 스크립트 (start.sh)**

```bash
#!/bin/sh

# Nginx 시작
nginx

# Next.js 앱 시작
cd /app && yarn start
```

4. **docker-compose.yml**

```yaml
version: '3'
services:
  next-app:
    build: .
    ports:
      - '80:80'
      - '3000:3000'
    environment:
      - NODE_ENV=production
    restart: always
```

5. **실행 방법**

```bash
# 이미지 빌드 및 실행
docker-compose up --build -d

# 로그 확인
docker-compose logs -f

# 컨테이너 중지
docker-compose down
```

이 구성의 장점:

- 단일 컨테이너로 간단한 관리
- Nginx가 리버스 프록시 역할 수행
- 정적 파일 서빙 최적화
- 컨테이너 재시작시 자동 복구

주의사항:

1. 로그 관리

```yaml
# docker-compose.yml에 로그 설정 추가
services:
  next-app:
    logging:
      driver: 'json-file'
      options:
        max-size: '10m'
        max-file: '3'
```

2. 환경변수 관리

```yaml
# docker-compose.yml
services:
  next-app:
    env_file:
      - .env.production
```

3. 볼륨 마운트 (필요한 경우)

```yaml
services:
  next-app:
    volumes:
      - ./logs:/app/logs
```

필요한 패키지 설치:

```bash
# 프로젝트 의존성
yarn add next@14.1.0 react@18.2.0 react-dom@18.2.0 @mui/material@5.15.11

# Docker 설치 (Ubuntu 기준)
sudo apt-get update
sudo apt-get install docker.io docker-compose
```

이 구성으로 2000명 정도의 일일 사용자는 충분히 처리 가능합니다. 추후 트래픽이 더 증가하면 컨테이너를 복제하고 로드밸런서를 추가하는 방식으로 확장할 수 있습니다.

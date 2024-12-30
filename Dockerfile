# 1. Base Image 설정
FROM node:18-alpine AS builder

# 2. 작업 디렉토리 설정
WORKDIR /app

# 보안을 위한 사용자 추가
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 3. 종속성 설치
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 100000

# 4. Next.js 애플리케이션 빌드
COPY . .
RUN yarn build

# 5. Production-ready 이미지 생성
FROM node:18-alpine AS runner

# 6. Production 환경 설정
WORKDIR /app

# 보안을 위한 사용자 설정
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 7. 필요한 파일만 복사
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 8. 환경 변수 설정
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# 사용자 전환
USER nextjs

EXPOSE 3000

# 9. 실행 명령어
CMD ["node", "server.js"]
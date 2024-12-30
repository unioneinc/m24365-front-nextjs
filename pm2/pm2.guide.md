# PM2 설치 및 사용 가이드

## 목차

1. [소개](#소개)
2. [설치 방법](#설치-방법)
3. [프로젝트 구조](#프로젝트-구조)
4. [설정 파일](#설정-파일)
5. [실행 방법](#실행-방법)
6. [모니터링 및 관리](#모니터링-및-관리)
7. [문제 해결](#문제-해결)

## 소개

PM2는 Node.js 애플리케이션을 위한 프로덕션 프로세스 관리자입니다. 이 가이드는 Next.js 프로젝트에서 PM2를 설정하고 사용하는 방법을 설명합니다.

### 주요 기능

- 프로세스 관리 및 모니터링
- 자동 재시작
- 로그 관리
- 클러스터 모드 지원
- 로드 밸런싱
- 실시간 모니터링

## 설치 방법

### 1. 프로젝트 의존성 설치

```bash
# Next.js 및 기본 의존성 설치
yarn add next@14.1.0 react@18.2.0 react-dom@18.2.0 @mui/material@5.15.11

# PM2 로컬 설치 (프로젝트 의존성으로)
yarn add -D pm2

# 또는 전역 설치 (권장)
yarn global add pm2
```

### 2. package.json 스크립트 추가

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "pm2:dev": "pm2 start ./pm2/dev.config.js",
    "pm2:prod": "pm2 start ./pm2/prod.config.js",
    "pm2:stop": "pm2 stop all",
    "pm2:delete": "pm2 delete all",
    "pm2:logs": "pm2 logs",
    "pm2:monit": "pm2 monit"
  }
}
```

## 프로젝트 구조

```
your-project/
├── app/
├── public/
├── pm2/
│   ├── ecosystem.config.js  # 공통 설정
│   ├── dev.config.js       # 개발 환경 설정
│   └── prod.config.js      # 프로덕션 환경 설정
└── package.json
```

## 설정 파일

### 공통 설정 (ecosystem.config.js)

```javascript
module.exports = {
  apps: [
    {
      name: 'next-app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      watch: true,
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
```

### 개발 환경 설정 (dev.config.js)

```javascript
module.exports = {
  apps: [
    {
      name: 'next-app-dev',
      script: 'node_modules/next/dist/bin/next',
      args: 'dev',
      watch: true,
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      }
    }
  ]
}
```

### 프로덕션 환경 설정 (prod.config.js)

```javascript
module.exports = {
  apps: [
    {
      name: 'next-app-prod',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 2,
      exec_mode: 'cluster',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
```

## 실행 방법

### 개발 환경

```bash
# 빌드
yarn build

# PM2로 개발 서버 실행
yarn pm2:dev
```

### 프로덕션 환경

```bash
# 빌드
yarn build

# PM2로 프로덕션 서버 실행
yarn pm2:prod
```

## 모니터링 및 관리

### 기본 명령어

```bash
# 프로세스 목록 보기
pm2 list

# 로그 보기
yarn pm2:logs

# 실시간 모니터링
yarn pm2:monit

# 모든 프로세스 중지
yarn pm2:stop

# 모든 프로세스 삭제
yarn pm2:delete
```

### 상세 모니터링 명령어

```bash
# 특정 앱의 상세 정보
pm2 show next-app

# 특정 앱만 재시작
pm2 restart next-app

# 클러스터 모드에서 인스턴스 조정
pm2 scale next-app +1  # 인스턴스 1개 추가
pm2 scale next-app -1  # 인스턴스 1개 제거
```

## 문제 해결

### 일반적인 문제와 해결방법

1. **포트 충돌 발생 시**

```bash
# 실행 중인 프로세스 확인
pm2 list

# 충돌하는 프로세스 중지
pm2 stop [app-name]
```

2. **메모리 사용량 과다 시**

- prod.config.js에서 max_memory_restart 설정 조정

```javascript
{
  max_memory_restart: '1G'
}
```

3. **로그 파일이 너무 커질 때**

- pm2 설정에 로그 로테이션 추가

```javascript
{
  max_size: "10M",
  retain: "all"
}
```

### 로그 관리

- 로그 파일 위치: `~/.pm2/logs/`
- 로그 파일 정리: `pm2 flush`
- 특정 앱 로그만 보기: `pm2 logs [app-name]`

### 모범 사례

1. 프로덕션 환경에서는 항상 클러스터 모드 사용
2. 적절한 인스턴스 수 설정 (CPU 코어 수 고려)
3. 메모리 제한 설정으로 자원 관리
4. 로그 로테이션 설정으로 디스크 공간 관리
5. 환경변수는 .env 파일로 관리

### 주의사항

- `.gitignore`에 pm2 로그 파일 추가
- 민감한 환경변수는 환경변수 파일로 관리
- 프로덕션 환경에서는 watch 모드 비활성화
- 정기적인 로그 관리 필요

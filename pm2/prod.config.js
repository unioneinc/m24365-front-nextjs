// pm2/prod.config.js (프로덕션 환경)
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

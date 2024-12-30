// pm2/dev.config.js (개발 환경)
module.exports = {
  apps: [
    {
      name: 'next-app-dev',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      watch: true,
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      }
    }
  ]
}

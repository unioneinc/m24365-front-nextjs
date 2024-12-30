const config = {
  environment: process.env.development,
  logServerUrl: process.env.REACT_APP_LOG_SERVER_URL,
  isDev: process.env.development === 'development'
}

export default config

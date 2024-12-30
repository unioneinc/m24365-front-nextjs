export const _getBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${baseUrl}${basePath}`
}

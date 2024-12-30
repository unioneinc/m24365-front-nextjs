const getAuthConfigLocal = () => {
  return {
    client_id: 'm24365',
    client_secret: 'm24365',
    redirect_uri: 'http://localhost:3000/auth/callback',
    scope: 'read',
    response_type: 'code'
  }
}

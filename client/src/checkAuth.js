export const checkAuth = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (token) {
    config.headers['Authorization'] = token;
  }

  return config;
}

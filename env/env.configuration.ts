export const EnvironmentVariables = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: {
    connectionUrl: process.env.MONGODB_CONNECTION_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-default-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    algorithm: process.env.JWT_ALGORITHM || 'HS256',
  },
});

export const EnvironmentVariables = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: {
    connectionUrl: process.env.MONGODB_CONNECTION_URL,
  },
  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: process.env.JWT_ALGORITHM,

  },
});

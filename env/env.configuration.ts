export const EnvironmentVariables = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: {
    connectionUrl: process.env.MONGODB_CONNECTION_URL,
  },
});

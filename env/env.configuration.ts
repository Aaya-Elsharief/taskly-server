export const EnvironmentVariables = () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  mongodb: {
    connectionUrl: process.env.MONGODB_CONNECTION_URL,
  },
  postgres: {
    databaseUrl: process.env.DATABASE_URL,
  },
});

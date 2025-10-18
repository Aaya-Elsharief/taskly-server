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

  tokens: {
    hashKeyName: process.env.REFRESH_TOKEN_HASH_KEY_NAME,
    hashKeyVersion: process.env.REFRESH_TOKEN_HASH_KEY_VERSION,

    refreshTokenExpiryInMs: parseInt(process.env.REFRESH_TOKEN_EXPIRY_IN_MS),
    accessTokenExpiryInMs: parseInt(process.env.ACCESS_TOKEN_EXPIRY_IN_MS),

    webMax: process.env.WEB_REFRESH_TOKEN_MAX,
    webEnableMax: process.env.WEB_REFRESH_TOKEN_ENABLE_MAX,

    mobileMax: process.env.MOBILE_REFRESH_TOKEN_MAX,
    mobileEnableMax: process.env.MOBILE_REFRESH_TOKEN_ENABLE_MAX,
  },
});

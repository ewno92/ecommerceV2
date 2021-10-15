module.exports = {
  reactStrictMode: true,
  env: {
    APP_NAME: process.env.APP_NAME,
    MONGO_URL: process.env.MONGO_URL,
    BASE_URL: process.env.BASE_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

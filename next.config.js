module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URL: process.env.MONGODB_URL,
    BASE_URL: process.env.BASE_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  },
};

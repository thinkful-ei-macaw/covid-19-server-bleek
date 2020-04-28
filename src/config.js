/* eslint-disable strict */
module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://localhost/corona-virus',
  TEST_DATABASE_URL: process.env.DATABASE_URL || 'postgresql://localhost/corona-virus',
};
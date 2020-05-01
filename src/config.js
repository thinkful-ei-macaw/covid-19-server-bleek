/* eslint-disable strict */
module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://localhost/corona-virus',
  TEST_DATABASE_URL: process.env.DATABASE_URL || 'postgresql://localhost/corona-virus',
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api'
};
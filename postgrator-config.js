/* eslint-disable strict */
require('dotenv').config();

console.log(process.env.DB_URL);

module.exports = {
  migrationDirectory: 'migrations',
  driver: 'pg',
  connectionString:
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DB_URL
      : process.env.DATABASE_URL,
  ssl: !!process.env.SSL,
};

/* eslint-disable strict */
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV, CLIENT_ORIGIN } = require('./config');

const statesRouter = require('./states/states-router');
const commentsRouter = require('./comments/comments-router');

const app = express();

const db = require('knex')({
  client: 'pg',
  connection: process.env.DB_URL,
});
app.set('db', db);

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

// set up middleware
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_ORIGIN ||
  })
);
// request handling
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

app.use('/api/states', statesRouter);
app.use('/api/comments', commentsRouter);

// error handling
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  console.log(error);
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'Server error' } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
};

app.use(errorHandler);

module.exports = app;

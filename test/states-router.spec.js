/* eslint-disable strict */
const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { TEST_DATABASE_URL } = require('../src/config');

describe('States endpoint', () => {
  let db;

  before('make knex instance', () => {
    console.log(process.env.TEST_DB_URL);
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  it('should respond with states', () => {
    return supertest(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.exist;
      });
  });

  it('should respond with the selected state', () => {
    return supertest(app)
      .get('/api/states/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.exist;
        expect(res.body).to.have.property('id');
      });
  });
});

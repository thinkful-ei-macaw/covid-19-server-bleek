/* eslint-disable strict */
const knex = require('knex');
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Comments Endpoints', function () {
  let db;

  const testUserComments = helpers.makeCommentsArray();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  it('should respond 200 with all the users data', () => {
    return supertest(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.exist;
      });
  });

  it('responds 200 with selected state and comments for that state', () => {
    return supertest(app)
      .get('/api/comments/')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.exist;
      });
  });

  it('posts a user comment to a state_id, responding with 201 and the new comment', () => {
    return supertest(app)
      .post('/api/comments/' + testUserComments[0].state_id)
      .send(testUserComments[0])
      .expect(201)
      .expect((res) => {
        expect(res.body).to.have.property('state_id');
        expect(res.body.comment_body).to.eql(testUserComments[0].comment_body);
        expect(res.body.user_name).to.eql(testUserComments[0].user_name);
        expect(res.body.date_posted).to.exist;
        expect(res.body).to.have.property('id');
      });
  });
});

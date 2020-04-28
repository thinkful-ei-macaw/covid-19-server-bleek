/* eslint-disable strict */
const knex = require('knex');
const expect = require('chai').expect;
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Comments Endpoints', function () {
  let db;

  const testUserComments = helpers.makeCommentsArray();

  before('make knex instance', () => {
    console.log(process.env.TEST_DB_URL);
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  //before('cleanup', () => helpers.cleanTables(db));

  //afterEach('cleanup', () => helpers.cleanTables(db));

  
    

  it('creates a user comment, responding with 201 and the new comment', () => {
    return supertest(app)
      .post('/api/comments/' + testUserComments[0].state_id)
      .send(testUserComments[0])
      .expect(201)
      .expect(res => {
        expect(res.body).to.have.property('state_id');
        expect(res.body.comment_body).to.eql(testUserComments[0].comment_body);
        expect(res.body.user_name).to.eql(testUserComments[0].user_name);
        expect(res.body.date_posted).to.exist;
        expect(res.body).to.have.property('id');
      });
  });
});
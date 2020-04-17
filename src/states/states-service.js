/* eslint-disable strict */

const StatesService = {
  getAllStates(knex) {
    return knex.select('*').from('us_states');
  },
  getStateId(knex, id) {
    return knex.select('*')
      .from('us_states')
      .where({ id })
      .first();
  }
};

module.exports = StatesService;
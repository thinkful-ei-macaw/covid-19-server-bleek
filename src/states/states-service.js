/* eslint-disable strict */

const StatesService = {
  getAllStates(knex) {
    return knex.select('*').from('us_states');
  },
  getStateId(knex, state_id) {
    return knex.select('*')
      .from('us_states')
      .where({ state_id })
      .first();
  }
};

module.exports = StatesService;
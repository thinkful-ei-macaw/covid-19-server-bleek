/* eslint-disable strict */

const UserActionsService = {
  getAllUsers(knex) {
    return knex.select('*').from('covid_users');
  },
    
};

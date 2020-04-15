/* eslint-disable strict */

const UserActionsService = {
  getAllUsers(knex) {
    return knex.select('*').from('covid_users');
  },
  insertComment(knex, newComment) {
    return knex.insert(newComment)
      .into('user_data')
      .leftJoin('us_states', 'us_states.state_name', '=', 'user_data.user_state')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  updateComment(knex, id, updatedComment) {
    return knex.from('user_data')
      .where({ id })
      .update(updatedComment);
  },
  deleteComment(knex, id) {
    return knex.from('user_data')
      .where({ id })
      .delete();
  }
};

module.exports = UserActionsService;
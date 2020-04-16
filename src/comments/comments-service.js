/* eslint-disable strict */

const UsersService = {
  getUserData(knex) {
    return knex.select('*').from('user_data');
  },
  createNewUser(knex, newUser) {
    return knex.insert(newUser)
      .into('user_data')
      .where('user_name')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getAllcomments(knex, comments) {
    return knex.from('user_data')
      .select('user_name', 'user_comment', 'user_state', 'date_posted')
      .leftJoin('us_states', 'us_states.state_name', '=', 'user_data.user_state')
      .where('user_comment', comments)
      .first();
  },
  insertComment(knex, newComment) {
    return knex.insert(newComment)
      .into('user_comments')
      .leftJoin('us_states', 'us_states.state_name', '=', 'user_data.user_state')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  updateComment(knex, id, updatedComment) {
    return knex.from('user_comments')
      .where({ id })
      .update(updatedComment);
  },
  deleteComment(knex, id) {
    return knex.from('user_comments')
      .where({ id })
      .delete();
  }
};

module.exports = UsersService;
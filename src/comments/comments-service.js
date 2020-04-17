/* eslint-disable strict */

const UsersService = {
  getUserData(knex) {
    return knex.select('*').from('user_comments');
  },
  createNewUser(knex, newUser) {
    return knex.insert(newUser)
      .into('user_comments')
      .where('user_name')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getAllcomments(knex, state_id) {
    return knex.from('user_comments')
      .select('user_comments.*')
      .leftJoin('us_states', 'us_states.id', '=', 'user_comments.state_id')
      .where('state_id', state_id);
  },
  insertComment(knex, newComment) {
    return knex.insert(newComment)
      .into('user_comments')
      .leftJoin('us_states', 'us_states.id', '=', 'user_comments.state_id')
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
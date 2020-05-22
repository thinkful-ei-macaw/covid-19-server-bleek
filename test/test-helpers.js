/* eslint-disable strict */
function makeCommentsArray() {
  return [
    {
      id: 1,
      state_id: 7,
      user_name: 'your user',
      comment_body: 'some comments',
      date_posted: new Date(),
    },
    {
      id: 6,
      state_id: 1,
      user_name: 'my user',
      comment_body: 'some more comments',
      date_posted: new Date(),
    },
    {
      id: 33,
      state_id: 47,
      user_name: 'this user',
      comment_body: 'some other comments',
      date_posted: new Date(),
    },
    {
      id: 13,
      state_id: 23,
      user_name: 'that user',
      comment_body: 'even more comments',
      date_posted: new Date(),
    },
  ];
}

function seedUserComments(db, users) {
  return db
    .into('user_comments')
    .insert()
    .then(() =>
      // update the auto sequence so it stays inSync
      db.raw("SELECT setVal('user_comments_id_seq', ?)", [
        users[users.length - 1].id,
      ])
    );
}

module.exports = {
  makeCommentsArray,
  seedUserComments,
};

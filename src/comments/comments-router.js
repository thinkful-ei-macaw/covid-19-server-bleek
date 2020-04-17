/* eslint-disable strict */

const express = require('express');
const commentsService = require('./comments-service');
//const xss = require('xss');

const commentsRouter = express.Router();
const jsonParser = express.json();

const createUser = user => ({
  
});

commentsRouter.route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    commentsService.getUserData(knexInstance)
      .then(comments => {
        res.json(comments);
      })
      .catch(next); 
  });
  
commentsRouter.route('/:state_id')
  .get((req, res, next) => {
    commentsService.getAllcomments(
      req.app.get('db'),
      req.params.state_id
    )
      .then(comments => {
        res.json(comments);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { user_name, comment_body } = req.body;
    const newComment = { user_name, state_id:req.params.state_id, comment_body };
    const knexInstance = req.app.get('db');

    for (const [key, value] of Object.entries(newComment)) {
      if (value === null) {
        return res.status(400).json({
          error: { message: `${key} missing in request body` }
        });
      }
    }
      
    commentsService.insertComment(knexInstance, newComment)
      .then(comment => {
        console.log(comment);
        res.status(201).send(comment);
      })
      .catch(next);
  });


// .patch(jsonParser, (req, res, next) => {
//   const { user_name, comment_body, comment_id } = req.params;
//   const updatedComment = { user_name, comment_body, comment_id };

//   const commentValues = Object.values(updatedComment).filter(Boolean).length;
//   if (commentValues === 0)
//     return res.status(400).json({
//       error: {
//         message: 'Request body must be completed'
//       }
//     });
//   commentsService.updateComment(
//     req.app.get('db'),
//     req.params.id,
//     updatedComment
//   )
//     .then(comment => {
//       res.status(204).end();
//     })
//     .catch(next);
// })
// .delete ((req, res, next) => {
//   commentsService.deleteComment(
//     req.app.get('db'),
//     req.params.comment_id
//   )
//     .then(comment => {
//       res.status(204).end();
//     })
//     .catch(next);
// });

module.exports = commentsRouter;
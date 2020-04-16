/* eslint-disable strict */

const express = require('express');
const commentsService = require('./comments-service');

const commentsRouter = express.Router();
const jsonParser = express.json();

const createUser = user => ({
  user_id: user.user_id,
  comment_id: comment.comment_id,
  user_name: user.user_name,
  user_state: user.user_state,
  user_comment: user.user_comment,
  date_posted: user.date_posted
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
commentsRouter.route('/comments/:state_id')
  .post(jsonParser, (req, res, next) => {
    const { user_name, user_state, comment_body } = req.body;
    const newComment = { user_name, user_state, comment_body };
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

commentsRouter.route('/comments/:state_id')
  .get((req, res, next) => {
    commentsService.getAllcomments(
      req.app.get('db'),
      req.params.state_id
    )
      .then(comments => {
        res.json(comments);
      })
      .catch(next);
  });
commentsRouter.route('/:comment_id')
  .get((req, res, next) => {
    res.json(res.comment);
  })
  .patch(jsonParser, (req, res, next) => {
    const { user_name, comment_body, comment_id } = req.params;
    const updatedComment = { user_name, comment_body, comment_id };

    const commentValues = Object.values(updatedComment).filter(Boolean).length;
    if (commentValues === 0)
      return res.status(400).json({
        error: {
          message: 'Request body must be completed'
        }
      });
    commentsService.updateComment(
      req.app.get('db'),
      req.params.id,
      updatedComment
    )
      .then(comment => {
        res.status(204).end();
      })
      .catch(next);
  })
  .delete ((req, res, next) => {
    commentsService.deleteComment(
      req.app.get('db'),
      req.params.comment_id
    )
      .then(comment => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = commentsRouter;
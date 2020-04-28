/* eslint-disable strict */

const express = require('express');
const commentsService = require('./comments-service');

const commentsRouter = express.Router();
const jsonParser = express.json();


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
        res.status(201).send(comment);
      })
      .catch(next);
  });

module.exports = commentsRouter;
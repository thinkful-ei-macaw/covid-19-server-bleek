/* eslint-disable strict */

const express = require('express');
const UserActionsService = require('./user-actions-service');

const userActionsRouter = express.Router();
const jsonParser = express.json();

userActionsRouter.route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    UserActionsService.getAllUsers(knexInstance)
      .then(users => {
        res.json(users);
      })
      .catch(next);
        
  })

  .post(jsonParser, (req, res, next) => {
    const { user_name, user_state, user_comment } = req.body;
    const newComment = { user_name, user_state, user_comment };
    const knexInstance = req.app.get('db');

    for (const [key, value] of Object.entries(newComment)) {
      if (value === null) {
        return res.status(400).json({
          error: { message: `${key} missing in request body` }
        });
      }
    }
      
    UserActionsService.insertComment(knexInstance, newComment)
      .then(comment => {
        console.log(comment);
        res.status(201).send(comment);
      });
  });


module.exports = userActionsRouter;
/* eslint-disable strict */
const express = require('express');
const StatesService = require('./states-service');

const statesRouter = express.Router();

statesRouter.route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    StatesService.getAllStates(knexInstance)
      .then(state => {
        res.json(state);
      })
      .catch(next);
  });

statesRouter.route('/:state_id')
  .all((req, res, next) => {
    const knexInstance = req.app.get('db');
    const stateSelected = req.params.state_id;
    StatesService.getStateId(knexInstance, stateSelected)
      .then(state => {
        if (!state) {
          return res.status(404).json({
            error: { message: 'something went wrong please try again' }
          });
        }
        res.state = state;
        next();
      })
      .catch(next);
  });

module.exports = statesRouter;
// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');

const {
  validateActionId,
  validateNewAction,
} = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res) => {
  Actions.get()
    .then(actions => {
      res.send(actions)
    })
});

router.get('/:id', validateActionId, (req, res) => {
  Actions.get(req.existingAction.id)
    .then(action => {
      
      res.send(action)
    })
});

router.post('/', validateNewAction, (req, res) => {
  Actions.insert(req.newAction)
    .then(newAction => {
      res.send(newAction)
    })
});

router.put('/:id', validateActionId, validateNewAction, (req, res) => {
  Actions.update(req.existingAction.id, req.newAction)
    .then(newAction => {
      console.log(newAction)
      res.send(newAction)
    })
});

router.delete('/:id', validateActionId, (req, res) => {
  Actions.remove(req.existingAction.id)
    .then(result => {
      console.log('result of delete', result)
      res.send(req.existingAction)
    })
})


module.exports = router;
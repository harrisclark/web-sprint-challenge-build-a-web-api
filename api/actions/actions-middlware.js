// add middlewares here related to actions
const Actions = require('./actions-model');

const validateActionId = (req, res, next) => {
  Actions.get(req.params.id)
    .then(action => {
      if (action == null) {
        next({ status: 404, message: `Action with ID: ${req.params.id} does not exsist` })
        return;
      }
      req.existingAction = action;
      next();
    })
};

const validateNewAction = (req, res, next) => {
  const { notes, description, project_id } = req.body;

  if (typeof notes !== 'string' || typeof description !== 'string') {
    next({ status: 400, message: "notes and description must be a string" })
    return;
  }
  if (notes.trim() === '') {
    next({ status: 400, message: "Please provide a value for notes" })
    return;
  }
  if (description.trim() === '') {
    next({ status: 400, message: "Please provide a value for description" })
  }
  if (project_id == null) {
    next({ status: 400, message: "Please enter a project id" })
    return;
  }
  req.newAction = { ...req.body, notes: notes.trim(), description: description.trim()}

  // add additional validation to check whether there is a project with the id === porject_id
  
  next()
  
}

// const validateNewAction = (req, res, next) => {
//   console.log("should not hit yet")
// };

module.exports = {
  validateActionId,
  validateNewAction,
}
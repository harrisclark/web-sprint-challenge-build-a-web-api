// add middlewares here related to projects
const Projects = require('./projects-model');

const validateProjId = (req, res, next) => {
  Projects.get(req.params.id)
    .then(project => {
      if (project == null) {
        next({ status: 404, message: `Project with ID: ${req.params.id} does not exsist` });
        return;
      }
      req.existingProject = project;
      next()
    })
};

const validateNewProj = (req, res, next) => {
  const { name, description, completed } = req.body;
  if (typeof name !== 'string' || typeof description !== 'string') {
    next({ status: 400, message: "Values for name and desciption must be strings" })
    return;
  }
  if (name.trim() === '') {
    next({ status: 400, message: "Please provide a name" })
    return;
  }
  if (description.trim() === '') {
    next({ status: 400, message: "Please provide a description" })
    return;
  }
  if (req.method === 'PUT' && completed == null) {
    next({ status: 400, message: "Must set bool for completed" })
    return;
  }
  req.newProject = { ...req.body, name: name.trim(), description: description.trim() }
  next();
}

module.exports = {
  validateProjId,
  validateNewProj
};
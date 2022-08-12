// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
// import middleware
const {
  validateProjId,
  validateNewProj
} = require('./projects-middleware')
const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then(projects => {
      res.send(projects)
    })
});

router.get('/:id', validateProjId, (req, res) => {
  Projects.get(req.existingProject.id)
    .then(project => {
      res.send(project)
    })
});

router.post('/', validateNewProj, (req, res) => {
  Projects.insert(req.newProject)
    .then(project => {
      //console.log(project)
      res.send(project)
    })
});

router.put('/:id', validateProjId, validateNewProj, (req, res) => {
  Projects.update(req.existingProject.id, req.newProject)
    .then(newProject => {
      //console.log('new project from router',newProject)
      res.send(newProject)
    })
});

router.delete('/:id', validateProjId, (req, res) => {
  Projects.remove(req.existingProject.id)
    .then(deletedProject => {
      res.send(req.existingProject)
    })
});

router.get('/:id/actions', validateProjId, (req, res) => {
  Projects.getProjectActions(req.existingProject.id)
    .then(result => {
      console.log(result)
      res.send(result)
    })
})


module.exports = router;
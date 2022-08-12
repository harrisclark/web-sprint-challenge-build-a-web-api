const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

server.use(express.json());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js

server.use('/api/actions', actionsRouter);
 
// Build your projects router in /api/projects/projects-router.js
server.use('/api/projects', projectsRouter);
// Do NOT `server.listen()` inside this file!

server.use((err, req, res, next) => {
  console.log(err)
  let { status = 500, message = "It would apear we have ourselves a 500 error" } = err;
  res.status(status).json({ message: message });
})

module.exports = server;

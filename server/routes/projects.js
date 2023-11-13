const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects');
const { isAuthenticated } = require('../middleware');

router.use(isAuthenticated);

router.route('/')
    .get(projectController.getProjects)
    .post(projectController.createProject)

router.route('/:projectId')
    .get(projectController.getTaskList)
    .delete(projectController.deleteProject)


module.exports = router;
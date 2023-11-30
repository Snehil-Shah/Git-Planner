const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects');
const {exceptionHandler: asyncHandler} = require('../middleware')

router.route('/')
    .get(asyncHandler(projectController.getProjects))
    .post(asyncHandler(projectController.createProject))

router.route('/:projectId')
    .get(asyncHandler(projectController.getTaskList))
    .delete(asyncHandler(projectController.deleteProject))


module.exports = router;
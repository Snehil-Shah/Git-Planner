const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');
const {exceptionHandler: asyncHandler} = require('../middleware')

router.route('/')
    .post(asyncHandler(taskController.createTask))
router.route('/:taskId')
    .delete(asyncHandler(taskController.deleteTask))
    .patch(asyncHandler(taskController.editTask))

module.exports = router;
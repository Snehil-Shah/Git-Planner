const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');

router.route('/')
    .post(taskController.createTask)
router.route('/:taskId')
    .delete(taskController.deleteTask)
    .patch(taskController.editTask)

module.exports = router;
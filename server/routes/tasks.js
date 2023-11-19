const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');

router.route('/')
    .post(taskController.createTask)
    .delete(taskController.deleteTask)
router.patch('/:taskId',taskController.editTask)

module.exports = router;
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');

router.route('/')
    .post(taskController.createTask)
    .delete(taskController.deleteTask)

module.exports = router;
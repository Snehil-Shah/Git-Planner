const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');
const { isAuthenticated } = require('../middleware');

router.use(isAuthenticated);

router.route('/')
    .post(taskController.createTask)
    .delete(taskController.deleteTask)

module.exports = router;
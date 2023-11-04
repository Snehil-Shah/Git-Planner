const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks')

router.route('/')
    .get(taskController.getTasks)

module.exports = router;
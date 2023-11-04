const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects')

router.route('/')
    .get(projectController.sendList)

module.exports = router;
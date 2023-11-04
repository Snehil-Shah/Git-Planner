const mongoose = require('mongoose')
const Todo = require('./models/todo');
const User = require('./models/user');
const Project = require('./models/project');

mongoose.connect('mongodb://127.0.0.1:27017/ProjectSync');


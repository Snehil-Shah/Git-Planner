// HACK: write a catchAsync function
// TODO: learn middlewares and how colt steele added middlewares in route handlers

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Todo = require('./models/todo');
const User = require('./models/user');
const Project = require('./models/project');

const projectRoutes = require('./routes/projects')
const taskRoutes = require('./routes/tasks')

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/ProjectSync');

app.use(cors());
app.use('/project',projectRoutes)
app.use('/tasks',taskRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


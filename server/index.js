// HACK: write a catchAsync function
// TODO: learn middlewares and how colt steele added middlewares in route handlers

// FIXME: find out about do we serve files over our express server, or the vite server somehow runs during production too. if the express way, how does that affect API interactions, is there an internal template-y server-y way to serve public REACT assets

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const projectRoutes = require('./routes/projects')
const taskRoutes = require('./routes/tasks')

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/ProjectSync');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.use('/projects',projectRoutes)
app.use('/tasks',taskRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// HACK: write a catchAsync function
// TODO: learn middlewares and how colt steele added middlewares in route handlers

// FIXME: find out about do we serve files over our express server, or the vite server somehow runs during production too. if the express way, how does that affect API interactions, is there an internal template-y server-y way to serve public REACT assets

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('./authentication')
const userRoutes = require('./routes/users')
const projectRoutes = require('./routes/projects')
const taskRoutes = require('./routes/tasks')
const session = require('express-session')
const { handleBadRequests, isAuthenticated } = require('./middleware');

const app = express();
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(handleBadRequests);
mongoose.connect('mongodb://127.0.0.1:27017/Git-Planner');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use(session({
  secret: 'your session secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.session())
app.get('/',(_req,res)=>{
  res.status(303).redirect('http://localhost:5173')
})
app.use('/login',userRoutes)
app.use('/projects',isAuthenticated, projectRoutes)
app.use('/tasks',isAuthenticated, taskRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


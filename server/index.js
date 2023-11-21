// HACK: write a catchAsync function
// BUG: When github servers are down, the app shouldn't crash, handle the error

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('./authentication')
const userRoutes = require('./routes/users')
const projectRoutes = require('./routes/projects')
const taskRoutes = require('./routes/tasks')
const githubRoutes = require('./routes/github')
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
app.use('/user',userRoutes)
app.use('/projects',isAuthenticated, projectRoutes)
app.use('/tasks',isAuthenticated, taskRoutes)
app.use('/github',isAuthenticated, githubRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


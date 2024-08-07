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
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));

mongoose.connect(process.env.MONGO_URL);
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
  res.status(303).redirect(process.env.CLIENT_URL)
})
app.use('/user', userRoutes)
app.use('/projects',isAuthenticated, projectRoutes)
app.use('/tasks',isAuthenticated, taskRoutes)
app.use('/github',isAuthenticated, githubRoutes)

app.use(handleBadRequests);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});


const express = require('express');
const router = express.Router();
const passport = require('../authentication')
const {exceptionHandler: asyncHandler} = require('../middleware')

router.get('/login/github', asyncHandler(passport.authenticate('github', { scope: ['user:email', 'repo'] })))
router.get('/login/github/callback', asyncHandler(passport.authenticate('github', { failureRedirect: '/login' })), asyncHandler((req, res) => {
    res.redirect('http://localhost:3000')
}
))
router.post('/logout', asyncHandler((req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Logout Successful')
    });
}));
router.get('/fetchAuth', asyncHandler(function (req, res) {
    if (req.user) {
        res.json({ name: req.user.name, username: req.user.username, avatar: req.user.avatar, link: req.user.link })
    } else {
        res.json(null)
    }
}))
module.exports = router;
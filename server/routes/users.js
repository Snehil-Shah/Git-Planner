const express = require('express');
const router = express.Router();
const passport = require('../authentication')

router.get('/login/github', passport.authenticate('github', { scope: ['user:email', 'repo'] }))
router.get('/login/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('http://localhost:3000')
}
)
router.post('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Logout Successful')
    });
});
router.get('/fetchAuth', function (req, res) {
    if (req.user) {
        res.json({ name: req.user.name, username: req.user.username, avatar: req.user.avatar, link: req.user.link })
    } else {
        res.json(null)
    }
})
module.exports = router;
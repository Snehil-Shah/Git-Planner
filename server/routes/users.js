const express = require('express');
const router = express.Router();
const passport = require('../authentication')

router.get('/github',passport.authenticate('github',{scope: ['user:email','repo']}))
router.get('/github/callback', passport.authenticate('github',{failureRedirect: '/login'}), (req,res) => {
    res.redirect('http://localhost:3000')
}
)
router.get('/fetchAuth',function(req,res){
    if (req.user){
    res.json({name: req.user.name, username: req.user.username, avatar: req.user.avatar})
    } else{
        res.status(401).redirect('http://localhost:3000')
    }
})
module.exports = router;
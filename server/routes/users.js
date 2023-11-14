const express = require('express');
const router = express.Router();
const passport = require('../authentication')

router.get('/github',passport.authenticate('github',{scope: ['user:email','repo']}))
router.get('/github/callback', passport.authenticate('github',{failureRedirect: '/login'}), (req,res) => {
    res.redirect('http://localhost:3000')
}
)
router.get('/check-auth',function(req,res){
    res.json({isAuthenticated: (req.user ? true:false)})
})
module.exports = router;
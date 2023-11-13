const passport = require('passport')
const githubStrategy = require('passport-github2').Strategy
require('dotenv').config({ path: './.env' })
const User = require('./models/user')

passport.use(new githubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/github/callback'
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ githubId: profile.id }).then(function (user) {
            if (user) {
                return done(null, user)
            } else {
                User.create({
                    githubId: profile.id,
                    username: profile.username,
                    name: profile.displayName,
                    email: (profile.emails && profile.emails[0] ? profile.emails[0].value : 'private'),
                    avatarUrl: profile.photos[0].value
                }).then((user) => {
                    return done(null, user);
                })
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user_id, done) {
    done(null,user_id)
});

module.exports = passport;
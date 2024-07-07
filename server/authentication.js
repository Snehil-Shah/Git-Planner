const passport = require('passport')
const githubStrategy = require('passport-github2').Strategy
require('dotenv').config({ path: './.env' })
const User = require('./models/user')

passport.use(new githubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/user/login/github/callback`,
    scope: ['user:email','repo']
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ githubId: profile.id }).then(function (userDoc) {
            if (userDoc) {
                const user = {id: userDoc.id,username: userDoc.username, name:userDoc.name, avatar: userDoc.avatarUrl,link: userDoc.githubLink, accessToken: accessToken};
                return done(null, user)
            } else {
                User.create({
                    githubId: profile.id,
                    username: profile.username,
                    name: profile.displayName,
                    githubLink: profile.profileUrl,
                    email: (profile.emails && profile.emails[0] ? profile.emails[0].value : 'private'),
                    avatarUrl: profile.photos[0].value
                }).then((userDoc) => {
                    const user = {id: userDoc.id,username: userDoc.username, name:userDoc.name, avatar: userDoc.avatarUrl, link: userDoc.githubLink, accessToken: accessToken};
                    return done(null, user);
                })
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null,user)
});

module.exports = passport;
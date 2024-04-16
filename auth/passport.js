require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/auth/google/callback'
}, (token, tokenSecret, profile, done) => {
    return done(null, profile);
}));


passport.serializeUser((user, done) => {
    console.log("serializeUser: " + user);
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    console.log("deserializeUser: " + obj);
    done(null, obj);
});
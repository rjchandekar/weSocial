const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to  use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "340758204437-q7bu3jg9p572c1do6f5g9d3jdib9blhh.apps.googleusercontent.com",
    clientSecret: "5fr6rilI9re3PZjyz6VM8xP-",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    //find a user
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in gStrategy', err);return;}

            console.log(profile);
            if(user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('error in creating user gStrategy', err);return;}
                    
                    return done(null, user);
                })
            }
        })
    }
));

module.exports = passport;

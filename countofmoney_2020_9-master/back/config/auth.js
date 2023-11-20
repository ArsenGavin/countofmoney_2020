const passport = require("passport");
const Strategy = require("passport-local");
const bcrypt = require("bcrypt-nodejs");
const dotenv = require("dotenv");
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();

const User = require('./../models/user');

passport.use(new Strategy({ usernameField: 'email' },
    (email, password, done) => {
        // Find user in DB
        User.findOne({ email: email }, function(err, foundUser) {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!foundUser) {
                return done(null, false, { message: 'Invalid credentials.\n' });
            }
            if (!bcrypt.compareSync(password, foundUser.password)) {
                return done(null, false, { message: 'Invalid credentials.\n' })
            }
            return done(null, foundUser)
        });
    }
));

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_TOKEN,
        clientSecret: process.env.GOOGLE_TOKEN_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
            return cb(err, user);
        });
    }
));

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_TOKEN,
        clientSecret: process.env.GITHUB_TOKEN_SECRET,
        callbackURL: "http://localhost:8081/users/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ githubId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function(err, foundUser) {
        if (err) {
            return done(err, false)
        }
        return done(null, foundUser)
    });
});
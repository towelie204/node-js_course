const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email', passwordField: 'pass' }, 
            (email, pass, done) => {
                User.findOne({ email: email })
                    .then(user => {
                        if (!user) {
                            return done(null, false);
                        }
                    
                        bcrypt.compare(pass, user.pass, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done (null, user);
                            } else {
                                return done (null, false);
                            }
                        });
                    })
                    .catch(err => console.log(err));
            })
    );

    passport.serializeUser((user, done) => {
        console.log('serialize: ', user.id)
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            console.log('deserialize: ', user.id)
            done(err, user);
        });
    });
};
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Load user 
const User = require('../models/userModel')

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            User.findOne({ username: username })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Wrong username or password' })
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        console.log(isMatch)
                        if (err) throw err

                        if (isMatch) {
                            return done(null, user)
                        }
                        return done(null, false, { message: 'Wrong username or password' })
                    })

                })
                .catch(err => console.log(err))
        })
    )


    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

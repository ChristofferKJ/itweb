let User = require('../models/user');
let Workout = require('../models/workout');
const bcrypt = require('bcryptjs');
const passport = require('passport')
var jwt = require('jsonwebtoken');


module.exports.index = function (req, res) {
    res.render('sign_in');
};
module.exports.register = function (req, res) {
    res.render('register');
};
module.exports.test = function (req, res) {
    User.find({}, function (err, User) {
        res.send(User)
    })
};

module.exports.checkRegisterData = async function (req, res) {
    const { username, password, confirm_password } = req.body
    let errors = [];

    //check required fields
    if (!username || !password || !confirm_password) {
        errors.push({ msg: 'Please fill in all fields' })
    }

    //check passwords match
    if (password !== confirm_password) {
        errors.push({ msg: 'Passwords does not match' })
    }
    // check password lenght 
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('register', { errors, username, password, confirm_password })
    } else {
        // Validation passed 
        User.findOne({ username: username }).then(user => {
            if (user) {
                //user exsist
                errors.push({ msg: 'Username is already in use' })
                res.render('register', { errors, username, password, confirm_password })
            } else {
                // New user

                const newUser = new User({
                    username,
                    password
                });
                console.log(newUser);
                //Hash  password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;


                    let tokenForRes;

                    //sign user 
                    jwt.sign({ user: newUser.username }, 'joeymoemusic', { expiresIn: '1h' }, (err, token) => {
                        tokenForRes = token;
                    });

                    //Set password to hashed 
                    newUser.password = hash;
                    // save user 
                    newUser.save()
                        .then(user => {
                            res.set('token', tokenForRes)
                            res.redirect('workout')
                        })
                        .catch(err => {
                            console.log(err)
                        })

                }))

            }
        })

    }


};
module.exports.checkLoginData = async function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {

        if (err) { return next(err); }
        if (!user) { return res.redirect('/'); }


        let userName = user.username;
        jwt.sign({ user: userName }, 'joeymoemusic', { expiresIn: '1h' }, (err, token) => {
            res.set('token', token)
            res.redirect('/workout')
        });

        // res.set('token', tokenForRes)
        // res.render('welcomePage')

    })(req, res, next);

}

module.exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
}
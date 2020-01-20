const passport = require('passport')
var jwt = require('jsonwebtoken');
let User = require('../models/userModel');
const bcrypt = require('bcryptjs');
secret = require('../config/auth').secret

//This is reused from first handin
module.exports.login = function (req, res, next) {
    const { username, password } = req.body
    passport.authenticate('local', function (err, user, info) {

        if (err) {
            res.json({ error: true, errormessage: err });
        }
        if (!user) { return res.json({ error: true, errormessage: "No user" }); }

        jwt.sign({ user: username }, "JohnTraDolta", { expiresIn: '1h' }, (err, token) => {
            res.json({ token, token })
        });
    })(req, res, next);
}


module.exports.register = function (req, res, next) {
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
        res.json({ error: true, errormessage: errors })
    } else {
        // Validation passed 
        User.findOne({ username: username }).then(user => {
            if (user) {
                //user exsist
                errors.push({ msg: 'Username is already in use' })
                res.json({ error: true, errormessage: errors })
            } else {
                // New user

                const newUser = new User({
                    username,
                    password
                });
                //Hash  password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;


                    let tokenForRes;

                    //sign user 
                    jwt.sign({ user: newUser.username }, 'JohnTraDolta', { expiresIn: '1h' }, (err, token) => {
                        tokenForRes = token;
                    });

                    //Set password to hashed 
                    newUser.password = hash;
                    // save user 
                    newUser.save()
                        .then(user => {
                            res.json({ error: false, token: tokenForRes, })
                        })
                        .catch(err => {
                            console.log(err)
                        })

                }))

            }
        })
    }
}
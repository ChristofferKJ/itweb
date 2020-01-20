var jwt = require('jsonwebtoken');
var passport = require('passport')

module.exports = {
    localAuthenticate: function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            res.send("Forbidden")
        }
    }
}

module.exports = {
    jwtAuthenticate: passport.authenticate('jwt', { session: false })
}

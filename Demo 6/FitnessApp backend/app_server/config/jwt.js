var jwt = require('jsonwebtoken');


module.exports = {

    verifyToken: function (req, res, next) {
        //Get auth header value
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            //req.token = bearerToken;
            jwt.verify(bearerToken, 'joeymoemusic', async (err, authData) => {
                if (err) {
                    res.sendStatus(403)
                } else {

                    //req.authData = authData
                    //next()
                    req.authData = authData
                    return next()

                }
            })
        }
        else {
            res.sendStatus(403);
        }
    }

}

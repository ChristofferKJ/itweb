var express = require('express');
var router = express.Router();


const controller = require('../../controllers/api/user')

router.post('/login', controller.login)
router.post('/register', controller.register)




module.exports = router;
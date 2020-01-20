var express = require('express');
var router = express.Router();


const controller = require('../controllers/userController')
/* GET home page. */
router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router;
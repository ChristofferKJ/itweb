var express = require('express');
var router = express.Router();
const controller = require('../controllers/user')
const passport = require('passport')

router.get('/', controller.index)
router.get('/register', controller.register)
router.post('/', controller.checkRegisterData)
router.get('/test', controller.test)
router.post('/signin', controller.checkLoginData)
router.get('/logout', controller.logout)

module.exports = router;
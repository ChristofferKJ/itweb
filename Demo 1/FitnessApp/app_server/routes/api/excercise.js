var express = require('express');
var router = express.Router();
var verify = require('../../config/jwt')

const controller = require('../../controllers/api/excercise')
//Base path localhost:3000/api/exercise/..
router.get('/', controller.get)
router.post('/', verify.verifyToken, controller.create)


module.exports = router;
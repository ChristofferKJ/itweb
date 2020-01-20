var express = require('express');
var router = express.Router();
var auth = require('../config/auth')


const controller = require('../controllers/scoreController')

/* GET home page. */
router.get('/', controller.getScore)
router.post('/', auth.jwtAuthenticate, controller.postScore)
router.put('/', auth.jwtAuthenticate, controller.updateScore)
router.delete('/', controller.deleteScore)

module.exports = router;
const express = require('express');
const router = express.Router();
const ctrlIndex = require('../controllers/indexController');

/* GET home page. */
router.get('/', ctrlIndex.index);
module.exports = router;
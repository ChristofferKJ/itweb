var express = require('express');
var router = express.Router();
const ctrlWorkout = require('../controllers/workout')
const { ensureAuthenticated } = require('../config/auth')



router.get('/', ensureAuthenticated, ctrlWorkout.index)
router.get('/create', ensureAuthenticated, ctrlWorkout.create)
router.get('/remove/:workoutname', ensureAuthenticated, ctrlWorkout.removeWorkout)
router.post('/:workoutname', ensureAuthenticated, ctrlWorkout.createExerciseRow)
router.get('/:workoutname', ensureAuthenticated, ctrlWorkout.showWorkout)





module.exports = router;
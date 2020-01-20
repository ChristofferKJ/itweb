let User = require('../../models/user');
let Workout = require('../../models/workout');
let Exercise = require('../../models/exercise');

module.exports.get = function (req, res, next) {
    const { exerciseID } = req.body
    Exercise.findById(exerciseID, function (err, exercise) {
        if (err) {
            res.json({ error: true, errormessage: err });
        } else {
            res.json({ error: false, exercise })
        }
    })
};
module.exports.create = function (req, res, next) {
    let username = req.authData.user
    const { name, set, repetitions, description, workoutID } = req.body

    let newExercise = new Exercise();
    newExercise.name = name;
    newExercise.sets = set
    newExercise.repetitions = repetitions
    newExercise.description = description
    newExercise.save();

    Workout.findByIdAndUpdate(workoutID, { $addToSet: { "exercises": newExercise } }, { new: true }, function (err, doc) {
        res.json({ err, doc })
    })

};


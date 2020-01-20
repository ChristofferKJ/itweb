let Workout = require('../models/workout')
let User = require('../models/user')

module.exports.index = async function (req, res) {
    // Get workouts from database
    await User.findById({ _id: req.session.passport.user }, function (err, user) {
        if (err) {
            console.log(err)
        }
        if (user) {
            Workout.find({ userid: user.id }, function (err, workouts) {
                if (err) {
                    console.log(err)
                }
                else {
                    res.render('welcomePage', { Workouts: workouts });
                }
            })
        }
        else {
            res.render('welcomePage', { Workouts: [] })
        }
    })
};

module.exports.create = function (req, res) {
    exercises = []
    res.render('createWorkoutPage', { Exercises: exercises });
};



module.exports.showWorkout = async function (req, res) {
    var workoutName = req.params.workoutname;

    await Workout.findOne({ name: workoutName }, 'exercises', function (err, workout) {
        console.log("workout here", workout)
        if (err) {
            console.log(err)
        }
        if (workout != null) {
            workout.save(function (err) {
                if (err) {
                    console.log(err)
                }
            })
            res.render('createWorkoutPage', { Exercises: workout.exercises, Workoutname: workoutName });
        }
    })
};

module.exports.createExerciseRow = async function (req, res) {
    var workoutName = req.body.workoutname
    let existingWorkout = null;

    await Workout.findOne({ name: workoutName }, function (err, workout) {
        if (err) {
            console.log(err)
        }
        if (workout == null) {
            let workout = new Workout();
            workout.name = req.body.workoutname
            workout.userid = req.session.passport.user
            workout.exercises = [{
                name: req.body.exercise, sets: req.body.sets, repetitions: req.body.repetitions,
                description: req.body.description
            }];
            workout.save(function (err) {
                if (err) {
                    console.log(err)
                }
            })
            res.render('createWorkoutPage', { Exercises: workout.exercises, Workoutname: workoutName });

        } else {

            existingWorkout = workout;
        }
    })

    if (existingWorkout != null) {
        Workout.findOneAndUpdate({ name: workoutName }, {
            $set: {
                name: workoutName
            },
            $push: {
                exercises: {
                    name: req.body.exercise, sets: req.body.sets, repetitions: req.body.repetitions,
                    description: req.body.description
                }
            }
        }, { new: true }, (err, existing_workout) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            res.render('createWorkoutPage', { Exercises: existing_workout.exercises, Workoutname: workoutName });
        }
        )

    }
};

module.exports.removeWorkout = async function (req, res) {
    var workoutName = req.params.workoutname
    console.log(req.params)

    await Workout.deleteOne({ name: workoutName }, function (err, workout) {
        if (err) {
            console.log(err)
        }
    })

    await User.findById({ _id: req.session.passport.user }, function (err, user) {
        if (err) {
            console.log(err)
        }
        if (user) {
            Workout.find({ userid: user.id }, function (err, workouts) {
                if (err) {
                    console.log(err)
                }
                else {
                    res.render('welcomePage', { Workouts: workouts });
                }
            })
        }

    })
};
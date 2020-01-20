let User = require('../../models/user');
let Workout = require('../../models/workout');

module.exports.create = function (req, res, next) {
    let username = req.authData.user
    let { Workoutname } = req.body
    User.findOne({ username: username }, function (err, user) {
        if (!user || err) {
            res.json({ error: true, errormessage: "user not found" })
        } else {
            let newWorkout = new Workout();
            newWorkout.name = Workoutname
            newWorkout.userid = user.id
            newWorkout.save();
            res.json({ error: false, newWorkout })
        }
    }
    )


};
module.exports.delete = function (req, res, next) {
    let username = req.authData.user
    const { workoutID } = req.body
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            res.json({ error: err, errormessage: "user not found" })
        } else {
            Workout.findById(workoutID, function (err, workout) {
                if (err) {
                    res.json({ error: true, errormessage: err })
                } else {
                    if (workout.userid == user.id) {
                        workout.delete()
                        res.json({ error: false, errormessage: "Workout deleted" })
                    }
                    else
                        res.json({ error: true, errormessage: "User does not own the workout" })
                }
            })
        }
    })
};
module.exports.getAllForUser = async function (req, res, next) {
    const username = req.authData.user

    await User.findOne({ username: username }, function (err, user) {
        if (err) {
            console.log(err)
        }
        if (user) {
            Workout.find({ userid: user.id }, function (err, workouts) {
                if (err) {
                    console.log(err)
                }
                else {
                    res.json({ Workouts: workouts, error: false });
                }
            })
        }
        else {
            res.json({ name: authData.user, error: true })
        }
    })
};
module.exports.getSingle = function (req, res, next) {
    const { workoutID } = req.body
    Workout.findById(workoutID, function (err, workouts) {
        if (err) {
            console.log(err)
        }
        else {
            res.json({ Workouts: workouts, error: false });
        }
    }).populate({ path: 'exercise' })
};
module.exports.getAll = function (req, res, next) {
    Workout.find({}, function (err, workouts) {
        if (err) {
            console.log(err)
        }
        else {
            res.json({ Workouts: workouts, error: false });
        }
    })
};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    "name": { type: String, required: true },
    "userid": { type: String, required: true },
    "exercises": { type: [], default: null }
});

var Workout = module.exports = mongoose.model('Workout', WorkoutSchema);
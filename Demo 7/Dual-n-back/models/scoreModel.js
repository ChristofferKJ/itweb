var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    "score": { type: Number, required: true },
    "username": { type: String, required: true, unique: true }
});

var Score = module.exports = mongoose.model('Score', ScoreSchema);
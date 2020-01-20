var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    "password": { type: String, required: true },
    "username": { type: String, required: true, unique: true }
});

var User = module.exports = mongoose.model('User', UserSchema);
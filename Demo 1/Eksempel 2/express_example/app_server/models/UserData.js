var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    name: String,
    Age: Number
});

module.exports = mongoose.model('UserData', userDataSchema);
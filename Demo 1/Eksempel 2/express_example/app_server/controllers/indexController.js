var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/spg1-eksempel2");
var UserData = require('../models/UserData')

var numOfPersons;

/* GET home page */
module.exports.index = function (req, res) {

    UserData.count({name: 'joey', Age: 5}, function (err, count){ 

        numOfPersons = count;

        if(count>0)
        {
            UserData.deleteMany({name: 'joey', Age: 5}, function(err){});
        }
        else 
        {
            var instance = new UserData({name: 'joey', Age: 5});
            instance.save();      
        }
    });

   res.render('index', { title: 'Express', numOfPersons: numOfPersons });
};

let scoreModel = require('../models/scoreModel');

module.exports.getScore = function (req, res, next) {
    scoreModel.find({}, function (err, scores) {
        scores.sort((a, b) => (a.score > b.score) ? -1 : 1)
        res.json({ scores })
    })

}
module.exports.postScore = function (req, res, next) {
    const username = req.user.username
    const { score } = req.body;
    if (score && username) {

        scoreModel.findOne({ username: username }, function (err, userScore) {
            if (err) {
                res.status(500).send('');
            }
            if (!userScore) {
                //Create the score 
                let newScore = new scoreModel()
                newScore.score = score;
                newScore.username = username;

                newScore.save()
                    .then(score => {
                        res.json({ score: "Score inserted", score })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                //update exsisting score
                if (userScore.score < score) {
                    //new highscore
                    userScore.score = score;
                    userScore.save();
                    res.json(userScore)
                } else {
                    //old score is higher that this try
                    res.json(userScore)
                }

            }
        })

    }
    else
        res.json({ score: "no score or username" })
}
module.exports.updateScore = function (req, res, next) {
    const { username, score } = req.body;

    scoreModel.findOne({ username }, function (err, user) {
        if (err)
            res.json(err)
        else if (user == null)
            res.json({ msg: "no user with that name: " + username })
        else {
            if (user.score < score) {

                user.score = score
                user.save();
                res.json({ user })
            } else
                res.json({ user })
        }

    })
}
module.exports.deleteScore = function (req, res, next) {
    const { username } = req.body;

    scoreModel.findOne(({ username }), function (err, user) {
        if (err)
            res.json(err)
        else if (user == null)
            res.json({ msg: "no user with that name: " + username })
        else {
            user.remove();
            res.json({ msg: "User removed", user })
        }
    })
}


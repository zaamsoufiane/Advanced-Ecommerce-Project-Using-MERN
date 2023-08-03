const User = require("../models/user")

exports.getOneUser = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    res.json({
        user: req.profile
    })
}

exports.updateOneUser = (req, res) => {
    User.findOneAndUpdate(req.profile._id, {$set: req.body}, {new: true})
        .then((user) => {
            user.hashed_password = undefined
            user.salt = undefined
            return res.status(200).json({
                user
            })
        })
        .catch((err) => {
            return res.status(400).json({
                message: 'Bad request'
            })
        })
}
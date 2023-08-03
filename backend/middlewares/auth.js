const {expressjwt: jwt} = require('express-jwt')
require('dotenv').config()

exports.requireSignIn = jwt({
    secret: process.env.JWT,
    algorithms: ['HS256'],
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {

    let user = req.profile && req.auth && (req.profile._id == req.auth._id)
    if(!user){
        return res.status(403).json({
            message: 'Access denied'
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    let user = req.auth && req.auth.role === 1
    if(!user){
        return res.status(403).json({
            message: "Admin resource, Access denied"
        })
    }

    next()
}
const User = require('../models/user')
const jwt = require('jsonwebtoken')
exports.salam = (req, res) => {
    res.send({
        message:'helo user'
    })
}

exports.signup = (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        user.hashed_password = undefined
        user.salt = undefined
        return res.json(user)
    })
    .catch((err) => {
        return res.send(err)
    })
}


exports.signin = (req, res) => {
    const {email, password} = req.body

    User.findOne({email}).then((user) => {
   
        if(!user.authenticate(password)){
            return res.status(401).json({
                message:'Email and password don\'t match'
            })
        }

        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT)
        res.cookie('token', token, {expire: new Date() + 8062000 })

        const {_id, name, email, role} = user
        
        return res.json({
            token,
            user: {_id, name, email, role}
        })
    }).catch((err, user) => {
        
        if(err || !user){
            return res.status(404).json({
                message: 'User not found with this email'
            })
        }
       

        
    }) 
        

        
  


}

exports.signout = (req, res) => {
    res.clearCookie('token')
    return res.json({
        message: 'Logout'
    })
}
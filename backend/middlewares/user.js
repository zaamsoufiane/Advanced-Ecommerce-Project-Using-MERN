const User = require('../models/user')

exports.userById = (req, res, next, id) => {
    User.findById(id).then((user) => {
        if(!user){
            res.status(404).json({
                message: 'User not found'
            })
        }

        req.profile = user
        next()
    }).catch((err) => {
        if(err){
            res.status(400).json({
                message: 'error'
            })
        }
    })
}


exports.addProductToHistory = (req, res, next) => {
    let history = []
    history = req.body.products.map(product => {
        return {
            _id: product._id,
            name: product.name,
            description: product.description,
            quantity: product.count,
            amount: product.price * product.count,
            transact_id: req.body.transactionId
        }
    })

    if(history.length){
        User.findOneAndUpdate({_id: req.profile._id}, {$push: {history: history}}, {new: true}, )
        .then(() => {
            return next()
        })
        .catch(err => {
            return res.status(400).json({
                message: 'could not update the history'
            })
        })
    }

    next()
}
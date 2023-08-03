const {Order} = require('../models/order')

exports.orderById = (req, res, next, id) => {
    Order.findById(id).then((order) => {
        if(!order){
            return res.status(404).json({
                message: 'Order not found'
            })
        }
        req.order = order
        
        next()
    })
    .catch((err) => {
        return res.status(400).json({
            message: 'Bad requesst'
        })
    })
}
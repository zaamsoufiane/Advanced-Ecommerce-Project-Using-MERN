const {Order} = require('../models/order')

exports.create = (req, res) => {
    req.body = {
        ...req.body,
        user:req.profile
    }
    const order = new Order(req.body)
    order.save()
    .then(() => {
        return res.status(200).json({order})
        
    })
    .catch((err) => {
        if(err){

        
        return res.status(400).json({
            message: 'Bad request'
        })
    }
        
    })
}

exports.listOrders = (req, res) => {
    Order.find()
         .populate('user', '_id name email')
         .sort('-createdAt')
    .then((orders ) => {
        return res.status(200).json({
            orders
        })
    })
    .catch(err => {
        return res.status(400).json({
            message: 'Bad request'
        })
    })
}

exports.listStatus = (req, res) => {
    return res.json({
        status: Order.schema.path('status').enumValues
    })
}

exports.updateStatus = async (req, res) => {

   
   

    await Order.findByIdAndUpdate(
        {_id: req.order._id},
        req.body
    )
    .then((data) => {
        return res.status(200).json({
            data
        })
    })
    .catch(err => {
        return res.status(400).json({
            message: 'Bad requuest'
        })
    })
}
const Product = require('../models/product')

exports.decreaseQuantity = (req, res, next) => {
    let operations = req.body.products.map(product => {
        return {
            updateOne: {
                filter: {_id: product._id},
                update: {$inc: {quantity: -product.count, sold: +product.count}}
            }
        }
    })
    Product.bulkWrite(operations)
    .then(() => {
        next()
    })
    .catch(err => {
        return res.status(400).json({
            message: 'Could not update the product !'
        })
    })
}
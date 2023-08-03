const braintree = require("braintree");
require('dotenv').config()
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err){
            res.status(500).json({
                message: err
            })
        }
        res.json({token: response.clientToken})
    })
}


exports.processPayment = (req, res) => {
    let {amount, paymentMethodNonce} = req.body
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: paymentMethodNonce,
        options:{
            submitForSettlement: true
        }
    }, (err, result) => {
        if(err){
            return res.status(400).json({
                message: err
            })
        }
        res.send(result)
    })
}
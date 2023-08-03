const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true,
        maxLength: 32
    },
    description:{
        type:String,
        required: true,
        trim: true,
        maxLength: 2000
    },
    price:{
        type:Number,
        required: true
    },
    quantity: {
        type:Number
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    shipping: {
        type:Boolean,
        default: false
    },
    sold: {
        type:Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
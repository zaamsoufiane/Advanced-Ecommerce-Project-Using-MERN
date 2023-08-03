const Product = require('../models/product');
const formidable = require('formidable');
const Joi = require('joi')
const _ = require('lodash')
const fs = require('fs');


exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {

        if(err) {
            res.status(400).json({
                error: 'Image could not uploaded !'
            })
        }

        let product = new Product(fields)

      

        if(files.photo){
            if(files.photo.size > Math.pow(10,6)){
                return res.status(400).json({
                    message: 'Photo size is too high'
                })
            }
            product.photo.data = fs.readFileSync(files.photo.filepath)
            product.photo.contentType = files.photo.mimetype
        }

        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.required(),
            quantity: Joi.required(),
            category: Joi.required(),
            shipping: Joi.required()
        })

        const {error} = schema.validate(fields)
        if(error){
            return res.status(400).json({
                message: error.details[0].message
            })
        }
 
        product.save().then(product => {
            return res.status(200).json({
                product
            })
        })
        .catch((err) => {
            return res.status(400).json({
                message: 'Product not added'
            })
        })
    })
    
}

exports.productById = (req, res, next, id) => {
    Product.findById(id)
           .populate('category')
    .then((product) => {
        if(!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        req.product = product
        next()
    })
    .catch((err) => {
        if(err){

        
        return res.status(400).json({
            message: 'Bad Request'
        })
        }
    })
}

exports.showOneProduct = (req, res) => {
    req.product.photo = undefined
    return res.json({
        product: req.product
    })
}

exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.product._id)
           .then((product) => {
                return res.status(204).json({
                    message:"Product deleted successfully"
                })
           })
           .catch((err) => {
                if(err) {
                    return res.status(400).json({
                        message: 'Bad request !'
                    })
                }
           })
}


exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {

        if(err) {
            res.status(400).json({
                error: 'Image could not uploaded !'
            })
        }

        let product = req.product
        product = _.extend(product, fields)
        if(files.photo){
            if(files.photo.size > Math.pow(10,6)){
                return res.status(400).json({
                    message: 'Photo size is too high'
                })
            }
            product.photo.data = fs.readFileSync(files.photo.filepath)
            product.photo.contentType = files.photo.mimetype
        }

        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.required(),
            quantity: Joi.required(),
            category: Joi.required(),
        })

        const {error} = schema.validate(fields)
        if(error){
            return res.status(400).json({
                message: error.details[0].message
            })
        }
 
        product.save().then(product => {
            return res.status(204).json({
                product
            })
        })
        .catch((err) => {
            return res.status(400).json({
                message: 'Product not updated'
            })
        })
    })
    
}

exports.listProducts = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? req.query.limit : 4

    let query = {}

    let {search, category} = req.query
    if(search){
        query.name = {$regex: search, $options: 'i'};
    }
    if(category){
        query.category = category
    }

    Product.find(query)
           .select('-photo')
           .populate('category')
           .sort([[sortBy, order]])
           .limit(limit)
           .then((products) => {
                return res.status(200).json({
                    products
                })
           })
           .catch((err) => {
                return res.status(404).json({
                    message: 'No products found'
                })
           })
           
}

exports.relatedProducts = (req, res) => {

    let limit = req.query.limit ? req.query.limit : 3


    let product = req.product
    Product.find({category: product.category, _id: {$ne: product._id}})
           .select('-photo')
           .limit(limit)
           .populate('category', '_id name')
           .then((products) => {
                return res.status(200).json({
                    products
                })
           })
           .catch(err => {
                return res.status(404).json({
                    message: 'product not found'
                })
           })

}

exports.searchProduct = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.body.limit ? req.body.limit : 10
    let skip = parseInt(req.body.skip)
    let findArgs = {}

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === "price"){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    Product.find(findArgs)
           .select('-photo')
           .populate('category')
           .sort([[sortBy, order]])
           .limit(limit)
           .skip(skip)
           .then((products) => {
                return res.status(200).json({
                    products
                })
           })
           .catch((err) => {
                return res.status(404).json({
                    message: 'No products found'
                })
           })
}

exports.photoProduct = (req, res) => {
    let product = req.product

    if(product.photo.data){
        res.set('Content-Type', product.photo.contentType)
        return res.send(product.photo.data)
    }
}
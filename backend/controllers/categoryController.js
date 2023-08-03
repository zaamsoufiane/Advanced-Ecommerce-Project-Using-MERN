const Category = require('../models/category')

exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save()
    .then(() => {
        return res.status(200).json({category})
        
    })
    .catch((err) => {
        if(err){

        
        return res.status(400).json({
            message: 'Bad request'
        })
    }
        
    })
}

exports.showOneCategory = (req, res) => {
    
    return res.status(200).json({
        category: req.category
    })
}

exports.updateCategory = (req, res) => {
    let category = req.category
    category.name = req.body.name
    category.save().then((categ) => {
        return res.status(200).json({
            message: "Category updated successfully",
            categ
        })
    })
    .catch((err) => {
        if(err) {
            return res.status(400).json({
                message: 'Bad request'
            })
        }
    })
    
}

exports.allCategories = (req, res) => {
    Category.find().then((categories) => {
        if(!categories){
            return res.status(404).json({
                message: 'No category found'
            })
        }
        return res.status(200).json({
            categories
        })
    })
    .catch((err) => {
        if(err) {
            return res.status(400).json({
                message: 'Bad request'
            })
        }
    })
}

exports.deleteCategory = (req, res) => {
    let category = req.category
    console.log(category._id)
    Category.findByIdAndDelete(category._id).then((categ) => {
        if(!categ){
            return res.status(404).json({
                message: 'Category not found'
            })
        }
        return res.status(200).json({
            categ
        })
    })
}


const express = require('express')
const { createCategory, showOneCategory, updateCategory, allCategories, deleteCategory } = require('../controllers/categoryController')
const { isAdmin, requireSignIn, isAuth } = require('../middlewares/auth')
const { userById } = require('../middlewares/user')
const Category = require('../models/category')
const router = express.Router()

router.post('/create/:userId', [requireSignIn, isAuth, isAdmin], createCategory)
router.put('/:categoryId/:userId', [requireSignIn, isAuth, isAdmin], updateCategory)
router.delete('/:categoryId/:userId', [requireSignIn, isAuth, isAdmin], deleteCategory)
router.get('/:categoryId', showOneCategory)
router.get('/', allCategories)


router.param('userId', userById)
router.param('categoryId', (req, res, next, id) => {
    Category.findById(id).then((category) => {
        if(!category){
            return res.status(404).json({
                message:'Category not found'
            })
        }
        req.category = category
        next()
    })
    .catch((err) => {
        return res.status(400).json({
            message: 'Bad request'
        })
    })
})

module.exports = router
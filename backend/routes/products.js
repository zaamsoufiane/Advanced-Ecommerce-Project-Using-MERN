const express = require('express')
const { isAdmin, requireSignIn, isAuth } = require('../middlewares/auth')
const { userById } = require('../middlewares/user')
const { createProduct, showOneProduct, productById, deleteProduct, updateProduct, listProducts, relatedProducts, searchProduct, photoProduct } = require('../controllers/productController')

const router = express.Router()

router.get('/', listProducts)
router.get('/related/:productId', relatedProducts)
router.post('/search', searchProduct)
router.get('/photo/:productId', photoProduct)
router.post('/create/:userId', [requireSignIn, isAuth, isAdmin], createProduct)
router.get('/:productId', showOneProduct)
router.delete('/:productId/:userId', [requireSignIn, isAuth, isAdmin], deleteProduct)
router.put('/:productId/:userId', [requireSignIn, isAuth, isAdmin], updateProduct)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router
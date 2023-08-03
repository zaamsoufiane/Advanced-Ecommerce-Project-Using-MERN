const express = require('express')
const router = express.Router()
const {create, listOrders, listStatus, updateStatus} = require('../controllers/orderController')
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth')
const { userById, addProductToHistory } = require('../middlewares/user')
const { decreaseQuantity } = require('../middlewares/product')
const { orderById } = require('../middlewares/order')

router.post('/create/:userId', [requireSignIn, isAuth, addProductToHistory, decreaseQuantity], create)
router.get('/:userId', [requireSignIn, isAuth, isAdmin], listOrders)
router.get('/status/:userId', [requireSignIn, isAuth, isAdmin], listStatus)
router.patch('/:orderId/status/:userId', [requireSignIn, isAuth, isAdmin], updateStatus)

router.param('orderId', orderById)
router.param('userId', userById)
module.exports = router
const express = require('express')
const {salam, signup, signin, signout} = require('../controllers/authController')
const {signUpValidator} = require('../middlewares/userValidator')
const { requireSignIn } = require('../middlewares/auth')
const router = express.Router()

router.get('/', salam)
router.post('/signup', signUpValidator, signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.get('/hello', requireSignIn,(req, res) => {
    res.json({
        message:"hello world"
    })
})

module.exports = router
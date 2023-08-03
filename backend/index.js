const express = require('express')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const categoryRoutes = require('./routes/categories')
const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/orders')
const braintreeRoutes = require('./routes/braintree')

require('dotenv').config()
const app = express()

mongoose.connect(process.env.DATABASE)
        .then(() => { console.log('database connected') })
        .catch((err) => { console.log('not connected') })
const cors = require('cors')
//Middlewares
app.use(express.json())
app.use(expressValidator())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3001"
}))

//Routes
app.use('/api', authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)
app.use('/api/braintree',braintreeRoutes)
app.use('/api/order',orderRoutes)


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
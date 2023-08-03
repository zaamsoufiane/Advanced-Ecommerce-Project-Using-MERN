import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import Menu from './core/Menu'
import Dashboard from './user/Dashboard'
import PrivateRoute from './core/privateRoute'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './core/adminRoute'
import AddCategory from './admin/category/AddCategory'
import AddProduct from './admin/product/AddProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import ListOders from './admin/order/ListOders'
const App = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route exact element={<PrivateRoute />}>
            <Route path='/' element={<Home />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/shop' element={<Shop />}/>
            
        </Route>
        <Route exact element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />}/>
          <Route path='/create/category' element={<AddCategory />}/>
          <Route path='/create/product' element={<AddProduct />}/>
          <Route path='/orders' element={<ListOders />}/>
        </Route>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/product/:id' element={<Product />}/>
        <Route path='/cart' element={<Cart />}/>
      </Routes>
    </div>
  )
}

export default App
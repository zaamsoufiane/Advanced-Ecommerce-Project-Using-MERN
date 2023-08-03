import React from 'react'
import Layout from './Layout'
import { useSelector } from 'react-redux'
import ShowImage from './ShowImage'
import Checkout from './Checkout'
import { useDispatch } from 'react-redux'
import { incrementProductCount, decrementProductCount, removeProduct } from './actions/cartActions'
const Cart = ({product}) => {
    const dispatch = useDispatch()
    let productsInCart = useSelector(state => state.cart.products)
  return (
    <Layout 
        title="Cart Page" 
        description="Node React Ecommerce App" 
        className="container-fluid p-4"
    >
        <div className="row">
            <div className="col-md-9">
                <h2>Your Cart</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsInCart.map((product, i) => (

                            <tr key={product._id}>
                                <td width="150px"><ShowImage item={product} url="product/photo" className="card-img-top"></ShowImage></td>
                                <td>
                                    <h4>{product.name}</h4>
                                    <p className="well">{product.description}</p>
                                </td>
                                <td>

                                    <div className="input-group">
                                        <h3><span className="span span-success">{product.count}</span></h3>

                                        <div className="input-group-prepend">
                                            <button onClick={() => dispatch(incrementProductCount(product))} className="btn ml-5 btn-sm btn-info">
                                                <i className="fas fa-plus"></i>
                                            </button>
                                            {product.count > 1 && 
                                            <button onClick={() => dispatch(decrementProductCount(product))} className="btn ml-2 btn-sm btn-secondary">
                                                <i className="fas fa-minus"></i>
                                            </button>}
                                        </div>
                                    </div>

                                </td>
                                <td>${product.price}</td>
                                <td>${product.price * product.count}</td>
                                <td className='text-right'>
                                    <button onClick={() => dispatch(removeProduct(product._id))} className="btn btn-sm btn-dark">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col-md-3">
                <Checkout products={productsInCart}/>
            </div>
        </div>
    </Layout>
  )
}

export default Cart
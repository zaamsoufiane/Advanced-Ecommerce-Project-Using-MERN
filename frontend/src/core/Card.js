import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addToCart } from './actions/cartActions'
const Card = ({product, showViewBtn=true}) => {

    const dispatch = useDispatch()


    const stock = () => {
        return (
            product.quantity>0 ? <span className='badge badge-primary'>{product.quantity} In Stock</span> : <span className='badge badge-danger'>Not available</span>
        )
    }

  return (
    <div>
        {product && product.description && 
        <div className="card mb-2 px-2">
            <div className="card-header">
                <h4 className="display-6 text-center">{product.name}</h4>
            </div>
            <ShowImage item={product} url="product/photo" className="card-img-top"></ShowImage>
            <div className="card-body">
                <p>{product.description.substring(0,50)}...</p>
                <div className='text-center my-3'>
                    <span style={{fontSize: '20px'}} className="badge badge-info"><h4>${product.price}</h4></span> <br />
                    <span className="ml-5 badge-pill badge-success">{product.category.name}</span>
                </div>
                <div className="well">
                    <h4>{stock()}</h4>
                    <br />
                    <span>Added {moment(product.createdAt).fromNow()}</span>
                </div>
                {showViewBtn && 
                <Link to={`/product/${product._id}`}>
                    <button className='btn btn-warning mr-3'>View</button>
                </Link>
                }
                {
                    product.quantity > 0 && (
                        <button onClick={() => dispatch(addToCart(product))} className='btn btn-success ml-3'>Add to Cart</button>
                    ) 

                }
            </div>
        </div>
}
    </div>
  )
}

export default Card
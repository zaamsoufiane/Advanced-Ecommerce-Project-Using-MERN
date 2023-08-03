import React, { useEffect, useState } from 'react'
import {isAuthenticate, emptyCart} from './helpers'
import { Link } from 'react-router-dom'
import { getBraintreeToken, processPayment } from './ApiCore'
import DropIn from 'braintree-web-drop-in-react'
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { createOrder } from './ApiCore'
const Checkout = ({products}) => {

    const [data, setData] = useState({
        braintreeToken: null,
        error: null,
        instance: {},
        address: ''
    })

    const userId = isAuthenticate() && isAuthenticate().user._id
    const token = isAuthenticate() && isAuthenticate().token

    useEffect(() => {
        getBraintreeToken(userId, token)
        .then(res => setData({...data, braintreeToken: res.token}))
        .catch(err => setData({...data, error: err}))
    }, [])

    const total = (products) => {
        return products.reduce((total, product) => total + (product.count * product.price), 0)
    }

    const buy = () => {
        let deliveryAddress = data.address
        data.instance.requestPaymentMethod()
        
        .then(data => {
            let paymentData = {
                amount : total(products),
                paymentMethodNonce: data.nonce
            }
            processPayment(userId, token, paymentData)
            .then(res => {
                console.log(res)
                let orderData = {
                    products,
                    transaction_id: res.transaction.id,
                    amount: res.transaction.amount,
                    address: deliveryAddress
                }

                createOrder(userId, token, orderData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))

                emptyCart(() => {
                    toastr.success('Valid', 'Thanks, Payment Was Successfully', {
                        positionClass: 'toast-bottom-left'
                    })
                })
                

            })
            .catch(err => {
                toastr.warning('Not valid', err.message, {
                    positionClass: 'toast-bottom-left'
                })
            })
            
            toastr.success('Valid', 'Check form', {
                positionClass: 'toast-bottom-left'
            })
        })
        .catch(err => {
            toastr.warning('Not valid', err.message, {
                positionClass: 'toast-bottom-left'
            })
        })
    }

    const showBtnToCheckout = () => {
        if(isAuthenticate()){
            return (
                <>
                {dropIn()}
                <button onClick={buy} className="btn btn-raised btn-success">Pay</button>
                </>
                )
        } 
        return (
            <Link to="/signin">
                    <button className="btn btn-warning btn-block">Sign In To Checkout</button>
            </Link>
        )
    }

    const dropIn = () => (
        <div>
        {data.braintreeToken != null && products.length > 0 && (
            <DropIn options={{
                authorization: data.braintreeToken,
                paypal: {
                    flow: 'vault'
                }
            }} 
                onInstance={instance => data.instance = instance}
                
            />
        )
        
        }
        </div>
    )

    const handleInput = (e) => {
        setData({...data, address: e.target.value})
    }

  return (
    <div>
        <h2>Total: {total(products)}</h2>
        <label htmlFor='address'>Delivery Address</label>
        <textarea className='form-control' id='address' onChange={handleInput} rows="2"></textarea>
        {showBtnToCheckout()}
    </div>
  )
}

export default Checkout
import React,{useState, useEffect} from 'react'
import { isAuthenticate } from '../../core/helpers'
import { getStatus, listAllOrders, updateOrderStatus } from './ApiAdmin'
import moment from 'moment'
import Layout from '../../core/Layout'
const ListOders = () => {

    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState([])

    const {user, token} = isAuthenticate()

    const loadOrders = () => {
        listAllOrders(user._id, token)
        .then(res => setOrders(res.orders))
        .catch(err => console.log(err))
    }

    const loadStatus = () => {
        getStatus(user._id, token)
        .then(res => setStatus(res.status))
        .catch(err => console.log(err))
    }

    const emptyOrders = () => {
        if(orders.length == 0) {
            return (
                <div className="alert alert-warning text-center my-4">
                    No Orders
                </div>
            )
        } else {
            return (
                <div className="alert alert-info text-center my-4">
                    Total {orders.length}
                </div>
            )
        }
    }

    const showInput = (key, value) => {
        return (
            <div className="form-group">
                <label htmlFor={key}>{key}</label>
                <input id={key} value={value} readOnly type="text" className="form-control" />
            </div>
        )
    }

    const showStatus = (order) => {
        return status && status.length && (
            <>
                <h4>Status: {order.status}</h4>
                <select onChange={e => handleStatus(e, order)} name="" className='form-control' id="">
                    <option value="">Select Status</option>
                    {status.map((statu) => (
                        <option key={statu} value={statu}>{statu}</option>
                    ))}
                </select>
            </>
        )
    }

    const displayOrders = () => {
        console.log(orders)
        return orders.length && orders.map((ord, i) => {
            return (
                <div className="my-3" key={i}>
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Transaction ID </strong>{ord.transaction_id}</li>
                        <li className="list-group-item"><strong>Amount </strong>${ord.amount}</li>
                        <li className="list-group-item">{showStatus(ord)}</li>
                        <li className="list-group-item"><strong>Ordered On </strong>{moment(ord.createdAt).fromNow()}</li>
                        <li className="list-group-item"><strong>Customer </strong>{ord.user.name}</li>
                        <li className="list-group-item"><strong>Address </strong>{ord.address}</li>
                    </ul>
                    <div className="my-5">
                        <h3>Total Products {ord.products.length}</h3>
                        {ord.products && ord.products.map(product => (

                            <div key={product._id} className="card text-white bg-primary mb-3">
                                <div className="card-header">{product.name}</div>
                                <div className="card body">
                                    {showInput('Product ID', product._id)}
                                    {showInput('Product Name', product.name)}
                                    {showInput('Product Price', product.price)}
                                    {showInput('Product Quantity', product.count)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        })
    }

    const handleStatus = (e, order) => {
        updateOrderStatus(order._id, user._id, token, e.target.value)
        .then(res => {
            if(res.error) {
                console.log(res.error)
            }
            loadOrders(user,token)
        })
    }

    useEffect(() => {
        loadOrders()
        loadStatus()
    }, [])


  return (
    <Layout title="Orders" description="See Orders" className="container">
        <div className="row">
            <div className="col-md-6">
                {emptyOrders()}
                {displayOrders()}
                {JSON.stringify(status)}
            </div>
        </div>
    </Layout>
  )
}

export default ListOders
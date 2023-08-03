import { API_URL } from "../config"
import queryString from "query-string"

export const getProduct = (params) => {

    let query = queryString.stringify(params)
    return fetch(`${API_URL}/product?${query}`)
    .then((res) => res.json())
    .then(res => res.products)
    .catch(err => console.log(err))
}

export const getCategories = () => {
    return fetch(`${API_URL}/category`,{
        method:"get",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        }
    })
    .then((res) => res.json())
    .then(res => res.categories)
}


export const filterProducts = (skip, limit, filters) => {

    const data = {
        filters,
        skip,
        limit
    }

    return fetch(`${API_URL}/product/search`,{
        method:"post",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then(res => res.products)
    .catch(err => console.log(err))
}


export const productById = (id) => {
    return fetch(`${API_URL}/product/${id}`,{
        method:'GET',
        headers:{
           
            "Content-Type":"application/json"
        }
    })
    .then(res => res.json())
    .then(res => res.product)
    .catch(err => console.log(err))
}


export const relatedProduct = (id) => {
    return fetch(`${API_URL}/product/related/${id}`,{
        method:'GET',
        headers:{
           
            "Content-Type":"application/json"
        }
    })
    .then(res => res.json())
    .then(res => res.products)
    .catch(err => console.log(err))
}


export const getBraintreeToken = (userId, token) => {
    return fetch(`${API_URL}/braintree/getToken/${userId}`,{
        method:'GET',
        headers:{
           
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(res => res.json())

}

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API_URL}/braintree/purchase/${userId}`,{
        method:'POST',
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
    .then(res => res.json())

}

export const createOrder = (userId, token , orderData) => {
    return fetch(`${API_URL}/order/create/${userId}`,{
        method:'POST',
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify(orderData)
    })
    .then((res) => res.json())
}
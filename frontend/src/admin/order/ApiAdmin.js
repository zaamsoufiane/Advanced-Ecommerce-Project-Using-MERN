import { API_URL } from "../../config"

export const listAllOrders = (userId, token) => {

    return fetch(`${API_URL}/order/${userId}`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(res => res.json())
}

export const getStatus = (userId, token) => {

    return fetch(`${API_URL}/order/status/${userId}`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(res => res.json())
}

export const updateOrderStatus = (orderId, userId, token, status) => {

    return fetch(`${API_URL}/order/${orderId}/status/${userId}`,{
        method:'PATCH',
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({status: status})
    })
    .then(res => res.json())
}
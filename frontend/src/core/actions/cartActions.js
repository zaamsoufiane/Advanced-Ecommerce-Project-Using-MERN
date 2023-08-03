import {uniqBy} from 'lodash'

export const addToCart = (item) => {
    let items = JSON.parse(localStorage.getItem('cart')) || []
    items = uniqBy([{...item, count: 1}, ...items], '_id')
    localStorage.setItem('cart', JSON.stringify(items))
    return {
        type: 'ADDITEM',
        payload: items
    }
}

export const incrementProductCount = (product) => {
    let items = JSON.parse(localStorage.getItem('cart'))
    items = items.map(item => 
        item._id === product._id ? {...item, count: product.count + 1} : item
    )

    localStorage.setItem('cart', JSON.stringify(items))

    return {
        type: 'INCREMENTPRODUCTCOUNT',
        payload: items
    }
}


export const decrementProductCount = (product) => {
    if(product.count > 1){
        let items = JSON.parse(localStorage.getItem('cart'))
        items = items.map(item => 
            item._id === product._id ? {...item, count: product.count - 1} : item
        )
    
        localStorage.setItem('cart', JSON.stringify(items))
    
        return {
            type: 'DECREMENTPRODUCTCOUNT',
            payload: items
        }
    }

    else {
        return {
            type: null
        }
    }
    
}


export const removeProduct = (id) => {
    let items = JSON.parse(localStorage.getItem('cart'))
        items = items.filter(item => 
            item._id !== id
        )
    
        localStorage.setItem('cart', JSON.stringify(items))
    
        return {
            type: 'REMOVEFROMCART',
            payload: items
        }
}
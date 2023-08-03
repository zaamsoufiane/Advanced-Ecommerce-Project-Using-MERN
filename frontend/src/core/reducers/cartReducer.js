let items = JSON.parse(localStorage.getItem('cart')) || []
let myState = {
    products: items,
    count: items.reduce((total, product) => total + product.count, 0)
}
const cartReducer = (state = myState, action) => {
    switch(action.type){
        case 'ADDITEM':{
            return {
                ...state,
                products: action.payload,
                count: action.payload.reduce((total, product) => total + product.count, 0)
            }
        }
        case 'INCREMENTPRODUCTCOUNT':{
            return {
                ...state,
                products: action.payload,
                count: action.payload.reduce((total, product) => total + product.count, 0)
            }
        }
        case 'DECREMENTPRODUCTCOUNT':{
            return {
                ...state,
                products: action.payload,
                count: action.payload.reduce((total, product) => total + product.count, 0)
            }
        }
        case 'REMOVEFROMCART':{
            return {
                ...state,
                products: action.payload,
                count: action.payload.reduce((total, product) => total + product.count, 0)
            }
        }
        default: {
            return state
        }
    }
}

export default cartReducer
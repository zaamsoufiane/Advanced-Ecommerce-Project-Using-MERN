export const isAuthenticate = () => {
    const jwt = localStorage.getItem('jwt-info')
    if(jwt){
        return JSON.parse(jwt)
    }
    return false
 }

 export const emptyCart = (callback) => {
    localStorage.removeItem('cart')
    callback()
 }
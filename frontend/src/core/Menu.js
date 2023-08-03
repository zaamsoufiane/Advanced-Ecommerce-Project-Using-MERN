import React, {Fragment} from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { API_URL } from '../config'
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { useNavigate } from 'react-router-dom'
import {isAuthenticate} from "./helpers"
import { useSelector, useDispatch } from 'react-redux'
const Menu = () => {

    let countItems = useSelector(state => state.cart.count)

    const navigate = useNavigate()

 const signOut = (e) => {
    e.preventDefault()
    fetch(`${API_URL}/signout`)
    .then(res => res.json())
    .then(res => {
        toastr.info(res.message, 'Successful',{
            positionClass: 'toast-bottom-left'
        })
    })
    .catch(err => console.log(err))
    localStorage.removeItem('jwt-info')
    navigate('/signin')
 }



  return (
   
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-success">
            <div className="container-fluid">
                <button
                className="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarTogglerDemo03"
                aria-controls="navbarTogglerDemo03"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <i className="fas fa-bars"></i>
                </button>
                <NavLink className="navbar-brand" to="/">Ecom</NavLink>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isAuthenticate() && 
                        <Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/shop">Store</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={`${isAuthenticate().user.role === 1 ? "/admin": ""}/dashboard`}>Dashboard</NavLink>
                            </li>
                        </Fragment>
                        }
                        {!isAuthenticate() && 
                        <Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signin">Signin</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signup">Signup</NavLink>
                            </li>
                        </Fragment>
                        }

                        {isAuthenticate() &&
                        <Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={signOut} to="/signout">Signout</NavLink>
                            </li>
                            
                        </Fragment>
                        
                        }
                        <li className="nav-item">
                            <NavLink to="/cart">
                                Cart <span className="badge badge-warning">{countItems}</span>
                            </NavLink>
                        </li>
                    </ul>
                
                </div>
            </div>
        </nav>
    
  )
}

export default Menu
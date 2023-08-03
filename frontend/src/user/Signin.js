import React, { useState } from 'react'
import Layout from '../core/Layout'
import { API_URL } from '../config'
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { useNavigate } from 'react-router-dom'
const Signin = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setUser({...user, [e.target.id]: e.target.value})
  }

  const submitSignin = e => {
    e.preventDefault()
    fetch(`${API_URL}/signin`, {
      method: 'post',
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(res => {
      if(res.message){
        toastr.warning(res.message, 'Please check form', {
          positionClass: 'toast-bottom-left'
        })
      } else {
        localStorage.setItem('jwt-info', JSON.stringify(res))
        toastr.success("Sign in successfully", 'Success', {
          positionClass: 'toast-bottom-left'
        })
        navigate('/')
      }
    })
    .catch(err => console.log(err))
  }

  const form = () => (
    <form onSubmit={submitSignin}>
        
        <div className="form-group">
            <label htmlFor="email" className="text-muted">Email</label>
            <input onChange={handleChange} type="email" className="form-control" id="email" />
        </div>
        <div className="form-group">
            <label htmlFor="password" className="text-muted">Password</label>
            <input onChange={handleChange} type="password" className="form-control" id="password" />
        </div>
        <button className="btn my-5 btn-block btn-lg btn-outline-success">Sign In</button>
         {JSON.stringify(user)}
    </form>
)

  return (
    <Layout title="Sign In Page" description="Sign In Node React Ecommerce App" className="container p-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          {form()}
        </div>
      </div>
    </Layout>
  )
}

export default Signin
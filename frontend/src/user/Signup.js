import React, {useState} from 'react'
import Layout from '../core/Layout'
import { API_URL } from '../config'
import toastr from 'toastr'
import { useNavigate } from 'react-router-dom'
import "toastr/build/toastr.css"
const Signup = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',

  })

  const handleChange = (e) => {
    setUser({...user, [e.target.id]: e.target.value})
  }

  const submitSignup = (e) => {
    e.preventDefault()

    fetch(`${API_URL}/signup`, {
      method: "post",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body: JSON.stringify(user)
    })
    .then((res) => res.json())
    .then((res) => { if(res.message) {
      toastr.warning(res.message, 'Please check form', {
        positionClass: 'toast-bottom-left'
      })
    } else if(!res.message) {
      toastr.success('User registred', 'Successful', {
        positionClass: 'toast-bottom-left'
      })
      navigate('/signin')
    } })
    .catch((err) => {
      console.log(err)
    })
  }

  const form = () => (
    <form onSubmit={submitSignup}>
        <div className="form-group">
            <label htmlFor="name" className="text-muted">Name</label>
            <input onChange={handleChange} type="text" className="form-control" id="name" />
        </div>
        <div className="form-group">
            <label htmlFor="email" className="text-muted">Email</label>
            <input onChange={handleChange} type="email" className="form-control" id="email" />
        </div>
        <div className="form-group">
            <label htmlFor="password" className="text-muted">Password</label>
            <input onChange={handleChange} type="password" className="form-control" id="password" />
        </div>
        <button className="btn my-5 btn-block btn-lg btn-outline-success">Sign Up</button>
        {JSON.stringify(user)}
    </form>
)

  return (
    <Layout title="Sign Up Page" description="Sign Up Node React Ecommerce App" className="container p-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          {form()}
        </div>
      </div>
      
    </Layout>
  )
}

export default Signup
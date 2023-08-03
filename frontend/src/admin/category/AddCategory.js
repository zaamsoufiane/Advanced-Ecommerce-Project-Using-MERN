import React, {useState} from 'react'
import Layout from "../../core/Layout"
import {API_URL} from '../../config'
import {isAuthenticate} from '../../core/helpers'
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { useNavigate } from 'react-router-dom'
const AddCategory = () => {

    const [name, setName] = useState('')
    const navigate = useNavigate()
    const handleChange = (e) => {
        setName({[e.target.id]: e.target.value})
    }

    const {user, token} = isAuthenticate()

    const submitCategory = e => {
        e.preventDefault()
        fetch(`${API_URL}/category/create/${user._id}`,{
            method: 'post',
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(name)
          
        })
        .then(res => res.json())
        .then((res) => { 
            if(res.message) {
                toastr.warning(res.message, 'Please check form', {
                positionClass: 'toast-bottom-left'
                })
          } else if(!res.message) {
                toastr.success('Category registred', 'Successful', {
                positionClass: 'toast-bottom-left'
                })
            
          } })
          .catch((err) => {
            console.log(err)
          })
    }
  return (
    <div>
        <Layout title="Category" description="New Category" className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={submitCategory}>
                        <div className="form-group">
                            <label htmlFor="name" className="text-muted"></label>
                            <input onChange={handleChange} placeholder='Name of category' type="text" className="form-control" id="name" />
                        </div>
                        <button className="btn btn-outline-primary my-3 mx-auto">New Category</button>
                        {JSON.stringify(name)}
                        {console.log(token)}
                    </form>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default AddCategory
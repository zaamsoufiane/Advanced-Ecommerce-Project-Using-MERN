import React, {useEffect, useState} from 'react'
import Layout from "../../core/Layout"
import {API_URL} from '../../config'
import {isAuthenticate} from '../../core/helpers'
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { useNavigate } from 'react-router-dom'
const AddProduct = () => {

    const [product, setProduct] = useState({
        photo:'',
        name:'',
        description:'',
        quantity:0,
        price:0,
        shipping: false,
        category: 0

    })
    
    const [formData, setFormData] = useState(new FormData())
    const [categories, setCategories] = useState([])
    
    const handleChange = (e) => {
        const value = e.target.id == "photo" ? e.target.files[0] : e.target.value

        formData.set(e.target.id, value)

       setProduct({...product, [e.target.id]: value})
    }

    const {user, token} = isAuthenticate()

    const getCategories = () => {
        fetch(`${API_URL}/category`,{
            method:"get",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        })
        .then((res) => res.json())
        .then(data => setCategories(data.categories))
    }

    useEffect(() => 
        getCategories()
    , [])
       


    const submitProduct = e => {
        e.preventDefault()
        fetch(`${API_URL}/product/create/${user._id}`,{
            method: 'post',
            headers: {
                "Accept":"application/json",
                
                "Authorization":`Bearer ${token}`
            },
            body: formData
          
        })
        .then(res => res.json())
        .then((res) => { 
            if(res.message) {
                toastr.warning(res.message, 'Please check form', {
                positionClass: 'toast-bottom-left'
                })
          } else if(!res.message) {
                toastr.success(`Product ${product.name} registred`, 'Successful', {
                positionClass: 'toast-bottom-left'
                })
                setProduct({
                    photo:'',
                    name:'',
                    description:'',
                    quantity:0,
                    price:0,
                    shipping: false,
                    category: 0

                })
                setFormData(new FormData())
          } })
          .catch((err) => {
            console.log(err)
          })
    }
  return (
    <div>
        <Layout title="Product" description="New Product" className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={submitProduct}>
                        <div className="form-group">
                            <label class="form-label" for="file"></label>
                            <input onChange={handleChange} id="photo" type="file" class="form-control" />
                        </div>
                    
                        <div className="form-group">
                            <label htmlFor="name" className="text-muted"></label>
                            <input value={product.name} onChange={handleChange} placeholder='Name of product' type="text" className="form-control" id="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea value={product.description} onChange={handleChange} name="description" id="description" cols="30" rows="10" className="form-control"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input value={product.quantity} onChange={handleChange} type="number" id='quantity' className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input value={product.price} onChange={handleChange} type="number" id='price' className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select value={product.category} onChange={handleChange} name="category" id="category" className="form-control">
                                <option value="0">Select a Category</option>
                                {categories && categories.map((category,i) => (
                                    <option key={i} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="shipping">Shipping</label>
                            <select value={product.shipping} onChange={handleChange} name="shipping" id="shipping" className="form-control">
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        
                        <button className="btn btn-block btn-outline-primary my-3 mx-auto">New Product</button>
                        
                    </form>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default AddProduct
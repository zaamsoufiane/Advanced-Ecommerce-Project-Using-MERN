import React,{useEffect, useState} from 'react'
import Layout from './Layout'
import { getProduct } from './ApiCore'
import { API_URL } from '../config'
import Card from './Card'
import Search from './Search'
const Home = () => {

  const [productBestSellers, setProductBestSellers] = useState([])
  const [productsArrivals, setProductsArrivals] = useState([])

  const clients = [
    {
      nom:"PC", 
      montant:515155
    },
    {
      nom:"Machine", 
      montant:66233
    },

    {
      nom:"AZEA", 
      montant:845
    },

    {
      nom:"YREY", 
      montant:6234
    },


  ]

  const loadBestSellers = async () => {
    getProduct({sortBy: 'sold', order:'desc', limit: 3})
    .then(res => setProductBestSellers(res))
  }

  const loadArrivals = async () => {
    getProduct({sortBy: 'createdAt', order:'desc', limit: 3})
    .then(res => setProductsArrivals(res))
  }

  useEffect(() => {
    loadArrivals()
    loadBestSellers()
    
  }, [])

  return (
    <Layout 
        title="Home Page" 
        description="Node React Ecommerce App" 
        className="container p-4"
    >
      <Search />
      <hr />
      <h1>Arrivals Products</h1>
      <div className="row mt-3 mb-5">

      
      {productsArrivals.map((product, i ) => (
        <div className="col-md-4">
        <Card product={product} key={i}></Card>
        </div>
      ))}
      </div>
      <hr />
      <h1>Best Sellers</h1>
      <div className="row mt-3 mb-5">
        {productBestSellers.map((product, i) => (
          <div className="col-md-4">
            <Card product={product}></Card>
          </div>
        ))}
      </div>

      
    </Layout>
  )
}

export default Home
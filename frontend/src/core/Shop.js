import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import { getCategories, filterProducts } from './ApiCore'
import FilterByCategory from './FilterByCategory'
import FilterByPrice from './FilterByPrice'
import Card from './Card'
const Shop = () => {

const [categories, setCategories] = useState([])
const [myFilters, setMyFilters] = useState({
    category: [],
    price: []
})

const [limit, setLimit] = useState(3)
const [skip, setSkip] = useState(0)
const [size, setSize] = useState(0)
const [productsFiltred, setProductsFiltred] = useState([])

useEffect(() => {
    getCategories()
    .then(res => setCategories(res))

    filterProducts(skip, limit, myFilters)
    .then(res => {
        setProductsFiltred(res)
        setSkip(0)
        setSize(res.length)
    })
}, [myFilters])

const handleFilters = (data, filterBy) => {
    setMyFilters({...myFilters, [filterBy]: data})
    
}

const loadMore = () => {

    const toSkip = skip + limit
    filterProducts(toSkip, limit, myFilters)
    .then(res => {
        setProductsFiltred([ ...productsFiltred, ...res])
        setSize(res.length)
        setSkip(toSkip)

    })
}

const buttonLoadMore = () => {
    return (
        (size > 0 &&
        size >= limit) &&
        (
            <div className="text-center">
                <button onClick={loadMore} className='btn btn-outline-success'>Load More</button>
            </div>
        )
    )
}
  return (
    <div>
        <Layout title="Shop Page" description="Choice your favorite product in the store" className="container p-4">
            <div className="row">
                <div className="col-md-3">
                    <FilterByCategory handleFilters={(data) => handleFilters(data, 'category')} categories={categories}></FilterByCategory>
                  
                    <hr />
                    <FilterByPrice handleFilters={data => handleFilters(data, 'price')}></FilterByPrice>
                </div>
                <div className="col-md-9">
                    <h1>Best Sellers</h1>
                    <div className="row mt-3 mb-5">
                        {productsFiltred.map((product, i) => (
                        <div key={product._id} className="col-md-4">
                            <Card product={product}></Card>
                        </div>
                        ))}
                    </div>
                    {buttonLoadMore()}
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default Shop
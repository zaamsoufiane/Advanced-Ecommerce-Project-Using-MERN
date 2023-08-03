import React,{useState, useEffect} from 'react'
import { getCategories, getProduct } from './ApiCore'
import Card from './Card'

const Search = () => {

    const [categories, setCategories] = useState([])
    const [searchData, setSearchData] = useState({search: '', category: ''})
    const [products, setProducts] = useState([])

    const handleChange = (e) => {
        setSearchData({...searchData, [e.target.id]: e.target.value})
    }
    const searchSubmit = (e) => {
        e.preventDefault()
        let {search, category} = searchData
        if(search || category){
            getProduct({search: search || undefined, category: category})
            .then(res => setProducts(res))
        } else {
            setProducts([])
        }
        
    }

    const countProducts = () => {
        
        return (
            products.length > 0 && (
            <div>
                <hr />
                <h3>Found {products.length} {products.length == 1 ? 'Product' : 'Products'} </h3>
            </div>
            
        ))
    }


    useEffect(() => {
        getCategories()
        .then(res => setCategories(res))
    }, [])


  return (
    <div>
        
        <form onSubmit={searchSubmit}>
            <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                    <select onChange={handleChange} id="category" className="btn">
                        <option value="">Select a Category</option>
                        {categories.map((category, i) => (

                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <input onChange={handleChange} type="search" id='search' className="form-control mx-4" />
                <div className="input-group-apprend">
                    <button className="btn">Search</button>
                </div>
                {JSON.stringify(searchData)}
               
            </div>
        </form>
        
        <div className='row'>
            <div className="col-md-12 mx-auto text-center">
                {countProducts()}

            </div>
        </div>
        <div className="row">
            {products.map((product, i) => (
                <div key={product._id} className="col-md-4">
                    <Card product={product}/>
                </div>

            ))}
        </div>
    </div>
  )
}

export default Search
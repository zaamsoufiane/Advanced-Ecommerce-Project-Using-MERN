import React,{useState, useEffect} from 'react'
import { productById, relatedProduct } from './ApiCore'
import Layout from './Layout'
import { useParams } from 'react-router-dom'
import Card from './Card'
const Product = () => {
    const params = useParams()

    const [product, setProduct] = useState({})
    const [relatedPr, setRelatedPr] = useState([])
    useEffect(() => {
        let productId = params.id
        console.log(productId);
        productById(productId)
        .then(res => {
            setProduct(res)
            return relatedProduct(productId)
        })
        .then(related => setRelatedPr(related))
        .catch(err => console.log(err))
    }, [params.id])

    console.log(product)

  return (
    <div>
    {product && 
    <Layout 
        title={product.name}
        description={product.description}
        className="container p-4"
    >
        
        <div className="row">
            <div className="col-md-9">
                <Card product={product} showViewBtn={false}/>
            </div>
            <div className="col-md-3">
               {relatedPr.map((product, i) => (
                <Card product={product} />
               ))}
                
            </div>
        </div>
       
    </Layout>
    }
    </div>
  )
}

export default Product
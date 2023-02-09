import React, { useEffect, useState } from 'react'
import MainLayout from '../../../components/layout/mainLayout/MainLayout'
import { detail } from '../../../api/product'
import { useParams } from 'react-router-dom'
import Loading from '../../../components/base/loading/Loading'
import ProductDetail from '../../../components/module/productDetail/ProductDetail'

const Detail = () => {

    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchProduct = async (productID) => {
        try {
            const response = await detail(productID)
            if (response.data) {
                const data = response.data;
                setProduct(data)
            }
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct(id)
    }, [id])

    return (
        <MainLayout>
            {loading ?
                <Loading />
                :
                <ProductDetail
                    product={product}
                />
            }
        </MainLayout>
    )
}

export default Detail
import React, { useState, useEffect } from 'react'
import { index } from '../../api/product';
import Loading from '../../components/base/loading/Loading';
import MainLayout from '../../components/layout/mainLayout/MainLayout';
import List from '../product/list/List';

const Main = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async (offset = 0, search = '') => {
        try {
            const response = await index(offset, search)
        
            if (response.data.products && response.data.products.length > 0) {
                const data = response.data.products;
                setProducts(data)
            }
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <MainLayout>
            {loading ?
                <Loading />
                :
                <List
                    products={products}
                    fetchProducts={fetchProducts}
                />
            }
        </MainLayout>
    )
}

export default Main
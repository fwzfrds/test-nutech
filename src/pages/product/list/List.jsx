import React from 'react'
import ProductCard from '../../../components/module/productCard/ProductCard'
import styles from './list.module.css'
import Pagination from '@mui/material/Pagination';
import Search from '../../../components/module/search/Search';
import AddProductForm from '../../../components/module/addProductForm/AddProductForm';

const List = ({ products, fetchProducts }) => {

    const changePage = (page) => {
        const offset = 8 * (page - 1)
        fetchProducts(offset)
    }

    return (
        <>
            <div className={`${styles.actions}`}>
                <Search
                    fetchProducts={fetchProducts}
                    products={products}
                />
                <AddProductForm />
            </div>
            <div className={`${styles.productList}`}>
                {products && products.length > 0 ?
                    products.map((item, idx) => {
                        return (
                            <React.Fragment
                                key={idx}
                            >
                                <ProductCard
                                    product={item}
                                />
                            </React.Fragment>
                        )
                    })
                    :
                    <></>
                }
            </div >
            <div className={`${styles.pagination}`}>
                <Pagination
                    count={10}
                    color="primary"
                    onChange={
                        (e, value) => {
                            changePage(value)
                        }
                    }
                />
            </div>
        </>
    )
}

export default List
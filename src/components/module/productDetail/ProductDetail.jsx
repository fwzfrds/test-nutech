import React from 'react'
import { useNavigate } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import styles from './productDetail.module.css'
import './reactImageGallery.css'
import { Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import Button from '../../base/button/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Rating from '../../base/rating/Rating';
import EditProductForm from '../editProductForm/EditProductForm';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import swal from 'sweetalert';
import { delProduct } from '../../../api/product';

const ProductDetail = ({ product }) => {

    const navigate = useNavigate()
    let images = []
    product.images.forEach((img, idx) => {
        const item = {
            original: img,
            thumbnail: img,
        }

        images = [...images, item]
    })

    const back = () => {
        navigate('/')
    }

    const handleDelete = (productID) => {
        swal({
            title: "Are you sure?",
            text: `This product will be deleted`,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(async (isOkay) => {
            if (isOkay) {
                try {
                    await delProduct(productID)
                    swal({
                        title: "Succes",
                        text: "Delete Successful",
                        icon: "success",
                        timer: 2000
                    })

                    navigate('/')
                } catch (error) {
                    swal({
                        title: "Error",
                        text: `Error while deleting data`,
                        icon: "error",
                        timer: 2000
                    });
                }
            }
        })
    }

    return (
        <>
            <Button
                variant='text'
                style={{
                    marginBottom: 10,
                }}
                onClick={() => back()}
            >
                <Typography
                    color='text.secondary'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10
                    }}
                >
                    <ArrowBackIcon />
                    Back
                </Typography>
            </Button>
            <div className={`${styles.container}`}>
                <div
                    className={`${styles.imgGallery}`}
                >
                    <ImageGallery
                        showNav={false}
                        showPlayButton={false}
                        items={images}
                    />
                </div>
                <div className={`${styles.productInfo}`}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold' }}
                    >
                        {product.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 'bold',
                            marginBottom: 1
                        }}
                        color="text.secondary"
                    >
                        {product.category}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 'bold' }}
                    >
                        <NumericFormat
                            value={product.price}
                            prefix="$ "
                            allowLeadingZeros
                            thousandSeparator="."
                            decimalSeparator=","
                            displayType="text"
                        />
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            marginTop: 2
                        }}
                    >
                        {product.description}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', marginTop: 2 }}
                    >
                        Stock: {product.stock}
                    </Typography>
                    <div className={`${styles.rating}`}>
                        <Rating
                            value={product.rating}
                        />
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {`(${product.rating})`}
                        </Typography>
                    </div>
                    <div className={`${styles.actions}`}>
                        <EditProductForm
                            product={product}
                        />
                        <Button
                            color='error'
                            onClick={
                                () => handleDelete(product.id)
                            }
                        >
                            <DeleteForeverIcon />
                            Delete Product
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail
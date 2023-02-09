import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { NumericFormat } from 'react-number-format';
import styles from './productCard.module.css'
import Button from '../../base/button/Button';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const navigate = useNavigate()

    const toDetail = (productID) => {
        navigate(`/product/detail/${productID}`)
    }

    return (
        <Card
            className={`${styles.productCard}`}
        >
            <CardMedia
                className={`${styles.cardMedia}`}
                component="img"
                alt={product.title}
                image={product.thumbnail}
            />
            <CardContent>
                <p
                    className={`${styles.productName}`}
                >
                    {product.title}
                </p>
                <Typography
                    variant="h6"
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
            </CardContent>
            <CardActions
                className={`${styles.cardActions}`}
            >
                <Button
                    variant='text'
                    size='small'
                    onClick={() => toDetail(product.id)}
                >
                    See Detail
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard
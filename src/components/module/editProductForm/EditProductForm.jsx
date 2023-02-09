import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '../../base/button/Button';
import AddIcon from '@mui/icons-material/Add';
import Slide from '@mui/material/Slide';
import styles from './editProductForm.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Input from '../../base/input/Input';
import ImageUploader from '../imageUploader/ImageUploader';
import { editProduct } from '../../../api/product';
import swal from 'sweetalert';
import { validateAddForm } from '../../../utils/validation/validation';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditProductForm = ({ product }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const [data, setData] = useState({
        title: product.title,
        price: product.price,
        stock: product.stock
    })
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [formErrors, setFormErrors] = useState(null)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const key = e.target.name
        const value = e.target.value

        switch (key) {
            case 'title':
                setData({ ...data, title: value })
                break;

            case 'price':
                let price = value
                price = price.replaceAll("$", "")
                price = price.replaceAll(".", "")
                price = price.replace(/ +/g, "");
                price = parseInt(price);
                setData({ ...data, price: price })
                break;

            case 'stock':
                setData({ ...data, stock: parseInt(value) })
                break;

            default:
                break;
        }
    }

    const handleEdit = async (data, productID) => {
        setLoading(true)

        let errorDataForms = {}

        errorDataForms = validateAddForm(data)
        if (Object.keys(errorDataForms).length > 0) {
            setFormErrors(errorDataForms)
            swal({
                title: "error",
                text: 'Error while updating data, please check the form',
                icon: "error",
                timer: 2000
            });
            setLoading(false)
            return
        }

        try {
            await editProduct(data, productID)

            swal({
                title: "Success",
                text: `Updating product success!`,
                icon: "success",
                timer: 2000
            });

            setLoading(false)
            handleClose()
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error) {
            console.error(error)

            swal({
                title: "error",
                text: 'Error while updating data, please check the fields!',
                icon: "error",
                timer: 2000
            });

            setLoading(false)
        }
    }

    return (
        <div>
            <Button
                onClick={() => handleClickOpen()}
                color='success'
                style={{
                    color: '#fff'
                }}
            >
                <AddIcon />
                Edit Product
            </Button>
            <Dialog
                open={open}
                maxWidth={fullScreen ? 'xs' : 'md'}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <DialogTitle id="alert-dialog-title">
                    Edit Product
                </DialogTitle>
                <DialogContent
                    className={`${styles.forms}`}
                >
                    <Input
                        type='text'
                        name='title'
                        label='Product Name'
                        value={data.title}
                        placeholder='Ex: Gaming Chair'
                        width='100%'
                        onChange={(e) => handleChange(e)}
                        errorMsg={formErrors && formErrors.name ? formErrors.name : ''}
                    />
                    <Input
                        type='price'
                        name='price'
                        label='Product Price'
                        value={data.price}
                        placeholder='Ex: $ 1.000'
                        width='100%'
                        onChange={(e) => handleChange(e)}
                        errorMsg={formErrors && formErrors.price ? formErrors.price : ''}
                    />
                    <Input
                        type='number'
                        name='stock'
                        label='Stock'
                        value={data.stock}
                        placeholder='Ex: 10'
                        width='100%'
                        onChange={(e) => handleChange(e)}
                        errorMsg={formErrors && formErrors.stock ? formErrors.stock : ''}
                    />
                    <ImageUploader
                        data={data}
                        setData={setData}
                    />
                </DialogContent>
                <DialogActions>
                    <div
                        className={`${styles.actions}`}
                    >
                        <Button
                            variant='text'
                            color={'error'}
                            onClick={handleClose}
                            disabled={loading ? true : false}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={
                                () => handleEdit(data, product.id)
                            }
                            autoFocus
                            disabled={loading ? true : false}
                        >
                            {loading ?
                                'Loading...'
                                :
                                'Save'
                            }
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditProductForm
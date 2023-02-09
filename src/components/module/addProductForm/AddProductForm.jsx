import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '../../base/button/Button';
import AddIcon from '@mui/icons-material/Add';
import Slide from '@mui/material/Slide';
import styles from './addProductForm.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Input from '../../base/input/Input';
import ImageUploader from '../imageUploader/ImageUploader';
import { addProduct } from '../../../api/product';
import swal from 'sweetalert';
import { validateAddForm } from '../../../utils/validation/validation';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddProductForm = () => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const [data, setData] = useState({})
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

    const handleAdd = async (data) => {
        setLoading(true)

        let errorDataForms = {}

        errorDataForms = validateAddForm(data)
        if (Object.keys(errorDataForms).length > 0) {
            setFormErrors(errorDataForms)
            swal({
                title: "error",
                text: 'Error while adding data, please check the form',
                icon: "error",
                timer: 2000
            });
            setLoading(false)
            return
        }

        try {
            await addProduct(data)
            swal({
                title: "Success",
                text: `Adding new product success!`,
                icon: "success",
                timer: 2000
            });
            setLoading(false)
            setData({})
            handleClose()
        } catch (error) {
            console.error(error)
            swal({
                title: "error",
                text: 'Error while adding data, please check the fields!',
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
            >
                <AddIcon />
                Add Product
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
                    Add New Product
                </DialogTitle>
                <DialogContent
                    className={`${styles.forms}`}
                >
                    <Input
                        type='text'
                        name='title'
                        label='Product Name'
                        placeholder='Ex: Gaming Chair'
                        width='100%'
                        onChange={(e) => handleChange(e)}
                        errorMsg={formErrors && formErrors.name ? formErrors.name : ''}
                    />
                    <Input
                        type='price'
                        name='price'
                        label='Product Price'
                        placeholder='Ex: $ 1.000'
                        width='100%'
                        onChange={(e) => handleChange(e)}
                        errorMsg={formErrors && formErrors.price ? formErrors.price : ''}
                    />
                    <Input
                        type='number'
                        name='stock'
                        label='Stock'
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
                                () => handleAdd(data)
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

export default AddProductForm
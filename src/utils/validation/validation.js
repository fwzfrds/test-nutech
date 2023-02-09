export const validateLogin = (values) => {
    const errors = {}

    if (!values.username) {
        errors.username = 'username is required!'
    }

    if (!values.password) {
        errors.password = 'password is required!'
    } else if ((values.password).length < 5) {
        errors.password = 'password must be at least 5 characters!'
    }

    return errors
}

export const validateAddForm = (values) => {
    const errors = {}

    if (!values.title) {
        errors.title = 'Name is required!'
    }

    if (!values.price) {
        errors.price = 'Price is required!'
    } else if (typeof (values.price) !== 'number') {
        errors.price = 'Price should be number'
    } else if (values.price < 0) {
        errors.price = 'Price should be more than Rp. 0'
    }

    if (!values.stock) {
        errors.stock = 'Stock is required!'
    } else if (typeof (values.stock) !== 'number') {
        errors.stock = 'Stock should be number'
    } else if (values.stock < 0) {
        errors.stock = 'Stock should be more than 0'
    }

    return errors
}
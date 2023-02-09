import instance from '../utils/axios/instance'

export const index = async (offset, search) => {
    const response = await instance({
        // url: `/products?title=${search}&offset=${offset}&limit=8`,
        url: `/products?limit=8&skip=${offset}`,
        method: "GET"
    })

    return response
}

export const detail = async (productID) => {
    const response = await instance({
        url: `/products/${productID}`,
        method: "GET"
    })

    return response
}

export const addProduct = async (data) => {
    const response = await instance({
        url: "products/add",
        method: "POST",
        data: JSON.stringify(data)
    })

    return response
}

export const editProduct = async (data, productID) => {
    const response = await instance({
        url: `products/${productID}`,
        method: "PUT",
        data: JSON.stringify(data)
    })

    return response
}

export const delProduct = async (productID) => {
    const response = await instance({
        url: `products/${productID}`,
        method: "DELETE"
    })

    return response
}
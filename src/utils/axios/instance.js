import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://fakestoreapi.com',
    // baseURL: 'https://api.escuelajs.co/api/v1',
    // https://dummyjson.com/products?limit=10&skip=10&select=title,price
    baseURL: 'https://dummyjson.com',
});

instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('authToken')
        
        if (token) {
            config.headers['Authorization'] = token
        }

        return config
    }
)

export default instance;
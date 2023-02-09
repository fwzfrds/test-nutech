import instance from '../utils/axios/instance'

export const login = async (data) => {
    const response = await instance({
        url: "/auth/login",
        method: "POST",
        data: data,
        headers: { 'Content-Type': 'application/json' },
    })

    return response
}
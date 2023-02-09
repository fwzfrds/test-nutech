import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/login/Login'
import Main from '../pages/main/Main'
import Detail from '../pages/product/detail/Detail'
import Auth from '../utils/auth/isAuth'
import IsLogin from '../utils/auth/isLogin'

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Auth>
                            <Main />
                        </Auth>
                    }
                />
                <Route
                    path="/product/detail/:id"
                    element={
                        <Auth>
                            <Detail />
                        </Auth>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <IsLogin>
                            <Login />
                        </IsLogin>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers
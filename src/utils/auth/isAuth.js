import React from 'react'
import { Navigate } from 'react-router-dom'
import swal from 'sweetalert'

const Auth = ({children}) => {
  const isAuth = localStorage.getItem('authToken')
  if (!isAuth){
    swal({
        title: "Warning",
        text: `Access Denied, Please Login!`,
        icon: "error",
    });  
    return (
      <Navigate to="/login" replace />
    )
  }
  return children
}

export default Auth
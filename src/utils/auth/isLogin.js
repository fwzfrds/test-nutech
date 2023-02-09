import React from 'react'
import { Navigate } from 'react-router-dom'
import swal from 'sweetalert'

const IsLogin = ({children}) => {
  const isAuth = localStorage.getItem('authToken')
  if (isAuth){
    swal({
        title: "Warning",
        text: `You're have already logged in!`,
        icon: "error",
    });
     
    return (
      <Navigate to={-1} replace />
    )
  }
  return children
}

export default IsLogin
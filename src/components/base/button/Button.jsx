import React from 'react'
import MuiButton from '@mui/material/Button'

const Button = ({ style, onClick, children, className, form, type, key, htmlFor, variant, color, size, disabled }) => {

  return (
    <MuiButton
      style={style}
      onClick={onClick}
      className={className}
      form={form}
      type={type}
      key={key}
      htmlFor={htmlFor}
      variant={variant ? variant : 'contained'}
      color={color ? color : 'primary'}
      size={size ? size : 'medium'}
      disabled={disabled ? true : false}
    >
      {children}
    </MuiButton>
  )
}

export default Button
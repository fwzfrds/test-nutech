import React from 'react'
import ErrorMessage from '../errorMessage/ErrorMessage'
import { NumericFormat } from 'react-number-format'
import TextField from '@mui/material/TextField';
import styles from './input.module.css'

const Input = ({
    className, children, name, id, label, placeholder, type, style, value, defaultValue, width, height, errorMsg, onChange
}) => {
    return (
        <div
            className={`${styles.input} ${className}`}
            style={{
                width: width ? width : 350,
            }}
        >
            <label
                className={`${styles.label}`}
                htmlFor={id}
            >
                {label}
            </label>
            {type && type === 'price' ?
                <NumericFormat
                    className={`${styles.priceInput}`}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder ? placeholder : 'Ex: Rp. 150.000'}
                    prefix="$ "
                    allowLeadingZeros
                    thousandSeparator="."
                    decimalSeparator=","
                    style={{
                        height: height ? height : 56,
                    }}
                    onChange={onChange}
                />
                :
                <TextField
                    variant="outlined"
                    type={type}
                    id={id}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                    style={style}
                    className={className}
                    defaultValue={defaultValue}
                >
                    {children}
                </TextField>
            }
            {errorMsg &&
                <ErrorMessage
                    text={errorMsg}
                />
            }
        </div>
    )
}

export default Input
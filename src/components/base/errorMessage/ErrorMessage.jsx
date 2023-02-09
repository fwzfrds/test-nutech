import React from 'react'
import styles from './errorMessage.module.css'

const ErrorMessage = ({ text }) => {
    return (
        <p
            className={`${styles.errorMessage}`}
        >
            {text}
        </p>
    )
}

export default ErrorMessage
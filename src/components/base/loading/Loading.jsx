import React from 'react'
import CircularProgress from '@mui/material/CircularProgress/index';
import styles from './loading.module.css'

const Loading = () => {
    return (
        <div
            className={`${styles.loading}`}
        >
            <CircularProgress />
        </div>
    )
}

export default Loading
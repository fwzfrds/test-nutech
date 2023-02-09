import React from 'react'
import styles from './image.module.css'

const Image = ({ alt, src, width, height }) => {
    return (
        <div
            style={{
                position: 'relative',
                width: width ? width : 350,
                height: height ? height : 300,
            }}
        >
            <img
                className={`${styles.img}`}
                alt={alt}
                src={src}
            />
        </div>
    )
}

export default Image
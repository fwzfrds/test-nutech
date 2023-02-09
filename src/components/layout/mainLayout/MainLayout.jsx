import React from 'react'
import Navbar from '../../module/navbar/Navbar'
import styles from './mainLayout.module.css'

const MainLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div
                className={`${styles.container}`}
            >
                {children}
            </div>
        </>
    )
}

export default MainLayout
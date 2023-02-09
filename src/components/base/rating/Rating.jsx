import React from 'react'
import Ratings from '@mui/material/Rating';

const Rating = ({ value }) => {
    return (
        <Ratings
            name="read-only"
            value={value}
            readOnly
        />
    )
}

export default Rating
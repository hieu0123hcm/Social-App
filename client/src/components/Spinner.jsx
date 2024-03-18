import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Spinner = () => {
    return (
        <Box
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            }}
        >
            <CircularProgress />
        </Box>
    )
}

export default Spinner

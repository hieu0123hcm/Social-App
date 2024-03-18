import { Box, Stack, useTheme } from '@mui/material'
import React from 'react'
import Feed from './Feed'
import StatusPoster from './StatusPoster'

const Main = () => {
    const theme = useTheme()
    return (
        <Box
            mt={'25px'}
            minHeight={'100vh'}
            sx={{
                [theme.breakpoints.between('xs', 'sm')]: {
                    ml: '0px',
                },
                [theme.breakpoints.up('sm')]: {
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    left: '0',
                    right: '0',
                    maxWidth: '600px',
                },
            }}
            display={'flex'}
        >
            <Stack direction={'column'}>
                <StatusPoster />
                <Feed />
            </Stack>
        </Box>
    )
}

export default Main

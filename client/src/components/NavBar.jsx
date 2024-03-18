import SocialDistanceIcon from '@mui/icons-material/SocialDistance'
import { AppBar, Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { COLORS } from '../constants/colors'
import ProfileWidget from './ProfileWidget'

const NavBar = () => {
    const user = useSelector((state) => state.auth.user)

    return (
        <AppBar
            position="sticky"
            sx={{
                height: '64px',
                backgroundColor: '#ffffff',
                color: 'black',
                justifyContent: 'center',
                padding: '25px',
            }}
            elevation={1}
        >
            <Stack
                flexDirection={'row'}
                sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    onClick={() => (window.location.href = '/home')}
                    sx={{ cursor: 'pointer' }}
                >
                    <Stack flexDirection={'row'} alignItems={'center'}>
                        <SocialDistanceIcon
                            fontSize="large"
                            sx={{ color: COLORS.contrast, marginRight: '10px' }}
                        />
                        <Typography>Our</Typography>
                        <Typography color={COLORS.contrast} fontWeight={'bold'}>
                            Society
                        </Typography>
                    </Stack>
                </Box>

                {user && <ProfileWidget />}
            </Stack>
        </AppBar>
    )
}

export default NavBar

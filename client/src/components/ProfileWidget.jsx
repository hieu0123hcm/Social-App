import LogoutIcon from '@mui/icons-material/Logout'
import { Divider, IconButton, Stack, Typography, useTheme } from '@mui/material'
import Cookies from 'js-cookie'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../data/loginSlice'

const ProfileWidget = () => {
    const user = useSelector((state) => state.auth.user)
    const theme = useTheme()
    const dispatch = useDispatch()
    return (
        <Stack flexDirection={'row'}>
            <Divider
                orientation="vertical"
                flexItem
                sx={{ marginRight: '10px' }}
            />
            <Typography
                fontSize={'14px'}
                sx={{
                    [theme.breakpoints.between('xs', 'sm')]: {
                        display: 'none',
                    },
                }}
            >
                Welcome,{' '}
                <Typography fontWeight={'bold'}>{user?.lastName}</Typography>
            </Typography>
            <IconButton
                size="large"
                sx={{ marginLeft: '10px' }}
                onClick={() => {
                    Cookies.remove('token')
                    Cookies.remove('user')
                    dispatch(setLogout())
                }}
            >
                <LogoutIcon fontSize="small" />
            </IconButton>
        </Stack>
    )
}

export default ProfileWidget

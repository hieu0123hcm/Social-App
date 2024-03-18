import { Box, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProfileFeed from './ProfileFeed'
import UserInfo from './UserInfo'

const Profile = () => {
    const { id: userId } = useParams()
    const theme = useTheme()
    const token = useSelector((state) => state.auth.token)
    const [spinner, setSpinner] = useState(false)

    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async (userId) => {
            setSpinner(true)
            await fetch(`http://localhost:5000/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUser(data)
                })
                .finally(() => {
                    setSpinner(false)
                })
        }

        getUser(userId)
    }, [userId])

    return (
        <Box
            mt={'25px'}
            height={'auto'}
            minHeight={'100vh'}
            justifyContent={'center'}
            sx={{
                borderRadius: '0.75rem',
                [theme.breakpoints.between('xs', 'sm')]: {},
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
            <Stack
                className="Main Layout"
                direction={'column'}
                alignItems={'start'}
            >
                {user ? <UserInfo user={user} /> : null}
                {user ? <ProfileFeed userId={user._id} /> : null}
            </Stack>
        </Box>
    )
}

export default Profile

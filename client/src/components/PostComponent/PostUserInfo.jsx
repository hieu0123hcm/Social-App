import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { COLORS } from '../../constants/colors'
import { useNavigate } from 'react-router-dom'

const PostUserInfo = ({ name, location, createdAt, postUserID }) => {
    const navigate = useNavigate()
    const theme = useTheme()

    const handleClick = () => {
        navigate('/profile/' + postUserID)
    }

    return (
        <Box>
            <Stack
                sx={{
                    [theme.breakpoints.up('sm')]: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '5px',
                    },
                }}
            >
                <Box sx={{ cursor: 'pointer' }} onClick={handleClick}>
                    <Typography
                        color={'black'}
                        fontSize={'11px'}
                        fontWeight={'600'}
                    >
                        {name}
                    </Typography>
                </Box>
                <Typography fontSize={'11px'}>is at</Typography>
                <Typography
                    fontWeight={'400'}
                    fontSize={'11px'}
                    color={COLORS.contrast}
                    sx={{ marginRight: '10px' }}
                >
                    {location}
                </Typography>
            </Stack>
            <Tooltip title={createdAt.toDateString().toString()}>
                <Typography fontSize={'11px'} fontWeight={'300'} color={'grey'}>
                    {moment(createdAt).fromNow()}
                </Typography>
            </Tooltip>
        </Box>
    )
}

export default PostUserInfo

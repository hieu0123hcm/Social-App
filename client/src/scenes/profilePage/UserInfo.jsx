import { Email, LocationCity, Work } from '@mui/icons-material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Avatar, Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import CustomDivider from '../../components/CustomDivider'
import IconText from '../../components/IconText'

const UserInfo = ({ user }) => {
    return (
        <Paper
            sx={{
                borderRadius: '0.75rem',
                width: '100%',
                paddingY: '15px',
                boxSizing: 'border-box',
                mb: '10px',
            }}
        >
            <Stack flexDirection={'column'} gap={'15px'}>
                <Stack alignItems={'center'} gap={'15px'}>
                    <Avatar
                        alt="User Avatar"
                        sx={{ width: 100, height: 100 }}
                        src={`http://localhost:5000/assets/${user.picturePath}`}
                    />
                    <Typography fontSize={'18px'} fontWeight={'400'}>
                        {`${user.firstName} ${user.lastName} `}
                    </Typography>
                    <Button
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '5px',
                        }}
                    >
                        <PersonAddAltIcon />
                        <Typography fontSize={'15px'}>Follow</Typography>
                    </Button>
                </Stack>

                <Stack direction={'row'} justifyContent={'center'} gap={'10px'}>
                    <Typography fontSize={'12px'}>2 Following</Typography>
                    <Typography fontSize={'12px'}>2 Follower</Typography>
                </Stack>
                <CustomDivider LeadingText={'About'} />
                <Stack sx={{ left: 'auto', paddingX: '20px', gap: '7px' }}>
                    <IconText
                        ICON={<LocationCity fontSize="12px" />}
                        text={user.location}
                    />
                    <IconText
                        ICON={<Email fontSize="12px" />}
                        text={user.email}
                    />
                    <IconText
                        ICON={<Work fontSize="12px" />}
                        text={user.occupation}
                    />
                </Stack>
            </Stack>
        </Paper>
    )
}

export default UserInfo

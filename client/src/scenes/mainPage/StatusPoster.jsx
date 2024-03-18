import { Box, Button, Modal, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomAvatar from '../../components/CustomAvatar'
import { COLORS } from '../../constants/colors'
import CreatePost from './CreatePost'
const StatusPoster = () => {
    const user = useSelector((state) => state.auth.user)

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: '0.75rem',
                padding: '10px',
                justifyContent: 'center',
                alignItems: 'start',
                display: 'flex',
            }}
        >
            <Stack flexDirection={'column'} sx={{ width: '95%' }}>
                <Stack flexDirection={'row'}>
                    <CustomAvatar
                        userId={user._id}
                        picturePath={user.picturePath}
                    />
                    <Button
                        onClick={handleOpen}
                        size="small"
                        variant="filled"
                        sx={{
                            flex: '2',
                            ml: '5px',
                            borderRadius: '20px',
                            justifyContent: 'start',
                        }}
                    >
                        <Typography
                            textTransform={'none'}
                            color={'#C6CDD4'}
                            fontSize={'14px'}
                            fontWeight={'100'}
                        >
                            What's new?
                        </Typography>
                    </Button>
                </Stack>

                <Modal open={open} onClose={handleClose}>
                    <Box
                        position={'fixed'}
                        top={'50%'}
                        left={'50%'}
                        sx={{
                            borderRadius: '0.4rem',
                            transform: 'translate(-50%,-50%)',
                            boxShadow: 24,
                            background: COLORS.second,
                            p: '15px',
                        }}
                    >
                        <CreatePost handleClose={handleClose} />
                    </Box>
                </Modal>
            </Stack>
        </Paper>
    )
}

export default StatusPoster

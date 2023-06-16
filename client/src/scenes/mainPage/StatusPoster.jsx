import { Avatar, Box, Button, Modal, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import CreatePost from './CreatePost';
import { COLORS } from '../../constants/colors';
const StatusPoster = () => {
  const user = useSelector((state) => state.auth.user) 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper elevation={0} 
        sx={{
            borderRadius:'0.4rem',
            width: '30vw',  
            padding:'10px', 
            justifyContent:'center', 
            alignItems:'start', 
            display:'flex', 
            marginBottom: '20px'}}>
        <Stack flexDirection={'column'} sx={{width:'95%'}}>
        <Stack flexDirection={'row'}>
        <Avatar alt="User Avatar" 
        src={`http://localhost:5000/assets/${user.picturePath}`} />
        <Button onClick={handleOpen} size="small" variant="filled" 
        sx={{
            flex:'2',
            ml:'5px',
            borderRadius: '20px',
            justifyContent:'start'}}>
            <Typography textTransform={'none'} color={'#C6CDD4'} fontSize={'14px'} fontWeight={'100'}>
                 What's new?
            </Typography>
            
        </Button>
        </Stack>

        <Modal
            open={open}
            onClose={handleClose}
            >
            <Box position={'fixed'} top={'50%'} left={'50%'}
                sx={{
                    borderRadius:'0.4rem',
                    transform:'translate(-50%,-50%)',
                    boxShadow: 24,
                    background: COLORS.second,
                    p: '15px',
                }}
            >
                <CreatePost handleClose={handleClose}/>
            </Box>
            </Modal>

        </Stack>
    </Paper>
  )
}

export default StatusPoster
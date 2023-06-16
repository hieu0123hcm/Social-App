import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { setLogout } from '../data/loginSlice';
import { Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';


const ProfileWidget = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <Stack flexDirection={'row'}>
        <IconButton size='large'  sx={{marginRight:'10px'}}
            onClick={()=> {}}
        >
            <ChatIcon fontSize='small'/>
        </IconButton>
        <IconButton size='large'  sx={{marginRight:'10px'}}
            onClick={()=> {}}
        >
            <NotificationsIcon fontSize='small'/>
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{marginRight:'10px'}}/>
        <Typography fontSize={'14px'}>Welcome, <Typography fontWeight={'bold'}>{user?.lastName}</Typography></Typography>
        <IconButton size='large'  sx={{marginLeft:'10px'}}
            onClick={()=> dispatch(setLogout())}
        >
            <LogoutIcon fontSize='small'/>
        </IconButton>
    </Stack>
  )
}

export default ProfileWidget
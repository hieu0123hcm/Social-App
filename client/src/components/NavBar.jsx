import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import { AppBar, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ProfileWidget from './ProfileWidget';
import { COLORS } from '../constants/colors';


const NavBar = () => {
  const token = useSelector((state) => state.auth.token)
  return <AppBar
            position='sticky'
            
            sx={{
              height:'64px', 
              backgroundColor:'#ffffff', 
              color:'black',
              justifyContent: 'center',
              padding: '25px',

            }}
            elevation={1}
          >
          <Stack flexDirection={'row'}
            sx={{
              alignItems:'center',
              justifyContent:'space-between', 
            }}  
          >
            <Stack flexDirection={'row'} alignItems={'center'}>
            <SocialDistanceIcon fontSize='large'  sx={{color: COLORS.contrast,marginRight:'10px'}} />
            <Typography>Our</Typography>
            <Typography color={COLORS.contrast} fontWeight={'bold'}>Society</Typography>
            </Stack>
            
            {token && <ProfileWidget/>}
          </Stack>
  </AppBar>
}

export default NavBar
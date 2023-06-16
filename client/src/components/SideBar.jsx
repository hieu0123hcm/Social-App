import { Box, Stack } from '@mui/material'
import React from 'react'

import * as viewConstant from '../constants/viewConstants';
import SideBarButton from './SideBarButton';



const SideBar = () => {
  return (
   <Box
   sx={{
    position:'fixed',
    pt:'25px',
    width:'20vw',
    height: 'calc(100vh - 64px)',
    maxWidth:'250px' ,  
    backgroundColor:'#344151'
   }}>
       <Stack>
        <SideBarButton view={viewConstant.FEED}/>
        <SideBarButton view={viewConstant.PROFILE}/>
        <SideBarButton view={viewConstant.FRIEND}/>   
       </Stack>
   </Box>
  )
}

export default SideBar
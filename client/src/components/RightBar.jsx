import { Box } from '@mui/material'
import React from 'react'
import FriendsZone from './friendsList/FriendsZone'
import AdvertisementZone from './advertisement/AdvertisementZone'



const RightBar = () => {
  return (
    
    <Box sx={{position:'fixed',maxWidth:'250px', right:'2vw',width:'13vw', paddingTop:'25px'}} >
       
      <AdvertisementZone/>
      <FriendsZone/>
    </Box>
  )
}

export default RightBar
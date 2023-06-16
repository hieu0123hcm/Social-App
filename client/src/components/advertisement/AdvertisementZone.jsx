import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import Advertisement from './Advertisement'

const AdvertisementZone = () => {
    return (
        <Box height={'auto'} mb={'10px'} py={'10px'} sx={{ backgroundColor: '#FFF', borderRadius:'0.4rem'}}>
          
          <Typography ml={'15px'} fontWeight={'500'}>Advertising</Typography>
          <Divider sx={{marginY:'10px'}}/>
          <Advertisement title={'Join Pro today for 50% off'} website={'codecademy.com'} img={'https://mma.prnewswire.com/media/1659499/Codecademy_Logo.jpg?p=facebook'}/>
         
        </Box>
      )
    
}

export default AdvertisementZone
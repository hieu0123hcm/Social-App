import { Box, Stack } from '@mui/material'
import React from 'react'
import PostsFeed from './PostsFeed'
import StatusPoster from './StatusPoster'

const Main = () => {
  return (
    <Box 
      mt={'25px'}
      // paddingX={'25px'} 
      height={'auto'}
      minHeight={'100vh'} 
      justifyContent={'center'}
      sx={{ borderRadius:'0.75rem'
      }}
      display={'flex'}

    >
      <Stack direction={'row'}>
        <Stack direction={'column'} >
          <StatusPoster/>
          <PostsFeed/>
        </Stack>
       
      </Stack>
    </Box>
  )
}

export default Main
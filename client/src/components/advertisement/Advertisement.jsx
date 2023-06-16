import { Box, Card, CardMedia, Typography } from '@mui/material'
import React from 'react'

const Advertisement = ({img, title,website}) => {
  return (
    <Card sx={{
      marginX:'10px',
      width:'auto',
      height:'100%', 
      display:'flex',
      flexDirection:'column',
      marginBottom:'10px',
    }} elevation={0}>
        <CardMedia 
        component="img"
        sx={{flex:'1',  objectFit: 'fill'}}
        image={img}
        alt="Live from space album cover"
        title="CardMedia Image Example"
        /> 
          <Box 
          width={'inherit'}  
          display={'flex'} 
          sx={{justifyContent:'center', marginLeft:'10px'}}
          flexDirection={'column'}>
          <Typography noWrap >
            {title}
          </Typography>
          <Typography color="text.secondary" >
            {website}
          </Typography>
          </Box>
    </Card>
  )
}

export default Advertisement
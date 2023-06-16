
import { Box } from '@mui/material';
import React from 'react';
import Form from './Form';

const LoginPage = () => {
  return (
    <Box display={'flex'} minHeight={'calc(100vh - 64px)'} alignItems={'center'}
      justifyContent={'center'}
    >
        <Form />
    </Box>
  )
}

export default LoginPage
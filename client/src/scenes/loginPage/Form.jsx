import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import {  setLogin} from '../../data/loginSlice';
import { Formik } from "formik";
import { Box, Button, Stack, TextField, Typography } from '@mui/material';


const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required('required'),
    password: yup.string().required('required')
  })

  const initialValuesLogin = {
    email: "",
    password: ""
  }

const Form = () => {

  const dispatch = useDispatch();   
  const navigate = useNavigate();
  const [error, setError] = useState('')

  const loginFormSubmit = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if(loggedIn) {
        console.log(loggedIn);
        if(loggedIn.msg === "Invalid credentials. " || loggedIn.msg === "User does not exist. "){
          setError(loggedIn.msg);
          navigate('/');
        }else{
          dispatch(
            setLogin({
                user: loggedIn.user,
                token: loggedIn.token
            })
        )
        setError('');
        navigate("/home");
        }
    }
  }

  return (
    <Formik
        onSubmit={loginFormSubmit}
        initialValues={initialValuesLogin}
        validationSchema={loginSchema}
    >
        {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,}) => (
            <form onSubmit={handleSubmit}>
                <Box width={'50vh'} maxWidth={'300px'} padding={'30px'}>
                  <Stack>
                      {error && <Typography color={'red'}>{error}</Typography> }
                      <TextField
                          id="filled-error"
                          label="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          helperText={touched.email && errors.email}
                          sx={{ marginY:'15px' }}
                      />
                      <TextField
                          id="filled-error"
                          label="Password"
                          type="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          name="password"
                          helperText={touched.password && errors.password}
                          sx={{ marginY:'15px' }}
                      />
                  </Stack>
                  <Box>
                      <Button
                      fullWidth
                      type="submit"
                      
                      >
                      LOGIN
                      </Button>
                  </Box>
                </Box>
            </form>
        )
        }
    </Formik>
  )
}

export default Form
import { Box, ThemeProvider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import LoginPage from './scenes/loginPage/LoginPage'
import Main from './scenes/mainPage/Main'
import { themeSettings } from './theme'

import Cookies from 'js-cookie'
import React from 'react'
import { setLogin } from './data/loginSlice'
import Profile from './scenes/profilePage/Profile'
import ScrollToTop from './utils/scrollToTop'

const App = () => {
    const tokenFromCookies = Cookies.get('token')
    const userFromCookies = Cookies.get('user')
        ? JSON.parse(Cookies.get('user'))
        : null
    const dispatch = useDispatch()

    if (tokenFromCookies) {
        dispatch(setLogin({ token: tokenFromCookies, user: userFromCookies }))
    }

    const isAuth = Boolean(useSelector((state) => state.auth.token))

    return (
        <ThemeProvider theme={themeSettings}>
            <BrowserRouter>
                <ScrollToTop />
                <Box sx={{ backgroundColor: '#f6f8fa' }}>
                    <NavBar />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isAuth ? <Navigate to="/home" /> : <LoginPage />
                            }
                        />
                        <Route
                            path="/profile/:id"
                            element={isAuth ? <Profile /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/home"
                            element={isAuth ? <Main /> : <Navigate to="/" />}
                        />
                    </Routes>
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App

import { Box, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import RightBar from "./components/RightBar";
import SideBar from "./components/SideBar";
import * as viewConstant from "./constants/viewConstants";
import { selectCurrentView } from "./data/currentViewSlice";
import LoginPage from "./scenes/loginPage/LoginPage";
import Main from "./scenes/mainPage/Main";
import { themeSettings } from "./theme";
import Profile from "./scenes/profilePage/Profile";
import Friend from "./scenes/friendPage/Friend";
import { useState } from "react";

const App = () => {
  const currentView = useSelector(selectCurrentView);

  const isAuth = Boolean(useSelector((state) => state.auth.token));
  function ShowCurrentView(view) {
    if (view === viewConstant.FEED) {
      return <Main />;
    } else if (view === viewConstant.PROFILE) {
      return <Profile />;
    } else if (view === viewConstant.FRIEND) {
      return <Friend />;
    }
  }

  return (
    <ThemeProvider theme={themeSettings}>
      <BrowserRouter>
        <Box sx={{ backgroundColor: "#f6f8fa" }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                isAuth ? (
                  <>
                    <SideBar />
                    <RightBar />
                    {ShowCurrentView(currentView)}
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

import { Box, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { themeSettings } from "./utils/theme";

import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import Cookies from "js-cookie";
import NavBar from "./components/CustomUI/NavBar";
import { setLogin } from "./data/loginSlice";
import LoginPage from "./pages/loginPage";
import Main from "./pages/mainPage/Main";
import Profile from "./pages/profilePage";
import ScrollToTop from "./utils/scrollToTop";

const App = () => {
  const tokenFromCookies = Cookies.get("token");
  const userFromCookies = Cookies.get("user")
    ? JSON.parse(Cookies.get("user") || "")
    : null;
  const dispatch = useDispatch();

  if (tokenFromCookies) {
    dispatch(setLogin({ token: tokenFromCookies, user: userFromCookies }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isAuth = Boolean(useSelector((state: any) => state.auth.token));

  return (
    <ThemeProvider theme={themeSettings}>
      <BrowserRouter>
        <ScrollToTop />

        <Box>
          <NavBar />
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <Routes>
              <Route
                path="/"
                element={isAuth ? <Navigate to="/home" /> : <LoginPage />}
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
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

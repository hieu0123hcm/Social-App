import { createTheme } from "@mui/material";

export const themeSettings = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    primary: {
      light: "#cbf695",
      main: "#bff47b",
      dark: "#85aa56",
      contrastText: "#010101",
    },
    secondary: {
      light: "#f3f4ef",
      main: "#f1f2ec",
      dark: "#a8a9a5",
      contrastText: "#010101",
    },
    error: {
      light: "#f29194",
      main: "#EF767A",
      dark: "#a75255",
      contrastText: "#456990",
    },
    background: {
      default: "#fff",
    },
  },
});

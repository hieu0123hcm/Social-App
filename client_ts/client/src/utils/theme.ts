import { createTheme } from "@mui/material";

export const themeSettings = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    primary: {
      light: "#85d391",
      main: "#67c976",
      dark: "#488c52",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

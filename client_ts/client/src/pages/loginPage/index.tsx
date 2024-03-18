import {
  Box,
  Card,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";

const LoginPage = () => {
  const [haveAccount, setHaveAccount] = useState<boolean>(true);

  const handleSwitchChange = () => {
    setHaveAccount(!haveAccount);
  };

  return (
    <Box
      display={"flex"}
      minHeight={"calc(100vh - 64px)"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Card
        sx={{
          bgcolor: "white",
          width: "90%",
          maxWidth: "400px",
          height: "auto",
          minHeight: "200px",
          display: "flex",
          p: 6,
        }}
      >
        <Stack gap={"20px"} width={"100%"}>
          <FormControlLabel
            control={
              <Switch checked={haveAccount} onChange={handleSwitchChange} />
            }
            label="Having an account?"
          />
          {haveAccount ? (
            <>
              <Typography variant={"h3"} fontWeight={"bold"}>
                Sign In
              </Typography>
              <LoginForm />
            </>
          ) : (
            <>
              <Typography variant={"h3"} fontWeight={"bold"}>
                Sign Up
              </Typography>
              <SignupForm />
            </>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default LoginPage;

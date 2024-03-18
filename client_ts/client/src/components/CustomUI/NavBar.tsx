/* eslint-disable @typescript-eslint/no-explicit-any */
import SocialDistanceIcon from "@mui/icons-material/PeopleAltOutlined";

import { AppBar, Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { COLORS } from "../../constants/Constant";
import ProfileWidget from "./ProfileWidget";

const NavBar = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <AppBar
      position="sticky"
      sx={{
        height: "60px",
        backgroundColor: COLORS.purewhite,
        color: "black",
        justifyContent: "center",
        borderBottom: `1px solid ${COLORS.lightgrey}`,
        padding: "25px",
        mb: "25px",
      }}
      elevation={0}
    >
      <Stack
        flexDirection={"row"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          onClick={() => (window.location.href = "/home")}
          sx={{ cursor: "pointer" }}
        >
          <Stack flexDirection={"row"} alignItems={"center"}>
            <SocialDistanceIcon
              fontSize="large"
              sx={{ color: COLORS.black, marginRight: "10px" }}
            />
            <Typography color={COLORS.black} fontWeight={600}>
              Our
            </Typography>
            <Typography color={COLORS.black} fontWeight={600}>
              Society
            </Typography>
          </Stack>
        </Box>

        {user && <ProfileWidget />}
      </Stack>
    </AppBar>
  );
};

export default NavBar;

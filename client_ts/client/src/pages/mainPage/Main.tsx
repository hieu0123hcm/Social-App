import { Box, Stack, useTheme } from "@mui/material";
import Feed from "../../components/Feed";
import StatusPoster from "./PostCreateButton";

const Main = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        [theme.breakpoints.between("xs", "sm")]: {
          ml: "0px",
          width: "100%",
        },
        [theme.breakpoints.up("sm")]: {
          marginLeft: "auto",
          marginRight: "auto",
          left: "0",
          right: "0",
          maxWidth: "470px",
        },
      }}
      display={"flex"}
    >
      <Stack direction={"column"} width={"100%"}>
        <Feed />
      </Stack>
      {/* <UserList /> */}
      <StatusPoster />
    </Box>
  );
};

export default Main;

import LogoutIcon from "@mui/icons-material/Logout";
import {
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Cookies from "js-cookie";
import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hook/useReduxHooks";
import { setLogout } from "../../data/loginSlice";
import NameLink from "./NameLink";
import { COLORS } from "../../constants/Constant";

const ProfileWidget = () => {
  const user = useAppSelector((state) => state.auth.user);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  return (
    <Stack flexDirection={"row"}>
      <Divider orientation="vertical" flexItem sx={{ marginRight: "10px" }} />
      <Typography
        fontSize={"14px"}
        sx={{
          [theme.breakpoints.between("xs", "sm")]: {
            display: "none",
          },
        }}
      >
        Welcome,
        {user && <NameLink userId={user?._id} name={`${user.username}`} />}
      </Typography>
      <IconButton
        size="large"
        sx={{
          "&:hover": {
            color: COLORS.lime,
            bgcolor: COLORS.purewhite,
          },
          marginLeft: "10px",
        }}
        onClick={() => {
          Cookies.remove("token");
          Cookies.remove("user");
          dispatch(setLogout());
        }}
      >
        <LogoutIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default ProfileWidget;

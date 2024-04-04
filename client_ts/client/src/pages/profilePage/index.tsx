import { Stack, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import ProfileFeed from "./ProfileFeed";

const Profile = () => {
  const { id: userId } = useParams();
  const theme = useTheme();

  // const [spinner, setSpinner] = useState(false);
  // console.log(spinner);
  return (
    <Stack
      sx={{
        width: "70%",
        [theme.breakpoints.between("xs", "sm")]: {
          ml: "0px",
          direction: "column",
        },
        [theme.breakpoints.up("sm")]: {
          marginLeft: "20px",
          marginRight: "20px",
          left: "0",
          right: "0",
          direction: "row",
          maxWidth: "930px",
        },
      }}
    >
      {userId ? <UserInfo userId={userId} /> : null}
      <Stack>{userId ? <ProfileFeed userId={userId} /> : null}</Stack>
    </Stack>
  );
};

export default Profile;

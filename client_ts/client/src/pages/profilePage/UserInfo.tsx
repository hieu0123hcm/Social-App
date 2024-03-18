import { Check } from "@mui/icons-material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CustomButton } from "../../components/CustomUI/CustomButton";
import Spinner from "../../components/CustomUI/Spinner";
import { COLORS } from "../../constants/Constant";
import { useAppSelector } from "../../custom-hook/useReduxHooks";
import { User } from "../../model/user.model";
import { AxiosError } from "axios";
import Error from "../../components/CustomUI/Error";
import fetchData from "../../utils/fetchData";
import Cookies from "js-cookie";

interface UserInfoProps {
  userId: string;
}

const UserInfo = ({ userId }: UserInfoProps) => {
  const token = Cookies.get("token") || undefined;
  const currentUser = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [followButtonState, setFollowButtonState] = useState(false);
  const [followed, setFollowed] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User>();
  const URL = `http://localhost:5000/users/${userId}`;
  const currentUserID = useAppSelector((state) => state.auth.user?._id);
  const theme = useTheme();

  const handleFollowClick = async () => {
    //TODO: separate the components into different files  & use Axios
    setFollowButtonState(true);
    await fetch(`http://localhost:5000/users/${currentUser?._id}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data.followUser);
        if (data.data.followUser.followers.includes(currentUser?._id)) {
          setFollowed(true);
        } else {
          setFollowed(false);
        }
      })
      .finally(() => {
        setFollowButtonState(false);
      });
  };
  useEffect(() => {
    console.log(URL);
    const getUser = async () => {
      //TODO: separate the components into different files  & use Axios
      setLoading(true);
      try {
        const response = await fetchData<User>(URL, token);
        const { data } = response.data;
        console.log(data);
        setUser(data);
        if (data.followers.includes(currentUser?._id as string)) {
          setFollowed(true);
        } else {
          setFollowed(false);
        }
      } catch (error) {
        const formattedError = error as AxiosError;
        console.log(formattedError);
        setError(
          (formattedError.response?.data as string) || "Error getting the data"
        );
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [userId, token, currentUser?._id, URL]);

  return (
    <Box sx={{ px: "20px" }}>
      {error && <Error message={error} />}
      {loading ? (
        <Spinner />
      ) : (
        <Stack direction={"row"} alignItems={"center"}>
          <Stack
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            flex={1}
          >
            <Avatar
              alt="User Avatar"
              sx={{
                [theme.breakpoints.down("sm")]: {
                  width: 77,
                  height: 77,
                },
                width: 150,
                height: 150,
                m: "0 30px 0 0 ",
                border: `1px solid ${COLORS.black}`,
              }}
              src={`http://localhost:5000/post-images/${user?.picturePath}`}
            />
          </Stack>
          <Stack gap={"15px"} flex={3}>
            <Stack direction={"row"} gap={"15px"} alignItems={"center"}>
              <Typography fontSize={"20px"} fontWeight={"400"}>
                {`${user?.username} `}
              </Typography>

              {currentUserID !== user?._id && (
                <CustomButton
                  label={followed ? "Unfollow" : "Follow"}
                  startIcon={followed ? <Check /> : <PersonAddAltIcon />}
                  handleClick={handleFollowClick}
                  disabled={followButtonState}
                />
              )}
            </Stack>

            {/* Follower Section */}
            <Stack direction={"row"} alignItems={"center"} gap={"25px"}>
              <Typography fontSize={"16px"}>
                <span style={{ fontWeight: "600" }}>
                  {user?.followers.length}
                </span>{" "}
                Followers
              </Typography>
              <Typography fontSize={"16px"}>
                <span style={{ fontWeight: "600" }}>
                  {user?.following.length}
                </span>{" "}
                Following
              </Typography>
            </Stack>

            {/* Information Details */}
            <Stack>
              {user?.firstName && user?.lastName && (
                <Typography
                  fontSize={"14px"}
                  fontWeight={"600"}
                  whiteSpace={"pre-wrap"}
                >
                  {user.firstName}
                  {user.lastName}
                </Typography>
              )}
              {user?.bio ? (
                <Typography fontSize={"14px"} whiteSpace={"pre-wrap"}>
                  {user.bio}
                </Typography>
              ) : (
                <Typography fontSize={"14px"} whiteSpace={"pre-wrap"}>
                  No biography yet!
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      )}

      <Divider sx={{ margin: "0 0 20px", padding: "0 0 16px" }} />
    </Box>
  );
};

export default UserInfo;

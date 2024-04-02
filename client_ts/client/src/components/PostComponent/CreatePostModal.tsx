import {
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { COLORS, LABEL } from "../../constants/Constant";
import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hook/useReduxHooks";
import { createPost } from "../../redux/data/postsSlice";
import NameLink from "../CustomUI/NameLink";
import CustomAvatar from "../CustomUI/UserAvatar";
import Dropzone from "../Dropzone/Dropzone";

interface Props {
  handleClose: () => void;
}

const CreatePost: React.FC<Props> = ({ handleClose }) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const [image, setImage] = useState<File[]>([]);
  const [postCaption, setPostCaption] = useState<string>("");
  const [isButtonActive, setIsButtonActive] = useState(true);

  useEffect(() => {
    if (postCaption === "" && !image.length) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [postCaption, image]);

  const resetFields = () => {
    setPostCaption("");
    setImage([]);
    handleClose();
  };

  const handleUploadPost = async () => {
    dispatch(createPost({ user, postCaption, image, token }));
    resetFields();
  };

  return (
    <Stack
      sx={{
        [theme.breakpoints.between("xs", "md")]: { width: "80vw" },
        p: "15px",
      }}
      borderRadius="30px"
      gap={"15px"}
      width={"40vw"}
      bgcolor={theme.palette.background.default}
    >
      <Typography
        fontWeight={600}
        fontSize={"1rem"}
        textAlign={"center"}
        marginBottom={"5px"}
        textTransform={"capitalize"}
      >
        {LABEL.CREATE_POST_LABEL}
      </Typography>

      <Divider />

      <Stack flexDirection={"row"} alignItems={"center"}>
        {user && (
          <Stack gap={"10px"} alignItems={"center"} direction={"row"}>
            <CustomAvatar userId={user._id} picturePath={user.picturePath} />
            <NameLink userId={user._id} name={user.username} />
          </Stack>
        )}
      </Stack>

      <TextField
        placeholder="What's on your mind..."
        onChange={(e) => setPostCaption(e.target.value)}
        value={postCaption}
        multiline
        rows={2}
        maxRows={4}
        sx={{
          width: "100%",
          fontSize: "1rem",
          height: "auto",
          bgcolor: COLORS.purewhite,
        }}
      />

      <Dropzone multipleUpload={true} setImage={setImage} image={image} />

      <Divider sx={{ color: COLORS.purewhite }} />

      <Stack justifyContent={"end"} direction={"row"} gap={"10px"}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleUploadPost}
          disabled={isButtonActive}
        >
          {LABEL.POST_BUTTON_LABEL}
        </Button>
      </Stack>
    </Stack>
  );
};

export default CreatePost;

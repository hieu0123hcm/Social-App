import Add from "@mui/icons-material/Add";
import { Box, IconButton, Modal } from "@mui/material";
import React from "react";
import CreatePost from "../../components/PostComponent/CreatePostModal";
import { COLORS } from "../../constants/Constant";

const PostCreateButton = () => {
  // const user = useAppSelector((state) => state.auth.user);

  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
      }}
    >
      <IconButton sx={{ bgcolor: COLORS.lime }} onClick={handleOpen}>
        <Add sx={{ color: COLORS.black }} />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box
          position={"fixed"}
          top={"50%"}
          left={"50%"}
          sx={{
            borderRadius: "0.4rem",
            transform: "translate(-50%,-50%)",
            boxShadow: 24,
            background: COLORS.white,
          }}
        >
          <CreatePost handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default PostCreateButton;

import Add from "@mui/icons-material/Add";
import { Box, IconButton, Modal, useTheme } from "@mui/material";
import React from "react";
import CreatePost from "../../components/PostComponent/CreatePostModal";
import { COLORS } from "../../constants/Constant";

const PostCreateButton = () => {
  const theme = useTheme();
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
      <IconButton
        color="primary"
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
        onClick={handleOpen}
      >
        <Add />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box
          position={"fixed"}
          top={"50%"}
          left={"50%"}
          sx={{
            borderRadius: "30px",
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

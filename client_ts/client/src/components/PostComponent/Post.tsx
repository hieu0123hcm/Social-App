import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Comment from "../../../src/assets/Icons/Comment.svg";
import Heart from "../../../src/assets/Icons/heart.svg";
import Hearted from "../../../src/assets/Icons/hearted.svg";
import Quote from "../../../src/assets/Icons/“.svg";

import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hook/useReduxHooks";
import { Post } from "../../model/post.model";
import { likePost, removePost } from "../../redux/data/postsSlice";
import DeleteDialog from "../CustomUI/DeleteDialog";
import CustomAvatar from "../CustomUI/UserAvatar";
import CommentWidget from "./CommentComponent/CommentsList";
import PictureList from "./PictureList";
import PostUserInfo from "./PostUserInfo";
import CommentInput from "./CommentComponent/CommentInput";

const PostWidget = (post: Post) => {
  const theme = useTheme();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  const loggedInUserId = user?._id || "";

  const likesCount = useAppSelector((state) => {
    const likes = state.posts.postItems.items.find(
      (p) => p._id === post._id
    )?.likes;
    return Object.values(likes || {}).filter((hasLiked) => hasLiked).length;
  });
  const isLiked = Boolean(post.likes[loggedInUserId]);

  const [open, setOpen] = React.useState(false);
  const [showComment, setShowComment] = useState(false);

  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  const patchLike = async () => {
    dispatch(likePost({ postId: post._id, userId: loggedInUserId, token }));
  };

  const deletePost = async () => {
    dispatch(removePost({ postId: post._id, userId: loggedInUserId, token }));
    handleClose();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "#fff",
        border: "1px solid #F0F6FD",
        padding: "15px",
        borderRadius: "30px",
        marginBottom: "25px",
      }}
    >
      <DeleteDialog
        deletePost={deletePost}
        handleClose={handleClose}
        open={open}
      />
      <Stack flexDirection={"column"} width={"100%"}>
        {/* Post Profile Section */}
        <section>
          <Stack
            flexDirection={"row"}
            gap={"10px"}
            alignItems={"center"}
            sx={{
              [theme.breakpoints.up("md")]: { padding: "0 0 12px 4px" },
              [theme.breakpoints.down("md")]: { padding: "14px 16px" },
            }}
          >
            <CustomAvatar
              userId={post.userId}
              picturePath={post.userPicturePath}
            />
            <PostUserInfo
              name={`${post.firstName} ${post.lastName}`}
              createdAt={post.createdAt}
              postUserID={post.userId}
            />
            {post.userId === loggedInUserId && (
              <IconButton
                sx={{
                  marginLeft: "auto",
                  color: theme.palette.primary.dark,
                }}
                onClick={handleClickOpen}
              >
                <ClearIcon />
              </IconButton>
            )}
          </Stack>
        </section>

        {/* Picture Section */}
        <section>
          {post.picturePath.length !== 0 && (
            <PictureList picturePath={post.picturePath} />
          )}
        </section>

        {/* Post Content */}
        <section>
          <Box
            id="post-content"
            sx={{
              [theme.breakpoints.up("sm")]: { padding: "0px" },
              [theme.breakpoints.down("sm")]: { padding: "0px 16px" },
            }}
          >
            {/* Like & Comment Icon */}
            <Stack flexDirection={"row"}>
              <IconButton onClick={patchLike}>
                {isLiked ? <img src={Hearted} /> : <img src={Heart} />}
              </IconButton>
              <IconButton onClick={handleShowComment}>
                <img src={Comment} />
              </IconButton>
            </Stack>

            {/* Like Count */}
            <Typography color={"black"} fontSize={"14px"} fontWeight={"550"}>
              {likesCount}{" "}
              {likesCount === 1 || likesCount === 0 ? "Like" : "Likes"}
            </Typography>

            {/* Post Caption */}
            {post.caption && <Caption caption={post.caption} />}

            {/* Comment Section */}
            <CommentInput postId={post._id} setShowComment={setShowComment} />
            {showComment && <CommentWidget postId={post._id} />}
          </Box>
        </section>
      </Stack>
    </Paper>
  );
};

const Caption = ({ caption }: { caption: string }) => {
  return (
    <Stack direction={"row"} gap={"5px"}>
      <img src={Quote} />
      <Typography fontSize={"14px"}>{caption}</Typography>
    </Stack>
  );
};

export default PostWidget;

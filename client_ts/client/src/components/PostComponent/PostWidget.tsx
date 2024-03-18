import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Comment from "../../../src/assets/Icons/Comment.svg";
import Heart from "../../../src/assets/Icons/heart.svg";
import Hearted from "../../../src/assets/Icons/hearted.svg";

import { COLORS } from "../../constants/Constant";
import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hook/useReduxHooks";
import { commentPost, likePost, removePost } from "../../data/postsSlice";
import { Comment as CommentModel } from "../../model/comment.model";
import { Post } from "../../model/post.model";
import { APIResponse } from "../../model/response.model";
import { sendComment } from "../../utils/api/sendComment";
import DeleteDialog from "../CustomUI/DeleteDialog";
import NameLink from "../CustomUI/NameLink";
import CustomAvatar from "../CustomUI/UserAvatar";
import CommentWidget from "./CommentComponent/CommentsList";
import PictureList from "./PictureList";
import PostUserInfo from "./PostUserInfo";
const PostWidget = (post: Post) => {
  const theme = useTheme();

  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const [comment, setComment] = useState<string>("");
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
  const [newComment, setNewComment] = useState<boolean>(false);

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

  const handleSendComment = async () => {
    const postId = post._id;
    if (comment !== "") {
      const responseData: APIResponse<CommentModel> = await sendComment({
        user,
        token,
        postId,
        comment,
      });
      dispatch(commentPost({ postId, comments: responseData.data }));
      setComment("");
      setNewComment(!newComment);
      setShowComment(true);
    }
  };

  const patchLike = async () => {
    //TODO: separate the components into different files  & use Axios
    const url = `http://localhost:5000/posts/${post._id}/like`;

    const options = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    };
    const response = await fetch(url, options);

    const responseData = await response.json();
    dispatch(likePost({ postId: post._id, likes: responseData.data }));
  };

  const deletePost = async () => {
    dispatch(removePost({ postId: post._id, userId: loggedInUserId }));
    handleClose();
  };
  return (
    <Paper
      elevation={0}
      sx={{
        boxSizing: "border-box",
        justifyContent: "center",
        alignItems: "start",
        display: "flex",
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
            <Stack
              flexDirection={"row"}
              width={"100%"}
              justifyContent={"start"}
            >
              <IconButton onClick={patchLike}>
                {isLiked ? <img src={Hearted} /> : <img src={Heart} />}
              </IconButton>
              <IconButton
                onClick={handleShowComment}
                sx={{
                  fontWeight: "500",
                  color: "black",
                }}
              >
                <img src={Comment} />
              </IconButton>
            </Stack>

            {/* Like Count */}
            <Typography color={"black"} fontSize={"14px"} fontWeight={"550"}>
              {likesCount} likes
            </Typography>

            {/* Post Caption */}
            {post.caption && (
              <Stack>
                <NameLink
                  name={`${post.firstName} ${post.lastName}`}
                  userId={post.userId}
                />
                <Typography fontSize={"14px"}>{post.caption}</Typography>
              </Stack>
            )}

            {/* Comment Input Section */}
            <section>
              <Stack flexDirection={"row"} height={"40px"}>
                <InputBase
                  placeholder="Comment something.."
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  sx={{
                    fontSize: "14px",
                    width: "100%",
                  }}
                />
                <Button onClick={handleSendComment} size="small">
                  <Typography
                    fontSize={"12px"}
                    textTransform={"capitalize"}
                    fontWeight={"500"}
                    color={COLORS.blue}
                  >
                    Post
                  </Typography>
                </Button>
              </Stack>

              {!showComment && (
                <Typography
                  onClick={handleShowComment}
                  sx={{
                    color: COLORS.dust,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  View all comments
                </Typography>
              )}
            </section>

            {/* Comment List */}
            {showComment && (
              <CommentWidget newComment={newComment} postId={post._id} />
            )}
          </Box>
        </section>
        <Divider sx={{ margin: "0 0 20px", padding: "0 0 16px" }} />
      </Stack>
    </Paper>
  );
};

export default PostWidget;

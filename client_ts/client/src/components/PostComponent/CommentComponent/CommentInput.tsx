import { InputBase, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../custom-hook/useReduxHooks";
import { sendComment } from "../../../redux/data/postsSlice";
import SendIcon from "@mui/icons-material/Send";
interface IProps {
  postId: string;
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentInput = ({ postId, setShowComment }: IProps) => {
  {
    const [comment, setComment] = React.useState("");
    const user = useAppSelector((state) => state.auth.user);
    const token = useAppSelector((state) => state.auth.token);
    const loading = useAppSelector(
      (state) => state.posts.postsLoading.commentPost
    );
    const dispatch = useAppDispatch();

    const refreshInput = () => {
      setComment("");
    };

    const handleSendComment = async () => {
      if (comment !== "" && user) {
        dispatch(
          sendComment({
            user: user,
            comment: comment,
            postId: postId,
            token: token,
          })
        );
        setShowComment(true);
        refreshInput();
      }
    };

    return (
      <Stack flexDirection={"row"}>
        <InputBase
          placeholder="Comment something.."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          sx={{
            borderRadius: "30px",
            display: "flex",
            fontSize: "14px",
            width: "100%",
          }}
        />
        <LoadingButton
          onClick={handleSendComment}
          loading={loading}
          endIcon={<SendIcon />}
          variant="contained"
          size="small"
          color="primary"
          loadingPosition="end"
        >
          Send
        </LoadingButton>
      </Stack>
    );
  }
};

export default CommentInput;

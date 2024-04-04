import { InputBase, Stack, Tooltip } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../custom-hook/useReduxHooks";
import {
  selectCommentLoading,
  sendComment,
} from "../../../redux/data/postsSlice";
import SendIcon from "@mui/icons-material/Send";
interface IProps {
  postId: string;
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentInput = ({ postId, setShowComment }: IProps) => {
  {
    const [comment, setComment] = useState("");
    const user = useAppSelector((state) => state.auth.user);
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const commentLoading = useAppSelector((state) =>
      selectCommentLoading(state, postId)
    );

    const [sendButtonDisable, setSendButtonDisable] = useState(true);

    useEffect(() => {
      if (comment.length > 0) {
        setSendButtonDisable(false);
      } else {
        setSendButtonDisable(true);
      }
    }, [comment]);

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
        <Tooltip title="Please input before send">
          <span>
            <LoadingButton
              onClick={handleSendComment}
              loading={commentLoading} // Removed selectCommentLoading() since it is not defined
              endIcon={<SendIcon />}
              variant="text"
              size="small"
              color="primary"
              loadingPosition="end"
              disabled={sendButtonDisable}
            >
              Send
            </LoadingButton>
          </span>
        </Tooltip>
      </Stack>
    );
  }
};

export default CommentInput;

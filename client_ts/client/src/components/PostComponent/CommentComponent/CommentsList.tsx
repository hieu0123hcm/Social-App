import { Button, List, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../custom-hook/useReduxHooks";
import { Comment } from "../../../model/comment.model";
import { getComment, selectComment } from "../../../redux/data/postsSlice";
import Error from "../../CustomUI/Error";
import Spinner from "../../CustomUI/Spinner";
import CommentItem from "./CommentItem";

interface IProps {
  postId: string;
}

const CommentWidget = ({ postId }: IProps) => {
  const token = useAppSelector((state) => state.auth.token);

  const theme = useTheme();
  const [limit, setlimit] = useState(3);
  const [showMore, setShowMore] = useState(true);

  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.posts.postsError);
  const message = useAppSelector((state) => state.posts.message);
  const commentLoading = useAppSelector(
    (state) => state.posts.postsLoading.getComment
  );
  const commentList = useAppSelector((state) => selectComment(state, postId));
  useEffect(() => {
    const initFetch = () => {
      dispatch(
        getComment({
          postId,
          token,
        })
      );
    };
    initFetch();
  }, [dispatch, postId, token]);

  const showMoreHandler = () => {
    if (limit >= commentList.length) {
      setShowMore(false);
    } else {
      setlimit(limit + 3);
      setShowMore(true);
    }
  };

  useEffect(() => {
    if (limit < commentList.length) {
      setShowMore(true);
    }
  }, [commentList, limit]);

  const commentListLimited = commentList.slice(0, limit);

  return (
    <>
      {error && <Error message={message} />}
      {commentLoading ? (
        <Spinner />
      ) : (
        <>
          <List sx={{ width: "100%", padding: "0", margin: "0" }}>
            {commentListLimited.map((comment: Comment, index) => (
              <CommentItem key={index} {...comment} />
            ))}
          </List>
          {showMore && (
            <Button
              sx={{
                fontSize: "12px",
                p: "0",
                textTransform: "capitalize",
                color: theme.palette.primary.dark,
              }}
              onClick={showMoreHandler}
            >
              Show more...
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default CommentWidget;

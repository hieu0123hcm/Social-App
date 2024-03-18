import { Button, List } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { COLORS } from "../../../constants/Constant";
import fetchData from "../../../utils/fetchData";
import { useAppSelector } from "../../../custom-hook/useReduxHooks";
import { Comment } from "../../../model/comment.model";
import Error from "../../CustomUI/Error";
import Spinner from "../../CustomUI/Spinner";
import CommentItem from "./CommentItem";

interface IProps {
  postId: string;
  newComment: boolean;
}

const CommentWidget = ({ postId, newComment }: IProps) => {
  const token = useAppSelector((state) => state.auth.token) || "";

  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [error, setError] = useState<string>("");
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);
  const [limit, setlimit] = useState(3);
  const [showMore, setShowMore] = useState(true);

  const commentListLimited = commentList.slice(0, limit);

  const showMoreHandler = () => {
    if (limit >= commentList.length) {
      setShowMore(false);
    } else {
      setlimit(limit + 3);
      setShowMore(true);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      setIsCommentLoading(true);
      try {
        const response = await fetchData<Comment[]>(
          `http://localhost:5000/posts/${postId}/comment`,
          token
        );
        const { data } = response.data;
        setCommentList(data);
      } catch (error) {
        const formattedError = error as AxiosError;
        setError(
          (formattedError.response?.data as string) || "Error getting the data"
        );
      } finally {
        setIsCommentLoading(false);
      }
    };
    getComments();
  }, [postId, token, newComment]);

  return (
    <>
      {error && <Error message={error} />}
      {isCommentLoading ? (
        <Spinner />
      ) : (
        <>
          <List sx={{ width: "100%", padding: "0", margin: "0" }}>
            {commentListLimited.map((comment: Comment, index: number) => {
              return <CommentItem key={index} comment={comment} />;
            })}
          </List>
          {showMore && (
            <Button
              sx={{
                fontSize: "12px",
                p: "0",
                textTransform: "capitalize",
                color: COLORS.blue,
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

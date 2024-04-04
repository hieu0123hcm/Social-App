import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../custom-hook/useReduxHooks";
import { getPosts } from "../redux/data/postsSlice";
import { Post } from "../model/post.model";
import Error from "./CustomUI/Error";
import Spinner from "./CustomUI/Spinner";
import PostWidget from "./PostComponent/Post";

const PostsFeed = () => {
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);

  const {
    count: totalPosts,
    page,
    limit: pageSize,
    items,
  } = useAppSelector((state) => state.posts.postItems);
  const token = useAppSelector((state) => state.auth.token);
  const postsError = useAppSelector((state) => state.posts.postsError);

  const message = useAppSelector((state) => state.posts.message);

  const initFetch = useCallback(() => {
    dispatch(getPosts({ page, pageSize, token }));
  }, [dispatch, page, pageSize, token]);

  const loadMore = () => {
    dispatch(getPosts({ page, pageSize, token }));
    items.length < totalPosts ? setHasMore(true) : setHasMore(false);
  };

  useEffect(() => {
    initFetch();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      {postsError ? (
        <Error message={message} />
      ) : items.length === 0 ? (
        <CaughtUp />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<Spinner />}
          endMessage={<CaughtUp />}
        >
          {items.map((post: Post, index) => (
            <PostWidget
              key={index}
              {...post}
              createdAt={new Date(post.createdAt)}
            />
          ))}
        </InfiniteScroll>
      )}
    </Stack>
  );
};

const CaughtUp = () => {
  return (
    <Stack
      textAlign={"center"}
      sx={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        mb: "25px",
      }}
    >
      <CheckCircleOutlineIcon color="primary" sx={{ fontSize: "40px" }} />
      <Typography fontSize={"15px"} fontWeight={"600"}>
        You're All Caught Up
      </Typography>
    </Stack>
  );
};

export default PostsFeed;

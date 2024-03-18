import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Stack, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { COLORS } from "../constants/Constant";
import { useAppDispatch, useAppSelector } from "../custom-hook/useReduxHooks";
import { getPosts } from "../data/postsSlice";
import { Post } from "../model/post.model";
import Error from "./CustomUI/Error";
import Spinner from "./CustomUI/Spinner";
import PostWidget from "./PostComponent/PostWidget";

const PostsFeed = () => {
  const dispatch = useAppDispatch();
  const {
    count: totalPosts,
    page,
    limit: pageSize,
    items,
  } = useAppSelector((state) => state.posts.postItems);
  const postsError = useAppSelector((state) => state.posts.postsError);
  const isLoading = useAppSelector((state) => state.posts.postsLoading);
  const message = useAppSelector((state) => state.posts.message);

  const initFetch = useCallback(() => {
    dispatch(getPosts({ page, pageSize }));
  }, [dispatch, page, pageSize]);

  const loadMore = () => {
    dispatch(getPosts({ page, pageSize }));
  };

  useEffect(() => {
    initFetch();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      {postsError ? (
        <Error message={message} />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={loadMore}
          hasMore={items.length < totalPosts}
          loader={<Spinner />}
          endMessage={!isLoading && <CaughtUp />}
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
      <CheckCircleOutlineIcon sx={{ color: COLORS.lime, fontSize: "40px" }} />
      <Typography fontSize={"15px"} fontWeight={"600"}>
        You're All Caught Up
      </Typography>
    </Stack>
  );
};

export default PostsFeed;

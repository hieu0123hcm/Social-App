import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    postsList: [],
    postModified: false,
  },
  reducers: {
    setPosts: (state, action) => {
      state.postsList = action.payload.postsList;
    },
    setPostModified: (state) => {
      state.postModified = !state.postModified;
    },
  },
});

export const { setPosts, setPostModified } = postsSlice.actions;

export const selectPosts = (state) => state.posts.postsList;

export default postsSlice.reducer;

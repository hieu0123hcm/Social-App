import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post, PostResponse } from "../model/post.model";
import { RootState } from "../redux-store/store";
import PostService from "../services/PostService";
import { AxiosError, AxiosResponse } from "axios";
import { APIResponse } from "../model/response.model";
import { User } from "../model/user.model";

const POST_PER_PAGE = 2;

interface postsState {
  postItems: {
    page: number;
    count: number;
    limit: number;
    items: Post[];
  };
  postsError: boolean;
  postsLoading: boolean;
  postSuccess: boolean;
  message: string | undefined;
}

const initialState: postsState = {
  postItems: {
    page: 1,
    count: 0,
    limit: POST_PER_PAGE,
    items: [],
  },
  postsError: false,
  postsLoading: false,
  postSuccess: false,
  message: "",
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (
    query: {
      page: number;
      pageSize: number;
    },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<APIResponse<PostResponse>> =
        await PostService.getAll(query);
      const { data } = response.data;
      return data;
    } catch (error) {
      const formattedError = error as AxiosError;
      return thunkAPI.rejectWithValue(formattedError.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (
    reqData: {
      user: User | null;
      postCaption: string;
      image: File[];
    },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<APIResponse<Post>> =
        await PostService.create(reqData);
      const { data } = response.data;
      console.log(response);
      return data;
    } catch (error) {
      const formattedError = error as AxiosError;
      return thunkAPI.rejectWithValue(formattedError.message);
    }
  }
);

export const removePost = createAsyncThunk(
  "posts/deletePost",
  async (reqData: { postId: string; userId: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<APIResponse<Post>> =
        await PostService.remove(reqData.postId, reqData.userId);
      const { data } = response.data;
      return data;
    } catch (error) {
      const formattedError = error as AxiosError;
      return thunkAPI.rejectWithValue(formattedError.message);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    likePost: (state, action) => {
      const postId = action.payload.postId;
      const likes = action.payload.likes;
      const post = state.postItems.items.find((post) => post._id === postId);
      if (post) {
        post.likes = { ...likes };
      }
    },

    commentPost: (state, action) => {
      const postId = action.payload.postId;
      const comments = action.payload.comments;
      const post = state.postItems.items.find((post) => post._id === postId);
      if (post) {
        post.comments = { ...comments };
      }
    },

    deletePost: (state, action) => {
      const postId = action.payload.postId;
      const postsList = state.postItems.items.filter(
        (item) => item._id !== postId
      );
      state.postItems.items = postsList;
    },

    setPosts: (state, action) => {
      state.postItems.items = action.payload.postsList;
    },

    // setPostsByUserID: (state, action) => {
    //   state.postsListByUserID = action.payload.postsListByUserID;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.postsLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.postSuccess = true;
        state.postItems.items.push(...action.payload.posts);
        state.postItems.count = +action.payload.totalPosts;
        state.postItems.page++;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.postsLoading = false;
        state.postsError = true;
        state.message = action.error.message;
      });

    builder
      .addCase(createPost.pending, (state) => {
        state.postsLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.postSuccess = true;
        state.postItems.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.postsLoading = false;
        state.postsError = true;
        state.message = action.error.message;
      });

    builder
      .addCase(removePost.pending, (state) => {
        state.postsLoading = true;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.postSuccess = true;
        state.postItems.items = state.postItems.items.filter(
          (item) => item._id !== action.payload._id
        );
        console.log(state.postItems.items);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.postsLoading = false;
        state.postsError = true;
        state.message = action.error.message;
      });
  },
});

export const { setPosts, likePost, commentPost, deletePost } =
  postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.postItems;

export const selectPostsError = (state: RootState) => state.posts.postsError;
export const selectPostsLoading = (state: RootState) =>
  state.posts.postsLoading;
export const selectPostSuccess = (state: RootState) => state.posts.postSuccess;

export const selectMessage = (state: RootState) => state.posts.message;

export default postsSlice.reducer;

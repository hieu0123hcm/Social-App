import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post, PostResponse } from "../../model/post.model";
import { RootState } from "../store";
import PostService from "../../services/post.service";
import { AxiosError, AxiosResponse } from "axios";
import { APIResponse } from "../../model/response.model";
import { User } from "../../model/user.model";
import { CommentReponse } from "../../model/comment.model";

const POST_PER_PAGE = 2;

interface postsState {
  postItems: {
    page: number;
    count: number;
    limit: number;
    items: Post[];
  };
  postsError: boolean;
  postsLoading: {
    getPosts: boolean;
    createPost: boolean;
    likePost: boolean;
    commentPost: boolean;
    removePost: boolean;
    getComment: boolean;
  };
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
  postsLoading: {
    getComment: false,
    getPosts: false,
    createPost: false,
    likePost: false,
    commentPost: false,
    removePost: false,
  },
  postSuccess: false,
  message: "",
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (
    query: {
      page: number;
      pageSize: number;
      token: string | null;
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
      token: string | null;
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
  async (
    reqData: { postId: string; userId: string; token: string | null },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<APIResponse<Post>> =
        await PostService.remove(reqData);
      const { data } = response.data;
      return data;
    } catch (error) {
      const formattedError = error as AxiosError;
      return thunkAPI.rejectWithValue(formattedError.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (
    reqData: { postId: string; userId: string; token: string | null },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<APIResponse<Post>> = await PostService.like(
        reqData
      );
      const { data } = response.data;
      return data;
    } catch (error) {
      const formattedError = error as AxiosError;
      return thunkAPI.rejectWithValue(formattedError.message);
    }
  }
);

export const getComment = createAsyncThunk(
  "posts/getComment",
  async (reqData: { postId: string; token: string | null }, thunkAPI) => {
    try {
      const response: AxiosResponse<APIResponse<CommentReponse>> =
        await PostService.getComment(reqData);
      const { data } = response.data;
      return data;
    } catch (error) {
      const formattedError = error as AxiosError;
      return thunkAPI.rejectWithValue(formattedError.message);
    }
  }
);

export const sendComment = createAsyncThunk(
  "posts/commentPost",
  async (
    reqData: {
      user: User;
      comment: string;
      postId: string;
      token: string | null;
    },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<APIResponse<CommentReponse>> =
        await PostService.sendComment(reqData);
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
  reducers: {},
  extraReducers: (builder) => {
    //Get Post
    builder
      .addCase(getPosts.pending, (state) => {
        state.postsLoading.getPosts = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postsLoading.getPosts = false;
        state.postSuccess = true;
        state.postItems.items.push(...action.payload.posts);
        state.postItems.count = +action.payload.totalPosts;
        state.postItems.page++;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.postsLoading.getPosts = false;
        state.postsError = true;
        state.message = action.error.message;
      });

    //Create Post
    builder
      .addCase(createPost.pending, (state) => {
        state.postsLoading.createPost = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postsLoading.createPost = false;
        state.postSuccess = true;
        state.postItems.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.postsLoading.createPost = false;
        state.postsError = true;
        state.message = action.error.message;
      });

    // Remove Post
    builder
      .addCase(removePost.pending, (state) => {
        state.postsLoading.removePost = true;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.postsLoading.removePost = false;
        state.postSuccess = true;
        state.postItems.items = state.postItems.items.filter(
          (item) => item._id !== action.payload._id
        );
        console.log(state.postItems.items);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.postsLoading.removePost = false;
        state.postsError = true;
        state.message = action.error.message;
      });

    // Like Post
    builder
      .addCase(likePost.pending, (state) => {
        state.postsLoading.likePost = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.postsLoading.likePost = false;
        state.postSuccess = true;
        const postId = action.payload._id;
        const likes = action.payload.likes;
        const post = state.postItems.items.find((post) => post._id === postId);
        if (post) {
          post.likes = { ...likes };
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.postsLoading.likePost = false;
        state.postsError = true;
        state.message = action.error.message;
      });

    //Send Comment
    builder
      .addCase(sendComment.pending, (state) => {
        state.postsLoading.commentPost = true;
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        const postId = action.payload.postId;
        const comments = action.payload.comments;
        const post = state.postItems.items.find((post) => post._id === postId);
        if (post) {
          post.comments = [...comments];
        }
        state.postsLoading.commentPost = false;
      })
      .addCase(sendComment.rejected, (state, action) => {
        state.postsLoading.commentPost = false;
        state.postsError = true;
        state.message = action.error.message;
      });

    builder
      .addCase(getComment.pending, (state) => {
        state.postsLoading.getComment = true;
      })
      .addCase(getComment.fulfilled, (state, action) => {
        if (action.payload.comments.length !== 0) {
          const postId = action.payload.postId;
          const comments = action.payload.comments;
          const post = state.postItems.items.find(
            (post) => post._id === postId
          );
          if (post) {
            post.comments = [...comments];
          }
        }
        state.postsLoading.getComment = false;
      })
      .addCase(getComment.rejected, (state, action) => {
        state.postsLoading.getComment = false;
        state.postsError = true;
        state.message = action.error.message;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.postItems;

export const selectPostsError = (state: RootState) => state.posts.postsError;
export const selectPostsLoading = (state: RootState) =>
  state.posts.postsLoading;
export const selectPostSuccess = (state: RootState) => state.posts.postSuccess;

export const selectMessage = (state: RootState) => state.posts.message;

export const selectComment = (state: RootState, postId: string) => {
  const post = state.posts.postItems.items.find((post) => post._id === postId);
  if (post) {
    return post.comments;
  }
  return [];
};

export default postsSlice.reducer;

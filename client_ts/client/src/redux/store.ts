import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./data/authSlice";
import postsReducer from "./data/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

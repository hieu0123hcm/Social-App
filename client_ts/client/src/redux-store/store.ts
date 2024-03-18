import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../data/loginSlice";
import postsReducer from "../data/postsSlice";
import systemReducer from "../data/systemSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    system: systemReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

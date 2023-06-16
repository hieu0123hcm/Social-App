import { configureStore } from "@reduxjs/toolkit";
import currentViewReducer from "../data/currentViewSlice";
import authReducer from "../data/loginSlice";
import postsReducer from "../data/postsSlice";

export default configureStore({
  reducer: {
    currentView: currentViewReducer,
    auth: authReducer,
    posts: postsReducer,
  },
});

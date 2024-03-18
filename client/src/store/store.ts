import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../data/loginSlice'
import postsReducer from '../data/postsSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
    },
})

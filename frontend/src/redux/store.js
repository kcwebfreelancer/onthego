import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice'
import postsReducer from '../redux/slices/postsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer
    }
})
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postsService from '../services/postsService';

export const fetchPosts = createAsyncThunk('posts', async () => {
    try {
        return await postsService.posts();
    } catch (error) {
        console.log("error....", error)
    }
})
const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPosts.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false
            state.posts = action.payload
        })
    }
})

export default postsSlice.reducer;
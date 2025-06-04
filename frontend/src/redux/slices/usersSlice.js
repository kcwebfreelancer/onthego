import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('posts/fetchUsers', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return await response.json();
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false
        })
    }
})

export default usersSlice.reducer;
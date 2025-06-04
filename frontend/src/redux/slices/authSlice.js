import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import authService from '../services/authService';

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        console.log(error.response)
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const login = createAsyncThunk('auth/userLogin', async (loginData, thunkAPI) => {
    try {
        return await authService.login(loginData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(register.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                state.isLoading = false;
                state.user = null;
            })
            .addCase(login.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.message = action.payload.message;
                state.user = action.payload.user_details;
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                state.isLoading = false;
                state.user = null;
            })
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;
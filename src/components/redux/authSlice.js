import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
}

export const signup = createAsyncThunk('auth/signup', async (user, thunkAPI) => {
    try {
        return await authService.signup(user)
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(signup.rejected, (state) => {
                state.isLoading = false
                state.isError = true
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false
                state.isError = true
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.isError = false
                state.isSuccess = false
                state.isLoading = false
            })
    }
})

export const { reset } = authSlice.actions;

export default authSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dataService from "../services/dataService";


const initialState = {
    employees: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
}

export const addEmployee = createAsyncThunk('/employees/add', async (employeeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dataService.addEmployee(employeeData, token)
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const getEmployees = createAsyncThunk('/employees/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dataService.getEmployees(token)
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const deleteEmployee = createAsyncThunk('/employees/delete', async (employeeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dataService.deleteEmployee(employeeData, token)
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const updateEmployee = createAsyncThunk('/employees/update', async (employeeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dataService.updateEmployee(employeeData, token)
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addEmployee.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.employees.push(action.payload)
            })
            .addCase(addEmployee.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(getEmployees.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.employees = action.payload
            })
            .addCase(getEmployees.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(deleteEmployee.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.employees = state.employees.filter((employee) => employee._id !== action.payload.id)
            })
            .addCase(deleteEmployee.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(updateEmployee.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const { _id } = action.payload
                if(_id) {
                    state.employees = state.employees.map((emp) => emp._id === _id ? action.payload : emp)
                }
            })
            .addCase(updateEmployee.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export const { reset } = dataSlice.actions;

export default dataSlice.reducer;
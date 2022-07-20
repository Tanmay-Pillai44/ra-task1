import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        employees: employeeReducer,
        user: userReducer
    }
})

export default store;
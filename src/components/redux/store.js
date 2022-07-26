import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        data: dataReducer,
        auth: authReducer
    }
})

export default store;
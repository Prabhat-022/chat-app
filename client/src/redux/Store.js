import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import socketSlice from "./socketSlice.js";

const store = configureStore({
    reducer: {
        user: userSlice,
        socket:socketSlice
    }
})

export default store;
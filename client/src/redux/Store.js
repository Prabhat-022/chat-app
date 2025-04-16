import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import socketSlice from "./socketSlice.js";
import messageSlice from "./messageSlice.js";

const store = configureStore({
    reducer: {
        user: userSlice,
        socket:socketSlice,
        message: messageSlice,
    }
})



export default store;
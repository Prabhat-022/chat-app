import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        message: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTheMessage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getAllTheMessage.fulfilled, (state, action) => {
            state.message = [...state.message, ...action.payload];
            state.loading = false;
            state.error = false;
        })
        builder.addCase(getAllTheMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(sendMessage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.message = [...state.message, action.payload];
            state.loading = false;
            state.error = false;
        })
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const getAllTheMessage = createAsyncThunk("message/getAllTheMessage", async (userId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/message/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
            withCredentials: true // This is important for sending cookies
        });
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const sendMessage = createAsyncThunk("message/sendMessage", async ({userId, input}, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/message/send/${userId}`, {
            message: input
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
            withCredentials: true // This is important for sending cookies
        });
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export default messageSlice.reducer;

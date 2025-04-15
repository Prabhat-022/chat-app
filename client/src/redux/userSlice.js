import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user Login

export const getAlltheUsers = createAsyncThunk("user/getAlltheUsers", async (userData, { rejectWithValue }) => {
  console.log('userData', userData);
  try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user;

  } catch (error) {
      return rejectWithValue(error.response.data);
  }
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    loginUser: [], // Array to store all logged-in users
    selectedUser: null,
    toggleChat: true,
    message: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setLoginUser: (state, action) => {
      state.loginUser = action.payload
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setToggleChat: (state, action) => {
      state.toggleChat = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
   
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAlltheUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAlltheUsers.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    })
    .addCase(getAlltheUsers.rejected, (state, action) => {
      state.error = action.payload;

    });
}

});

export const {
  setUser,
  setLoginUser,
  setSelectedUser,
  setToggleChat,
  setMessage,
} = userSlice.actions;


export default userSlice.reducer;

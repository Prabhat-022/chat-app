import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loginUser: [], // Array to store all logged-in users
    selectedUser: null,
    toggleChat: true,
    message: [],
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
});

export const {
  setUser,
  setLoginUser,
  setSelectedUser,
  setToggleChat,
  setMessage,
} = userSlice.actions;

export default userSlice.reducer;

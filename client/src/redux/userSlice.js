<<<<<<< HEAD
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
=======
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve user info and token from localStorage if available
const userFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// Async thunk for user Login

export const login = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, userData);
    localStorage.setItem("userInfo", JSON.stringify(response.data.user));
    localStorage.setItem("userToken", response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

// Async thunk for user Register

export const register = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`, userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    localStorage.setItem("userInfo", JSON.stringify(response.data.user));
    localStorage.setItem("userToken", response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

// Async thunk for user Logout

export const logout = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

// Async thunk for get all the users

export const getAllUsers = createAsyncThunk("auth/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('No token found. Please login first.');
    }

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true // This is important for sending cookies
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return rejectWithValue({
      message: error.response?.data?.message || 'Failed to fetch users',
      status: error.response?.status || 500
    });
>>>>>>> ea8f39e (fixed some bugs)
  }
})

const userSlice = createSlice({
  name: "user",
  initialState: {
<<<<<<< HEAD
    userData: [],
    loginUser: [], // Array to store all logged-in users
    selectedUser: null,
    toggleChat: true,
    message: [],
=======
    loginUser: userFromStorage, // Array to store all logged-in users
    userData: [],
    selectedUser: null,
    toggleChat: true,
>>>>>>> ea8f39e (fixed some bugs)
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setToggleChat: (state, action) => {
      state.toggleChat = action.payload;
    },
    getlogout: (state) => {
      state.loginUser = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
    },
  },
  extraReducers: (builder) => {
<<<<<<< HEAD
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

=======
    //login builder 
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginUser = action.payload;
      state.loading = false;
      state.error = false;
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })

    //Register builder 
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.loginUser = action.payload;
      state.error = false;
    })
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //Logout builder
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //Get all users builder
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.loading = false;
      state.error = false;
    })
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  }
>>>>>>> ea8f39e (fixed some bugs)
});

export const {
  setUser,
  setSelectedUser,
  setToggleChat,
  setMessage,
  getlogout,
} = userSlice.actions;


export default userSlice.reducer;

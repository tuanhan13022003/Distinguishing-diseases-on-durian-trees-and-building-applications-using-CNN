import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};


const getToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token không tồn tại');
    return token;
  } catch (error) {
    console.error('Lỗi khi lấy token:', error.message);
    return null;
  }
};

export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const accessToken = response.data.access_token;
      const userId = response.data.user_id;

      if (accessToken) {
        localStorage.setItem('token', accessToken);
      } else {
        throw new Error('Không tìm thấy token trong phản hồi');
      }

      if (userId) {
        localStorage.setItem('user_id', userId);
      } else {
        throw new Error('Không tìm thấy user_id trong phản hồi');
      }

      return { ...response.data, role: response.data.role || 'user' };
    } catch (error) {
      console.error("API Login Error:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

export const registerUserAPI = createAsyncThunk(
  'user/registerUserAPI',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const accessToken = response.data.access_token;
      if (accessToken) {
        localStorage.setItem('token', accessToken);
      } else {
        throw new Error('Không tìm thấy token trong phản hồi');
      }

      return { ...response.data, role: response.data.role || 'user' };
    } catch (error) {
      console.error("API Register Error:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.put(`${API_URL}/users/update`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return { ...response.data, role: response.data.role || 'user' };
    } catch (error) {
      console.error("API Update Error:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

export const logoutUser = () => {
  localStorage.removeItem('token');
};


export const getUserByIdAPI = createAsyncThunk(
  'user/getUserByIdAPI',
  async (userId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy user ${userId}:`, error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
      logoutUser();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAPI.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUserAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateUserAPI.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getUserByIdAPI.fulfilled, (state, action) => {
        const user = action.payload;
        if (user?.user_id) {
          state.usersById[user.user_id] = user;
        }
      });
  },
});

export const { clearCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;

export const userReducer = userSlice.reducer;

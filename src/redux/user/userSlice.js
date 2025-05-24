// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Lấy URL API từ biến môi trường
// const API_URL = import.meta.env.VITE_API_URL;

// const initialState = {
//   currentUser: null,
//   loading: false,
//   error: null,
// };

// /**
//  * Đăng nhập người dùng
//  */
// export const loginUserAPI = createAsyncThunk(
//   'user/loginUserAPI',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/users/login`, data, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log("API Login Response:", response.data);
//       localStorage.setItem('token', response.data.token);
//       return response.data;
//     } catch (error) {
//       console.error("API Login Error:", error.response ? error.response.data : error.message);
//       return rejectWithValue(error.response ? error.response.data : { message: error.message });
//     }
//   }
// );
// /**
//  * Dang ky người dùng
//  */
// export const registerUserAPI = createAsyncThunk(
//   'user/registerUserAPI',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/users/`, data, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log("API Register Response:", response.data);
//       localStorage.setItem('token', response.data.token);
//       return response.data;
//     } catch (error) {
//       console.error("API Register Error:", error.response ? error.response.data : error.message);
//       return rejectWithValue(error.response ? error.response.data : { message: error.message });
//     }
//   }
// );

// /**
//  * Cập nhật thông tin người dùng
//  */
// export const updateUserAPI = createAsyncThunk(
//   'user/updateUserAPI',
//   async (data, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.put(`${API_URL}/api/users/update`, data, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response ? error.response.data : { message: error.message });
//     }
//   }
// );

// /**
//  * Khởi tạo Slice
//  */
// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     clearCurrentUser: (state) => {
//       state.currentUser = null;
//       localStorage.removeItem('token');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Xử lý login thành công
//       .addCase(loginUserAPI.fulfilled, (state, action) => {
//         state.currentUser = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       // Xử lý login đang thực hiện
//       .addCase(loginUserAPI.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       // Xử lý login thất bại
//       .addCase(loginUserAPI.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       })

//       // Xử lý cập nhật người dùng
//       .addCase(updateUserAPI.fulfilled, (state, action) => {
//         state.currentUser = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(updateUserAPI.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       });
//   },
// });

// export const { clearCurrentUser } = userSlice.actions;

// export const selectCurrentUser = (state) => state.user.currentUser;
// export const selectLoading = (state) => state.user.loading;
// export const selectError = (state) => state.user.error;

// export const userReducer = userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Lấy URL API từ biến môi trường
const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

/**
 * Hàm lấy token từ localStorage
 */
const getToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token không tồn tại');
    console.log('🚀 ~ Token trong localStorage:', token);
    return token;
  } catch (error) {
    console.error('Lỗi khi lấy token:', error.message);
    return null;
  }
};

/**
 * Đăng nhập người dùng
 */
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("🚀 ~ API Login Response:", response.data);

      const accessToken = response.data.access_token;
      const userId = response.data.user_id;

      if (accessToken) {
        localStorage.setItem('token', accessToken);
        console.log("🚀 ~ Token đã lưu vào localStorage:", accessToken);
      } else {
        throw new Error('Không tìm thấy token trong phản hồi');
      }

      if (userId) {
        localStorage.setItem('user_id', userId);
        console.log("🚀 ~ User ID đã lưu vào localStorage:", userId);
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

/**
 * Đăng ký người dùng
 */
export const registerUserAPI = createAsyncThunk(
  'user/registerUserAPI',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("🚀 ~ API Register Response:", response.data);

      // Lưu token vào localStorage
      const accessToken = response.data.access_token;
      if (accessToken) {
        localStorage.setItem('token', accessToken);
        console.log("🚀 ~ Token đã lưu vào localStorage:", accessToken);
      } else {
        throw new Error('Không tìm thấy token trong phản hồi');
      }

      // Lưu vai trò và thông tin người dùng
      return { ...response.data, role: response.data.role || 'user' };
    } catch (error) {
      console.error("API Register Error:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

/**
 * Cập nhật thông tin người dùng
 */
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
      console.log("🚀 ~ API Update Response:", response.data);
      return { ...response.data, role: response.data.role || 'user' };
    } catch (error) {
      console.error("API Update Error:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

/**
 * Đăng xuất người dùng
 */
export const logoutUser = () => {
  localStorage.removeItem('token');
  console.log("🚀 ~ Đã xóa token khỏi localStorage");
};

/**
 * Lấy thông tin người dùng theo ID
 */
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
      console.error(`❌ Lỗi khi lấy user ${userId}:`, error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


/**
 * Khởi tạo Slice
 */
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

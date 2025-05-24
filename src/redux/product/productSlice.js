// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import authorizedAxiosInstance from '~/utils/authorizeAxios'
// import { API_ROOT } from '~/utils/constants'

// const initialState = {
//   currentProduct: null
// }

// export const searchProductAPI = createAsyncThunk(
//   'product/searchProductAPI',
//   async (formData) => {
//     try {
//       const response = await authorizedAxiosInstance.post(`${API_ROOT}/products/predict`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data' // Axios sẽ tự động thêm boundary
//         }
//       })
//       console.log('🚀 ~ response:', response)
//       return response.data
//     } catch {
//       return null
//     }
//   }
// )

// export const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(searchProductAPI.fulfilled, (state, action) => {
//       const product = action.payload
//       state.currentProduct = product
//     })
//   }
// })

// // export const {} = userSlice.actions

// export const selectCurrentProduct = (state) => {
//   return state.product.currentProduct
// }

// export const productReducer = productSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Lấy URL API từ biến môi trường
const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

// Hàm tạo FormData từ file
const createFormData = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return formData;
};

/**
 * Tìm kiếm bệnh cây sầu riêng bằng hình ảnh
 * @param {File} file - Tệp hình ảnh cần dự đoán bệnh
 */
export const searchProductAPI = createAsyncThunk(
  'product/searchProductAPI',
  async (formData, { rejectWithValue }) => {
    try {
      console.log('[DEBUG] FormData trước khi gửi:', [...formData.entries()]);
      const response = await axios.post(`${API_URL}/diseases/predict`, formData, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          "Accept": "application/json",
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      console.log('[DEBUG] Dữ liệu API trả về:', response.data);
      return response.data;
    } catch (error) {
      console.error("[ERROR] API Error during search:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);



const initialState = {
  currentProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Action để xóa lỗi khi cần thiết
    clearError: (state) => {
      state.error = null;
    },
    // Reset trạng thái của currentProduct
    resetProduct: (state) => {
      state.currentProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProductAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(searchProductAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi không xác định";
      });
  },
});

// Export actions
export const { clearError, resetProduct } = productSlice.actions;

// Export selectors
export const selectCurrentProduct = (state) => state.product.currentProduct;
export const selectProductLoading = (state) => state.product.loading;
export const selectProductError = (state) => state.product.error;

export const productReducer = productSlice.reducer

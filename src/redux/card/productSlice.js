// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import authorizedAxiosInstance from '~/utils/authorizeAxios'
// import { API_ROOT } from '~/utils/constants'

// const initialState = {
//   currentCard: null
// }

// export const getAllCardAPI = createAsyncThunk(
//   'card/getAllCardAPI',
//   async (formData) => {
//     try {
//       const response = await authorizedAxiosInstance.get(`${API_ROOT}/cart/items`, formData, {
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
//     builder.addCase(getAllCardAPI.fulfilled, (state, action) => {
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
import { toast } from 'react-toastify';
import authorizedAxiosInstance from '~/utils/authorizeAxios';

// Sử dụng biến môi trường để lấy URL API
const API_URL = import.meta.env.VITE_API_URL;

// Khởi tạo state ban đầu
const initialState = {
  currentCart: null,
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
 * API lấy danh sách giỏ hàng
 */
export const getAllCartAPI = createAsyncThunk(
  'product/getAllCartAPI',
  async (userId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) throw new Error('Token không tồn tại');

      const response = await authorizedAxiosInstance.get(`${API_URL}/cart/?user_id=${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('🚀 ~ Lấy danh sách giỏ hàng:', response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 403) {
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

/**
 * API thêm sản phẩm vào giỏ hàng
 */
export const addProductToCartAPI = createAsyncThunk(
  'product/addProductToCartAPI',
  async (cartItem, { rejectWithValue }) => {
    try {
      const token = getToken();
      console.log('Dữ liệu gửi lên API:', JSON.stringify(cartItem));
      const response = await authorizedAxiosInstance.post(`${API_URL}/cart/items`, cartItem, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log('🚀 ~ Thêm sản phẩm vào giỏ hàng:', response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);



/**
 * API xóa sản phẩm khỏi giỏ hàng
 */
export const deleteProductFromCartAPI = createAsyncThunk(
  'product/deleteProductFromCartAPI',
  async ({ itemId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token không tồn tại');

      // Gọi API xóa sản phẩm khỏi giỏ hàng
      const response = await authorizedAxiosInstance.delete(`${API_URL}/cart/items/${itemId}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('🚀 ~ Xóa sản phẩm khỏi giỏ hàng:', response.data);
      return { itemId };
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error.response ? error.response.data : error.message);
      if (error.response?.status === 404) {
        return rejectWithValue({ message: 'Sản phẩm không tồn tại hoặc đã bị xóa.' });
      }
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);
/**
 * API cập nhật số lượng sản phẩm trong giỏ hàng
 */

export const updateCartItemAPI = createAsyncThunk(
  'product/updateCartItemAPI',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token không tồn tại');
      const userId = localStorage.getItem('user_id');
      if (!userId) throw new Error('Không tìm thấy user_id trong localStorage');

      const response = await authorizedAxiosInstance.put(
        `${API_URL}/cart/items/${itemId}`,
        { quantity, user_id: parseInt(userId) }, 
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        }
      );

      console.log('✅ Cập nhật số lượng sản phẩm thành công:', response.data);
      toast.success('✅ Số lượng sản phẩm đã được cập nhật.');
      return response.data;
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật sản phẩm:", error.response ? error.response.data : error.message);

      if (error.response?.status === 401) {
        toast.error('❌ Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        localStorage.removeItem('token');
        window.location.href = '/login';
        return rejectWithValue({ message: 'Unauthorized' });
      }

      if (error.response?.status === 422) {
        toast.error('❌ Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
      }
      toast.error('❌ Lỗi khi cập nhật số lượng.');
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);
export const checkoutCartAPI = createAsyncThunk(
  'product/checkoutCartAPI',
  async ({ userId, selectedItems }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const checkoutData = {
        user_id: parseInt(userId),
        cart_item_ids: selectedItems,
      };

      const response = await authorizedAxiosInstance.post(`${API_URL}/cart/checkout`, checkoutData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('✅ ~ Thanh toán thành công:', response.data);
      toast.success('✅ Đặt hàng thành công!');
      return response.data;
    } catch (error) {
      console.error('❌ Lỗi khi thanh toán:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);





/**
 * Tạo Slice quản lý giỏ hàng
 */
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.currentCart = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCartAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCartAPI.fulfilled, (state, action) => {
        state.currentCart = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Lỗi không xác định';
      });
  },
});

export const { clearCart } = productSlice.actions;

export const selectCurrentCart = (state) => state.product.currentCart;
export const selectCartLoading = (state) => state.product.loading;
export const selectCartError = (state) => state.product.error;

export const productReducer = productSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authorizedAxiosInstance from '~/utils/authorizeAxios';

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  currentCart: null,
  totalQuantity: 0,
  loading: false,
  error: null,
};

const getToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token không tồn tại');
    return token;
  } catch (error) {
    return null;
  }
};

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
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

export const addProductToCartAPI = createAsyncThunk(
  'product/addProductToCartAPI',
  async (cartItem, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await authorizedAxiosInstance.post(`${API_URL}/cart/items`, cartItem, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

export const deleteProductFromCartAPI = createAsyncThunk(
  'product/deleteProductFromCartAPI',
  async ({ itemId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token không tồn tại');

      const response = await authorizedAxiosInstance.delete(`${API_URL}/cart/items/${itemId}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return { itemId };
    } catch (error) {
      if (error.response?.status === 404) {
        return rejectWithValue({ message: 'Sản phẩm không tồn tại hoặc đã bị xóa.' });
      }
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);

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

      toast.success('Số lượng sản phẩm đã được cập nhật.');
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        localStorage.removeItem('token');
        window.location.href = '/login';
        return rejectWithValue({ message: 'Unauthorized' });
      }

      if (error.response?.status === 422) {
        toast.error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
      }
      toast.error('Lỗi khi cập nhật số lượng.');
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
      toast.success('Đặt hàng thành công!');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

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
        const totalQuantity = action.payload.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        state.totalQuantity = totalQuantity;
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
export const selectTotalCartQuantity = (state) => state.product.totalQuantity;
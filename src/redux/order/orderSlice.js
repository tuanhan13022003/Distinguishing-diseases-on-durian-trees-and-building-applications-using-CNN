import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import authorizedAxiosInstance from '~/utils/authorizeAxios';

const API_URL = import.meta.env.VITE_API_URL;

// 🛠️ Lấy danh sách đơn hàng từ API
export const getAllOrdersAPI = createAsyncThunk(
  'order/getAllOrdersAPI',
  async (_, { rejectWithValue }) => {
    try {
      console.log("[API CALL] Fetching orders from:", `${API_URL}/orders/`);
      const response = await authorizedAxiosInstance.get(`${API_URL}/orders/`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log("[API RESPONSE] Orders fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("[API ERROR] Error fetching orders:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);
//huy orderorder
export const cancelOrderAPI = createAsyncThunk(
  'order/cancelOrderAPI',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.delete(`${API_URL}/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return { orderId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);
// 🛠️ Lấy danh sách đơn hàng từ API
export const getAllOrdersAdminAPI = createAsyncThunk(
  'order/getAllOrdersAdminAPI', // ✅ tên đúng cho slice "order"
  async (_, { rejectWithValue }) => {
    try {
      console.log("[API CALL] Fetching all admin orders from:", `${API_URL}/orders/all`);
      const response = await authorizedAxiosInstance.get(`${API_URL}/orders/all`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log("[API RESPONSE] Admin orders fetched successfully1:", response.data);
      return response.data;
    } catch (error) {
      console.error("[API ERROR] Admin - error fetching orders:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// update order
export const updateOrderAPI = createAsyncThunk(
  'order/updateOrderAPI',
  async ({ orderId, data }, { rejectWithValue }) => {
    try {
      console.log('[PUT] 🔄 Sending request to:', `${API_URL}/orders/${orderId}`);
      console.log('[PUT] 📦 Payload:', data);

      const response = await authorizedAxiosInstance.put(
        `${API_URL}/orders/${orderId}`,
        data, // payload gửi trực tiếp ở đây (chứ không nằm trong options)
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      console.log('[PUT] ✅ Success response:', response.data);
      return response.data;
    } catch (error) {
      console.error('[PUT] ❌ Error response:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


const initialState = {
  orders: [],
  ordersAdmin: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("[REDUX] Fetching orders - pending");
      })
      .addCase(getAllOrdersAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = Array.isArray(action.payload) ? action.payload : [];
        console.log("[REDUX] Orders fetched and stored in state:", state.orders);
      })
      .addCase(getAllOrdersAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.orders = [];
        console.error("[REDUX] Failed to fetch orders:", state.error);
      })
      .addCase(cancelOrderAPI.fulfilled, (state, action) => {
        const deletedId = action.payload.orderId;
        state.orders = state.orders.filter(order => order.order_id !== deletedId);
      })
      .addCase(cancelOrderAPI.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateOrderAPI.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o.order_id === action.payload.order_id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(getAllOrdersAdminAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrdersAdminAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersAdmin = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllOrdersAdminAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.ordersAdmin = [];
      });
  },
});

// 🧩 Sử dụng reselect để tạo Selector được memo hóa
export const selectOrders = createSelector(
  (state) => state.orders,
  (ordersState) => {
    console.log("[SELECTOR] Returning orders from state:", ordersState.orders);
    return ordersState.orders || [];
  }
);
export const selectAdminOrders = createSelector(
  (state) => state.orders,
  (ordersState) => ordersState.ordersAdmin || []
);

export const orderReducer = orderSlice.reducer;

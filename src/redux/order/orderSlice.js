import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import authorizedAxiosInstance from '~/utils/authorizeAxios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllOrdersAPI = createAsyncThunk(
  'order/getAllOrdersAPI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.get(`${API_URL}/orders/`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

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

export const getAllOrdersAdminAPI = createAsyncThunk(
  'order/getAllOrdersAdminAPI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.get(`${API_URL}/orders/all`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const updateOrderAPI = createAsyncThunk(
  'order/updateOrderAPI',
  async ({ orderId, data }, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.put(
        `${API_URL}/orders/${orderId}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
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
      })
      .addCase(getAllOrdersAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllOrdersAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.orders = [];
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

export const selectOrders = createSelector(
  (state) => state.orders,
  (ordersState) => ordersState.orders || []
);

export const selectAdminOrders = createSelector(
  (state) => state.orders,
  (ordersState) => ordersState.ordersAdmin || []
);

export const orderReducer = orderSlice.reducer;
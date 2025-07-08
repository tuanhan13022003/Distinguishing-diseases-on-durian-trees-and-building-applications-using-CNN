import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const createFormData = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return formData;
};

export const searchProductAPI = createAsyncThunk(
  'product/searchProductAPI',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/diseases/predict`, formData, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          "Accept": "application/json",
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
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
    clearError: (state) => {
      state.error = null;
    },
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

export const { clearError, resetProduct } = productSlice.actions;

export const selectCurrentProduct = (state) => state.product.currentProduct;
export const selectProductLoading = (state) => state.product.loading;
export const selectProductError = (state) => state.product.error;

export const productReducer = productSlice.reducer;
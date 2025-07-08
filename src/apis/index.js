import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const callAPI = async (method, endpoint, data = null) => {
  try {
    const response = await axios({
      method: method,
      url: `${API_URL}${endpoint}`,
      data: data,
      headers: {
        'ngrok-skip-browser-warning': 'true',
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const registerUserAPI = async (data) => {
  return callAPI('POST', '/users', data);
};

export const getAllProductsAPI = async (page = 1, perPage = 10) => {
  return callAPI('GET', `/medicines/?page=${page}&per_page=${perPage}`);
};

export const getFilteredProductsAPI = async (page = 1, perPage = 10, filters = {}) => {
  try {
    const response = await getAllProductsAPI(page, perPage);
    if (!response || !response.data) {
      console.error("Lỗi: Không có dữ liệu trả về.");
      return [];
    }
    let products = response.data;
    if (filters.categories && filters.categories.length > 0) {
      products = products.filter((product) =>
        filters.categories.includes(product.category)
      );
    }
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      products = products.filter((product) => {
        const price = parseFloat(product.price);
        return price >= filters.minPrice && price <= filters.maxPrice;
      });
    }
    if (filters.minRating !== undefined) {
      products = products.filter((product) => {
        const rating = parseFloat(product.rating) || 0;
        return rating >= filters.minRating;
      });
    }
    console.log('Danh sách sản phẩm sau khi lọc:', products);
    return products;
  } catch (error) {
    console.error("Lỗi khi lấy và lọc danh sách sản phẩm:", error.message);
    return [];
  }
};

export const getProductByIdAPI = async (medicineId) => {
  try {
    const response = await callAPI('GET', `/medicines/${medicineId}`);
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const updateProductAPI = async (id, data) => {
  return callAPI('PUT', `/products/${id}`, data);
};

export const deleteProductAPI = async (id) => {
  return callAPI('DELETE', `/products/${id}`);
};

export const createOrderAPI = async (data) => {
  return callAPI('POST', '/orders', data);
};

export const getAllOrdersAPI = async () => {
  return callAPI('GET', '/orders');
};

export const getOrderByIdAPI = async (id) => {
  return callAPI('GET', `/orders/${id}`);
};

export const getCartAPI = async () => {
  return callAPI('GET', '/api/cart');
};

export const addToCartAPI = async (data) => {
  return callAPI('POST', '/cart/items', data);
};

export const updateCartItemAPI = async (id, data) => {
  return callAPI('PUT', `/api/cart/${id}`, data);
};

export const deleteCartItemAPI = async (id) => {
  return callAPI('DELETE', `/api/cart/${id}`);
};
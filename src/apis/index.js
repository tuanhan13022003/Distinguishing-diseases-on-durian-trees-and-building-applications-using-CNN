import axios from "axios";

// Lấy URL API từ biến môi trường
const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

/**
 * Hàm gọi API chung với cấu hình mặc định
 * @param {String} method - Phương thức HTTP (GET, POST, PUT, DELETE)
 * @param {String} endpoint - Đường dẫn API
 * @param {Object} data - Dữ liệu gửi đi (nếu có)
 */
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

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * Đăng ký người dùng mới
 * @param {Object} data - Thông tin người dùng
 */
export const registerUserAPI = async (data) => {
  return callAPI('POST', '/users', data);
};

/**
 * Lấy danh sách sản phẩm
 */
export const getAllProductsAPI = async (page = 1, perPage = 10) => {
  return callAPI('GET', `/medicines/?page=${page}&per_page=${perPage}`);
};


/**
 * Lấy danh sách sản phẩm và lọc kết quả
 */
export const getFilteredProductsAPI = async (page = 1, perPage = 10, filters = {}) => {
  try {
    // Gọi API để lấy toàn bộ danh sách sản phẩm
    const response = await getAllProductsAPI(page, perPage);

    // Nếu phản hồi không hợp lệ, trả về null
    if (!response || !response.data) {
      console.error("❌ Lỗi: Không có dữ liệu trả về.");
      return [];
    }

    // Danh sách sản phẩm từ API
    let products = response.data;

    // Áp dụng bộ lọc nếu có
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

    console.log('✅ Danh sách sản phẩm sau khi lọc:', products);
    return products;
  } catch (error) {
    console.error("❌ Lỗi khi lấy và lọc danh sách sản phẩm:", error.message);
    return [];
  }
};




/**
 * Lấy thông tin sản phẩm theo ID
 * @param {Number} medicineId - ID của sản phẩm
 */
export const getProductByIdAPI = async (medicineId) => {
  try {
    const response = await callAPI('GET', `/medicines/${medicineId}`);
    console.log('API Response:', response);
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


/**
 * Cập nhật thông tin sản phẩm
 * @param {Number} id - ID của sản phẩm
 * @param {Object} data - Dữ liệu sản phẩm cần cập nhật
 */
export const updateProductAPI = async (id, data) => {
  return callAPI('PUT', `/products/${id}`, data);
};

/**
 * Xóa sản phẩm theo ID
 * @param {Number} id - ID của sản phẩm
 */
export const deleteProductAPI = async (id) => {
  return callAPI('DELETE', `/products/${id}`);
};

/**
 * Tạo đơn hàng mới
 * @param {Object} data - Thông tin đơn hàng
 */
export const createOrderAPI = async (data) => {
  return callAPI('POST', '/orders', data);
};

/**
 * Lấy danh sách đơn hàng
 */
export const getAllOrdersAPI = async () => {
  return callAPI('GET', '/orders');
};

/**
 * Lấy chi tiết đơn hàng theo ID
 * @param {Number} id - ID của đơn hàng
 */
export const getOrderByIdAPI = async (id) => {
  return callAPI('GET', `/orders/${id}`);
};

/**
 * ==============================
 *        GIỎ HÀNG - CART API
 * ==============================
 */

/**
 * Lấy danh sách giỏ hàng
 */
export const getCartAPI = async () => {
  return callAPI('GET', '/api/cart');
};

/**
 * Thêm sản phẩm vào giỏ hàng
 * @param {Object} data - Thông tin sản phẩm
 */
export const addToCartAPI = async (data) => {
  return callAPI('POST', '/cart/items', data);
};

/**
 * Cập nhật số lượng sản phẩm trong giỏ hàng
 * @param {Number} id - ID của sản phẩm
 * @param {Object} data - Dữ liệu cần cập nhật (quantity)
 */
export const updateCartItemAPI = async (id, data) => {
  return callAPI('PUT', `/api/cart/${id}`, data);
};

/**
 * Xóa sản phẩm khỏi giỏ hàng
 * @param {Number} id - ID của sản phẩm
 */
export const deleteCartItemAPI = async (id) => {
  return callAPI('DELETE', `/api/cart/${id}`);
};
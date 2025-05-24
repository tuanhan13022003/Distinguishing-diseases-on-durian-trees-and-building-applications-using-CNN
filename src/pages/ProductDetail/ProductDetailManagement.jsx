
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Rating,
  IconButton,
  CardMedia,
  Stack,
  Paper,
} from '@mui/material';
import { ShoppingCart, Add, Remove, LocalShipping, Loop, FavoriteBorder } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectCurrentUser } from '~/redux/user/userSlice';
import { getProductByIdAPI, addToCartAPI } from '~/apis';
import { useLoading } from '~/context';
import authorizedAxiosInstance from '~/utils/authorizeAxios';
// Quantity Selector Component
const QuantitySelector = ({ quantity, setQuantity }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      border: '1px solid',
      borderColor: 'grey.500',
      borderRadius: 2,
      px: 0.5,
      width: 120,
    }}
  >
    <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))} sx={{ color: 'primary.main' }}>
      <Remove />
    </IconButton>
    <Typography sx={{ px: { xs: 0.5, sm: 1 }, fontWeight: 600 }}>{quantity}</Typography>
    <IconButton onClick={() => setQuantity(quantity + 1)} sx={{ color: 'primary.main' }}>
      <Add />
    </IconButton>
  </Box>
);

// Delivery Info Component
const DeliveryInfo = () => (
  <Stack spacing={2}>
    {[
      {
        icon: <LocalShipping sx={{ color: 'primary.main', fontSize: 28 }} />,
        title: 'Free Delivery',
        text: 'Enter your postal code for Delivery Availability',
      },
      {
        icon: <Loop sx={{ color: 'primary.main', fontSize: 28 }} />,
        title: 'Return Policy',
        text: 'Free 30 Days Delivery Returns. Details',
      },
    ].map((info, index) => (
      <Paper key={index} elevation={3} sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        {info.icon}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {info.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {info.text}
          </Typography>
        </Box>
      </Paper>
    ))}
  </Stack>
);

function ProductDetailManagement() {
  const [quantity, setQuantity] = useState(1);
  const [medicine, setMedicine] = useState(null);
  const { id } = useParams();
  const { setIsLoading } = useLoading();
  const currentUser = useSelector(selectCurrentUser);


  const getImageSrc = () => {
    if (medicine?.image_base64) {
      console.log("🖼️ Sử dụng ảnh Base64:");
      return `data:image/jpeg;base64,${medicine.image_base64}`;
    }
    if (medicine?.image_url && medicine.image_url.startsWith('http')) {
      console.log("🖼️ Sử dụng URL ảnh:", medicine.image_url);
      return medicine.image_url;
    }
    console.log("🖼️ Sử dụng ảnh mặc định:");
    return 'https://via.placeholder.com/400';
  };
  


  // Fetch product details
  const fetchMedicineDetails = async (productId) => {
    try {
      setIsLoading(true);
      const response = await getProductByIdAPI(productId);
      setMedicine(response);
      console.log('✅ Fetched product details:', response);
    } catch (error) {
      console.error('❌ Error fetching product details:', error);
      toast.error('Lỗi khi lấy thông tin sản phẩm.');
    } finally {
      setIsLoading(false);
    }
  };

const handleAddToCart = async () => {
  console.log("🟢 handleAddToCart called!");

  if (!currentUser) {
    alert('⚠️ Vui lòng đăng nhập để thêm vào giỏ hàng!');
    return;
  }

  try {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      alert('❌ Không tìm thấy thông tin người dùng hoặc token!');
      return;
    }

    const fullToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
    const medicineId = medicine?.medicine_id || medicine?.id;

    if (!medicineId) {
      alert('❌ Không tìm thấy ID sản phẩm!');
      return;
    }

    const cartResponse = await authorizedAxiosInstance.get('/cart/', {
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Authorization: fullToken,
        "Content-Type": "application/json",
      },
      params: { user_id: parseInt(userId) },
    });

    const existingItem = cartResponse.data.items.find(
      item => item.medicine.medicine_id === medicineId
    );

    let cartItem;
    if (existingItem) {
      const newQuantity = existingItem.quantity + parseInt(quantity);
      cartItem = {
        medicine_id: medicineId,
        quantity: newQuantity,
        user_id: parseInt(userId),
      };

      await authorizedAxiosInstance.put(
        `/cart/items/${existingItem.item_id}`,
        cartItem,
        {
          baseURL: import.meta.env.VITE_API_URL,
          headers: {
            Authorization: fullToken,
            "Content-Type": "application/json",
          },
        }
      );

      alert(`✅ Đã cập nhật số lượng sản phẩm trong giỏ hàng lên: ${newQuantity}`);
    } else {
      cartItem = {
        medicine_id: medicineId,
        quantity: parseInt(quantity),
        user_id: parseInt(userId),
      };

      await authorizedAxiosInstance.post('/cart/items', cartItem, {
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          Authorization: fullToken,
          "Content-Type": "application/json",
        },
      });

      alert('✅ Sản phẩm đã được thêm vào giỏ hàng.');
    }
  } catch (error) {
    console.error('❌ Lỗi khi thêm vào giỏ hàng:', error);
    alert(
      error?.response?.data?.message ||
      error?.message ||
      '❌ Đã xảy ra lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau.'
    );
  }
};







  useEffect(() => {
    if (id) fetchMedicineDetails(id);
  }, [id]);

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} lg={4}>
            <CardMedia
              component="img"
              image={getImageSrc()}
              alt={medicine?.name}
              sx={{ height: 380, borderRadius: 1, objectFit: 'cover', mt: 10, ml: 1 }}
            />
          </Grid>
          <Grid item xs={12} lg={7.5} sx={{ ml: 6 }}>
            <Typography variant="h4" gutterBottom>
              {medicine?.name}
            </Typography>
            <Rating value={4.5} readOnly />
            <Typography variant="h5" color="primary" gutterBottom>
              ${medicine?.price}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {medicine?.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, mb: 2 }}>
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                sx={{ whiteSpace: 'nowrap' }}  // Đảm bảo nút không bị ngắt dòng
              >
                Thêm vào giỏ hàng
              </Button>
            </Box>

            <DeliveryInfo />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductDetailManagement;

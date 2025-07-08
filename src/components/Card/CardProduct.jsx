import React from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '~/redux/user/userSlice';

import { toast } from 'react-toastify';
import { selectCurrentCart, addProductToCartAPI, updateCartItemAPI, getAllCartAPI }  from '~/redux/card/productSlice';

export default function CardProduct({ product }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentCart = useSelector(selectCurrentCart);
  const getImageSrc = () => {
    return product.image ? product.image : 'https://via.placeholder.com/345x200?text=No+Image';
  };

  console.log("Token từ localStorage tai1:ss", localStorage.getItem("token"));

const handleAddToCart = async () => {
  if (!currentUser) {
    toast.warn('Vui lòng đăng nhập để thêm vào giỏ hàng!');
    alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
    return;
  }

  try {
    const medicineId = product.medicine_id || product.id;
    if (!medicineId) {
      console.error('Lỗi: Không tìm thấy ID sản phẩm');
      toast.error('Lỗi: Không tìm thấy ID sản phẩm!');
      alert('Lỗi: Không tìm thấy ID sản phẩm!');
      return;
    }

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('Lỗi: Không tìm thấy user_id');
      toast.error('Lỗi: Không tìm thấy thông tin người dùng!');
      alert('Lỗi: Không tìm thấy thông tin người dùng!');
      return;
    }

    const cartResponse = await dispatch(getAllCartAPI(userId)).unwrap();
    const currentCartItems = cartResponse?.items || [];

    const existingItem = currentCartItems.find(item => item.medicine.medicine_id === medicineId);

    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;
      await dispatch(updateCartItemAPI({ itemId: existingItem.item_id, quantity: newQuantity, userId })).unwrap();
      toast.success(`Số lượng sản phẩm trong giỏ hàng hiện tại: ${newQuantity}.`);
      alert(`Số lượng sản phẩm trong giỏ hàng hiện tại: ${newQuantity}.`);
    } else {
      const cartItem = {
        medicine_id: medicineId,
        quantity: 1,
        user_id: userId,
      };

      console.log('Dữ liệu gửi lên API:', cartItem);

      await dispatch(addProductToCartAPI(cartItem)).unwrap();
      toast.success('Sản phẩm đã được thêm vào giỏ hàng.');
      alert('Sản phẩm đã được thêm vào giỏ hàng.');
    }
  } catch (error) {
    console.error('Lỗi khi thêm vào giỏ hàng:', error);
    toast.error('Lỗi khi thêm vào giỏ hàng!');
    alert('Không thể thêm sản phẩm vào giỏ hàng.');
  }
};


  return (
    <Card sx={{ width: 220 }}>
      <CardMedia
        sx={{
          height: 200,
          position: 'relative',
          overflow: 'hidden',
          '&:hover .hover-button': {
            bottom: '10px',
            opacity: 1,
          },
          '&:hover .quick-actions': {
            opacity: 1,
          },
        }}
        image={getImageSrc()}
        title={product.name}
      >
        <Stack
          className="quick-actions"
          spacing={1}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            opacity: 0,
            transition: 'opacity 0.3s',
          }}
        >
          <IconButton sx={{ bgcolor: 'white' }}>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
          <IconButton sx={{ bgcolor: 'white' }}>
            <VisibilityOutlinedIcon />
          </IconButton>
        </Stack>
        <Button
          className="hover-button"
          variant="contained"
          startIcon={<LocalGroceryStoreOutlinedIcon />}
          onClick={handleAddToCart}
          sx={{
            width: '100%',
            position: 'absolute',
            bottom: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0,
            transition: 'all 0.3s ease-in-out',
            backgroundColor: '#73C7C7',
            color: 'white',
          }}
        >
          Thêm vào giỏ hàng
        </Button>
      </CardMedia>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component={Link}
//          to={`/medicine/${product.medicine_id}`}
          to={`/medicine/${product.medicine_id || product.id}`}

          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'red' }}>
            {product.price} VND
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Rating value={product.rating || 0} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviews || 0})
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}


import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Checkbox,
  styled,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  getAllCartAPI,
  updateCartItemAPI,
  deleteProductFromCartAPI,
  checkoutCartAPI,
} from '~/redux/card/productSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import ButtonContainedPrimary from '~/components/Buttton/ButtonContainedPrimary'
import { yellow } from '@mui/material/colors'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  padding: theme.spacing(2),
  fontSize: '0.95rem',
  borderBottom: `1px solid ${theme.palette.grey[200]}`
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey[50]
  }
}))

function CardPageManagement() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const [cartItems, setCartItems] = useState([])
  const [quantities, setQuantities] = useState({})
  const [selectedItems, setSelectedItems] = useState([])


  const fetchCart = async () => {
    try {
      if (currentUser) {
        const userId = localStorage.getItem('user_id');
        const response = await dispatch(getAllCartAPI(userId)).unwrap();
        setCartItems(response.items || []);

        const initialQuantities = {};
        response.items.forEach(item => {
          initialQuantities[item.medicine.medicine_id] = item.quantity;
        });
        setQuantities(initialQuantities);
      }
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
      toast.error('Không thể tải giỏ hàng. Vui lòng thử lại.');
    }
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity
  }

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };


  const isSelected = (itemId) => selectedItems.includes(itemId);


  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      toast.error(' Vui lòng chọn ít nhất một sản phẩm.');
      return;
    }

    try {
      const userId = localStorage.getItem('user_id');
      await dispatch(checkoutCartAPI({ userId: parseInt(userId), selectedItems })).unwrap();


      alert('Đặt hàng thành công!');

      setSelectedItems([]);
      await fetchCart();
    } catch (error) {
      console.error('Lỗi khi thanh toán:', error);
      toast.error('Thanh toán thất bại.');
    }
  };

  const handleQuantityChange = async (itemId, value) => {
    const newValue = parseInt(value) || 1;
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, Math.min(99, newValue))
    }));

    try {
      await dispatch(updateCartItemAPI({ itemId, quantity: newValue })).unwrap();
      setCartItems((prev) =>
        prev.map(item =>
          item.medicine.medicine_id === itemId ? { ...item, quantity: newValue } : item
        )
      );
      toast.success('Cập nhật số lượng thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng:', error);
      toast.error('Không thể cập nhật số lượng.');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const existingItem = cartItems.find(item => item.medicine.medicine_id === itemId);
      if (!existingItem) {
        alert('Sản phẩm không tồn tại trong giỏ hàng.');
        toast.error('Sản phẩm không tồn tại trong giỏ hàng.');
        return;
      }

      await dispatch(deleteProductFromCartAPI({ itemId: existingItem.item_id })).unwrap();

      setCartItems(prev => prev.filter(item => item.medicine.medicine_id !== itemId));
      setQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[itemId];
        return newQuantities;
      });

      toast.success('Sản phẩm đã được xóa khỏi giỏ hàng.');
      alert('Sản phẩm đã được xóa khỏi giỏ hàng.');
    } catch (error) {
      console.error('Error removing item:', error);

      if (error.response?.status === 404) {
        toast.error('Sản phẩm không tồn tại hoặc đã bị xóa.');
        alert('Sản phẩm không tồn tại hoặc đã bị xóa.');
      } else {
        toast.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng.');
        alert(' Lỗi khi xóa sản phẩm khỏi giỏ hàng.');
      }
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + item.medicine.price * (quantities[item.medicine.medicine_id] || 1);
  }, 0);

  useEffect(() => {
    fetchCart();
  }, [])

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Giỏ Hàng Của Bạn
      </Typography>

      <Box>
        <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Chọn</StyledTableCell>
                <StyledTableCell>Sản phẩm</StyledTableCell>
                <StyledTableCell>Giá</StyledTableCell>
                <StyledTableCell>Số lượng</StyledTableCell>
                <StyledTableCell>Thành tiền</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <StyledTableRow key={item.medicine.medicine_id}>
                  <TableCell>
                    <Checkbox
                      checked={isSelected(item.item_id)}
                      onChange={() => handleSelectItem(item.item_id)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>{item.medicine.name}</TableCell>
                  <TableCell>{item.medicine.price} VND</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={quantities[item.medicine.medicine_id] || 1}
                      onChange={(e) => handleQuantityChange(item.medicine.medicine_id, e.target.value)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{calculateSubtotal(item.medicine.price, quantities[item.medicine.medicine_id] || 1)} VND</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveItem(item.medicine.medicine_id)} size="small">
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6">Tổng: {totalAmount} VND</Typography>
          <ButtonContainedPrimary
  title="Đặt Hàng"
  onClick={handleCheckout}
  sx={{
    width: '164px',
    height: '48px',
    right: '30rem',
    padding: '2px 4px',

  }}
/>


        </Box>
      </Box>
    </Container>
  )
}

export default CardPageManagement

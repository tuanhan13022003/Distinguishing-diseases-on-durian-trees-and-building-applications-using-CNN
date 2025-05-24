

// import React, { useState, useEffect } from 'react'
// import {
//   Box,
//   Button,
//   Container,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   styled,
// } from '@mui/material'
// import { Close as CloseIcon } from '@mui/icons-material'
// import { Link } from 'react-router-dom'
// import ButtonContainedPrimary from '~/components/Buttton/ButtonContainedPrimary'
// import { getAllCartAPI, updateCartItemAPI, deleteProductFromCartAPI } from '~/redux/card/productSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import { selectCurrentUser } from '~/redux/user/userSlice'
// import { toast } from 'react-toastify';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   fontWeight: 600,
//   padding: theme.spacing(2),
//   fontSize: '0.95rem',
//   borderBottom: `1px solid ${theme.palette.grey[200]}`
// }))

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:hover': {
//     backgroundColor: theme.palette.grey[50]
//   }
// }))

// function CardPageManagement() {
//   const dispatch = useDispatch()
//   const currentUser = useSelector(selectCurrentUser)

//   const [cartItems, setCartItems] = useState([])
//   const [quantities, setQuantities] = useState({})


// const fetchCart = async () => {
//   try {
//     if (currentUser) {
//       // Kiểm tra token trước khi gọi API
//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert('Bạn chưa đăng nhập. Vui lòng đăng nhập.');
//         navigate('/login');
//         return;
//       }

//       // Lấy user_id từ localStorage
//       const userId = localStorage.getItem('user_id');
//       if (!userId) {
//         alert('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
//         navigate('/login');
//         return;
//       }

//       const response = await dispatch(getAllCartAPI(userId)).unwrap();
//       setCartItems(response.items || []);

//       const initialQuantities = {};
//       response.items.forEach(item => {
//         initialQuantities[item.medicine.medicine_id] = item.quantity;
//       });
//       setQuantities(initialQuantities);
//     }
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//   }
// };



//   // // Cập nhật số lượng sản phẩm
//   // const handleQuantityChange = async (itemId, value) => {
//   //   const newValue = parseInt(value) || 1
//   //   setQuantities(prev => ({
//   //     ...prev,
//   //     [itemId]: Math.max(1, Math.min(99, newValue))
//   //   }))
//   //   try {
//   //     await dispatch(updateCartItemAPI({ itemId, quantity: newValue })).unwrap()
//   //   } catch (error) {
//   //     console.error('Error updating quantity:', error)
//   //   }
//   // }




// // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
// const handleQuantityChange = async (itemId, value) => {
//   const newValue = parseInt(value) || 1;
//   setQuantities(prev => ({
//     ...prev,
//     [itemId]: Math.max(1, Math.min(99, newValue)) // Giới hạn từ 1 đến 99
//   }));

//   try {
//     // Lấy user_id từ localStorage
//     const userId = localStorage.getItem('user_id');
//     if (!userId) {
//       toast.error('❌ Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
//       alert('❌ Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
//       return;
//     }

//     // Tìm sản phẩm trong giỏ hàng
//     const existingItem = cartItems.find(item => item.medicine.medicine_id === itemId);
//     if (!existingItem) {
//       toast.error('❌ Sản phẩm không tồn tại trong giỏ hàng.');
//       alert('❌ Sản phẩm không tồn tại trong giỏ hàng.');
//       return;
//     }

//     await dispatch(updateCartItemAPI({ 
//       itemId: existingItem.item_id, 
//       quantity: newValue, 
//       userId: parseInt(userId)  
//     })).unwrap();

//     setCartItems(prev => 
//       prev.map(item => 
//         item.medicine.medicine_id === itemId ? { ...item, quantity: newValue } : item
//       )
//     );

//     toast.success('✅ Cập nhật số lượng thành công!');
//     console.log(`🚀 ~ Cập nhật số lượng sản phẩm ID: ${itemId} lên ${newValue}`);
//   } catch (error) {
//     console.error('❌ Error updating quantity:', error);
//     toast.error('❌ Lỗi khi cập nhật số lượng.');
//     alert('❌ Lỗi khi cập nhật số lượng.');
//   }
// };



// // Hàm xóa sản phẩm khỏi giỏ hàng
// const handleRemoveItem = async (itemId) => {
//   try {
//     // Tìm sản phẩm trong giỏ hàng trước khi xóa
//     const existingItem = cartItems.find(item => item.medicine.medicine_id === itemId);
//     if (!existingItem) {
//       alert('Sản phẩm không tồn tại trong giỏ hàng.');
//       toast.error('❌ Sản phẩm không tồn tại trong giỏ hàng.');
//       return;
//     }

//     // Gọi API xóa sản phẩm
//     await dispatch(deleteProductFromCartAPI({ itemId: existingItem.item_id })).unwrap();

//     // Cập nhật lại danh sách giỏ hàng sau khi xóa
//     setCartItems(prev => prev.filter(item => item.medicine.medicine_id !== itemId));
//     setQuantities(prev => {
//       const newQuantities = { ...prev };
//       delete newQuantities[itemId];
//       return newQuantities;
//     });

//     // Thông báo xóa thành công
//     toast.success('✅ Sản phẩm đã được xóa khỏi giỏ hàng.');
//     alert('✅ Sản phẩm đã được xóa khỏi giỏ hàng.');
//     console.log(`🚀 ~ Xóa sản phẩm ID: ${itemId} thành công`);
//   } catch (error) {
//     console.error('Error removing item:', error);

//     // Phân loại lỗi
//     if (error.response?.status === 404) {
//       toast.error('❌ Sản phẩm không tồn tại hoặc đã bị xóa.');
//       alert('❌ Sản phẩm không tồn tại hoặc đã bị xóa.');
//     } else {
//       toast.error('❌ Lỗi khi xóa sản phẩm khỏi giỏ hàng.');
//       alert('❌ Lỗi khi xóa sản phẩm khỏi giỏ hàng.');
//     }
//   }
// };



//   const calculateSubtotal = (price, quantity) => {
//     return price * quantity
//   }

//   // Tính tổng tiền của giỏ hàng
//   const totalAmount = cartItems.reduce((sum, item) => {
//     return sum + calculateSubtotal(item.medicine.price, quantities[item.medicine.medicine_id] || 1)
//   }, 0)

//   useEffect(() => {
//     fetchCart()
//   }, [])

//   return (
//     <Container maxWidth="lg" sx={{ py: 6 }}>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#2C3E50' }}>
//         Giỏ Hàng Của Bạn
//       </Typography>

//       <Box>
//         <TableContainer
//           component={Paper}
//           sx={{
//             mb: 4,
//             borderRadius: 2,
//             boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//           }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>Product</StyledTableCell>
//                 <StyledTableCell>Price</StyledTableCell>
//                 <StyledTableCell>Quantity</StyledTableCell>
//                 <StyledTableCell>Subtotal</StyledTableCell>
//                 <StyledTableCell width={50}></StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cartItems.map((item) => (
//                 <StyledTableRow key={item.medicine.medicine_id}>
//                   <TableCell>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                       <Paper
//                         elevation={0}
//                         sx={{
//                           width: 80,
//                           height: 80,
//                           borderRadius: 2,
//                           overflow: 'hidden',
//                           border: '1px solid',
//                           borderColor: 'grey.200'
//                         }}
//                       >
//                         <img
//                           src={item.medicine.image_url}
//                           alt={item.medicine.name}
//                           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                         />
//                       </Paper>
//                       <Box>
//                         <Typography sx={{ fontWeight: 600 }}>{item.medicine.name}</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {item.medicine.description}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </TableCell>
//                   <TableCell>${item.medicine.price}</TableCell>
//                   <TableCell>
//                     <TextField
//                       type="number"
//                       value={quantities[item.medicine.medicine_id] || 1}
//                       onChange={(e) => handleQuantityChange(item.medicine.medicine_id, e.target.value)}
//                       sx={{ width: '100px' }}
//                       size="small"
//                     />
//                   </TableCell>
//                   <TableCell>${calculateSubtotal(item.medicine.price, quantities[item.medicine.medicine_id] || 1)}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleRemoveItem(item.medicine.medicine_id)} size="small">
//                       <CloseIcon />
//                     </IconButton>
//                   </TableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box sx={{ textAlign: 'right' }}>
//           <Typography variant="h6">Total: ${totalAmount}</Typography>
//           <Link to='/checkout'>
//             <ButtonContainedPrimary title='Đặt Hàng' />
//           </Link>
//         </Box>
//       </Box>
//     </Container>
//   )
// }

// export default CardPageManagement
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

  // 🛒 Lấy giỏ hàng từ API
  const fetchCart = async () => {
    try {
      if (currentUser) {
        const userId = localStorage.getItem('user_id');
        const response = await dispatch(getAllCartAPI(userId)).unwrap();
        console.log('🚀 ~ Giỏ hàng:', response.items);
        setCartItems(response.items || []);

        const initialQuantities = {};
        response.items.forEach(item => {
          initialQuantities[item.medicine.medicine_id] = item.quantity;
        });
        setQuantities(initialQuantities);
      }
    } catch (error) {
      console.error('❌ Lỗi khi lấy giỏ hàng:', error);
      toast.error('❌ Không thể tải giỏ hàng. Vui lòng thử lại.');
    }
  };

     const calculateSubtotal = (price, quantity) => {
       return price * quantity
     }

  //   // Tính tổng tiền của giỏ hàng
  //   const totalAmount = cartItems.reduce((sum, item) => {
  //     return sum + calculateSubtotal(item.medicine.price, quantities[item.medicine.medicine_id] || 1)
  //   }, 0)
  // ✅ Xử lý chọn sản phẩm
  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
    console.log('📝 ~ Danh sách sản phẩm đã chọn:', selectedItems);
  };

  // 🔄 Kiểm tra sản phẩm đã chọn
  const isSelected = (itemId) => selectedItems.includes(itemId);

  // 📝 Gọi API thanh toán
  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      toast.error('❌ Vui lòng chọn ít nhất một sản phẩm.');
      return;
    }

    try {
      const userId = localStorage.getItem('user_id');
      await dispatch(checkoutCartAPI({ userId: parseInt(userId), selectedItems })).unwrap();

      // Hiển thị thông báo thành công
      alert('✅ Đặt hàng thành công!');

      // Làm mới giỏ hàng sau khi thanh toán
      setSelectedItems([]);
      await fetchCart();
    } catch (error) {
      console.error('❌ Lỗi khi thanh toán:', error);
      toast.error('❌ Thanh toán thất bại.');
    }
  };

  // ✏️ Cập nhật số lượng sản phẩm
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
      toast.success('✅ Cập nhật số lượng thành công!');
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật số lượng:', error);
      toast.error('❌ Không thể cập nhật số lượng.');
    }
  };

// Hàm xóa sản phẩm khỏi giỏ hàng
const handleRemoveItem = async (itemId) => {
  try {
    // Tìm sản phẩm trong giỏ hàng trước khi xóa
    const existingItem = cartItems.find(item => item.medicine.medicine_id === itemId);
    if (!existingItem) {
      alert('Sản phẩm không tồn tại trong giỏ hàng.');
      toast.error('❌ Sản phẩm không tồn tại trong giỏ hàng.');
      return;
    }

    // Gọi API xóa sản phẩm
    await dispatch(deleteProductFromCartAPI({ itemId: existingItem.item_id })).unwrap();

    // Cập nhật lại danh sách giỏ hàng sau khi xóa
    setCartItems(prev => prev.filter(item => item.medicine.medicine_id !== itemId));
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[itemId];
      return newQuantities;
    });

    // Thông báo xóa thành công
    toast.success('✅ Sản phẩm đã được xóa khỏi giỏ hàng.');
    alert('✅ Sản phẩm đã được xóa khỏi giỏ hàng.');
    console.log(`🚀 ~ Xóa sản phẩm ID: ${itemId} thành công`);
  } catch (error) {
    console.error('Error removing item:', error);

    // Phân loại lỗi
    if (error.response?.status === 404) {
      toast.error('❌ Sản phẩm không tồn tại hoặc đã bị xóa.');
      alert('❌ Sản phẩm không tồn tại hoặc đã bị xóa.');
    } else {
      toast.error('❌ Lỗi khi xóa sản phẩm khỏi giỏ hàng.');
      alert('❌ Lỗi khi xóa sản phẩm khỏi giỏ hàng.');
    }
  }
};

  // 💲 Tính tổng tiền của giỏ hàng
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
                  <TableCell>${item.medicine.price}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={quantities[item.medicine.medicine_id] || 1}
                      onChange={(e) => handleQuantityChange(item.medicine.medicine_id, e.target.value)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>${calculateSubtotal(item.medicine.price, quantities[item.medicine.medicine_id] || 1)}</TableCell>
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
          <Typography variant="h6">Tổng: ${totalAmount}</Typography>
          <ButtonContainedPrimary title='Đặt Hàng' onClick={handleCheckout} />
        </Box>
      </Box>
    </Container>
  )
}

export default CardPageManagement

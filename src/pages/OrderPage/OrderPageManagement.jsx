// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectOrders, getAllOrdersAPI } from '~/redux/order/orderSlice';

// function OrderPageManagement() {
//   const dispatch = useDispatch();
//   const orders = useSelector(selectOrders);

//   useEffect(() => {
//     console.log("[COMPONENT MOUNT] Dispatching getAllOrdersAPI");
//     dispatch(getAllOrdersAPI());
//   }, [dispatch]);

//   console.log("[COMPONENT RENDER] Current orders from Redux:", orders);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Danh sách đơn hàng</h2>
//       {orders.length === 0 ? (
//         <p>Không có đơn hàng nào.</p>
//       ) : (
//         orders.map((order) => (
//           <div 
//             key={order.order_id} 
//             style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
//           >
//             <h3>Order ID: {order.order_id}</h3>
//             <p>User ID: {order.user_id}</p>
//             <p>Ngày tạo: {new Date(order.created_at).toLocaleString()}</p>
//             <p>Tổng tiền: {order.total_price} VND</p>
//             <p>Trạng thái: {order.status}</p>
//             <p>Địa chỉ giao hàng: {order['Shipping address']}</p>

//             <h4>Chi tiết sản phẩm:</h4>
//             {order.details && order.details.map((detail) => (
//               <div 
//                 key={detail.detail_id} 
//                 style={{ padding: '10px', border: '1px solid #aaa', margin: '5px 0', borderRadius: '6px' }}
//               >
//                 <p>Sản phẩm: {detail.medicine?.name || 'Không có tên'}</p>
//                 <p>Số lượng: {detail.quantity}</p>
//                 <p>Giá: {detail.unit_price} VND</p>
//                 <p>Thành tiền: {detail.subtotal} VND</p>
//                 {detail.medicine?.image_base64 && (
//                   <img 
//                     src={`data:image/jpeg;base64,${detail.medicine.image_base64}`} 
//                     alt={detail.medicine.name} 
//                     style={{ width: '100px', height: '100px', marginRight: '10px' }}
//                   />
//                 )}
//                 <p>Mô tả: {detail.medicine?.description || 'Không có mô tả'}</p>
//                 <p>Giá gốc: {detail.medicine?.price} VND</p>
//                 {detail.medicine?.discounted_price && (
//                   <p>Giá khuyến mãi: {detail.medicine.discounted_price} VND</p>
//                 )}
//                 <p>Còn lại: {detail.medicine?.stock || 'Không xác định'}</p>
//                 <p>Miễn phí vận chuyển: {detail.medicine?.is_freeship ? 'Có' : 'Không'}</p>
//                 <p>Cách sử dụng: {detail.medicine?.how_to_use || 'Không có hướng dẫn'}</p>
//               </div>
//             ))}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default OrderPageManagement;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectOrders, getAllOrdersAPI } from '~/redux/order/orderSlice';
// import { Button, Collapse, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';

// const statusSteps = ['Đã xác nhận', 'Chờ xuất hàng', 'Đang giao hàng', 'Giao thành công'];

// function OrderPageManagement() {
//   const dispatch = useDispatch();
//   const orders = useSelector(selectOrders);
//   const [expandedOrderIds, setExpandedOrderIds] = useState([]);

//   useEffect(() => {
//     dispatch(getAllOrdersAPI());
//   }, [dispatch]);

//   const toggleExpand = (orderId) => {
//     setExpandedOrderIds((prev) =>
//       prev.includes(orderId)
//         ? prev.filter((id) => id !== orderId)
//         : [...prev, orderId]
//     );
//   };

//   const getStatusIndex = (status) => {
//     return statusSteps.indexOf(status);
//   };

//   return (
//     <Box padding={4}>
//       <Typography variant="h4" gutterBottom>
//         Danh sách đơn hàng
//       </Typography>

//       {orders.length === 0 ? (
//         <Typography>Không có đơn hàng nào.</Typography>
//       ) : (
//         orders.map((order) => {
//           const isExpanded = expandedOrderIds.includes(order.order_id);
//           const activeStep = getStatusIndex(order.status);

//           return (
//             <Box
//               key={order.order_id}
//               border="1px solid #ccc"
//               borderRadius={2}
//               padding={3}
//               marginBottom={3}
//               boxShadow={1}
//             >
//               <Typography variant="h6">Mã đơn hàng: {order.order_id}</Typography>
//               <Typography>Người dùng: {order.user_id}</Typography>
//               <Typography>Ngày tạo: {new Date(order.created_at).toLocaleString()}</Typography>
//               <Typography>Tổng tiền: {order.total_price} VND</Typography>
//               <Typography>Địa chỉ giao hàng: {order['Shipping address']}</Typography>

//               <Stepper activeStep={activeStep} alternativeLabel sx={{ margin: '20px 0' }}>
//                 {statusSteps.map((label) => (
//                   <Step key={label}>
//                     <StepLabel>{label}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>

//               <Box display="flex" gap={2}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => toggleExpand(order.order_id)}
//                 >
//                   {isExpanded ? 'Ẩn chi tiết' : 'Xem chi tiết'}
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={() => alert(`Hủy đơn hàng: ${order.order_id}`)}
//                 >
//                   Huỷ đơn hàng
//                 </Button>
//               </Box>

//               <Collapse in={isExpanded}>
//                 <Box mt={2}>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     Chi tiết sản phẩm:
//                   </Typography>
//                   {order.details?.map((detail) => (
//                     <Box
//                       key={detail.detail_id}
//                       border="1px dashed #aaa"
//                       borderRadius={2}
//                       padding={2}
//                       marginTop={1}
//                     >
//                       <Typography>Sản phẩm: {detail.medicine?.name || 'Không có tên'}</Typography>
//                       <Typography>Số lượng: {detail.quantity}</Typography>
//                       <Typography>Giá: {detail.unit_price} VND</Typography>
//                       <Typography>Thành tiền: {detail.subtotal} VND</Typography>
//                       {detail.medicine?.image_base64 && (
//                         <img
//                           src={`data:image/jpeg;base64,${detail.medicine.image_base64}`}
//                           alt={detail.medicine.name}
//                           style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
//                         />
//                       )}
//                       <Typography>Mô tả: {detail.medicine?.description || 'Không có mô tả'}</Typography>
//                       <Typography>Giá gốc: {detail.medicine?.price} VND</Typography>
//                       {detail.medicine?.discounted_price && (
//                         <Typography>Giá khuyến mãi: {detail.medicine.discounted_price} VND</Typography>
//                       )}
//                       <Typography>Còn lại: {detail.medicine?.stock || 'Không xác định'}</Typography>
//                       <Typography>
//                         Miễn phí vận chuyển: {detail.medicine?.is_freeship ? 'Có' : 'Không'}
//                       </Typography>
//                       <Typography>
//                         Cách sử dụng: {detail.medicine?.how_to_use || 'Không có hướng dẫn'}
//                       </Typography>
//                     </Box>
//                   ))}
//                 </Box>
//               </Collapse>
//             </Box>
//           );
//         })
//       )}
//     </Box>
//   );
// }

// export default OrderPageManagement;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrders, getAllOrdersAPI } from '~/redux/order/orderSlice';
import OrderCard from './OrderCard';
import { Box, Typography } from '@mui/material';

function OrderPageManagement() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getAllOrdersAPI());
  }, [dispatch]);

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Danh sách đơn hàng
      </Typography>

      {orders.length === 0 ? (
        <Typography>Không có đơn hàng nào.</Typography>
      ) : (
        orders.map((order) => <OrderCard key={order.order_id} order={order} />)
      )}
    </Box>
  );
}

export default OrderPageManagement;

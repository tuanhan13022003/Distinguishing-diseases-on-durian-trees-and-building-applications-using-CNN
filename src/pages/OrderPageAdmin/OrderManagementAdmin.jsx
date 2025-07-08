import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrdersAdminAPI,
  selectAdminOrders, 
  updateOrderAPI
} from '~/redux/order/orderSlice';

import {
  Container, Typography, Box, TextField, Button, CircularProgress
} from '@mui/material';
import OrderTableAdmin from './OrderTableAdmin';
import OrderDetailDialogAdmin from './OrderDetailDialogAdmin';
import { Bold } from 'lucide-react';

export default function OrderManagementAdmin() {
  const dispatch = useDispatch();
  const orders = useSelector(selectAdminOrders); 
  const loading = useSelector((state) => state.orders.loading);

  const [searchId, setSearchId] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersAdminAPI());
    
  }, [dispatch]);

  useEffect(() => {
    if (searchId) {
      setFilteredOrders(orders.filter(o => o.order_id.toString().includes(searchId)));
    } else {
      setFilteredOrders(orders);
    }
  }, [searchId, orders]);

const handleUpdate = (orderId, updatedData) => {
  dispatch(updateOrderAPI({ orderId, data: updatedData }))
    .then(() => {
      dispatch(getAllOrdersAdminAPI()); 
    });
};

  return (
    <Container maxWidth="lg" sx={{marginTop: 3}}>
      <Typography variant="h4"  gutterBottom>Quản lý đơn hàng</Typography>
      <Box display="flex" gap={2} my={3}>
        <TextField
          label="Tìm theo Order ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={() => setSearchId('')}>Tải lại</Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <OrderTableAdmin orders={filteredOrders} onViewDetails={setSelectedOrder} />
      )}
      <OrderDetailDialogAdmin
  order={selectedOrder}
  onClose={() => setSelectedOrder(null)}
  onUpdate={handleUpdate}
/>



      
    </Container>
  );
}

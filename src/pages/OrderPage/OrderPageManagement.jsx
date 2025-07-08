


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
    <Box paddingX={35} paddingY={4}>
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


 import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Collapse,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import OrderDetail from './OrderDetail';
import { cancelOrderAPI } from '~/redux/order/orderSlice';
import { useDispatch } from 'react-redux';

const statusSteps = ['Pending', 'Delivery', 'Complete'];

function OrderCard({ order, onOrderDeleted }) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const normalizedStatus = order.status.trim().toLowerCase();

  const getStatusIndex = (status) => {
    const normalized = status.trim().toLowerCase();
    return statusSteps.findIndex((s) => s.toLowerCase() === normalized);
  };

  const handleCancelOrder = () => {
    if (normalizedStatus !== 'pending') {
      alert(`⚠️ Đơn hàng đang ở trạng thái "${order.status}". Chỉ huỷ được khi là "Pending".`);
      return;
    }

    if (!window.confirm('Bạn có chắc chắn muốn huỷ đơn hàng này?')) return;

    dispatch(cancelOrderAPI(order.order_id))
      .unwrap()
      .then((res) => {
        alert('✅ Huỷ đơn hàng thành công.');
        if (onOrderDeleted) onOrderDeleted(order.order_id);
      })
      .catch((err) => {
        console.error('[ERROR] Huỷ đơn hàng thất bại:', err);
        alert(err?.message || err?.detail || '❌ Huỷ đơn hàng thất bại. Vui lòng thử lại.');
      });
  };

  const handleToggleDetails = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box border="1px solid #ccc" borderRadius={2} padding={3} marginBottom={3} boxShadow={1}>
      <Typography variant="h6">Mã đơn hàng: {order.order_id}</Typography>
      <Typography>Người dùng: {order.username}</Typography>
      <Typography>Ngày tạo: {new Date(order.created_at).toLocaleString()}</Typography>
      <Typography>Tổng tiền: {order.total_price} VND</Typography>
      <Typography>Địa chỉ giao hàng: {order['Shipping address']}</Typography>

      <Stepper
        activeStep={getStatusIndex(order.status)}
        alternativeLabel
        sx={{ margin: '20px 0' }}
      >
        {statusSteps.map((label) => {
          const isActive = label.toLowerCase() === normalizedStatus;
          return (
            <Step key={label}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': {
                    color: isActive ? 'success.main' : 'text.disabled',
                    fontWeight: isActive ? 'bold' : 'normal',
                  },
                  '& .MuiStepIcon-root': {
                    color: isActive ? 'success.main' : 'grey.400',
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box display="flex" gap={2}>
        <Button variant="contained" color="primary" onClick={handleToggleDetails}>
          {expanded ? 'Ẩn chi tiết' : 'Xem chi tiết'}
        </Button>
        <Button variant="outlined" color="error" onClick={handleCancelOrder}>
          Huỷ đơn hàng
        </Button>
      </Box>

      <Collapse in={expanded}>
        <OrderDetail details={order.details} />
      </Collapse>
    </Box>
  );
}

export default OrderCard;

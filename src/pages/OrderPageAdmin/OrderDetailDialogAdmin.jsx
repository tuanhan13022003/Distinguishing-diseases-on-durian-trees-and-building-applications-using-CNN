import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const OrderDetailDialogAdmin = ({ order, onClose, onUpdate }) => {
  const [status, setStatus] = useState(order?.status || '');

  const handleUpdate = async () => {
    await onUpdate(order.order_id, {
      user_id: order.user_id,
      status,
      delivery_date: order.delivery_date,
      total_price: order.total_price
    });
    onClose();
    if (onStatusUpdated) onStatusUpdated(); // ✅ gọi callback nếu được truyền vào
  };

  if (!order) return null;


  return (
    <Dialog open={!!order} onClose={onClose} fullWidth>
      <DialogTitle>Chi tiết đơn hàng #{order.order_id}</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom><strong>Người dùng:</strong> {order.user_id}</Typography>
        <Typography gutterBottom>
  <strong>Địa chỉ:</strong> {order.address || order.shipping_address || order.user?.address || 'Không có'}
</Typography>
        <Typography gutterBottom><strong>Ngày giao:</strong> {new Date(order.delivery_date).toLocaleString()}</Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel id="order-status-label">Trạng thái</InputLabel>
          <Select
            labelId="order-status-label"
            value={status}
            label="Trạng thái"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="delivery">🚚 Đang giao hàng</MenuItem>
            <MenuItem value="complete">✅ Hoàn tất</MenuItem>
            <MenuItem value="cancel">❌ Đã huỷ</MenuItem>
          </Select>
        </FormControl>


        <Typography sx={{ mt: 2 }}>
          <strong>Danh sách sản phẩm:</strong>
        </Typography>
        <ul>
          {order.details?.map((d, index) => (
            <li key={d.detail_id || index}>
              {d.medicine?.name || d.medicine_name || 'Sản phẩm'} – {d.quantity} x {d.unit_price?.toLocaleString()} đ
            </li>
          ))}
        </ul>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleUpdate} variant="contained" color="primary">Cập nhật</Button>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailDialogAdmin;

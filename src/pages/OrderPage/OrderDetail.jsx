import React from 'react';
import { Box, Typography } from '@mui/material';

function OrderDetail({ details }) {
  return (
    <Box mt={2}>
      <Typography variant="subtitle1" fontWeight="bold">
        Chi tiết sản phẩm:
      </Typography>
      {details?.map((detail) => (
        <Box
          key={detail.detail_id}
          border="1px dashed #aaa"
          borderRadius={2}
          padding={2}
          marginTop={1}
        >
          <Typography>Sản phẩm: {detail.medicine?.name || 'Không có tên'}</Typography>
          <Typography>Số lượng: {detail.quantity}</Typography>
          <Typography>Giá: {detail.unit_price} VND</Typography>
          <Typography>Thành tiền: {detail.subtotal} VND</Typography>
          {detail.medicine?.image_base64 && (
            <img
              src={`data:image/jpeg;base64,${detail.medicine.image_base64}`}
              alt={detail.medicine.name}
              style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
            />
          )}
          <Typography>Mô tả: {detail.medicine?.description || 'Không có mô tả'}</Typography>
          <Typography>Giá gốc: {detail.medicine?.price} $</Typography>
          {detail.medicine?.discounted_price && (
            <Typography>Giá khuyến mãi: {detail.medicine.discounted_price} VND</Typography>
          )}
          <Typography>Còn lại: {detail.medicine?.stock || 'Không xác định'}</Typography>
          <Typography>
            Miễn phí vận chuyển: {detail.medicine?.is_freeship ? 'Có' : 'Không'}
          </Typography>
          <Typography>
            Cách sử dụng: {detail.medicine?.how_to_use || 'Không có hướng dẫn'}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default OrderDetail;

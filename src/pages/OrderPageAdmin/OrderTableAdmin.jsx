import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TablePagination
} from '@mui/material';

const OrderTableAdmin = ({ orders, onViewDetails }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const paginatedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn</TableCell>
              <TableCell>Người dùng</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Tổng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map(order => (
              <TableRow key={order.order_id}>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.username}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                <TableCell>{order.total_price} VND</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => onViewDetails(order)}>Xem</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={orders.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20, 50]}
        labelRowsPerPage="Số dòng mỗi trang"
      />
    </>
  );
};

export default OrderTableAdmin;


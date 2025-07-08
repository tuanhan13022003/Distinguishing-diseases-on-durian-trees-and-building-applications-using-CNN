


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  getAllOrdersAdminAPI,
  selectAdminOrders,
} from '~/redux/order/orderSlice';

import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueStatistics = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAdminOrders);
  const [chartData, setChartData] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [startDate, setStartDate] = useState(dayjs().startOf('month'));
  const [endDate, setEndDate] = useState(dayjs());

  useEffect(() => {
    dispatch(getAllOrdersAdminAPI());
  }, [dispatch]);

  useEffect(() => {
    if (!orders || orders.length === 0) return;

    const completedOrders = orders.filter(order =>
      ['complete', 'completed', 'done'].includes(order.status?.toLowerCase())
    );

    const filteredOrders = completedOrders.filter(order => {
      const created = dayjs(order.created_at);
      return created.isAfter(startDate.subtract(1, 'day')) && created.isBefore(endDate.add(1, 'day'));
    });

    const revenueByDate = {};
    let total = 0;

    filteredOrders.forEach(order => {
      const date = dayjs(order.created_at).format('YYYY-MM-DD');
      const price = Number(order.total_price || 0);

      revenueByDate[date] = (revenueByDate[date] || 0) + price;
      total += price;
    });

    const labels = Object.keys(revenueByDate).sort();
    const data = labels.map(date => revenueByDate[date]);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Doanh thu (VNĐ)',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderRadius: 6,
        },
      ],
    });

    setTotalRevenue(total.toFixed(0));
  }, [orders, startDate, endDate]);

  const inventoryItems = [
    { name: 'Actara 25WG', stock: 120, price: 450000 },
    { name: 'Movento', stock: 10, price: 700000 },
    { name: 'Moncozeb', stock: 0, price: 350000 },
  ];

  const renderStockStatus = (stock) => {
    if (stock === 0) return <Chip label="Hết hàng" color="error" size="small" />;
    if (stock < 20) return <Chip label="Sắp hết" color="warning" size="small" />;
    return <Chip label="Còn hàng" color="success" size="small" />;
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center">
        📈 Thống kê Doanh thu
      </Typography>

      <Typography variant="h6" textAlign="center" sx={{ mb: 4 }}>
        Tổng doanh thu: <strong>{Number(totalRevenue).toLocaleString()} VNĐ</strong>
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          <Grid item xs={12} sm={5} md={4}>
            <DatePicker
              label="Từ ngày"
              value={startDate}
              onChange={(value) => setStartDate(value)}
              format="DD/MM/YYYY"
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <DatePicker
              label="Đến ngày"
              value={endDate}
              onChange={(value) => setEndDate(value)}
              format="DD/MM/YYYY"
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>

      <Paper elevation={3} sx={{ p: 3, mb: 6, borderRadius: 3 }}>
        {chartData ? (
          <Box sx={{ height: { xs: 300, md: 400 } }}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  tooltip: {
                    callbacks: {
                      label: ctx => `${ctx.raw.toLocaleString()} VNĐ`
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: value => `${value.toLocaleString()} VNĐ`
                    }
                  }
                }
              }}
            />
          </Box>
        ) : (
          <Typography align="center">Đang tải dữ liệu...</Typography>
        )}
      </Paper>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" mb={2}>
          📦 Danh sách hàng tồn kho
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Tên sản phẩm</strong></TableCell>
                <TableCell align="right"><strong>Số lượng còn</strong></TableCell>
                <TableCell align="right"><strong>Giá</strong></TableCell>
                <TableCell align="center"><strong>Trạng thái</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryItems.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{item.stock}</TableCell>
                  <TableCell align="right">{item.price.toLocaleString()} VNĐ</TableCell>
                  <TableCell align="center">{renderStockStatus(item.stock)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default RevenueStatistics;


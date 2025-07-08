import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCurrentUser, selectCurrentUser } from '~/redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem, IconButton, Tooltip, Typography, Box } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AccountMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const role = currentUser?.role;


  const token = localStorage.getItem('token');

  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    dispatch(clearCurrentUser());
    setAnchorElUser(null);
    navigate('/login');
  };

const settings = currentUser ? (
  role === 'admin' ? [
    { title: 'Quản lý doanh thu', icon: <DashboardIcon />, action: () => navigate('/revenue-statistics') },
    { title: 'Quản lý đơn hàng', icon: <AssignmentIcon />, action: () => navigate('/orderAdmin') },
    { title: 'Đăng Xuất', icon: <LogoutOutlinedIcon />, action: handleLogout },
  ] : [
    { title: 'Đơn hàng của bạn', icon: <ShoppingCartIcon />, action: () => navigate('/order') },
    { title: 'Đăng Xuất', icon: <LogoutOutlinedIcon />, action: handleLogout },
  ]
) : [
  { title: 'Đăng nhập', icon: <LoginIcon />, action: () => navigate('/login') },
  { title: 'Tạo tài khoản', icon: <PersonAddIcon />, action: () => navigate('/register') },
];



  return (
    <>
      <Tooltip title="Tài khoản của bạn">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={currentUser?.name || "User"} src={currentUser?.avatar || "/static/images/avatar/2.jpg"} />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{
          mt: '45px',
          '.MuiPopover-paper': {
            backgroundColor: '#f9f9f9',
            color: '#333',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting.title}
            onClick={() => {
              handleCloseUserMenu();
              setting.action();
            }}
            sx={{
              display: 'flex',
              gap: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: '#000' }}>
                {setting.icon}
              </IconButton>
              <Typography
                sx={{
                  textAlign: 'center',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {setting.title}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AccountMenu;

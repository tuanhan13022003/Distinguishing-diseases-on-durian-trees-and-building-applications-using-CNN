// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearCurrentUser, selectCurrentUser } from '~/redux/user/userSlice';
// import { Link, useNavigate } from 'react-router-dom';
// import { Avatar, Menu, MenuItem, IconButton, Tooltip, Typography, Box } from '@mui/material';
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
// import LoginIcon from '@mui/icons-material/Login';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AssignmentIcon from '@mui/icons-material/Assignment';

// const AccountMenu = () => {
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Lấy thông tin người dùng từ Redux
//   const currentUser = useSelector(selectCurrentUser);
//   const role = currentUser?.role || null;

//   const token = localStorage.getItem('token');
//   console.log('Token trong localStorage:', token);

//   // Xử lý mở menu
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   // Xử lý đóng menu
//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

// // Xử lý đăng xuất
// const handleLogout = () => {
//   console.log("Đăng xuất...");
//   localStorage.removeItem('token');
//   localStorage.removeItem('user_id');
//   dispatch(clearCurrentUser());
//   navigate('/login');
// };

//   // Định nghĩa các tùy chọn menu
//   const settings = !currentUser ? [
//   { title: 'Đăng nhập', icon: <LoginIcon />, action: () => navigate('/login') },
//   { title: 'Tạo tài khoản', icon: <PersonAddIcon />, action: () => navigate('/register') },
// ] : (role === 'admin') ? [
//   { title: 'Quản lý doanh thu', icon: <DashboardIcon />, action: () => navigate('/admin/revenue') },
//   { title: 'Quản lý đơn hàng', icon: <AssignmentIcon />, action: () => navigate('/admin/orders') },
//   { title: 'Đăng Xuất', icon: <LogoutOutlinedIcon />, action: handleLogout },
// ] : [
//   { title: 'Giỏ hàng của bạn', icon: <LoginIcon />, action: () => {
//       console.log('Đi tới trang giỏ hàng');
//       navigate('/order');
//     } 
//   },
//   { title: 'Đăng Xuất', icon: <LogoutOutlinedIcon />, action: handleLogout },
// ];

//   return (
//     <>
//       <Tooltip title="Open settings">
//         <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//           <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
//         </IconButton>
//       </Tooltip>

//       <Menu
//         sx={{
//           mt: '45px',
//           '.MuiPopover-paper': {
//             backgroundColor: '#ffffff',
//             color: '#000000',
//           }
//         }}
//         id="menu-appbar"
//         anchorEl={anchorElUser}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         keepMounted
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         open={Boolean(anchorElUser)}
//         onClose={handleCloseUserMenu}
//       >
//         {settings.map((setting) => (
//           <MenuItem
//             key={setting.title}
//             onClick={() => {
//               handleCloseUserMenu();
//               setting.action();
//             }}
//             sx={{ display: 'flex', gap: 1 }}
//           >
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <IconButton sx={{ color: '#000000' }}>
//                 {setting.icon}
//               </IconButton>
//               <Typography
//                 sx={{
//                   textAlign: 'center',
//                   color: '#000000',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}
//               >
//                 {setting.title}
//               </Typography>
//             </Box>
//           </MenuItem>
//         ))}
//       </Menu>
//     </>
//   );
// };

// export default AccountMenu;




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

  // Lấy thông tin người dùng từ Redux
  const currentUser = useSelector(selectCurrentUser);
  const role = currentUser?.role;

  // Lấy token từ localStorage
  const token = localStorage.getItem('token');
  console.log('Token trong localStorage:', token);

  // Xử lý mở menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Xử lý đóng menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    console.log("Đăng xuất...");
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    dispatch(clearCurrentUser());
    setAnchorElUser(null);
    navigate('/login');
  };

  // Định nghĩa các tùy chọn menu
const settings = currentUser ? (
  role === 'admin' ? [
    { title: 'Quản lý doanh thu', icon: <DashboardIcon />, action: () => navigate('/admin/revenue') },
    { title: 'Quản lý đơn hàng', icon: <AssignmentIcon />, action: () => navigate('/orderAdmin') },
    { title: 'Đăng Xuất', icon: <LogoutOutlinedIcon />, action: handleLogout },
  ] : [
    { title: 'Giỏ hàng của bạn', icon: <ShoppingCartIcon />, action: () => navigate('/order') },
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

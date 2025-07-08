

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AppBar, Toolbar, IconButton, Typography, Container, Box, Button,
  Menu, MenuItem, Badge
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';

import { Link } from 'react-router-dom';
import SearchButtonModalCustom from '../Search/SearchButtonModalCustom';
import AccountMenu from '../AccountMenu/AccountMenu';
import { getAllCartAPI } from '~/redux/card/productSlice';

const pages = [
  { title: 'Trang Chủ', path: '/' },
  { title: 'Sản Phẩm', path: '/products' },
  { title: 'Blogs', path: '/blog-view-all' },
  { title: 'Thông Tin', path: '/about' }
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        try {
          const response = await dispatch(getAllCartAPI(userId)).unwrap();
          setCartCount(response.items?.length || 0);
        } catch (error) {
          console.error('Lỗi khi lấy giỏ hàng:', error);
        }
      } else {
        console.warn('Không tìm thấy user_id trong localStorage');
      }
    };

    fetchCartItems();
  }, [dispatch]);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#bde488c7' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                Bệnh Viện Sầu Riêng
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                {pages.map((page) => (
                  <Link key={page.title} to={page.path} style={{ textDecoration: 'none' }}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                Aitilo
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link key={page.title} to={page.path} style={{ textDecoration: 'none' }}>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'black' }}>
                    {page.title}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <SearchButtonModalCustom />
              </Box>

              <Link to="/card">
                <IconButton size="large" color="inherit">
                  <Badge badgeContent={cartCount} color="error">
                    <LocalGroceryStoreOutlinedIcon />
                  </Badge>
                </IconButton>
              </Link>

              <AccountMenu />
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <SearchButtonModalCustom isDisplayText={false} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

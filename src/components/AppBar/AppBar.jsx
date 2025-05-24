import AdbIcon from '@mui/icons-material/Adb'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import SearchButtonModalCustom from '../Search/SearchButtonModalCustom'
import { useDispatch } from 'react-redux'
import { clearCurrentUser } from '~/redux/user/userSlice'

import { Link } from 'react-router-dom'
import AccountMenu from '../AccountMenu/AccountMenu'

const pages = [
  {
    title: 'Trang Chủ',
    path: '/'
  },
  {
    title: 'Sản Phẩm',
    path: '/products'
  },
  {
    title: 'Liên Hệ',
    path: '/contact'
  },
  {
    title: 'Thông Tin',
    path: '/about'
  }
]
const settings = [

  {
    title: 'Đơn Hàng',
    icon: <ShoppingBagOutlinedIcon />
  },
  {
    title: 'Đăng Xuất',
    icon: <LogoutOutlinedIcon />
  }
]

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const dispatch = useDispatch()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box display={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
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
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <Link to={page.path}>
                    <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                      <Typography sx={{ textAlign: 'center' }}>{page.title}</Typography>
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
                component="a"
                href="#app-bar-with-responsive-menu"
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
                <Link to={page.path}>
                  <Button
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Search */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                <SearchButtonModalCustom />
              </Box>

              {/* Card */}
              <Link to='/wishlist'>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <FavoriteBorderOutlinedIcon />
                  </Badge>
                </IconButton>
              </Link>

              <Link to='/card'>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <LocalGroceryStoreOutlinedIcon />
                  </Badge>
                </IconButton>
              </Link>

              {/* Account */}
              {/* <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px', '.MuiPopover-paper': { backgroundColor: '#ffffff', // <-- đổi thành trắng
                  color: '#000000', } }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={handleCloseUserMenu} sx={{ display: 'flex', gap: 1 }}>
                    {setting.title === 'Đăng Xuất' ? (
                      <Link to="/login" style={{ textDecoration: 'none', color: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => dispatch(clearCurrentUser())}>
                        <IconButton sx={{ color: '#000000' }}>
                          {setting.icon}
                        </IconButton>
                        <Typography sx={{ textAlign: 'center', color: '#000000' }}>{setting.title}</Typography>
                      </Link>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton sx={{ color: '#000000' }}>
                          {setting.icon}
                        </IconButton>
                        <Typography sx={{ textAlign: 'center', color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{setting.title}</Typography>
                      </Box>
                    )}
                  </MenuItem>
                ))}
              </Menu> */}
              <AccountMenu />
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <SearchButtonModalCustom isDisplayText={false}/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar

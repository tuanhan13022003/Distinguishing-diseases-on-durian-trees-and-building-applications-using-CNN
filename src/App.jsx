// import * as React from 'react'

// import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
// import Container from '@mui/material/Container'

// import NotFound from '~/pages/404/NotFound'
// import Auth from '~/pages/Auth/Auth'
// import HomePageManagement from '~/pages/HomePage/HomePageManagement'
// import ResponsiveAppBar from '~/components/AppBar/AppBar'
// import WishlistPageManagement from '~/pages/WishlistPage/WishlistPageManagement'
// import { Box } from '@mui/material'
// import CardPageManagement from '~/pages/CardPage/CardPageManagement'
// import CheckoutPageManagement from './pages/CheckoutPage/CheckoutPageManagement'
// import ProductsPageManagement from './pages/ProductPage/ProductsPageManagement'
// import SearchProductsPageManagement from './pages/SearchProductPage/SearchProductsPageManagement'
// import ProductDetailManagement from './pages/ProductDetail/ProductDetailManagement'
// import Footer from './components/Footer/Footer'
// import ErrorBoundary from './components/Error'
// function MainLayout() {
//   return (
//     <Box sx={{ backgroundColor: '#fff' }}>
//       <ErrorBoundary>
//       <ResponsiveAppBar />
//       <Container maxWidth="lg">
//         <Outlet /> {/* Nội dung của Route sẽ được render tại đây */}
//       </Container>
//       {/* <Footer /> */}
//       </ErrorBoundary>
//     </Box>
//   )
// }

// function App() {

//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<HomePageManagement />} />
//         <Route path="/products" element={<ProductsPageManagement />} />
//         <Route path="/wishlist" element={<WishlistPageManagement />} />
//         <Route path="/card" element={<CardPageManagement />} />
//         <Route path="/card/checkout" element={<CheckoutPageManagement />} />
//         <Route path="/products/search" element={<SearchProductsPageManagement />} />
//         <Route path="/product/:id" element={<ProductDetailManagement />} />
//       </Route>

//       {/* Authentcation */}
//       <Route path='/login' element={<Auth />} />
//       <Route path='/register' element={<Auth />} />

//       <Route path='*' element={<NotFound />} />
//     </Routes>
//   )
// }

// export default App


import * as React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import HomePageManagement from '~/pages/HomePage/HomePageManagement'
import ResponsiveAppBar from '~/components/AppBar/AppBar'
import WishlistPageManagement from '~/pages/WishlistPage/WishlistPageManagement'
import CardPageManagement from '~/pages/CardPage/CardPageManagement'
import CheckoutPageManagement from './pages/CheckoutPage/CheckoutPageManagement'
import ProductsPageManagement from './pages/ProductPage/ProductsPageManagement'
import SearchProductsPageManagement from './pages/SearchProductPage/SearchProductsPageManagement'
import ProductDetailManagement from './pages/ProductDetail/ProductDetailManagement'
import Footer from './components/Footer/Footer'
import ErrorBoundary from './components/Error'
import AboutPage from './pages/About/AboutManagement'
import OrderPageManagement from './pages/OrderPage/OrderPageManagement'
import OrderManagementAdmin from './pages/OrderPageAdmin/OrderManagementAdmin'
function MainLayout() {
  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      <ErrorBoundary>
        <ResponsiveAppBar />
        {/* Full width layout */}
        <Box sx={{ width: '100%' }}>
          <Outlet /> {/* Route content will render here */}
        </Box>
        <Footer />
      </ErrorBoundary>
    </Box>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePageManagement />} />
        <Route path="/products" element={<ProductsPageManagement />} />
        <Route path="/wishlist" element={<WishlistPageManagement />} />
        <Route path="/card" element={<CardPageManagement />} />
        <Route path="/card/checkout" element={<CheckoutPageManagement />} />
        <Route path="/products/search" element={<SearchProductsPageManagement />} />
        <Route path="/medicine/:id" element={<ProductDetailManagement />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/order" element={<OrderPageManagement />} />
        {/* 🔐 Admin routes */}
        <Route path="/orderAdmin" element={<OrderManagementAdmin />} />
      </Route>
      
      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

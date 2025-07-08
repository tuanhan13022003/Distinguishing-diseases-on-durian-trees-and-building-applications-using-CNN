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
import DurianCare from './pages/blogs/DurianCare'
import DurianDiseases from './pages/blogs/DurianDisease'
import DurianGuide from './pages/blogs/DurianGuide'
import DurianExportBlog from './pages/blogs/DurianExportBlog'
import DurianVietnamFuture from './pages/blogs/DurianFeatureVN'
import DurianFarmerAnxietyVN from './pages/blogs/DurianFarmerAnxiety'
import AllBlogsPage from './pages/blogs/BlogsViewAll'
import RevenueStatistics from './pages/RevenueStatistics/RevenueStatistics'
function MainLayout() {
  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      <ErrorBoundary>
        <ResponsiveAppBar />
        <Box sx={{ width: '100%' }}>
          <Outlet />
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
        <Route path="/medicine/:id" element={<ProductDetailManagement  />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/order" element={<OrderPageManagement />} />
        <Route path="/blog-durian-care" element={<DurianCare />} />
        <Route path="/blog-durian-guide" element={<DurianGuide />} />
        <Route path="/blog-durian-diseases" element={<DurianDiseases />} />
        <Route path="/blog-durian-export" element={<DurianExportBlog />} />
        <Route path="/blog-durian-future-vn" element={<DurianVietnamFuture />} />
        <Route path="/blog-durian-farmer-anxiety" element={<DurianFarmerAnxietyVN />} />
        <Route path="/blog-view-all" element={<AllBlogsPage />} />
        <Route path="/revenue-statistics" element={<RevenueStatistics />} />
        {/* Admin routes */}
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

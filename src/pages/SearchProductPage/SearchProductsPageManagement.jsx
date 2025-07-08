

import React, { useEffect, useState } from 'react'
import {
  Box,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  Rating,
  Slider,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import CardProduct from '~/components/Card/CardProduct'
import NoResultPage from '../NoResult/NoResultPage'
import { useSelector } from 'react-redux'
import { selectCurrentProduct } from '~/redux/product/productSlice'

const categories = ['Electronics', 'Gaming', 'Fashion', 'Sports', 'Toys']

// Định dạng dữ liệu từ API
const formatData = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image_base64 ? `data:image/png;base64,${item.image_base64}` : '',
    rating: item.rating || 4,
    price: item.price || 0,
    description: item.description || '',
    how_to_use: item.how_to_use || ''
  }));
}

function SearchProductsPageManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [products, setProducts] = useState([]);
  const [diseaseInfo, setDiseaseInfo] = useState(null);

  const currentProduct = useSelector(selectCurrentProduct);

  useEffect(() => {
    if (currentProduct) {
      
      const { disease_name, description, symptoms, cause, confidence, medicines } = currentProduct;
      setDiseaseInfo({
        name: disease_name,
        description,
        symptoms,
        cause,
        confidence: (confidence * 100).toFixed(2)
      });


      if (medicines) {
        const formattedProducts = formatData(medicines);
        setProducts(formattedProducts);
      }
    }
  }, [currentProduct]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  

  return (
    <Box sx={{ display: 'flex' }}>
     

      <Box component="main" sx={{ flexGrow: 1, py: 6, px: 25 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4">Kết quả nhận diện bệnh từ hình ảnh cung cấp</Typography>
          {diseaseInfo && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Thông tin bệnh:</Typography>
              <Typography>Tên bệnh: {diseaseInfo.name}</Typography>
              <Typography>Mô tả: {diseaseInfo.description}</Typography>
              <Typography>Triệu chứng: {diseaseInfo.symptoms}</Typography>
              <Typography>Nguyên nhân: {diseaseInfo.cause}</Typography>
              <Typography>Độ tin cậy: {diseaseInfo.confidence}%</Typography>
            </Box>
          )}
        </Box>

        {products.length > 0 ? (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <CardProduct product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoResultPage />
        )}
      </Box>
    </Box>
  );
}

export default SearchProductsPageManagement;

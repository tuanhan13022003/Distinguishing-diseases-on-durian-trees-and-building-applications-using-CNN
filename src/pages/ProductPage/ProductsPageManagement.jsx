import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  Grid,
  Grid2,
  List,
  ListItem,
  Rating,
  Slider,
  Typography
} from '@mui/material'

import { getAllProductsAPI } from '~/apis'
import { useLoading } from '~/context'
import CardProduct from '~/components/Card/CardProduct'

const categories = ['Bệnh Rầy Nhảy', 'Bệnh Cháy Lá']

const formatData = (data) => {
  if (!data || !Array.isArray(data)) {
    console.error('Dữ liệu không hợp lệ:', data);
    return [];
  }

  return data.map((item) => {
    const imageSrc = item.image_base64
      ? `data:image/jpeg;base64,${item.image_base64}`
      : (item.image_url ? item.image_url : 'https://via.placeholder.com/345x200?text=No+Image');

    return {
      id: item.medicine_id,
      name: item.name,
      description: item.description,
      howToUse: item.how_to_use,
      price: parseFloat(item.price) || 0,
      discounted_price: parseFloat(item.discounted_price) || 0,
      stock: item.stock || 0,
      image: imageSrc,
      rating: 4.5,
      reviews: 120,
      category: item.category || 'Khác'
    }
  });
}

function ProductsPageManagement() {
  const [medicines, setMedicines] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { setIsLoading } = useLoading();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllProductsAPI(page, 10);
      if (response && Array.isArray(response.data)) {
        const filteredProducts = response.data.filter((product) => {
          const price = parseFloat(product.price) || 0;
          const inCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
          const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
          const inSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

          return inCategory && inPriceRange && inSearch;
        });

        setMedicines(formatData(filteredProducts));
        const calculatedTotalPages = Math.ceil(response.total_records / response.per_page);
        setTotalPages(calculatedTotalPages);
      }
    } catch (error) {
      console.error(' Lỗi khi lấy dữ liệu sản phẩm:', error.message);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [page, selectedCategories, priceRange, selectedRating]);
  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchData();
      setSearchQuery('');
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const filterDrawerContent = (
    <Box sx={{ width: 280, p: 3 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #73C7C7',
            outline: 'none',
            minWidth: '200px'
          }}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>Giá</Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
          step={100}
        />
      </Box>
      {/* <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>Lọc</Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>Thể Loại</Typography>
        <List dense>
          {categories.map((category) => (
            <ListItem key={category} disablePadding>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    size="small"
                  />
                }
                label={category}
              />
            </ListItem>
          ))}
        </List>
      </Box> */}
    </Box>
  );


  return (
    <Box sx={{ display: 'flex', ml: '25px' }}>
      <Box sx={{ mt: 7 }}>
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              width: 320,
              position: 'relative',
              overflow: 'hidden',
              border: 'solid 1px #73C7C7',
              borderRadius: 2,
              px: '20px'
            }
          }}
        >
          {filterDrawerContent}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, py: 6, px: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, ml: '25px' }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Danh sách thuốc
          </Typography>
          
        </Box>
        <Grid2 container spacing={4} sx={{ ml: '10px' , mr:'0px', gap: '50px' }}>
          {medicines.map((medicine) => (
            <Grid2 item xs={12} sm={6} md={4} key={medicine.id}>
              <CardProduct product={medicine} />
            </Grid2>
          ))}
        </Grid2>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mr:  7 }}>
          <Button onClick={handlePrevPage} disabled={page === 1}>◀</Button>
          <Typography sx={{  mt:0.8}}>{page} / {totalPages}</Typography>
          <Button onClick={handleNextPage} disabled={page === totalPages}>▶</Button>
        </Box>
        
      </Box>
    </Box>
  )
}

export default ProductsPageManagement;




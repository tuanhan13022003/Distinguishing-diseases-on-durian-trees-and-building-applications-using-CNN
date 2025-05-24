import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Grid, Typography, Paper } from '@mui/material';
import { FaShippingFast, FaTags, FaCertificate } from 'react-icons/fa';

import Img1 from '../../assets/hero/giai-phap.png';
import Img2 from '../../assets/hero/benh-sau-rieng.png';
import Img3 from '../../assets/hero/qua-sau-rieng.png';

const slides = [
  { src: Img1, alt: 'Giải pháp' },
  { src: Img3, alt: 'Quả sầu riêng' },
  { src: Img2, alt: 'Bệnh trên sầu riêng' },
];

const features = [
  {
    icon: <FaShippingFast size={36} color="#FF6F00" />,
    title: 'Giao hàng cực nhanh',
    description: 'Miễn phí với đơn hàng trị giá trên 800.000đ',
  },
  {
    icon: <FaTags size={36} color="#FF5722" />,
    title: 'Mua hàng siêu tiết kiệm',
    description: 'Rẻ hơn từ 10% – 30% so với giá thị trường',
  },
  {
    icon: <FaCertificate size={36} color="#FF9800" />,
    title: 'Sản phẩm chính hãng 100%',
    description: 'Sản phẩm được nhập khẩu chính hãng',
  },
];

const FeatureCard = ({ icon, title, description }) => (
  <Paper
    elevation={1}
    sx={{
      p: 2,
      display: 'flex',
      gap: 2,
      border: '1px dashed #AED581',
      borderRadius: 3,
      height: '100%',
      bgcolor: '#FAFAFA',
      alignItems: 'center',
    }}
  >
    {icon}
    <Box>
      <Typography variant="h6" fontWeight={600} color="green">
        {title}
      </Typography>
      <Typography variant="body2" color="black">
        {description}
      </Typography>
    </Box>
  </Paper>
);

const Hero = () => {
  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 1, sm: 2, md: 15 }, // padding ngang linh hoạt theo kích thước màn hình
        py: 2,
      }}
    >
      <Carousel
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        emulateTouch
        autoPlay
        infiniteLoop
        swipeable
      >
        {slides.map((slide, index) => (
          <Box key={index} sx={{ p: 0 }}>
            <Box
              component="img"
              src={slide.src}
              alt={slide.alt}
              sx={{
                width: '100%',
                height: { xs: 220, sm: 350, md: 630 }, // Chiều cao linh hoạt theo kích thước màn hình
                objectFit: 'cover',
                borderRadius: 3,
              }}
            />
          </Box>
        ))}
      </Carousel>

      <Grid container spacing={2} mt={2} px={15}>
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FeatureCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Hero;

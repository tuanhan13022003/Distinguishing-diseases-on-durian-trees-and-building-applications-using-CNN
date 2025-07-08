import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardMedia,
  CardContent, Pagination
} from '@mui/material';
import { Link } from 'react-router-dom';

import img1 from '../../assets/blogs/durianCare/img1.jpg';
import img2 from '../../assets/blogs/durian/img2.jpg';
import img3 from '../../assets/blogs/durian/img3.jpg';
import img4 from '../../assets/blogs/durian/img4.jpg';
import img5 from '../../assets/blogs/durian/img5.jpg';
import img6 from '../../assets/blogs/durian/img6.jpg';
import actara from '../../assets/img/Actara.jpg';
import Carbendazim from '../../assets/img/Carbendazim.jpg';
import Admire from '../../assets/img/Admire.jpg';

const blogPosts = [
  { title: 'Kỹ Thuật Trồng Và Chăm Sóc Cây Sầu Riêng', image: img1, date: '10 Tháng 5 2025', author: 'Ha Dang', summary: 'Hướng dẫn kỹ thuật trồng và chăm sóc sầu riêng...', link: '/blog-durian-care' },
  { title: 'Cẩm Nang Trồng Sầu Riêng Đạt Hiệu Quả Cao', image: img3, date: '15 Tháng 5 2025', author: 'Ha Dang', summary: 'Tổng hợp các bước chăm sóc, tưới tiêu, chọn giống...', link: '/blog-durian-guide' },
  { title: '10 Bệnh Thường Gặp Ở Cây Sầu Riêng Và Cách Điều Trị', image: img2, date: '20 Tháng 5 2025', author: 'Ha Dang', summary: 'Tổng hợp các loại bệnh phổ biến như đốm lá, thối gốc...', link: '/blog-durian-diseases' },
  { title: 'Thực Trạng Và Cơ Hội Xuất Khẩu Sầu Riêng Việt Nam', image: img4, date: '22 Tháng 5 2025', author: 'Ha Dang', summary: 'Phân tích tình hình xuất khẩu sầu riêng và tiềm năng...', link: '/blog-durian-export' },
  { title: 'Tương Lai Ngành Sầu Riêng Việt Nam', image: img5, date: '25 Tháng 5 2025', author: 'Ha Dang', summary: 'Định hướng phát triển ngành hàng sầu riêng bền vững...', link: '/blog-durian-future-vn' },
  { title: 'Nỗi Lo Của Người Trồng Sầu Riêng Trước Mùa Xuất Khẩu', image: img6, date: '26 Tháng 5 2025', author: 'Ha Dang', summary: 'Phản ánh tâm tư nông dân khi đối mặt yêu cầu thị trường...', link: '/blog-durian-farmer-anxiety' }
];

const ITEMS_PER_PAGE = 4;

const AllBlogsPage = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => setPage(value);
  const paginatedPosts = blogPosts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes flash {
        0% { box-shadow: 0 0 0px rgba(255, 193, 7, 0.3); }
        100% { box-shadow: 0 0 18px rgba(255, 193, 7, 0.9); }
      }
      .flash-animate {
        animation: flash 1.5s infinite alternate;
        transition: all 0.3s ease-in-out;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Box sx={{ mx: 18, px: 10, pt: 5 }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#2e7d32' }}>
        Tất Cả Bài Viết Blog
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={4}>
            {paginatedPosts.map((post, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{
                  display: 'flex',
                  boxShadow: 3,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.02)' }
                }}>
                  <CardMedia component="img" sx={{ width: 220 }} image={post.image} alt={post.title} />
                  <CardContent>
                    <Typography variant="h6">
                      <Link to={post.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {post.title}
                      </Link>
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      {post.date} - {post.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.summary}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination count={Math.ceil(blogPosts.length / ITEMS_PER_PAGE)} page={page} onChange={handleChange} color="primary" />
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h5" sx={{ mb: 2, color: '#1b5e20' }}>
            🌾 Sản Phẩm Nổi Bật
          </Typography>

          <Card className="flash-animate" sx={{
            backgroundColor: '#fffde7',
            border: '1px solid #fff9c4',
            p: 2,
            mb: 3,
            borderRadius: 3,
            boxShadow: 4,
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.03)',
              boxShadow: 6,
            }
          }}>
            <Link to="/medicine/1" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardMedia component="img" height="150" image={actara} alt="Actara 25WG" sx={{ borderRadius: 2, mb: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#f57f17' }}>🌿 Actara 25WG</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Trị rầy, sâu vẽ bùa. Hấp thu nhanh, hiệu quả cao, an toàn.
              </Typography>
            </Link>
          </Card>

          <Card sx={{
            backgroundColor: '#e8f5e9',
            p: 2,
            mb: 3,
            borderRadius: 3,
            boxShadow: 3,
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.03)',
              boxShadow: 5,
            }
          }}>
            <Link to="/medicine/2" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardMedia component="img" height="150" image={Admire} alt="Admire 50EC" sx={{ borderRadius: 2, mb: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#2e7d32' }}>🐛 Admire 50EC</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Thuốc trừ sâu phổ rộng, chứa Imidacloprid nhóm neonicotinoid.
              </Typography>
            </Link>
          </Card>


        </Grid>
      </Grid>
    </Box>
  );
};

export default AllBlogsPage;


import React, { useState } from 'react';
import {
  Box, Typography, IconButton, Card, CardMedia, CardContent, Link, Button
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, FormatQuote } from '@mui/icons-material';
import img1 from '../../assets/blogs/durianCare/img1.jpg';
import farmer1 from '../../assets/blogs/durianCare/img1.jpg'; 
import img2 from '../../assets/blogs/durian/img2.jpg';
import img3 from '../../assets/blogs/durian/img3.jpg';
const blogPosts = [
  { title: 'Kỹ Thuật Trồng Và Chăm Sóc Cây Sầu Riêng', image: img1, summary: 'Hướng dẫn kỹ thuật trồng và chăm sóc sầu riêng...', link: '/blog-durian-care' },
  { title: 'Cẩm Nang Trồng Sầu Riêng Đạt Hiệu Quả Cao', image: img3, summary: 'Tổng hợp các bước chăm sóc, tưới tiêu, chọn giống...', link: '/blog-durian-guide' },
  { title: '10 Bệnh Thường Gặp Ở Cây Sầu Riêng Và Cách Điều Trị', image: img2, summary: 'Tổng hợp các loại bệnh phổ biến như đốm lá, thối gốc...', link: '/blog-durian-diseases' }
];

const testimonials = [
  {
    content:
      'Tôi từng rất lo lắng khi cây bị đốm lá mà không biết do bệnh gì. Từ ngày biết đến hệ thống AI của bệnh viện nông nghiệp, tôi chỉ cần chụp hình lá là biết ngay bệnh và được gợi ý loại thuốc phù hợp. Nhờ vậy mà tôi chọn đúng thuốc, cây phục hồi nhanh và không tốn tiền mua sai thuốc nữa.',
    author: 'Nông dân Nguyễn Hồng Ngô',
    location: 'Xã Lương Nghĩa, Huyện Long Mỹ',
    avatar: farmer1,
  },
  {
    content:
      'Ban đầu tôi chưa tin lắm, nhưng khi thử chụp hình gốc sầu riêng bị thối rễ và gửi qua ứng dụng AI, kết quả trả về rất chính xác. Bệnh viện nông nghiệp còn khuyên dùng đúng thuốc theo giai đoạn. Giờ tôi rất yên tâm mỗi lần cây bị lạ là đưa lên app tra cứu liền.',
    author: 'Nông dân Lê Văn Tâm',
    location: 'Tiền Giang',
    avatar: farmer1,
  },
  {
    content:
      'Trước đây tôi toàn hỏi kinh nghiệm miệng, giờ có app nhận diện bệnh nên chủ động hơn. Cây bị vàng lá, tôi chụp lên AI nhận ra ngay là thiếu kali và đề xuất loại phân bón chính hãng từ bệnh viện nông nghiệp. Tôi dùng thử và cây phục hồi rõ rệt.',
    author: 'Nông dân Hồ Thị Bé Ba',
    location: 'Đắk Lắk',
    avatar: farmer1,
  },
  {
    content:
      'Ứng dụng AI này rất tiện. Không cần ra tận trạm bảo vệ thực vật nữa. Tôi có thể chẩn đoán tại chỗ, biết bệnh là gì, thuốc nào hợp lý. Bệnh viện nông nghiệp hỗ trợ thông tin minh bạch, thuốc có nguồn gốc rõ ràng.',
    author: 'Nông dân Trần Văn Hiếu',
    location: 'Huyện Cai Lậy, Tiền Giang',
    avatar: farmer1,
  },
  {
    content:
      'Vụ trước tôi thất bại vì phun thuốc sai bệnh. Vụ này có AI giúp phát hiện bệnh sớm và hỗ trợ đặt mua thuốc từ bệnh viện nông nghiệp. Năng suất tăng, trái to và đẹp hơn rõ rệt. Tôi đã giới thiệu cho nhiều người cùng xài.',
    author: 'Nông dân Võ Thanh Hòa',
    location: 'Châu Thành, Bến Tre',
    avatar: farmer1,
  }
];


const Content = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const post = blogPosts[currentTestimonial];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleViewMore = () => {
    window.location.href = '/blog-view-all';
  };

  return (
    <Box sx={{ px: { xs: 2, md: 10 }, py: 5 }}>
      {/* NHÀ NÔNG CHIA SẺ */}
      <Box sx={{ mb: 6}}>
        <Typography variant="h4" align="center" fontWeight={800} color="green" gutterBottom>
          Nhà nông chia sẻ
        </Typography>
        <Typography align="center" fontWeight={450} fontSize={20} mx={20}>
          Nơi nhà nông và chuyên gia chia sẻ giải pháp công nghệ mới, đáp ứng các tiêu chuẩn toàn cầu, hướng tới nền nông nghiệp Việt Nam bền vững
        </Typography>

        <Box sx={{
          position: 'relative',
          backgroundImage: 'url("/assets/background-rice.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          p: { xs: 2, md: 5 },
          borderRadius: 3,
          minHeight: 280
        }}>
          <IconButton
            onClick={prevTestimonial}
            sx={{ position: 'absolute', marginLeft: 34, top: '50%', backgroundColor: '#c5e1a5' }}
          >
            <ArrowBackIos />
          </IconButton>

          <Box sx={{
            maxWidth: 600,
            mx: 'auto',
            bgcolor: '#c5e1a570',
            p: 3,
            borderRadius: 2,
            backdropFilter: 'blur(2px)',
            boxShadow: 2,
          }}>
            <FormatQuote sx={{ fontSize: 40, color: '#2e7d32' }} />
            <Typography fontStyle="italic" mb={2}>
              {testimonials[currentTestimonial].content}
            </Typography>
            <Typography fontWeight="bold">
              {testimonials[currentTestimonial].author}
            </Typography>
            <Typography variant="caption">
              {testimonials[currentTestimonial].location}
            </Typography>
          </Box>

          <IconButton
            onClick={nextTestimonial}
            sx={{ position: 'absolute', marginLeft: 121 , top: '50%', backgroundColor: '#c5e1a5' }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>

      {/* BLOG SECTION */}
      <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
        Tin Tức & Cẩm Nang Nông Nghiệp
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" mt={3}>
        {blogPosts.map((post, index) => (
          <Card key={index} sx={{ maxWidth: 330, transition: '0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
            <CardMedia component="img" height="180" image={post.image} />
            <CardContent>
              <Typography variant="h6">
                <Link href={post.link} underline="hover" color="inherit">{post.title}</Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">{post.summary}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box textAlign="center" mt={4}>
        <Button variant="contained" onClick={handleViewMore} sx={{ backgroundColor: '#BAD8B6', '&:hover': { backgroundColor: '#388e3c' } }}>
          XEM THÊM
        </Button>
      </Box>
    </Box>
  );
};

export default Content;

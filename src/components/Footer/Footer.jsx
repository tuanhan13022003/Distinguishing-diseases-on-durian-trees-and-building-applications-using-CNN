import React from 'react';
import { Box, Grid, Typography, Link, IconButton } from '@mui/material';
import { FaMobileAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa6';
import { BsPersonVcardFill } from 'react-icons/bs';

const FooterLinks = [
  { title: 'Home', link: '/#' },
  { title: 'About', link: '/#about' },
  { title: 'Contact', link: '/#contact' },
  { title: 'Blog', link: '/#blog' },
];

const Footer = () => {
  return (
    <Box
      bgcolor="#fff"
      sx={{
        width: '100%',
        py: 4,
        mt: 6,
        mr: '100px'
      }}
    >
      <Box
        sx={{
          maxWidth: '80%',
          mx: 'auto',
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Bệnh Viện Sầu Riêng
            </Typography>
            <Typography color="text.secondary" paragraph>
              Bệnh Viện Sầu Riêng là một trang web dành riêng cho những người làm vườn sầu riêng.
            </Typography>
            <Typography color="text.secondary" paragraph>
              Với mong muốn tạo nên một cộng đồng nông dân thân thiện và gần gũi. Chúng tôi luôn phát triển công nghệ để hỗ trợ các nhà vườn đạt hiệu suất cao, phòng bệnh tốt nhất cho cây sầu riêng.
            </Typography>
          </Grid>

          {/* Quick Links 1 */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            {FooterLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                underline="hover"
                color="text.secondary"
                display="block"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                {item.title}
              </Link>
            ))}
          </Grid>

          {/* Quick Links 2 */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" gutterBottom>
              Hỗ trợ khách hàng
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', pl: 0, m: 0, lineHeight: 2 }}>
              <li>Chính Sách & Quy Định Chung</li>
              <li>Thanh Toán & Giao Hàng</li>
              <li>Bảo Hành</li>
              <li>Chính Sách Bảo Mật</li>
            </Box>
          </Grid>

          {/* Address and Social */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Địa Chỉ
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <FaLocationArrow style={{ marginRight: 8 }} />
              <Typography color="text.secondary">
                140 Lê Trọng Tấn, Tân Phú, TP Hồ Chí Minh
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <FaMobileAlt style={{ marginRight: 8 }} />
              <Typography color="text.secondary">+0123456789</Typography>
            </Box>

            <Box display="flex" gap={2} mt={2}>
              <IconButton href="https://github.com/MudassarNazir956" target="_blank">
                <FaGithub />
              </IconButton>
              <IconButton href="https://www.linkedin.com/in/mudassar-nazir-8ab1a31b3/" target="_blank">
                <FaLinkedin />
              </IconButton>
              <IconButton href="https://twitter.com/Mudassar_Nazir" target="_blank">
                <FaTwitter />
              </IconButton>
              <IconButton href="https://mudassar-personal-portfolio.vercel.app/" target="_blank">
                <BsPersonVcardFill />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import BrandingImage from '~/assets/auth/login-register-bg.png'; 

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6
    }
  })
};

const AboutPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        sx={{
          textAlign: 'center',
          mb: 4
        }}
      >
        <img
          src={BrandingImage}
          alt="Logo bệnh viện sầu riêng"
          style={{ width: 120, borderRadius: 12 }}
        />
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2E7D32', mt: 2 }}>
          Bệnh viện Sầu Riêng
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
          Kết nối công nghệ và nông nghiệp, chăm sóc cây sầu riêng bằng trái tim 💚
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Sứ mệnh */}
      <motion.div variants={fadeIn} custom={1} initial="hidden" whileInView="visible">
        <Box mb={4}>
          <Typography variant="h5" sx={{ color: '#388E3C', fontWeight: 600 }}>
            🌱 Sứ mệnh của chúng tôi
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Bệnh viện Sầu Riêng là đơn vị tiên phong trong việc nghiên cứu và cung cấp các giải pháp chăm sóc cây sầu riêng. Chúng tôi mang đến các loại thuốc chất lượng cao và ứng dụng AI để hỗ trợ nông dân chẩn đoán bệnh hiệu quả và chính xác.
          </Typography>
        </Box>
      </motion.div>

      <motion.div variants={fadeIn} custom={2} initial="hidden" whileInView="visible">
        <Box mb={4}>
          <Typography variant="h5" sx={{ color: '#388E3C', fontWeight: 600 }}>
            💼 Dịch vụ của chúng tôi
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            • <strong>Thuốc đặc trị:</strong> Trị các bệnh như rầy phấn, nhện đỏ, sâu đục thân, nấm lá…<br />
            • <strong>Chẩn đoán bằng AI:</strong> Nhận diện bệnh qua hình ảnh lá, thân, quả và đề xuất giải pháp phù hợp.
          </Typography>
        </Box>
      </motion.div>

      <motion.div variants={fadeIn} custom={3} initial="hidden" whileInView="visible">
        <Box mb={4}>
          <Typography variant="h5" sx={{ color: '#388E3C', fontWeight: 600 }}>
            🤝 Vì sao chọn chúng tôi?
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            • Đội ngũ chuyên gia AI và nông nghiệp hàng đầu.<br />
            • Sản phẩm đạt chuẩn, thân thiện môi trường.<br />
            • Chẩn đoán nhanh chóng 24/7.<br />
            • Hỗ trợ kỹ thuật & đồng hành cùng nông dân.
          </Typography>
        </Box>
      </motion.div>

      <motion.div variants={fadeIn} custom={4} initial="hidden" whileInView="visible">
        <Box textAlign="center" mt={6}>
          <Typography variant="h5" sx={{ color: '#388E3C', fontWeight: 600 }}>
            📞 Liên hệ với chúng tôi
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            140 Đường Lê Trọng Tấn, Quận Tân Phú, TP. HCM<br />
            📧 info@benhviensaurieng.vn<br />
            ☎️ 0909 123 456
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            href="mailto:info@benhviensaurieng.vn"
          >
            Gửi email cho chúng tôi
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default AboutPage;

import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const AboutPage = () => {
  return (
    <Container maxWidth="md" style={{ padding: '40px 20px', fontFamily: 'Roboto, sans-serif' }}>
      <Typography variant="h3" align="center" gutterBottom style={{ color: '#2E7D32', fontWeight: 'bold' }}>
        Về Bệnh viện Sầu Riêng
      </Typography>

      <Box my={4}>
        <Typography variant="h5" gutterBottom style={{ color: '#388E3C' }}>
          Sứ mệnh của chúng tôi
        </Typography>
        <Typography variant="body1" paragraph>
          Bệnh viện Sầu Riêng là đơn vị tiên phong trong việc nghiên cứu và cung cấp các giải pháp chăm sóc sức khỏe cho cây sầu riêng. Chúng tôi cam kết mang đến các loại thuốc chất lượng cao để điều trị các bệnh thường gặp ở cây sầu riêng, đồng thời ứng dụng công nghệ AI hiện đại để hỗ trợ nông dân chẩn đoán bệnh nhanh chóng và hiệu quả.
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h5" gutterBottom style={{ color: '#388E3C' }}>
          Dịch vụ của chúng tôi
        </Typography>
        <Typography variant="body1" paragraph>
          - <strong>Cung cấp thuốc chữa bệnh sầu riêng:</strong> Chúng tôi sản xuất và phân phối các loại thuốc chuyên dụng để điều trị các bệnh như rầy phấn, nhện đỏ, sâu đục thân, và các bệnh nấm phổ biến trên cây sầu riêng. Tất cả sản phẩm đều được kiểm nghiệm kỹ lưỡng để đảm bảo an toàn và hiệu quả.
        </Typography>
        <Typography variant="body1" paragraph>
          - <strong>Chẩn đoán bệnh bằng AI:</strong> Sử dụng công nghệ nhận diện hình ảnh tiên tiến, hệ thống AI của chúng tôi có thể phân tích hình ảnh lá, thân, và quả sầu riêng để xác định bệnh. Sau khi chẩn đoán, hệ thống sẽ đề xuất loại thuốc phù hợp và hướng dẫn sử dụng chi tiết, giúp nông dân tiết kiệm thời gian và nâng cao năng suất.
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h5" gutterBottom style={{ color: '#388E3C' }}>
          Tại sao chọn chúng tôi?
        </Typography>
        <Typography variant="body1" paragraph>
          - Đội ngũ chuyên gia hàng đầu về nông nghiệp và công nghệ AI.<br />
          - Sản phẩm thuốc đạt tiêu chuẩn an toàn, thân thiện với môi trường.<br />
          - Công nghệ AI nhận diện bệnh với độ chính xác cao, hỗ trợ nông dân 24/7.<br />
          - Dịch vụ tư vấn tận tâm, đồng hành cùng nông dân trong suốt quá trình canh tác.
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h5" gutterBottom style={{ color: '#388E3C' }}>
          Liên hệ với chúng tôi
        </Typography>
        <Typography variant="body1" paragraph>
          Địa chỉ: 123 Đường Sầu Riêng, Quận Nông Nghiệp, TP. Hồ Chí Minh<br />
          Email: info@benhviensaurieng.vn<br />
          Hotline: 0909 123 456<br />
          Website: www.benhviensaurieng.vn
        </Typography>
        <Button variant="contained" color="primary" href="mailto:info@benhviensaurieng.vn">
          Gửi email cho chúng tôi
        </Button>
      </Box>
    </Container>
  );
};

export default AboutPage;
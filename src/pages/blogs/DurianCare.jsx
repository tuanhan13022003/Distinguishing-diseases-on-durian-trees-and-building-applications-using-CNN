import React from 'react';
import Box from '@mui/material/Box';
import img1 from '~/assets/blogs/durianCare/img1.jpg';
function DurianCare() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
        backgroundColor: '#fff',
        pl: 25,
        py: 1,
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.6,
        color: '#333'
      }}
    >
      <h1 style={{ color: '#2e7d32' }}>Kỹ Thuật Trồng Và Chăm Sóc Cây Sầu Riêng</h1>

      <section>
        <h2 style={{ color: '#2e7d32' }}>I. Giới Thiệu</h2>
        
          <img
            src={img1}
            alt="Giới thiệu cây sầu riêng"
            style={{ width: '300px', borderRadius: '8px' }}
          />
          <p>
          Cây sầu riêng là cây ăn quả nhiệt đới rất được ưa chuộng ở các nước Đông Nam Á... (rút gọn giới thiệu nếu cần)
        </p>
      </section>

      <section>
        <h2 style={{ color: '#2e7d32' }}>II. Kỹ Thuật Trồng</h2>

        <h3>1. Điều kiện sinh lý của cây sầu riêng:</h3>
        <ul>
          <li>Ưa khí hậu nóng, độ ẩm cao</li>
          <li>Không chịu đất phèn, mặn, sét nặng, khô hanh</li>
          <li>Lá là nơi dự trữ thức ăn, rất quan trọng</li>
          <li>Trái dễ nhão khi chín gặp mưa</li>
          <li>Đất tốt nhất là thịt, thoát nước tốt, dốc &lt; 30 độ</li>
        </ul>

        <h3>2. Giống trồng</h3>
        <ul>
          <li>Dùng cây ghép mắt hoặc ghép cành</li>
          <li>Trồng tối thiểu 2 giống để tăng đậu trái</li>
        </ul>

        <h3>3. Kỹ thuật ghép</h3>
        <ul>
          <li>Gốc ghép: cây con từ hạt</li>
          <li>Cành/mắt ghép: từ cây mẹ chất lượng</li>
          <li>Phương pháp: ghép cành hoặc mắt</li>
        </ul>

        <h3>4. Khoảng cách trồng</h3>
        <ul>
          <li>Thuần: 125–156 cây/ha (8x8m hoặc 8x10m)</li>
          <li>Xen: 70–100 cây/ha (10x12m)</li>
        </ul>

        <h3>5. Chuẩn bị hố trồng</h3>
        <ul>
          <li>Kích thước: 60–70cm tuỳ đất</li>
          <li>Bón lót: hữu cơ, super lân, NPK, Basudin...</li>
        </ul>

        <h3>6. Cách trồng</h3>
        <ul>
          <li>Đảo đất và phân, lấp trước 10–15 ngày</li>
          <li>Đặt cây, lấp đất ngang mặt bầu, dậm chặt</li>
          <li>Buộc cọc chống đổ, phủ cỏ giữ ẩm</li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: '#2e7d32' }}>III. Kỹ Thuật Chăm Sóc</h2>
        <h3>1. Cây con</h3>
        <ul>
          <li>Che bóng nhẹ, tưới đều</li>
          <li>Bón phân hữu cơ + NPK (chia 4 lần)</li>
        </ul>

        <h3>2. Bón phân</h3>
        <ul>
          <li>Giai đoạn con: 5–10kg hữu cơ, NPK tăng dần</li>
          <li>Giai đoạn trái ổn định: 3 lần/năm (sau thu, ra hoa, trái lớn)</li>
        </ul>

        <h3>3. Trồng xen và chắn gió</h3>
        <ul>
          <li>Trồng keo lai, xà cừ... tránh cây ký chủ nấm</li>
        </ul>

        <h3>4. Tỉa cành</h3>
        <ul>
          <li>Bỏ cành yếu, sâu, mọc đứng hoặc gần gốc</li>
          <li>Giữ cành ngang, đều hướng, khoẻ mạnh</li>
        </ul>

        <h3>5. Tỉa hoa, trái</h3>
        <ul>
          <li>Bỏ trái mọc dày, méo, sâu bệnh</li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: '#2e7d32' }}>IV. Phòng Trừ Sâu Bệnh</h2>
        <h3>1. Sâu hại</h3>
        <ul>
          <li>Rầy phấn, rệp sáp, sâu đục trái, nhện đỏ</li>
          <li>Dùng Fenobucarb, Diazinon, Cypermethrin...</li>
        </ul>

        <h3>2. Bệnh hại</h3>
        <ul>
          <li>Thối gốc, thán thư, đốm rong, cháy lá, nấm hồng, thối hoa</li>
          <li>Thu gom cành/lá bệnh, tỉa thông thoáng</li>
          <li>Dùng Fosetyl-Al, Mancozeb, Copper Hydroxide...</li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: '#2e7d32' }}>V. Thu Hoạch và Bảo Quản</h2>
        <p>Thu trái trên cây, không để rơi rụng, bảo quản nơi thoáng mát tránh va đập để hạn chế thiệt hại sau thu hoạch.</p>
      </section>
    </Box>
  );
}

export default DurianCare;
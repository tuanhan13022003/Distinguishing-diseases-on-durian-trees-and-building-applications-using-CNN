import React from 'react';

const DurianExportBlog = () => {
  return (
    <div className="durian-export-blog">
      <style>{`
        .durian-export-blog {
          font-family: Arial, sans-serif;
          padding: 0;
        }

        .durian-export-blog .blog-post {
          width: 77%;
          max-width: 100%;
          margin: 30px auto;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
          color: #1f2937;
          background-color: transparent;
        }

        .durian-export-blog h1 {
          font-size: 1.75rem;
          font-weight: bold;
          color: #047857;
          margin-bottom: 0.5rem;
        }

        .durian-export-blog .date {
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .durian-export-blog h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #059669;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .durian-export-blog p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .durian-export-blog .blog-img {
          width: 100%;
          height: auto;
          border-radius: 0.375rem;
          margin-bottom: 1.5rem;
        }

        .durian-export-blog ul {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: #374151;
        }

        .durian-export-blog ul li {
          margin-bottom: 0.5rem;
        }
      `}</style>

      <div className="blog-post">
        <h1>Thêm Cơ Hội Cho Sầu Riêng Việt Nam: Hướng Tới Xuất Khẩu Bền Vững</h1>
        <p className="date"><em>Ngày đăng: 26/05/2025</em></p>

        <img
          src="https://example.com/images/durian-export.jpg"
          alt="Xuất khẩu sầu riêng Việt Nam"
          className="blog-img"
        />

        <p>
          Trong bối cảnh thị trường nông sản toàn cầu đang có nhiều biến động, việc Trung Quốc phê duyệt thêm gần 1.000 mã số vùng trồng và cơ sở đóng gói sầu riêng của Việt Nam là một tín hiệu tích cực, mở ra nhiều cơ hội cho ngành sầu riêng nước ta.
        </p>

        <h2>Gia Tăng Mã Số Xuất Khẩu: Bước Tiến Quan Trọng</h2>
        <p>
          Theo thông tin từ Cục Trồng trọt và Bảo vệ thực vật, Tổng cục Hải quan Trung Quốc (GACC) đã chính thức phê duyệt thêm 829 mã số vùng trồng và 131 mã số cơ sở đóng gói sầu riêng của Việt Nam...
        </p>

        <img
          src="https://example.com/images/durian-farm.jpg"
          alt="Vườn sầu riêng tại Việt Nam"
          className="blog-img"
        />

        <h2>Thách Thức Vẫn Còn: Cần Sự Chung Tay</h2>
        <p>
          Mặc dù có thêm cơ hội, nhưng ngành sầu riêng Việt Nam vẫn đối mặt với nhiều thách thức...
        </p>

        <img
          src="https://example.com/images/durian-packaging.jpg"
          alt="Đóng gói sầu riêng xuất khẩu"
          className="blog-img"
        />

        <h2>Hành Động Thiết Thực: Hướng Tới Phát Triển Bền Vững</h2>
        <p>
          Để tận dụng tốt cơ hội và vượt qua thách thức, các bên liên quan cần thực hiện một số giải pháp cụ thể:
        </p>
        <ul>
          <li>Tăng cường kiểm soát chất lượng từ khâu trồng trọt đến đóng gói.</li>
          <li>Đào tạo và nâng cao nhận thức cho nông dân.</li>
          <li>Đầu tư vào công nghệ để đáp ứng tiêu chuẩn quốc tế.</li>
          <li>Thiết lập hệ thống truy xuất nguồn gốc minh bạch.</li>
        </ul>

        <p>
          Chỉ khi có sự chung tay của các cơ quan quản lý, doanh nghiệp và nông dân, ngành sầu riêng Việt Nam mới có thể phát triển bền vững.
        </p>

        <img
          src="https://example.com/images/durian-export-success.jpg"
          alt="Thành công trong xuất khẩu sầu riêng"
          className="blog-img"
        />
      </div>
    </div>
  );
};

export default DurianExportBlog;

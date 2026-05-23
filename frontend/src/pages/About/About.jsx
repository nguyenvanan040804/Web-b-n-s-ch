import React from 'react';
import './About.css';

export default function About() {
  return (
    <main className="about-container">
      <section className="about-hero">
        <h2>Về Chúng Tôi - Nhà Sách</h2>
        <p>Nơi kết nối tri thức, lan tỏa đam mê đọc sách đến mọi người dân Việt Nam.</p>
      </section>

      <div className="about-grid">
        <article className="about-card">
          <h3>Sứ mệnh</h3>
          <p>Nhà Sách ra đời vào năm 2026 với khát vọng mang đến hàng triệu đầu sách hay chất lượng cao, giá thành hợp lý và dịch vụ giao hàng nhanh chóng nhất đến tay độc giả cả nước, nâng tầm văn hóa đọc trong cộng đồng.</p>
        </article>

        <article className="about-card">
          <h3>Giá trị cốt lõi</h3>
          <ul>
            <li><strong>Chất lượng:</strong> Cam kết 100% sách thật, có bản quyền từ các nhà xuất bản hàng đầu Việt Nam.</li>
            <li><strong>Tận tâm:</strong> Lắng nghe phản hồi và hỗ trợ quý độc giả mọi lúc mọi nơi.</li>
            <li><strong>Đổi mới:</strong> Tích hợp trải nghiệm số thông minh giúp bạn chọn và đặt sách nhanh nhất.</li>
          </ul>
        </article>
      </div>

      <section className="about-stats-sec">
        <h3>Nhà Sách qua những con số</h3>
        <div className="about-stats-grid">
          <div className="stat-card">
            <strong>10,000+</strong>
            <span>Đầu sách đa dạng</span>
          </div>
          <div className="stat-card">
            <strong>50,000+</strong>
            <span>Khách hàng thân thiết</span>
          </div>
          <div className="stat-card">
            <strong>1-3 ngày</strong>
            <span>Thời gian giao hàng toàn quốc</span>
          </div>
        </div>
      </section>
    </main>
  );
}

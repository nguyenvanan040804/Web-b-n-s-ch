import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Thông tin công ty */}
        <section className="footer-section">
          <h3>Về Nhà Sách</h3>
          <ul>
            <li><a href="#about">Giới thiệu</a></li>
            <li><a href="#mission">Sứ mệnh & Giá trị</a></li>
            <li><a href="#careers">Tuyển dụng</a></li>
            <li><a href="#press">Báo chí</a></li>
          </ul>
        </section>

        {/* Hỗ trợ & Trợ giúp */}
        <section className="footer-section">
          <h3>Hỗ trợ khách hàng</h3>
          <ul>
            <li><a href="#faq">Câu hỏi thường gặp</a></li>
            <li><a href="#contact">Liên hệ chúng tôi</a></li>
            <li><a href="#shipping">Chính sách vận chuyển</a></li>
            <li><a href="#returns">Đổi trả hàng</a></li>
          </ul>
        </section>

        {/* Chính sách */}
        <section className="footer-section">
          <h3>Chính sách & Điều khoản</h3>
          <ul>
            <li><a href="#terms">Điều khoản sử dụng</a></li>
            <li><a href="#privacy">Chính sách bảo mật</a></li>
            <li><a href="#cookies">Chính sách cookie</a></li>
            <li><a href="#payment">Chính sách thanh toán</a></li>
          </ul>
        </section>

        {/* Bản tin */}
        <section className="footer-section newsletter-section">
          <h3>Nhận ưu đãi mới nhất</h3>
          <p>Đăng ký email để nhận thông tin về sách mới, giảm giá và ưu đãi độc quyền.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Nhập email của bạn" required />
            <button type="submit">Đăng ký</button>
          </form>
          <div className="social-links">
            <a href="#facebook" title="Facebook">f</a>
            <a href="#twitter" title="Twitter">𝕏</a>
            <a href="#instagram" title="Instagram">📷</a>
            <a href="#youtube" title="YouTube">▶</a>
          </div>
        </section>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Nhà Sách. Tất cả quyền được bảo lưu.</p>
        <p>Địa chỉ: Số 12 Đường Cầu Giấy, Hà Nội | Hotline: 1900 8888 | Email: hotro@nhasach.com.vn</p>
      </div>
    </footer>
  );
}

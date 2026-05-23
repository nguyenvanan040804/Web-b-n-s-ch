import React from 'react';
import './Contact.css';

export default function Contact({ app }) {
  const { contactForm, setContactForm, handleContactSubmit, contactMessage } = app;

  return (
    <main className="contact-container">
      <div className="panel-header-simple">
        <h2>Liên hệ & Góp ý</h2>
        <p>Chúng tôi luôn lắng nghe ý kiến đóng góp từ bạn để cải thiện dịch vụ ngày một tốt hơn.</p>
      </div>

      <div className="contact-grid">
        {/* Khối thông tin */}
        <aside className="contact-info-card">
          <h3>Thông tin liên hệ</h3>
          <p>Bạn có thể liên hệ trực tiếp với chúng tôi qua các kênh sau:</p>

          <div className="contact-details">
            <p>📍 <strong>Địa chỉ:</strong> Số 12 Đường Cầu Giấy, Quận Cầu Giấy, Hà Nội</p>
            <p>📞 <strong>Hotline:</strong> 1900 8888 (8h00 - 21h00 hàng ngày)</p>
            <p>✉️ <strong>Email:</strong> hotro@nhasach.com.vn</p>
            <p>🌐 <strong>Website:</strong> www.nhasach.com.vn</p>
          </div>

          <div className="contact-map-placeholder">
            <p>🗺️ Bản đồ Nhà Sách Cầu Giấy</p>
            <span>(Bản đồ định vị cửa hàng trực quan)</span>
          </div>
        </aside>

        {/* Khối form */}
        <section className="contact-form-card">
          <h3>Gửi thư góp ý, phản hồi</h3>

          <form onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Họ và tên của bạn</label>
              <input 
                id="contact-name"
                type="text" 
                required
                placeholder="Nhập họ tên"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Địa chỉ Email</label>
              <input 
                id="contact-email"
                type="email" 
                required
                placeholder="example@gmail.com"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Chủ đề</label>
              <input 
                id="contact-subject"
                type="text" 
                required
                placeholder="Góp ý sản phẩm, báo lỗi giao diện, hợp tác..."
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-msg">Nội dung chi tiết</label>
              <textarea 
                id="contact-msg"
                rows="5"
                required
                placeholder="Nhập ý kiến đóng góp của bạn tại đây..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Gửi góp ý</button>
          </form>

          {contactMessage && <div className="message-box contact-msg-box">{contactMessage}</div>}
        </section>
      </div>
    </main>
  );
}

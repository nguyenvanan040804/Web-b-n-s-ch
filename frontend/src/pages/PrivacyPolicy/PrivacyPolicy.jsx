import React from 'react';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <main className="policy-container">
      <div className="panel-header-simple">
        <h2>Chính sách Bảo mật</h2>
        <p>Hiệu lực từ ngày 1 tháng 1 năm 2024</p>
      </div>

      <div className="policy-content">
        <section className="policy-section">
          <h3>1. Thông tin chúng tôi thu thập</h3>
          <p>Nhà Sách thu thập các thông tin sau từ bạn:</p>
          <ul>
            <li><strong>Thông tin cá nhân:</strong> Họ tên, email, số điện thoại, địa chỉ.</li>
            <li><strong>Thông tin thanh toán:</strong> Số tài khoản, phương thức thanh toán (không lưu trữ mật khẩu).</li>
            <li><strong>Thông tin hành vi:</strong> Lịch sử duyệt, sách yêu thích, giỏ hàng.</li>
            <li><strong>Dữ liệu kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, cookies.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h3>2. Cách chúng tôi sử dụng thông tin của bạn</h3>
          <p>Thông tin của bạn được sử dụng để:</p>
          <ul>
            <li>Xử lý đơn hàng và giao hàng.</li>
            <li>Gửi hóa đơn, xác nhận đơn hàng, cập nhật trạng thái giao hàng.</li>
            <li>Cung cấp dịch vụ khách hàng và hỗ trợ.</li>
            <li>Gửi thông tin về sản phẩm, khuyến mãi (nếu bạn đồng ý).</li>
            <li>Cải thiện website và trải nghiệm người dùng.</li>
            <li>Phòng chống gian lận và bảo vệ an toàn.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h3>3. Chia sẻ thông tin</h3>
          <p>Chúng tôi không bán, cho thuê hay chia sẻ thông tin cá nhân của bạn với bên thứ ba ngoại trừ:</p>
          <ul>
            <li>Công ty vận chuyển (để giao hàng).</li>
            <li>Nhà cung cấp thanh toán (để xử lý thanh toán).</li>
            <li>Khi được yêu cầu bởi pháp luật hoặc cơ quan chính phủ.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h3>4. Bảo mật dữ liệu</h3>
          <p>Nhà Sách sử dụng các biện pháp bảo mật kỹ thuật tiên tiến (SSL encryption, tường lửa, kiểm tra truy cập) để bảo vệ thông tin của bạn khỏi truy cập trái phép, thay đổi hoặc tiết lộ.</p>
        </section>

        <section className="policy-section">
          <h3>5. Quyền của bạn</h3>
          <p>Bạn có quyền:</p>
          <ul>
            <li>Truy cập, sửa đổi hoặc xóa thông tin cá nhân của bạn.</li>
            <li>Từ chối nhận email tiếp thị bất kỳ lúc nào.</li>
            <li>Yêu cầu chúng tôi không sử dụng dữ liệu của bạn cho các mục đích nhất định.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h3>6. Liên hệ</h3>
          <p>Nếu bạn có câu hỏi về chính sách bảo mật này, vui lòng liên hệ:</p>
          <p>
            <strong>Email:</strong> baomat@nhasach.com.vn<br />
            <strong>Địa chỉ:</strong> Số 12 Đường Cầu Giấy, Hà Nội<br />
            <strong>Hotline:</strong> 1900 8888
          </p>
        </section>
      </div>
    </main>
  );
}

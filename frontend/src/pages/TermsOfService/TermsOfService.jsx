import React from 'react';
import './TermsOfService.css';

export default function TermsOfService() {
  return (
    <main className="policy-container">
      <div className="panel-header-simple">
        <h2>Điều khoản Sử dụng</h2>
        <p>Hiệu lực từ ngày 1 tháng 1 năm 2024</p>
      </div>

      <div className="policy-content">
        <section className="policy-section">
          <h3>1. Chấp nhận Điều khoản</h3>
          <p>Bằng cách truy cập và sử dụng trang web Nhà Sách, bạn đồng ý tuân thủ các Điều khoản Sử dụng này. Nếu bạn không đồng ý, vui lòng ngừng sử dụng dịch vụ của chúng tôi.</p>
        </section>

        <section className="policy-section">
          <h3>2. Tài khoản người dùng</h3>
          <p>Khi đăng ký tài khoản, bạn chịu trách nhiệm:</p>
          <ul>
            <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật.</li>
            <li>Bảo vệ bảo mật tài khoản và mật khẩu của bạn.</li>
            <li>Chịu trách nhiệm cho tất cả hoạt động diễn ra trên tài khoản của bạn.</li>
            <li>Không sử dụng tài khoản của người khác mà không được phép.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h3>3. Sản phẩm và Giá cả</h3>
          <ul>
            <li>Nhà Sách không chịu trách nhiệm cho các lỗi hiển thị giá hoặc mô tả sản phẩm.</li>
            <li>Giá có thể thay đổi mà không có thông báo trước.</li>
            <li>Chúng tôi có quyền từ chối hoặc hủy đơn hàng nếu có lỗi giá hoặc vi phạm chính sách.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h3>4. Đặt hàng và Thanh toán</h3>
          <ul>
            <li>Đặt hàng trên Nhà Sách có nghĩa là bạn đồng ý mua sản phẩm.</li>
            <li>Chúng tôi sẽ xác nhận đơn hàng qua email trong vòng 24 giờ.</li>
            <li>Thanh toán phải được hoàn thành trước khi xử lý đơn hàng.</li>
            <li>Tất cả giao dịch đều được bảo vệ bởi các biện pháp bảo mật tiên tiến.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h3>5. Vận chuyển và Giao hàng</h3>
          <ul>
            <li>Nhà Sách vận chuyển đến tất cả các địa điểm trên toàn quốc.</li>
            <li>Thời gian giao dự kiến là 1-3 ngày làm việc từ khi xác nhận.</li>
            <li>Rủi ro vận chuyển thuộc về công ty vận chuyển.</li>
            <li>Nếu hàng bị hư hỏng khi giao, vui lòng báo cáo ngay.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h3>6. Chính sách Trả lại & Hoàn tiền</h3>
          <ul>
            <li>Bạn có thể trả lại sách trong vòng 7 ngày từ khi nhận.</li>
            <li>Sách phải chưa qua sử dụng, giữ nguyên bề ngoài.</li>
            <li>Hoàn tiền sẽ được xử lý trong vòng 5-7 ngày làm việc sau khi nhận và kiểm tra hàng.</li>
            <li>Phí vận chuyển hoàn lại sẽ không được hoàn lại ngoại trừ lỗi từ phía chúng tôi.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h3>7. Hạn chế trách nhiệm</h3>
          <p>Nhà Sách không chịu trách nhiệm cho:</p>
          <ul>
            <li>Hư hỏng hoặc mất dữ liệu trên trang web.</li>
            <li>Gián đoạn dịch vụ do sự cố kỹ thuật.</li>
            <li>Các tổn thất gián tiếp hoặc tổn thất do hành động của bên thứ ba.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h3>8. Sửa đổi Điều khoản</h3>
          <p>Nhà Sách có quyền sửa đổi Điều khoản này bất kỳ lúc nào. Những thay đổi sẽ có hiệu lực ngay khi được đăng trên trang web.</p>
        </section>

        <section className="policy-section">
          <h3>9. Liên hệ</h3>
          <p>Nếu bạn có thắc mắc về các Điều khoản này, vui lòng liên hệ:</p>
          <p>
            <strong>Email:</strong> hotro@nhasach.com.vn<br />
            <strong>Địa chỉ:</strong> Số 12 Đường Cầu Giấy, Hà Nội<br />
            <strong>Hotline:</strong> 1900 8888
          </p>
        </section>
      </div>
    </main>
  );
}

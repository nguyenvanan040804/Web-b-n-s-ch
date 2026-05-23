import React from 'react';
import './FAQ.css';

export default function FAQ({ app }) {
  const [activeIdx, setActiveIdx] = React.useState(null);

  const faqs = [
    {
      q: 'Nhà Sách giao hàng ở những địa điểm nào?',
      a: 'Chúng tôi giao hàng toàn quốc, bao gồm cả những địa phương ngoài thành phố. Thời gian giao từ 1-3 ngày làm việc tùy vào khoảng cách.'
    },
    {
      q: 'Tôi có thể trả lại sách nếu không hài lòng không?',
      a: 'Có, bạn có thể trả lại sách trong vòng 7 ngày kể từ khi nhận hàng nếu sách chưa qua sử dụng hoặc có lỗi. Chúng tôi sẽ hoàn lại tiền ngay khi kiểm tra.'
    },
    {
      q: 'Có những phương thức thanh toán nào?',
      a: 'Nhà Sách hỗ trợ thanh toán bằng tiền mặt khi nhận hàng (COD), chuyển khoản ngân hàng, và sẽ sớm hỗ trợ ví điện tử.'
    },
    {
      q: 'Làm sao để biết khi nào hàng của tôi được giao?',
      a: 'Sau khi đặt hàng, bạn sẽ nhận được email và tin nhắn SMS cập nhật tình trạng đơn hàng. Bạn cũng có thể kiểm tra trong phần "Đơn hàng của tôi".'
    },
    {
      q: 'Có chiết khấu hay ưu đãi cho đơn hàng lớn không?',
      a: 'Có! Đơn hàng từ 300.000đ trở lên được miễn phí vận chuyển. Chúng tôi cũng thường xuyên có các chương trình khuyến mãi hàng tuần.'
    },
    {
      q: 'Tôi có thể hủy đơn hàng sau khi đặt không?',
      a: 'Nếu đơn hàng chưa được xử lý/giao, bạn có thể hủy trong vòng 2 giờ. Vui lòng liên hệ bộ phận hỗ trợ để được hỗ trợ nhanh nhất.'
    }
  ];

  return (
    <main className="faq-container">
      <div className="panel-header-simple">
        <h2>Câu hỏi thường gặp (FAQ)</h2>
        <p>Những thắc mắc phổ biến từ khách hàng và câu trả lời chi tiết từ đội ngũ Nhà Sách.</p>
      </div>

      <div className="faq-list">
        {faqs.map((item, idx) => (
          <div key={idx} className="faq-item">
            <button
              className={`faq-question ${activeIdx === idx ? 'active' : ''}`}
              onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
            >
              <span>{item.q}</span>
              <span className="faq-icon">{activeIdx === idx ? '−' : '+'}</span>
            </button>
            {activeIdx === idx && (
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="faq-contact-cta">
        <h3>Vẫn còn thắc mắc?</h3>
        <p>Đối với những câu hỏi khác, vui lòng liên hệ trực tiếp với chúng tôi.</p>
        <button className="cta-btn" onClick={() => app?.switchPage('contact')}>Liên hệ ngay</button>
      </div>
    </main>
  );
}

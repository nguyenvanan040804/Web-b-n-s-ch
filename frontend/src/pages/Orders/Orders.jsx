import React from 'react';
import './Orders.css';

export default function Orders({ app }) {
  const { orders, switchPage } = app;

  return (
    <main className="orders-panel">
      <div className="panel-header-simple">
        <h2>Lịch sử đơn hàng</h2>
        <p>Danh sách các đơn hàng bạn đã thực hiện tại Nhà Sách.</p>
      </div>

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-header">
                <div>
                  <span className="order-id">Mã đơn: <strong>{order.id}</strong></span>
                  <span className="order-date">{order.date}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="order-status-badge">{order.status}</span>
                  <span className={`payment-status-tag ${order.paymentStatus === 'Đã thanh toán' ? 'paid' : 'unpaid'}`}>
                    {order.paymentStatus || 'Chưa thanh toán'}
                  </span>
                </div>
              </div>

              <div className="order-card-body">
                <div className="order-items-summary">
                  {order.items.map((item) => (
                    <div className="order-item-row" key={item.id}>
                      <span>{item.title} <strong>x {item.quantity}</strong></span>
                      <span>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
                    </div>
                  ))}
                </div>

                <div className="order-shipping-info">
                  <h4>Thông tin giao hàng:</h4>
                  <p><strong>Người nhận:</strong> {order.shippingInfo.name}</p>
                  <p><strong>Số điện thoại:</strong> {order.shippingInfo.phone}</p>
                  <p><strong>Địa chỉ:</strong> {order.shippingInfo.address}</p>
                  {order.shippingInfo.note && <p><strong>Ghi chú:</strong> {order.shippingInfo.note}</p>}
                  <p><strong>Phương thức thanh toán:</strong> {order.shippingInfo.paymentMethod === 'COD' ? 'Thanh toán trực tiếp khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}</p>
                </div>
              </div>

              <div className="order-card-footer">
                <span>Tổng tiền thanh toán:</span>
                <strong className="order-total-amount">{(order.total + (order.total >= 300000 ? 0 : 30000)).toLocaleString('vi-VN')} đ</strong>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state-orders">
          <span className="orders-emoji">📦</span>
          <h3>Bạn chưa có đơn hàng nào</h3>
          <p>Hãy chọn mua một vài cuốn sách hay để trải nghiệm dịch vụ tuyệt vời của chúng tôi nhé!</p>
          <button className="back-to-store-btn" onClick={() => switchPage('store')}>Mua sách ngay</button>
        </div>
      )}
    </main>
  );
}

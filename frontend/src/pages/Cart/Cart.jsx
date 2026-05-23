import React from 'react';
import './Cart.css';

export default function Cart({ app }) {
  const {
    cart,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    user,
    setCheckoutStep,
    setIsCheckoutOpen,
    setMessage,
    switchPage
  } = app;

  return (
    <main className="cart-page-container">
      <div className="panel-header-simple">
        <h2>Giỏ hàng của bạn</h2>
        <p>Kiểm tra danh sách sách đã chọn và tiến hành đặt hàng.</p>
      </div>

      {cart.length > 0 ? (
        <div className="cart-page-layout">
          {/* Left panel: List of items */}
          <section className="cart-items-panel">
            <div className="cart-items-list">
              {cart.map((item) => (
                <div className="cart-page-item" key={item.id}>
                  <img className="cart-item-page-img" src={item.coverUrl} alt={item.title} />
                  
                  <div className="cart-item-main-details">
                    <h3>{item.title}</h3>
                    <p className="cart-item-author">Tác giả: <strong>{item.author}</strong></p>
                    <p className="cart-item-category">Thể loại: {item.category}</p>
                  </div>

                  <div className="cart-item-price-quantity">
                    <span className="cart-item-unit-price">{item.price.toLocaleString('vi-VN')} đ</span>
                    
                    <div className="cart-page-actions">
                      <button type="button" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span className="cart-qty-num">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>

                  <div className="cart-item-subtotal-remove">
                    <strong className="cart-item-subtotal">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</strong>
                    <button type="button" className="remove-page-item-btn" onClick={() => removeFromCart(item.id)} title="Xóa khỏi giỏ hàng">×</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-continue-shopping">
              <button className="back-shopping-btn" onClick={() => switchPage('store')}>← Tiếp tục mua sách</button>
            </div>
          </section>

          {/* Right panel: Summary */}
          <aside className="cart-summary-panel">
            <h3>Tóm tắt đơn hàng</h3>
            
            <div className="cart-summary-details">
              <div className="summary-page-row">
                <span>Tạm tính ({cartCount} sản phẩm)</span>
                <span>{cartTotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="summary-page-row">
                <span>Phí vận chuyển</span>
                <span>{cartTotal >= 300000 ? 'Miễn phí' : '30.000 đ'}</span>
              </div>
              
              {cartTotal < 300000 && (
                <div className="shipping-notice">
                  Mua thêm <strong>{(300000 - cartTotal).toLocaleString('vi-VN')} đ</strong> để được miễn phí vận chuyển!
                </div>
              )}

              <div className="summary-page-row total">
                <span>Tổng thanh toán</span>
                <strong>
                  {(cartTotal + (cartTotal >= 300000 ? 0 : 30000)).toLocaleString('vi-VN')} đ
                </strong>
              </div>
            </div>

            <button 
              className="checkout-page-btn" 
              onClick={() => {
                if (user) {
                  setCheckoutStep('form');
                  setIsCheckoutOpen(true);
                } else {
                  setMessage('Vui lòng đăng nhập để tiến hành thanh toán.');
                  switchPage('login');
                }
              }}
            >
              Tiến hành Thanh toán
            </button>
          </aside>
        </div>
      ) : (
        <div className="empty-cart-page-state">
          <div className="empty-cart-illustration">
            <svg className="empty-cart-svg" viewBox="0 0 24 24" width="64" height="64">
              <path fill="currentColor" d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
          <h3>Giỏ hàng của bạn đang trống</h3>
          <p>Hãy khám phá tủ sách phong phú của chúng tôi và chọn những cuốn sách yêu thích nhé!</p>
          <button className="go-to-store-btn" onClick={() => switchPage('store')}>Quay lại Cửa hàng</button>
        </div>
      )}
    </main>
  );
}

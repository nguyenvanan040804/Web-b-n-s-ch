import React from 'react';
import './Admin.css';

export default function Admin({ app }) {
  const { adminTab, setAdminTab, orders, handleUpdateOrderStatus, newBook, setNewBook, handleCreateBook, adminMessage } = app;

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Chờ chuẩn bị hàng').length;

  return (
    <main className="admin-container">
      <div className="panel-header-simple">
        <h2>Bảng Quản trị Hệ thống</h2>
        <p>Kiểm duyệt đơn hàng của khách hàng và đăng tải thêm đầu sách mới lên kệ.</p>
      </div>

      {/* Analytics Widgets */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-card-icon revenue-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
          <div className="stat-card-info">
            <span>Tổng doanh số</span>
            <strong>{(totalRevenue).toLocaleString('vi-VN')} đ</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-icon orders-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </div>
          <div className="stat-card-info">
            <span>Tổng đơn hàng</span>
            <strong>{orders.length} đơn</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-icon pending-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13h1v6l5.25 3.15-.75 1.23L11.5 12.5V7z"/>
            </svg>
          </div>
          <div className="stat-card-info">
            <span>Chờ chuẩn bị hàng</span>
            <strong>{pendingOrders} đơn</strong>
          </div>
        </div>
      </div>

      {/* Sub tabs nav */}
      <div className="admin-nav-tabs">
        <button 
          className={`admin-tab-btn ${adminTab === 'orders' ? 'active' : ''}`}
          onClick={() => setAdminTab('orders')}
        >
          Quản lý Đơn hàng ({orders.length})
        </button>
        <button 
          className={`admin-tab-btn ${adminTab === 'add-book' ? 'active' : ''}`}
          onClick={() => setAdminTab('add-book')}
        >
          Thêm Sách mới
        </button>
      </div>

      {adminTab === 'orders' && (
        <section className="admin-orders-section">
          <h3>Danh sách Đơn hàng của Hệ thống</h3>
          {orders.length > 0 ? (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Tổng tiền</th>
                    <th>Thời gian</th>
                    <th>Trạng thái hiện tại</th>
                    <th>Hành động thay đổi</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord.id}>
                      <td><strong>{ord.id}</strong></td>
                      <td>
                        <div><strong>{ord.shippingInfo.name}</strong></div>
                        <div style={{ fontSize: '0.8rem', color: '#667085' }}>{ord.shippingInfo.phone}</div>
                      </td>
                      <td><strong>{(ord.total + (ord.total >= 300000 ? 0 : 30000)).toLocaleString('vi-VN')} đ</strong></td>
                      <td>{ord.date.split(' vào ')[0] || ord.date}</td>
                      <td>
                        <span className={`admin-status-lbl status-${ord.status.replace(/\s+/g, '-').toLowerCase()}`}>
                          {ord.status}
                        </span>
                      </td>
                      <td>
                        <select 
                          className="admin-status-select"
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                        >
                          <option value="Chờ chuẩn bị hàng">Chờ chuẩn bị hàng</option>
                          <option value="Đang giao hàng">Đang giao hàng</option>
                          <option value="Đã giao thành công">Đã giao thành công</option>
                          <option value="Đã hủy đơn">Hủy đơn hàng</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>Hiện chưa có đơn đặt hàng nào trong hệ thống.</p>
            </div>
          )}
        </section>
      )}

      {adminTab === 'add-book' && (
        <section className="admin-add-book-section">
          <h3>Đăng tải đầu sách mới lên Cửa hàng</h3>
          <p className="admin-add-book-p">Điền đầy đủ thông số dưới đây. Sách mới sẽ xuất hiện trực tiếp ngay đầu trang Cửa hàng để bạn thêm vào giỏ hàng.</p>
          
          <form className="add-book-form-grid" onSubmit={handleCreateBook}>
            <div className="form-group">
              <label htmlFor="new-title">Tiêu đề sách *</label>
              <input 
                id="new-title"
                type="text" 
                required
                placeholder="Ví dụ: Đọc vị bất kỳ ai"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-author">Tác giả *</label>
              <input 
                id="new-author"
                type="text" 
                required
                placeholder="Ví dụ: David J. Lieberman"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-cat">Thể loại sách</label>
              <select 
                id="new-cat"
                className="admin-select-field"
                value={newBook.category}
                onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
              >
                <option value="Tiểu thuyết">Tiểu thuyết</option>
                <option value="Kỹ năng">Kỹ năng</option>
                <option value="Kinh tế">Kinh tế</option>
                <option value="Thiếu nhi">Thiếu nhi</option>
                <option value="Khoa học">Khoa học</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="new-price">Giá tiền (VND) *</label>
              <input 
                id="new-price"
                type="number" 
                required
                placeholder="Ví dụ: 89000"
                value={newBook.price}
                onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-cover">Địa chỉ URL ảnh bìa</label>
              <input 
                id="new-cover"
                type="text" 
                placeholder="Bỏ trống sẽ tự động lấy ảnh Unsplash mặc định"
                value={newBook.coverUrl}
                onChange={(e) => setNewBook({ ...newBook, coverUrl: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-pub">Nhà xuất bản</label>
              <input 
                id="new-pub"
                type="text" 
                placeholder="Ví dụ: NXB Trẻ"
                value={newBook.publisher}
                onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-pages">Số trang</label>
              <input 
                id="new-pages"
                type="number" 
                placeholder="Ví dụ: 250"
                value={newBook.pages}
                onChange={(e) => setNewBook({ ...newBook, pages: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new-year">Năm xuất bản</label>
              <input 
                id="new-year"
                type="number" 
                placeholder="Ví dụ: 2023"
                value={newBook.year}
                onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
              />
            </div>

            <div className="form-group full-width-field">
              <label htmlFor="new-desc">Mô tả tóm tắt sách</label>
              <textarea 
                id="new-desc"
                rows="4"
                placeholder="Nhập mô tả tóm tắt nội dung chính để khách hàng nắm bắt được trước khi đặt..."
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn full-width-field">
              Lưu và Đăng lên cửa hàng
            </button>
          </form>

          {adminMessage && <div className="message-box admin-msg-box">{adminMessage}</div>}
        </section>
      )}
    </main>
  );
}

import React from 'react';
import { Ic, ICONS } from '../AdminIcons';
import './Orders.css';

/**
 * Orders — Tab Quản lý Đơn hàng
 * Props: orders, handleUpdateOrderStatus, handleDeleteOrder, filterDate, setFilterDate, todayISO, user
 */
export default function Orders({ orders, handleUpdateOrderStatus, handleDeleteOrder, filterDate, setFilterDate, todayISO, user }) {
  return (
    <div>
      {/* Section header */}
      <div className="adm-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h3>Quản lý Đơn hàng</h3>
          <p>Hiển thị {orders.length} đơn hàng {filterDate ? 'trong ngày' : 'trong hệ thống'}.</p>
        </div>
        <div className="date-filter-wrapper">
            <div className="date-filter-label">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm-10-6H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
              </svg>
              Ngày đặt:
            </div>
            <input 
              id="order-date-filter"
              type="date" 
              className="date-input-field"
              value={filterDate}
              max={todayISO}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            {filterDate && (
              <button 
                className="date-clear-btn"
                onClick={() => setFilterDate('')}
                title="Bỏ lọc, xem toàn bộ lịch sử đơn hàng"
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                Hủy lọc
              </button>
            )}
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="adm-card adm-no-pad">
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Thanh toán</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Cập nhật</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(ord => (
                  <tr key={ord.id}>
                    <td><strong className="adm-order-id">#{ord.id}</strong></td>
                    <td>
                      <div><strong>{ord.shippingInfo.name}</strong></div>
                      <div className="adm-sub">{ord.shippingInfo.phone}</div>
                      <div className="adm-sub adm-addr">{ord.shippingInfo.address}</div>
                    </td>
                    <td>
                      <div>{ord.items?.length || 0} sản phẩm</div>
                      <div className="adm-sub adm-items-preview">
                        {ord.items?.slice(0, 2).map(i => i.title).join(', ')}
                        {(ord.items?.length || 0) > 2 ? '...' : ''}
                      </div>
                    </td>
                    <td>
                      <strong>
                        {(ord.total + (ord.total >= 300000 ? 0 : 30000)).toLocaleString('vi-VN')} đ
                      </strong>
                    </td>
                    <td>
                      <span className="adm-sub">
                        {ord.shippingInfo?.paymentMethod || 'COD'}
                      </span>
                    </td>
                    <td className="adm-sub">{ord.date?.split(' vào ')[0] || ord.date}</td>
                    <td>
                      <span className={`adm-status-lbl status-${ord.status.replace(/\s+/g, '-').toLowerCase()}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <select
                        className="adm-select"
                        value={ord.status}
                        onChange={e => handleUpdateOrderStatus(ord.id, e.target.value)}
                      >
                        <option value="Chờ chuẩn bị hàng">Chờ chuẩn bị hàng</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Đã giao thành công">Đã giao thành công</option>
                        <option value="Đã hủy đơn">Hủy đơn hàng</option>
                      </select>
                      {user?.role === 'superadmin' && (
                        <button 
                          onClick={() => handleDeleteOrder(ord.id)}
                          style={{ color: '#ef4444', background: 'none', border: 'none', padding: '4px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          title="Xóa đơn hàng (Super Admin)"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                             <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="adm-card adm-empty-state">
          <Ic path={ICONS.orders} size={52} />
          <h4>Chưa có đơn hàng nào</h4>
          <p>{filterDate ? 'Không có đơn đặt hàng nào trong ngày này.' : 'Hệ thống hiện chưa ghi nhận bất kỳ đơn hàng nào từ khách hàng.'}</p>
        </div>
      )}
    </div>
  );
}

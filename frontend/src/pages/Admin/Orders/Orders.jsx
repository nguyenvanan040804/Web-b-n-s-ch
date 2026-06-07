import React, { useState } from 'react';
import { Ic, ICONS } from '../AdminIcons';
import './Orders.css';

/**
 * Orders — Tab Quản lý Đơn hàng
 * Props: orders, handleUpdateOrderStatus
 */
export default function Orders({ orders, handleUpdateOrderStatus }) {
  // Lấy ngày hiện tại chuẩn YYYY-MM-DD theo múi giờ local
  const tzOffset = (new Date()).getTimezoneOffset() * 60000;
  const todayISO = new Date(Date.now() - tzOffset).toISOString().split('T')[0];
  
  const [filterDate, setFilterDate] = useState(todayISO);

  const filteredOrders = orders.filter(ord => {
    if (!filterDate) return true; // Nếu bỏ trống ngày -> Hiển thị tất cả
    
    // ord.date thường có dạng "07/06/2026 19:13:33" hoặc "7/6/2026"
    // Cố gắng trích xuất DD, MM, YYYY
    const match = ord.date?.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (match) {
      const d = match[1].padStart(2, '0');
      const m = match[2].padStart(2, '0');
      const y = match[3];
      const ordDateStr = `${y}-${m}-${d}`;
      return ordDateStr === filterDate;
    }
    
    // Dự phòng tìm chuỗi string thô
    const parts = filterDate.split('-');
    if (parts.length === 3) {
      const formattedVi = `${parseInt(parts[2], 10)}/${parseInt(parts[1], 10)}/${parts[0]}`;
      const formattedVi2 = `${parts[2]}/${parts[1]}/${parts[0]}`;
      return ord.date?.includes(formattedVi) || ord.date?.includes(formattedVi2);
    }
    return false;
  });

  return (
    <div>
      {/* Section header */}
      <div className="adm-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h3>Quản lý Đơn hàng</h3>
          <p>Hiển thị {filteredOrders.length} đơn hàng {filterDate ? 'trong ngày' : 'trong hệ thống'}.</p>
        </div>
        <div className="date-filter-box" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label htmlFor="order-date-filter" style={{ fontWeight: '500', color: '#475569' }}>Chọn ngày:</label>
            <input 
              id="order-date-filter"
              type="date" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit' }}
            />
            {filterDate && (
              <button 
                onClick={() => setFilterDate('')}
                style={{ padding: '8px 16px', background: '#e2e8f0', color: '#334155', fontWeight: '500', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                title="Xem tất cả lịch sử đơn hàng"
              >
                Tất cả
              </button>
            )}
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="adm-card adm-no-pad">
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Cập nhật</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(ord => (
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
                    <td className="adm-sub">{ord.date?.split(' vào ')[0] || ord.date}</td>
                    <td>
                      <span className={`adm-status-lbl status-${ord.status.replace(/\s+/g, '-').toLowerCase()}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td>
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

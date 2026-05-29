import React from 'react';
import { Ic, ICONS } from '../AdminIcons';
import './Orders.css';

/**
 * Orders — Tab Quản lý Đơn hàng
 * Props: orders, handleUpdateOrderStatus
 */
export default function Orders({ orders, handleUpdateOrderStatus }) {
  return (
    <div>
      {/* Section header */}
      <div className="adm-section-header">
        <div>
          <h3>Quản lý Đơn hàng</h3>
          <p>Cập nhật trạng thái giao hàng cho {orders.length} đơn trong hệ thống.</p>
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
          <p>Hệ thống hiện chưa ghi nhận bất kỳ đơn hàng nào từ khách hàng.</p>
        </div>
      )}
    </div>
  );
}

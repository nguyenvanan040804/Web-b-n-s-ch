import React from 'react';
import { Ic, ICONS } from '../AdminIcons';
import './Dashboard.css';

/**
 * Dashboard — Tab Tổng quan
 * Props: orders, books, setAdminTab
 */
export default function Dashboard({ orders, books, setAdminTab }) {

  /* ── Computed stats ── */
  const totalRevenue    = orders.filter(o => o.status !== 'Đã hủy đơn').reduce((s, o) => s + o.total, 0);
  const pendingOrders   = orders.filter(o => o.status === 'Chờ chuẩn bị hàng').length;
  const shippingOrders  = orders.filter(o => o.status === 'Đang giao hàng').length;
  const completedOrders = orders.filter(o => o.status === 'Đã giao thành công').length;
  const cancelledOrders = orders.filter(o => o.status === 'Đã hủy đơn').length;

  /* ── Revenue by category ── */
  const catRev = {};
  orders.filter(o => o.status !== 'Đã hủy đơn').forEach(order => {
    (order.items || []).forEach(item => {
      const book = books.find(b => b.id === item.id);
      const cat  = book?.category || 'Khác';
      catRev[cat] = (catRev[cat] || 0) + item.price * item.quantity;
    });
  });
  const catEntries = Object.entries(catRev).sort((a, b) => b[1] - a[1]);
  const maxRev = Math.max(...catEntries.map(([, v]) => v), 1);

  /* ── Top books & recent orders ── */
  const topBooks     = [...books].sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0)).slice(0, 5);
  const recentOrders = orders.slice(0, 5);

  /* ── Stat cards ── */
  const STATS = [
    { cls: 'stat-revenue',   label: 'Tổng doanh thu',  value: `${totalRevenue.toLocaleString('vi-VN')} đ`, icon: 'revenue'  },
    { cls: 'stat-orders',    label: 'Tổng đơn hàng',   value: `${orders.length} đơn`,                       icon: 'orders'   },
    { cls: 'stat-books',     label: 'Tổng đầu sách',   value: `${books.length} cuốn`,                       icon: 'books'    },
    { cls: 'stat-pending',   label: 'Chờ chuẩn bị',   value: `${pendingOrders} đơn`,                       icon: 'pending'  },
    { cls: 'stat-done',      label: 'Giao thành công', value: `${completedOrders} đơn`,                     icon: 'done'     },
    { cls: 'stat-cancelled', label: 'Đã hủy đơn',     value: `${cancelledOrders} đơn`,                     icon: 'cancel'   },
  ];

  /* ── Status breakdown ── */
  const statusMeta = [
    { label: 'Chờ chuẩn bị hàng', count: pendingOrders,   cls: 'color-pending'   },
    { label: 'Đang giao hàng',     count: shippingOrders,  cls: 'color-shipping'  },
    { label: 'Giao thành công',    count: completedOrders, cls: 'color-completed' },
    { label: 'Đã hủy đơn',        count: cancelledOrders, cls: 'color-cancelled' },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="adm-stats-grid">
        {STATS.map(({ cls, label, value, icon }) => (
          <div key={cls} className={`adm-stat-card ${cls}`}>
            <div className="adm-stat-icon"><Ic path={ICONS[icon]} /></div>
            <div className="adm-stat-body">
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Grid */}
      <div className="adm-dash-grid">

        {/* Revenue Bar Chart */}
        <div className="adm-card">
          <div className="adm-card-head">
            <h3><Ic path={ICONS.bar} size={16} /> Doanh thu theo Thể loại</h3>
          </div>
          {catEntries.length > 0 ? (
            <div className="adm-bar-chart">
              {catEntries.map(([cat, rev]) => (
                <div key={cat} className="adm-bar-row">
                  <span className="adm-bar-label">{cat}</span>
                  <div className="adm-bar-track">
                    <div className="adm-bar-fill" style={{ width: `${(rev / maxRev) * 100}%` }} />
                  </div>
                  <span className="adm-bar-val">{(rev / 1000).toFixed(0)}k đ</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="adm-empty-sm"><p>Chưa có dữ liệu doanh thu</p></div>
          )}
        </div>

        {/* Order Status Breakdown */}
        <div className="adm-card">
          <div className="adm-card-head">
            <h3><Ic path={ICONS.done} size={16} /> Trạng thái Đơn hàng</h3>
          </div>
          {orders.length > 0 ? (
            <div className="adm-status-legend">
              {statusMeta.map(({ label, count, cls }) => (
                <div key={label} className="adm-legend-row">
                  <div className={`adm-dot ${cls}`} />
                  <span className="adm-legend-label">{label}</span>
                  <strong>{count}</strong>
                  <div className="adm-prog-track">
                    <div
                      className={`adm-prog-fill ${cls}`}
                      style={{ width: `${orders.length ? (count / orders.length) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="adm-prog-pct">
                    {orders.length ? Math.round((count / orders.length) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="adm-empty-sm"><p>Chưa có đơn hàng</p></div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="adm-card adm-span2">
          <div className="adm-card-head">
            <h3><Ic path={ICONS.orders} size={16} /> Đơn hàng gần đây</h3>
            <button className="adm-link-btn" onClick={() => setAdminTab('orders')}>Xem tất cả →</button>
          </div>
          {recentOrders.length > 0 ? (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Mã đơn</th><th>Khách hàng</th><th>Tổng tiền</th><th>Ngày đặt</th><th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(ord => (
                    <tr key={ord.id}>
                      <td><strong className="adm-order-id">#{ord.id}</strong></td>
                      <td>
                        <div><strong>{ord.shippingInfo?.name}</strong></div>
                        <div className="adm-sub">{ord.shippingInfo?.phone}</div>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="adm-empty-sm"><p>Chưa có đơn hàng nào.</p></div>
          )}
        </div>

        {/* Top Books */}
        <div className="adm-card adm-span2">
          <div className="adm-card-head">
            <h3><Ic path={ICONS.star} size={16} /> Sách bán chạy nhất</h3>
            <button className="adm-link-btn" onClick={() => setAdminTab('books')}>Quản lý sách →</button>
          </div>
          <div className="adm-top-books">
            {topBooks.map((book, idx) => (
              <div key={book.id} className="adm-top-book">
                <div className={`adm-rank ${idx === 0 ? 'gold' : idx === 1 ? 'silver' : idx === 2 ? 'bronze' : ''}`}>
                  #{idx + 1}
                </div>
                <img
                  src={book.coverUrl} alt={book.title} className="adm-top-cover"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=160'; }}
                />
                <div className="adm-top-info">
                  <strong>{book.title}</strong>
                  <span>{book.author}</span>
                  <div className="adm-top-meta">
                    <span className="adm-cat-pill">{book.category}</span>
                    <span className="adm-sales-text">
                      <Ic path={ICONS.star} size={11}/> {book.salesCount || 0} lượt
                    </span>
                  </div>
                </div>
                <div className="adm-top-price">{book.price.toLocaleString('vi-VN')} đ</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

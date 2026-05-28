import React, { useState } from 'react';
import './Admin.css';
import { Ic, ICONS } from './AdminIcons';
import Dashboard from './Dashboard/Dashboard';
import Books     from './Books/Books';
import Orders    from './Orders/Orders';
import AddBook   from './AddBook/AddBook';

/** Tab definitions */
const TABS = [
  { id: 'dashboard', label: 'Tổng quan',         icon: 'dashboard' },
  { id: 'books',     label: 'Quản lý Sách',       icon: 'books'     },
  { id: 'orders',    label: 'Quản lý Đơn hàng',   icon: 'orders'    },
  { id: 'add-book',  label: 'Thêm Sách mới',       icon: 'addBook'   },
];

/**
 * Admin — Layout chính (sidebar + topbar)
 * Nội dung từng tab được tách riêng vào:
 *   Dashboard, Books, Orders, AddBook
 */
export default function Admin({ app }) {
  const {
    adminTab, setAdminTab,
    orders, handleUpdateOrderStatus,
    newBook, setNewBook, handleCreateBook, adminMessage,
    books, handleDeleteBook,
    user, handleLogout, switchPage,
  } = app;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* Badge: số đơn đang chờ chuẩn bị (hiện trên sidebar) */
  const pendingCount = orders.filter(o => o.status === 'Chờ chuẩn bị hàng').length;

  const currentTab  = TABS.find(t => t.id === adminTab);
  const userInitial = user?.name?.split(' ').pop()?.[0]?.toUpperCase() || 'A';
  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
  });

  return (
    <div className={`adm-layout${mobileMenuOpen ? ' mobile-open' : ''}`}>

      {/* =========================================================
          OVERLAY (mobile)
          ========================================================= */}
      {mobileMenuOpen && (
        <div className="adm-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* =========================================================
          SIDEBAR
          ========================================================= */}
      <aside className="adm-sidebar">

        {/* Brand */}
        <div className="adm-brand">
          <div className="adm-brand-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
            </svg>
          </div>
          <div className="adm-brand-text">
            <strong>BookStore</strong>
            <span>Admin Panel</span>
          </div>
        </div>

        {/* Main nav */}
        <div className="adm-section-label">MENU CHÍNH</div>
        <nav className="adm-nav">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`adm-nav-item ${adminTab === tab.id ? 'active' : ''}`}
              onClick={() => { setAdminTab(tab.id); setMobileMenuOpen(false); }}
            >
              <span className="adm-nav-icon"><Ic path={ICONS[tab.icon]} /></span>
              <span className="adm-nav-label">{tab.label}</span>
              {tab.id === 'orders' && pendingCount > 0 && (
                <span className="adm-nav-badge">{pendingCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="adm-sidebar-divider" />

        {/* Secondary nav */}
        <div className="adm-section-label">KHÁC</div>
        <nav className="adm-nav">
          <button className="adm-nav-item store-btn" onClick={() => switchPage('store')}>
            <span className="adm-nav-icon"><Ic path={ICONS.store} /></span>
            <span className="adm-nav-label">Về cửa hàng</span>
            <span className="adm-ext-icon">↗</span>
          </button>
        </nav>

        {/* User footer */}
        <div className="adm-sidebar-footer">
          <div className="adm-user-card">
            <div className="adm-user-avatar">{userInitial}</div>
            <div className="adm-user-info">
              <strong>{user?.name}</strong>
              <span>Administrator</span>
            </div>
            <button
              className="adm-logout-btn"
              onClick={handleLogout}
              title="Đăng xuất"
            >
              <Ic path={ICONS.logout} size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================
          MAIN CONTENT AREA
          ========================================================= */}
      <div className="adm-main">

        {/* Top Bar */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button
              className="adm-menu-toggle"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              <Ic path={ICONS.menu} size={22} />
            </button>
            <div>
              <h2 className="adm-page-title">{currentTab?.label}</h2>
              <p className="adm-breadcrumb">
                <span>Admin Dashboard</span>
                <span className="adm-crumb-sep">/</span>
                <span>{currentTab?.label}</span>
              </p>
            </div>
          </div>
          <div className="adm-topbar-right">
            <div className="adm-topbar-date">{today}</div>
            <div className="adm-topbar-pills">
              <span className="adm-pill">{orders.length} đơn</span>
              <span className="adm-pill books-pill">{books.length} sách</span>
            </div>
            <div className="adm-topbar-avatar">{userInitial}</div>
          </div>
        </header>

        {/* Scrollable content area */}
        <div className="adm-content">
          {adminTab === 'dashboard' && (
            <Dashboard
              orders={orders}
              books={books}
              setAdminTab={setAdminTab}
            />
          )}

          {adminTab === 'books' && (
            <Books
              books={books}
              handleDeleteBook={handleDeleteBook}
              setAdminTab={setAdminTab}
            />
          )}

          {adminTab === 'orders' && (
            <Orders
              orders={orders}
              handleUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}

          {adminTab === 'add-book' && (
            <AddBook
              newBook={newBook}
              setNewBook={setNewBook}
              handleCreateBook={handleCreateBook}
              adminMessage={adminMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

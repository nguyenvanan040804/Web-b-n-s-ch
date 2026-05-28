import React, { useState } from 'react';
import { Ic, ICONS } from '../AdminIcons';
import './Books.css';

/**
 * Books — Tab Quản lý Sách
 * Props: books, handleDeleteBook, setAdminTab
 */
export default function Books({ books, handleDeleteBook, setAdminTab }) {
  const [bookSearch, setBookSearch] = useState('');

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
    b.author.toLowerCase().includes(bookSearch.toLowerCase())
  );

  return (
    <div>
      {/* Section header */}
      <div className="adm-section-header">
        <div>
          <h3>Danh sách Sách</h3>
          <p>Toàn bộ {books.length} đầu sách đang có trong hệ thống cửa hàng.</p>
        </div>
        <div className="adm-section-actions">
          <div className="adm-search-box">
            <Ic path={ICONS.search} size={15} />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc tác giả..."
              value={bookSearch}
              onChange={e => setBookSearch(e.target.value)}
            />
          </div>
          <button className="adm-btn-primary" onClick={() => setAdminTab('add-book')}>
            <Ic path={ICONS.plus} size={16} /> Thêm sách mới
          </button>
        </div>
      </div>

      {/* Books table */}
      <div className="adm-card adm-no-pad">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th style={{ width: 56 }}>Bìa</th>
                <th>Tiêu đề &amp; Tác giả</th>
                <th>Thể loại</th>
                <th>Giá bán</th>
                <th>Nhà XB</th>
                <th>Lượt bán</th>
                <th style={{ width: 90 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                    {bookSearch
                      ? `Không tìm thấy sách phù hợp với từ khóa "${bookSearch}".`
                      : 'Chưa có sách nào trong hệ thống.'}
                  </td>
                </tr>
              ) : filteredBooks.map(book => (
                <tr key={book.id}>
                  <td>
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="adm-book-thumb"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=80'; }}
                    />
                  </td>
                  <td>
                    <div className="adm-book-title">{book.title}</div>
                    <div className="adm-sub">{book.author}</div>
                  </td>
                  <td><span className="adm-cat-pill">{book.category}</span></td>
                  <td><strong>{book.price.toLocaleString('vi-VN')} đ</strong></td>
                  <td className="adm-sub">{book.publisher || '—'}</td>
                  <td>
                    <div className="adm-sales-badge">
                      <Ic path={ICONS.star} size={12} /> {book.salesCount || 0}
                    </div>
                  </td>
                  <td>
                    <button
                      className="adm-danger-btn"
                      title="Xóa sách"
                      onClick={() => {
                        if (window.confirm(`Xác nhận xóa sách "${book.title}"?`)) {
                          if (handleDeleteBook) handleDeleteBook(book.id);
                        }
                      }}
                    >
                      <Ic path={ICONS.trash} size={13} /> Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

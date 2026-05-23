import React from 'react';
import './Bestsellers.css';

export default function Bestsellers({ app }) {
  const bestsellers = [
    { rank: 1, id: 1, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', sales: '15.2k', rating: 4.8 },
    { rank: 2, id: 2, title: 'Nhà Giả Kim', author: 'Paulo Coelho', sales: '12.5k', rating: 4.9 },
    { rank: 3, id: 3, title: 'Nghĩ Giàu Và Làm Giàu', author: 'Napoleon Hill', sales: '10.8k', rating: 4.7 },
    { rank: 4, id: 6, title: 'Tôi Tự Học', author: 'Nguyễn Duy Cần', sales: '9.3k', rating: 4.6 },
    { rank: 5, id: 5, title: 'Sapiens', author: 'Yuval Noah Harari', sales: '8.1k', rating: 4.9 },
    { rank: 6, id: 4, title: 'Hoàng Tử Bé', author: 'Antoine de Saint-Exupéry', sales: '7.5k', rating: 4.8 }
  ];

  return (
    <main className="bestsellers-container">
      <div className="panel-header-simple">
        <h2>📚 Sách bán chạy nhất</h2>
        <p>Những cuốn sách được yêu thích nhất và mua nhiều nhất tại Nhà Sách trong tháng này.</p>
      </div>

      <div className="bestsellers-list">
        {bestsellers.map((book) => (
          <div key={book.id} className="bestseller-row">
            <div className="rank-badge">#{book.rank}</div>
            <div className="book-info-col">
              <h4>{book.title}</h4>
              <p className="author-col">Tác giả: {book.author}</p>
            </div>
            <div className="stats-col">
              <span className="sales">📊 {book.sales} bản</span>
              <span className="rating">⭐ {book.rating}</span>
            </div>
            <button
              className="view-btn"
              onClick={() => {
                const bookObj = app?.books?.find((b) => b.id === book.id);
                if (bookObj) {
                  app.setSelectedBook(bookObj);
                }
              }}
            >
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>

      <div className="bestsellers-cta">
        <h3>Khám phá đầy đủ kho sách của chúng tôi</h3>
        <button className="cta-btn" onClick={() => app?.switchPage('store')}>Tìm hiểu thêm</button>
      </div>
    </main>
  );
}

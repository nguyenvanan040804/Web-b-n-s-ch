import React from 'react';
import './Store.css';

export default function Store({ app }) {
  const {
    filteredBooks,
    categories,
    selectedCategory,
    setSelectedCategory,
    search,
    setSearch,
    setSelectedBook,
    addToCart,
    sortBy,
    setSortBy,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice
  } = app;

  return (
    <>
      {/* Banner Khuyến Mại */}
      <div className="promo-banner">
        <div className="banner-content">
          <span className="badge">Khuyến mãi tuần lễ vàng</span>
          <h2>Thế giới mở ra qua từng trang sách</h2>
          <p>Giảm ngay 20% cho tất cả các đầu sách Kỹ năng & Kinh tế. Miễn phí vận chuyển toàn quốc cho đơn hàng từ 300.000đ.</p>
        </div>
      </div>

      <div className="store-layout">
        {/* Sidebar Bộ lọc */}
        <aside className="store-sidebar">
          <div className="sidebar-section">
            <h3>Tìm kiếm</h3>
            <div className="search-bar-container">
              <svg className="search-icon-svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                className="search-input"
                type="search"
                placeholder="Tìm sách, tác giả..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Danh mục</h3>
            <div className="categories-list-vertical">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-item-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Lọc theo giá (đ)</h3>
            <div className="price-filter-inputs">
              <input
                type="number"
                placeholder="Từ"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span className="price-filter-separator">-</span>
              <input
                type="number"
                placeholder="Đến"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            {(minPrice || maxPrice) && (
              <button 
                className="clear-price-btn" 
                onClick={() => { setMinPrice(''); setMaxPrice(''); }}
              >
                Xóa bộ lọc giá
              </button>
            )}
          </div>

          <div className="sidebar-section">
            <h3>Sắp xếp theo</h3>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="rating-desc">Đánh giá cao nhất</option>
              <option value="sales-desc">Bán chạy nhất</option>
              <option value="year-desc">Năm xuất bản: Mới nhất</option>
            </select>
          </div>
        </aside>

        {/* Danh sách sách */}
        <main className="book-panel">
          <div className="panel-header">
            <div>
              <h2>Khám phá tủ sách</h2>
              <p>Tìm kiếm sách hay phù hợp với tâm hồn của bạn.</p>
            </div>
            <div className="results-count">
              Tìm thấy <strong>{filteredBooks.length}</strong> cuốn sách
            </div>
          </div>

          {/* Lưới sách */}
          <div className="book-grid">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <article 
                  className="book-item" 
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                >
                  <div className="book-cover-container">
                    <img className="book-cover" src={book.coverUrl} alt={book.title} />
                    <span className="book-item-category">{book.category}</span>
                  </div>
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p className="author">Bởi {book.author}</p>
                    
                    {/* Rating stars display */}
                    <div className="book-rating-stars">
                      {book.averageRating > 0 ? (
                        <>
                          <span className="star-icon">★</span>
                          <span className="rating-val">{book.averageRating}</span>
                          <span className="review-count">({book.reviews?.length || 0} đánh giá)</span>
                        </>
                      ) : (
                        <span className="no-rating">★ Chưa có đánh giá</span>
                      )}
                    </div>

                    <p className="description">{book.description.substring(0, 75)}...</p>
                    <div className="book-meta" onClick={(e) => e.stopPropagation()}>
                      <span className="price">{book.price.toLocaleString('vi-VN')} đ</span>
                      
                      <button className="add-btn" onClick={() => addToCart(book)}>
                        <svg className="add-btn-svg" viewBox="0 0 24 24" width="16" height="16">
                          <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                        Thêm
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">Không tìm thấy sách nào phù hợp với bộ lọc.</div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

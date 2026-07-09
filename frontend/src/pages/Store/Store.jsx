import React from 'react';
import './Store.css';
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../../api/wishlistApi";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Store({ app }) {

  const navigate = useNavigate();

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

  const handleAddWishlist = async (e, bookId) => {

    e.stopPropagation();

    try {

      await addToWishlist(bookId);

      alert("❤️ Đã thêm vào danh sách yêu thích");

    } catch (err) {

      console.log(err);

      alert("Không thể thêm vào danh sách yêu thích");

    }
  };

  return (
    <>
      {/* Banner */}
      <div className="promo-banner">
        <div className="banner-content">
          <span className="badge">
            Khuyến mãi tuần lễ vàng
          </span>

          <h2>
            Thế giới mở ra qua từng trang sách
          </h2>

          <p>
            Giảm ngay 20% cho tất cả các đầu sách
            Kỹ năng & Kinh tế.
            Miễn phí vận chuyển toàn quốc
            cho đơn từ 300.000đ.
          </p>

          <div className="banner-search">
            <SearchBar books={filteredBooks} onBookSelect={setSelectedBook} />
          </div>
        </div>
      </div>

      <div className="store-layout">

        {/* Sidebar */}

        <aside className="store-sidebar">

          <div className="sidebar-section">



          </div>

          <div className="sidebar-section">

            <h3>Danh mục</h3>

            <div className="categories-list-vertical">

              {categories.map(cat => (

                <button
                  key={cat}
                  className={`category-item-btn ${
                    selectedCategory === cat
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(cat)
                  }
                >

                  {cat}

                </button>

              ))}

            </div>

          </div>

          <div className="sidebar-section">

            <h3>Lọc theo giá</h3>

            <div className="price-filter-inputs">

              <input
                type="number"
                placeholder="Từ"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(e.target.value)
                }
              />

              <span>-</span>

              <input
                type="number"
                placeholder="Đến"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value)
                }
              />

            </div>

            {(minPrice || maxPrice) && (

              <button
                className="clear-price-btn"
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                }}
              >

                Xóa bộ lọc

              </button>

            )}

          </div>

          <div className="sidebar-section">

            <h3>Sắp xếp</h3>

            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >

              <option value="default">
                Mặc định
              </option>

              <option value="price-asc">
                Giá tăng
              </option>

              <option value="price-desc">
                Giá giảm
              </option>

              <option value="rating-desc">
                Đánh giá
              </option>

              <option value="sales-desc">
                Bán chạy
              </option>

            </select>

          </div>

        </aside>

        {/* Main */}

        <main className="book-panel">

          <div className="panel-header">

            <div>

              <h2>Khám phá tủ sách</h2>

              <p>
                Tìm kiếm sách phù hợp
              </p>

            </div>

            <div>

              <button
                className="wishlist-page-btn"
                onClick={() =>
                  navigate("/wishlist")
                }
              >

                ❤️ Danh sách yêu thích

              </button>

            </div>

          </div>
                    <div className="results-count">
            Tìm thấy <strong>{filteredBooks.length}</strong> cuốn sách
          </div>

          {/* Danh sách sách */}
          <div className="book-grid">

            {filteredBooks.length > 0 ? (

              filteredBooks.map((book) => (

                <article
                  className="book-item"
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                >

                  <div className="book-cover-container">

                    <img
                      className="book-cover"
                      src={book.coverUrl}
                      alt={book.title}
                    />

                    <span className="book-item-category">
                      {book.category}
                    </span>

                    <button
                      className="wishlist-btn-corner"
                      title="Thêm vào yêu thích"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddWishlist(e, book.id);
                      }}
                    >
                      ❤️
                    </button>

                  </div>

                  <div className="book-info">

                    <h3>{book.title}</h3>

                    <p className="author">
                      Bởi {book.author}
                    </p>

                    <div className="book-rating-stars">

                      {book.averageRating > 0 ? (

                        <>

                          <span className="star-icon">
                            ★
                          </span>

                          <span className="rating-val">
                            {book.averageRating}
                          </span>

                          <span className="review-count">
                            ({book.reviews?.length || 0} đánh giá)
                          </span>

                        </>

                      ) : (

                        <span className="no-rating">
                          ★ Chưa có đánh giá
                        </span>

                      )}

                    </div>

                    <p className="description">

                      {book.description.length > 75
                        ? book.description.substring(0, 75) + "..."
                        : book.description}

                    </p>

                    <div
                      className="book-meta"
                      onClick={(e) => e.stopPropagation()}
                    >

                      <span className="price">
                        {book.price.toLocaleString("vi-VN")} đ
                      </span>

                      <div className="book-actions">

                        <button
                          className="add-btn"
                          onClick={() => addToCart(book)}
                        >

                          <svg
                            className="add-btn-svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                          >

                            <path
                              fill="currentColor"
                              d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                            />

                          </svg>

                          Thêm

                        </button>

                      </div>

                    </div>

                  </div>

                </article>

              ))

            ) : (

              <div className="empty-state">

                Không tìm thấy sách phù hợp.

              </div>

            )}

          </div>

        </main>

      </div>

    </>

  );

}
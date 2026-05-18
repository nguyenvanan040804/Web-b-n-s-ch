import { useEffect, useState } from 'react';

const DEFAULT_BOOKS = [
  {
    id: 1,
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    category: 'Kỹ năng',
    price: 86000,
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    description: 'Cuốn sách đưa ra các lời khuyên về cách thức cư xử, ứng xử và giao tiếp với mọi người để đạt được sự đồng cảm và thành công trong cuộc sống.',
    publisher: 'NXB Tổng hợp TP.HCM',
    pages: 320,
    year: 2021
  },
  {
    id: 2,
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    category: 'Tiểu thuyết',
    price: 79000,
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    description: 'Một tác phẩm kinh điển về việc theo đuổi ước mơ, lắng nghe tiếng nói của trái tim và học cách thấu hiểu các điềm báo của vũ trụ.',
    publisher: 'NXB Hội Nhà Văn',
    pages: 228,
    year: 2020
  },
  {
    id: 3,
    title: 'Nghĩ Giàu Và Làm Giàu',
    author: 'Napoleon Hill',
    category: 'Kinh tế',
    price: 110000,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    description: 'Một trong những cuốn sách truyền cảm hứng làm giàu và thành công cá nhân kinh điển nhất, giúp bạn thay đổi tư duy làm chủ cuộc đời.',
    publisher: 'NXB Trẻ',
    pages: 400,
    year: 2019
  },
  {
    id: 4,
    title: 'Hoàng Tử Bé',
    author: 'Antoine de Saint-Exupéry',
    category: 'Thiếu nhi',
    price: 55000,
    coverUrl: 'https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&w=600&q=80',
    description: 'Câu chuyện triết lý sâu sắc đầy tính nhân văn và thơ mộng về tình bạn, tình yêu và ý nghĩa đích thực của cuộc sống qua mắt một cậu bé.',
    publisher: 'NXB Kim Đồng',
    pages: 102,
    year: 2022
  },
  {
    id: 5,
    title: 'Sapiens: Lược Sử Loài Người',
    author: 'Yuval Noah Harari',
    category: 'Khoa học',
    price: 165000,
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
    description: 'Cuốn sách đột phá giải mã lịch sử loài người từ những tổ tiên xa xưa thời kỳ đồ đá cho đến sự thống trị toàn cầu ở thế kỷ XXI.',
    publisher: 'NXB Thế Giới',
    pages: 560,
    year: 2021
  },
  {
    id: 6,
    title: 'Tôi Tự Học',
    author: 'Nguyễn Duy Cần',
    category: 'Kỹ năng',
    price: 68000,
    coverUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80',
    description: 'Tác phẩm quý giá hướng dẫn bạn đọc cách rèn luyện khả năng tư duy tự chủ, tự học hỏi hiệu quả để đạt tri thức thực sự.',
    publisher: 'NXB Trẻ',
    pages: 200,
    year: 2018
  }
];

function App() {
  const [page, setPage] = useState('store'); // 'login', 'register', 'store', 'orders', 'about', 'contact', 'admin'
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Custom Dynamic Database in React State
  const [books, setBooks] = useState(DEFAULT_BOOKS);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  
  // Modals state
  const [selectedBook, setSelectedBook] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // 'form', 'success'
  const [orders, setOrders] = useState([]);
  
  // Checkout Info
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'COD'
  });
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // New Pages States
  // 1. Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactMessage, setContactMessage] = useState('');

  // 2. Admin Form State
  const [adminTab, setAdminTab] = useState('orders'); // 'orders', 'add-book'
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    category: 'Kỹ năng',
    price: '',
    coverUrl: '',
    description: '',
    publisher: '',
    pages: '',
    year: ''
  });
  const [adminMessage, setAdminMessage] = useState('');

  useEffect(() => {
    if (page === 'store') {
      fetchBooks();
    }
  }, [page]);

  useEffect(() => {
    if (user) {
      setCheckoutInfo((prev) => ({
        ...prev,
        name: user.name || ''
      }));
      setContactForm((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRemember(false);
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          // Merge custom data attributes to api books if they lack them
          const mergedBooks = data.map((b, index) => ({
            ...b,
            category: b.category || DEFAULT_BOOKS[index % DEFAULT_BOOKS.length].category,
            publisher: b.publisher || 'NXB Tổng Hợp',
            pages: b.pages || 250,
            year: b.year || 2022
          }));
          
          // Prepend any custom books added by the admin that aren't in the API response
          const adminCreatedBooks = books.filter(b => b.id > 100);
          setBooks([...adminCreatedBooks, ...mergedBooks]);
        }
      }
    } catch (error) {
      // Keep using current state books (which contains defaults or admin edits)
      console.log('Không thể tải danh sách sách từ API, đang dùng dữ liệu mô phỏng.');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage('');

    if (!email || !password) {
      setMessage('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, remember })
      });

      const data = await response.json();
      if (response.ok) {
        setUser({ name: data.name || email.split('@')[0], email: data.email || email });
        setPage('store');
        clearForm();
        setMessage('');
      } else {
        setMessage(data.message || 'Đăng nhập thất bại.');
      }
    } catch (error) {
      // Mock login for offline sandbox demonstration
      setUser({ name: email.split('@')[0], email: email });
      setPage('store');
      clearForm();
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage('');

    if (!name || !email || !password || !confirmPassword) {
      setMessage('Vui lòng điền đầy đủ thông tin đăng ký.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Đăng ký thành công! Vui lòng đăng nhập.');
        setTimeout(() => {
          setPage('login');
          clearForm();
        }, 1200);
      } else {
        setMessage(data.message || 'Đăng ký thất bại.');
      }
    } catch (error) {
      // Mock register for sandbox demonstration
      setMessage('Đăng ký tài khoản (giả lập) thành công! Hãy đăng nhập.');
      setTimeout(() => {
        setPage('login');
        clearForm();
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  const switchPage = (targetPage) => {
    setPage(targetPage);
    setMessage('');
    setLoading(false);
    clearForm();
  };

  const handleLogout = () => {
    setUser(null);
    setPage('store');
    setCart([]);
    setMessage('');
  };

  const addToCart = (book, quantity = 1) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === book.id);
      if (existing) {
        return currentCart.map((item) => item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...currentCart, { ...book, quantity }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== bookId));
  };

  const updateQuantity = (bookId, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => (item.id === bookId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckoutSubmit = (event) => {
    event.preventDefault();
    if (cart.length === 0) return;

    const orderId = 'BS-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cart],
      total: cartTotal,
      shippingInfo: { ...checkoutInfo },
      status: 'Chờ chuẩn bị hàng'
    };

    setOrders([newOrder, ...orders]);
    setPlacedOrderDetails(newOrder);
    setCheckoutStep('success');
  };

  const completeCheckout = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    setCheckoutStep('form');
    setCheckoutInfo({
      name: user ? user.name : '',
      phone: '',
      address: '',
      note: '',
      paymentMethod: 'COD'
    });
  };

  // Contact Form Submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactMessage('Đang gửi liên hệ...');
    
    setTimeout(() => {
      setContactMessage('✓ Góp ý của bạn đã được gửi thành công! Cảm ơn bạn đã đóng góp ý kiến cho BookStore.');
      setContactForm({
        name: user ? user.name : '',
        email: user ? user.email : '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  // Admin: Update Order Status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((ord) => 
        ord.id === orderId ? { ...ord, status: newStatus } : ord
      )
    );
  };

  // Admin: Add New Book
  const handleCreateBook = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.price) {
      setAdminMessage('Vui lòng điền đầy đủ tiêu đề, tác giả và giá bán.');
      return;
    }

    const bookId = 100 + Math.floor(Math.random() * 900);
    const createdBook = {
      id: bookId,
      title: newBook.title,
      author: newBook.author,
      category: newBook.category,
      price: parseInt(newBook.price) || 50000,
      coverUrl: newBook.coverUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
      description: newBook.description || 'Mô tả tóm tắt về cuốn sách này đang được cập nhật.',
      publisher: newBook.publisher || 'NXB Tổng hợp',
      pages: parseInt(newBook.pages) || 200,
      year: parseInt(newBook.year) || new Date().getFullYear()
    };

    setBooks([createdBook, ...books]);
    setAdminMessage('✓ Thêm sách mới thành công! Sách đã xuất hiện trên Cửa hàng.');
    setNewBook({
      title: '',
      author: '',
      category: 'Kỹ năng',
      price: '',
      coverUrl: '',
      description: '',
      publisher: '',
      pages: '',
      year: ''
    });

    setTimeout(() => {
      setAdminMessage('');
    }, 4000);
  };

  // Filter books based on search & category
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
                          book.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Tất cả', 'Tiểu thuyết', 'Kỹ năng', 'Kinh tế', 'Thiếu nhi', 'Khoa học'];

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // LOGGED-IN & ANONYMOUS BOOKSTORE VIEW
  if (page === 'store' || page === 'orders' || page === 'about' || page === 'contact' || page === 'admin') {
    return (
      <div className="store-container">
        {/* Navigation Bar */}
        <header className="navbar">
          <div className="nav-brand" onClick={() => switchPage('store')}>
            <span className="brand-logo">📚</span>
            <h1>BookStore</h1>
          </div>
          
          <nav className="nav-menu">
            <button 
              className={`nav-link-btn ${page === 'store' ? 'active' : ''}`} 
              onClick={() => switchPage('store')}
            >
              Cửa hàng
            </button>
            <button 
              className={`nav-link-btn ${page === 'about' ? 'active' : ''}`} 
              onClick={() => switchPage('about')}
            >
              Giới thiệu
            </button>
            <button 
              className={`nav-link-btn ${page === 'contact' ? 'active' : ''}`} 
              onClick={() => switchPage('contact')}
            >
              Liên hệ
            </button>
            <button 
              className={`nav-link-btn ${page === 'orders' ? 'active' : ''}`} 
              onClick={() => {
                if (user) {
                  switchPage('orders');
                } else {
                  setMessage('Vui lòng đăng nhập để xem lịch sử đơn hàng.');
                  switchPage('login');
                }
              }}
            >
              Đơn hàng của tôi {orders.length > 0 && <span className="order-badge">{orders.length}</span>}
            </button>
            
            {/* Admin control panel link */}
            <button 
              className={`nav-link-btn admin-link-btn ${page === 'admin' ? 'active' : ''}`}
              onClick={() => switchPage('admin')}
            >
              🛠 Quản trị
            </button>
          </nav>

          <div className="nav-actions">
            {user ? (
              <>
                <span className="user-profile">
                  Chào, <strong>{user.name}</strong>
                </span>
                <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
              </>
            ) : (
              <button className="login-nav-btn" onClick={() => switchPage('login')}>Đăng nhập</button>
            )}
          </div>
        </header>

        {/* PAGE BODY */}
        <div className="page-wrapper">
          
          {/* 1. STORE VIEW */}
          {page === 'store' && (
            <>
              {/* Promotion Banner */}
              <div className="promo-banner">
                <div className="banner-content">
                  <span className="badge">Khuyến mãi tuần lễ vàng</span>
                  <h2>Thế giới mở ra qua từng trang sách</h2>
                  <p>Giảm ngay 20% cho tất cả các đầu sách Kỹ năng & Kinh tế. Miễn phí vận chuyển toàn quốc cho đơn hàng từ 300.000đ.</p>
                </div>
              </div>

              <div className="store-layout">
                {/* Book listing main panel */}
                <main className="book-panel">
                  <div className="panel-header">
                    <div>
                      <h2>Khám phá tủ sách</h2>
                      <p>Tìm kiếm sách hay phù hợp với tâm hồn của bạn.</p>
                    </div>
                    <input
                      className="search-input"
                      type="search"
                      placeholder="Tìm kiếm tên sách hoặc tác giả..."
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </div>

                  {/* Categories list */}
                  <div className="categories-list">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Book Grid */}
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
                            <p className="description">{book.description.substring(0, 75)}...</p>
                            <div className="book-meta" onClick={(e) => e.stopPropagation()}>
                              <span className="price">{book.price.toLocaleString('vi-VN')} đ</span>
                              <button className="add-btn" onClick={() => addToCart(book)}>Thêm giỏ</button>
                            </div>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="empty-state">Không tìm thấy sách nào phù hợp với bộ lọc.</div>
                    )}
                  </div>
                </main>

                {/* Sidebar Cart panel */}
                <aside className="cart-panel">
                  <div className="cart-header">
                    <h2>Giỏ hàng của bạn</h2>
                    <span className="cart-count-pill">{cartCount} sản phẩm</span>
                  </div>
                  
                  {cart.length > 0 ? (
                    <div className="cart-list">
                      {cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                          <img className="cart-item-img" src={item.coverUrl} alt={item.title} />
                          <div className="cart-item-details">
                            <strong>{item.title}</strong>
                            <p>{item.price.toLocaleString('vi-VN')} đ</p>
                            <div className="cart-actions">
                              <button type="button" onClick={() => updateQuantity(item.id, -1)}>-</button>
                              <span>{item.quantity}</span>
                              <button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                            </div>
                          </div>
                          <button type="button" className="remove-link" onClick={() => removeFromCart(item.id)}>×</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state-cart">
                      <span className="cart-emoji">🛒</span>
                      <p>Giỏ hàng đang trống.</p>
                      <span>Hãy chọn cuốn sách yêu thích của bạn từ danh sách để tiếp tục mua sắm.</span>
                    </div>
                  )}

                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Tạm tính</span>
                      <span>{cartTotal.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <div className="summary-row">
                      <span>Phí giao hàng</span>
                      <span>{cartTotal >= 300000 || cartTotal === 0 ? 'Miễn phí' : '30.000 đ'}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Tổng tiền</span>
                      <strong>
                        {(cartTotal + (cartTotal >= 300000 || cartTotal === 0 ? 0 : 30000)).toLocaleString('vi-VN')} đ
                      </strong>
                    </div>
                    <button 
                      className="checkout-btn" 
                      disabled={cart.length === 0}
                      onClick={() => {
                        if (user) {
                          setCheckoutStep('form');
                          setIsCheckoutOpen(true);
                        } else {
                          setMessage('Vui lòng đăng nhập để tiến hành thanh toán.');
                          switchPage('login');
                        }
                      }}
                    >
                      Tiến hành Thanh toán
                    </button>
                  </div>
                </aside>
              </div>
            </>
          )}

          {/* 2. ABOUT US VIEW */}
          {page === 'about' && (
            <main className="about-container">
              <section className="about-hero">
                <h2>Về Chúng Tôi - BookStore</h2>
                <p>Nơi kết nối tri thức, lan tỏa đam mê đọc sách đến mọi người dân Việt Nam.</p>
              </section>

              <div className="about-grid">
                <article className="about-card">
                  <h3>Sứ mệnh</h3>
                  <p>BookStore ra đời vào năm 2026 với khát vọng mang đến hàng triệu đầu sách hay chất lượng cao, giá thành hợp lý và dịch vụ giao hàng nhanh chóng nhất đến tay độc giả cả nước, nâng tầm văn hóa đọc trong cộng đồng.</p>
                </article>

                <article className="about-card">
                  <h3>Giá trị cốt lõi</h3>
                  <ul>
                    <li><strong>Chất lượng:</strong> Cam kết 100% sách thật, có bản quyền từ các nhà xuất bản hàng đầu Việt Nam.</li>
                    <li><strong>Tận tâm:</strong> Lắng nghe phản hồi và hỗ trợ quý độc giả mọi lúc mọi nơi.</li>
                    <li><strong>Đổi mới:</strong> Tích hợp trải nghiệm số thông minh giúp bạn chọn và đặt sách nhanh nhất.</li>
                  </ul>
                </article>
              </div>

              <section className="about-stats-sec">
                <h3>BookStore qua những con số</h3>
                <div className="about-stats-grid">
                  <div className="stat-card">
                    <strong>10,000+</strong>
                    <span>Đầu sách đa dạng</span>
                  </div>
                  <div className="stat-card">
                    <strong>50,000+</strong>
                    <span>Khách hàng thân thiết</span>
                  </div>
                  <div className="stat-card">
                    <strong>1-3 ngày</strong>
                    <span>Thời gian giao hàng toàn quốc</span>
                  </div>
                </div>
              </section>
            </main>
          )}

          {/* 3. CONTACT VIEW */}
          {page === 'contact' && (
            <main className="contact-container">
              <div className="panel-header-simple">
                <h2>Liên hệ & Góp ý</h2>
                <p>Chúng tôi luôn lắng nghe ý kiến đóng góp từ bạn để cải thiện dịch vụ ngày một tốt hơn.</p>
              </div>

              <div className="contact-grid">
                {/* Info block */}
                <aside className="contact-info-card">
                  <h3>Thông tin liên hệ</h3>
                  <p>Bạn có thể liên hệ trực tiếp với chúng tôi qua các kênh sau:</p>
                  
                  <div className="contact-details">
                    <p>📍 <strong>Địa chỉ:</strong> Số 12 Đường Cầu Giấy, Quận Cầu Giấy, Hà Nội</p>
                    <p>📞 <strong>Hotline:</strong> 1900 8888 (8h00 - 21h00 hàng ngày)</p>
                    <p>✉️ <strong>Email:</strong> support@bookstore.com.vn</p>
                    <p>🌐 <strong>Website:</strong> www.bookstore.com.vn</p>
                  </div>

                  <div className="contact-map-placeholder">
                    <p>🗺️ Bản đồ BookStore Cầu Giấy</p>
                    <span>(Bản đồ định vị cửa hàng trực quan)</span>
                  </div>
                </aside>

                {/* Form block */}
                <section className="contact-form-card">
                  <h3>Gửi thư góp ý, phản hồi</h3>
                  
                  <form onSubmit={handleContactSubmit}>
                    <div className="form-group">
                      <label htmlFor="contact-name">Họ và tên của bạn</label>
                      <input 
                        id="contact-name"
                        type="text" 
                        required
                        placeholder="Nhập họ tên"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email">Địa chỉ Email</label>
                      <input 
                        id="contact-email"
                        type="email" 
                        required
                        placeholder="example@gmail.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-subject">Chủ đề</label>
                      <input 
                        id="contact-subject"
                        type="text" 
                        required
                        placeholder="Góp ý sản phẩm, báo lỗi giao diện, hợp tác..."
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-msg">Nội dung chi tiết</label>
                      <textarea 
                        id="contact-msg"
                        rows="5"
                        required
                        placeholder="Nhập ý kiến đóng góp của bạn tại đây..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">Gửi góp ý</button>
                  </form>

                  {contactMessage && <div className="message-box contact-msg-box">{contactMessage}</div>}
                </section>
              </div>
            </main>
          )}

          {/* 4. MY ORDERS VIEW */}
          {page === 'orders' && (
            <main className="orders-panel">
              <div className="panel-header-simple">
                <h2>Lịch sử đơn hàng</h2>
                <p>Danh sách các đơn hàng bạn đã thực hiện tại BookStore.</p>
              </div>

              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div className="order-card" key={order.id}>
                      <div className="order-card-header">
                        <div>
                          <span className="order-id">Mã đơn: <strong>{order.id}</strong></span>
                          <span className="order-date">{order.date}</span>
                        </div>
                        <span className="order-status-badge">{order.status}</span>
                      </div>
                      
                      <div className="order-card-body">
                        <div className="order-items-summary">
                          {order.items.map((item) => (
                            <div className="order-item-row" key={item.id}>
                              <span>{item.title} <strong>x {item.quantity}</strong></span>
                              <span>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
                            </div>
                          ))}
                        </div>

                        <div className="order-shipping-info">
                          <h4>Thông tin giao hàng:</h4>
                          <p><strong>Người nhận:</strong> {order.shippingInfo.name}</p>
                          <p><strong>Số điện thoại:</strong> {order.shippingInfo.phone}</p>
                          <p><strong>Địa chỉ:</strong> {order.shippingInfo.address}</p>
                          {order.shippingInfo.note && <p><strong>Ghi chú:</strong> {order.shippingInfo.note}</p>}
                          <p><strong>Phương thức thanh toán:</strong> {order.shippingInfo.paymentMethod === 'COD' ? 'Thanh toán trực tiếp khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}</p>
                        </div>
                      </div>

                      <div className="order-card-footer">
                        <span>Tổng tiền thanh toán:</span>
                        <strong className="order-total-amount">{(order.total + (order.total >= 300000 ? 0 : 30000)).toLocaleString('vi-VN')} đ</strong>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state-orders">
                  <span className="orders-emoji">📦</span>
                  <h3>Bạn chưa có đơn hàng nào</h3>
                  <p>Hãy chọn mua một vài cuốn sách hay để trải nghiệm dịch vụ tuyệt vời của chúng tôi nhé!</p>
                  <button className="back-to-store-btn" onClick={() => switchPage('store')}>Mua sách ngay</button>
                </div>
              )}
            </main>
          )}

          {/* 5. ADMIN CONTROL PANEL VIEW */}
          {page === 'admin' && (
            <main className="admin-container">
              <div className="panel-header-simple">
                <h2>🛠 Bảng Quản trị Cửa hàng (Giả lập Admin)</h2>
                <p>Nơi quản trị viên kiểm duyệt đơn hàng của khách hàng và thêm đầu sách mới lên kệ.</p>
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

              {/* Admin content 1: Manage Placed Orders */}
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
                      <button className="link-btn" onClick={() => switchPage('store')}>
                        Sang trang Cửa hàng mua sách thử
                      </button>
                    </div>
                  )}
                </section>
              )}

              {/* Admin content 2: Add New Book */}
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
          )}

        </div>

        {/* BOOK DETAIL MODAL */}
        {selectedBook && (
          <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
            <div className="modal-content book-detail-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={() => setSelectedBook(null)}>×</button>
              
              <div className="book-detail-grid">
                <div className="detail-cover-sec">
                  <img src={selectedBook.coverUrl} alt={selectedBook.title} />
                  <span className="detail-category">{selectedBook.category}</span>
                </div>
                
                <div className="detail-info-sec">
                  <h2>{selectedBook.title}</h2>
                  <p className="detail-author">Tác giả: <strong>{selectedBook.author}</strong></p>
                  
                  <div className="detail-price-box">
                    <span>Giá bán lẻ:</span>
                    <strong className="detail-price">{selectedBook.price.toLocaleString('vi-VN')} đ</strong>
                  </div>

                  <div className="detail-specs">
                    <p><strong>Nhà xuất bản:</strong> {selectedBook.publisher}</p>
                    <p><strong>Số trang:</strong> {selectedBook.pages} trang</p>
                    <p><strong>Năm xuất bản:</strong> {selectedBook.year}</p>
                  </div>

                  <div className="detail-desc">
                    <h4>Tóm tắt sách:</h4>
                    <p>{selectedBook.description}</p>
                  </div>

                  <div className="detail-actions">
                    <button 
                      className="add-to-cart-big-btn"
                      onClick={() => {
                        addToCart(selectedBook);
                        setSelectedBook(null);
                      }}
                    >
                      Thêm vào Giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHECKOUT MODAL */}
        {isCheckoutOpen && (
          <div className="modal-overlay" onClick={checkoutStep === 'form' ? () => setIsCheckoutOpen(false) : undefined}>
            <div className="modal-content checkout-modal" onClick={(e) => e.stopPropagation()}>
              {checkoutStep === 'form' && (
                <>
                  <button className="close-modal-btn" onClick={() => setIsCheckoutOpen(false)}>×</button>
                  <h2>Thông tin Thanh toán & Giao hàng</h2>
                  
                  <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
                    <div className="form-sections-grid">
                      {/* Left: Shipping Form */}
                      <div className="checkout-shipping-fields">
                        <h3>1. Địa chỉ giao hàng</h3>
                        
                        <div className="form-group">
                          <label htmlFor="checkout-name">Họ và tên người nhận</label>
                          <input 
                            id="checkout-name"
                            type="text" 
                            required
                            placeholder="Nhập tên người nhận"
                            value={checkoutInfo.name}
                            onChange={(e) => setCheckoutInfo({ ...checkoutInfo, name: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="checkout-phone">Số điện thoại</label>
                          <input 
                            id="checkout-phone"
                            type="tel" 
                            required
                            placeholder="Nhập số điện thoại liên hệ"
                            value={checkoutInfo.phone}
                            onChange={(e) => setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="checkout-address">Địa chỉ nhận hàng</label>
                          <input 
                            id="checkout-address"
                            type="text" 
                            required
                            placeholder="Địa chỉ số nhà, ngõ ngách, phường/xã, quận/huyện..."
                            value={checkoutInfo.address}
                            onChange={(e) => setCheckoutInfo({ ...checkoutInfo, address: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="checkout-note">Ghi chú giao hàng (Tùy chọn)</label>
                          <input 
                            id="checkout-note"
                            type="text" 
                            placeholder="Ví dụ: Giao ngoài giờ hành chính, gọi trước khi đến..."
                            value={checkoutInfo.note}
                            onChange={(e) => setCheckoutInfo({ ...checkoutInfo, note: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Right: Payment Method & Review */}
                      <div className="checkout-payment-review">
                        <h3>2. Phương thức thanh toán</h3>
                        <div className="payment-options">
                          <label className={`payment-radio-label ${checkoutInfo.paymentMethod === 'COD' ? 'checked' : ''}`}>
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              value="COD"
                              checked={checkoutInfo.paymentMethod === 'COD'}
                              onChange={() => setCheckoutInfo({ ...checkoutInfo, paymentMethod: 'COD' })}
                            />
                            <div className="payment-radio-desc">
                              <strong>Thanh toán trực tiếp (COD)</strong>
                              <span>Trả tiền mặt khi nhân viên giao hàng tận nơi</span>
                            </div>
                          </label>

                          <label className={`payment-radio-label ${checkoutInfo.paymentMethod === 'BANK' ? 'checked' : ''}`}>
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              value="BANK"
                              checked={checkoutInfo.paymentMethod === 'BANK'}
                              onChange={() => setCheckoutInfo({ ...checkoutInfo, paymentMethod: 'BANK' })}
                            />
                            <div className="payment-radio-desc">
                              <strong>Chuyển khoản Ngân hàng</strong>
                              <span>Quét mã QR hoặc chuyển nhanh vào tài khoản</span>
                            </div>
                          </label>
                        </div>

                        {checkoutInfo.paymentMethod === 'BANK' && (
                          <div className="bank-instructions">
                            <p><strong>Thông tin chuyển khoản:</strong></p>
                            <p>Ngân hàng: <strong>Techcombank (TCB)</strong></p>
                            <p>Số tài khoản: <strong>1903 5432 9999</strong></p>
                            <p>Chủ tài khoản: <strong>CÔNG TY BOOKSTORE VIỆT NAM</strong></p>
                            <p>Nội dung: <strong>Chuyển khoản mua sách</strong></p>
                            <small>* Chúng tôi sẽ xác nhận đơn hàng sau khi hệ thống nhận được tiền.</small>
                          </div>
                        )}

                        <div className="order-summary-box">
                          <h3>Tóm tắt đơn hàng</h3>
                          <div className="summary-box-rows">
                            <span>{cartCount} sách trong giỏ hàng:</span>
                            <strong>{cartTotal.toLocaleString('vi-VN')} đ</strong>
                          </div>
                          <div className="summary-box-rows">
                            <span>Phí vận chuyển:</span>
                            <span>{cartTotal >= 300000 ? 'Miễn phí' : '30.000 đ'}</span>
                          </div>
                          <div className="summary-box-rows total">
                            <span>Tổng thanh toán:</span>
                            <strong>{(cartTotal + (cartTotal >= 300000 ? 0 : 30000)).toLocaleString('vi-VN')} đ</strong>
                          </div>
                        </div>

                        <button type="submit" className="confirm-order-btn">
                          Hoàn tất Đặt hàng
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}

              {checkoutStep === 'success' && placedOrderDetails && (
                <div className="order-success-screen">
                  <div className="success-icon">✓</div>
                  <h2>Đặt hàng thành công!</h2>
                  <p className="order-alert-p">Cảm ơn bạn đã lựa chọn mua sắm tại BookStore. Mã đơn hàng của bạn là:</p>
                  <div className="success-order-id">{placedOrderDetails.id}</div>
                  
                  <div className="success-order-recap">
                    <h3>Chi tiết nhận hàng:</h3>
                    <p><strong>Người nhận:</strong> {placedOrderDetails.shippingInfo.name}</p>
                    <p><strong>Số điện thoại:</strong> {placedOrderDetails.shippingInfo.phone}</p>
                    <p><strong>Địa chỉ giao:</strong> {placedOrderDetails.shippingInfo.address}</p>
                    <p><strong>Tổng thanh toán:</strong> <strong>{(placedOrderDetails.total + (placedOrderDetails.total >= 300000 ? 0 : 30000)).toLocaleString('vi-VN')} đ</strong></p>
                    <p><strong>Trạng thái:</strong> {placedOrderDetails.status}</p>
                  </div>
                  
                  <p className="success-note">Nhân viên chăm sóc khách hàng sẽ liên hệ với bạn qua số điện thoại để xác nhận lịch trình giao hàng sớm nhất.</p>
                  
                  <button className="success-close-btn" onClick={completeCheckout}>
                    Tiếp tục mua sắm
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ANONYMOUS / LOGIN-REGISTER VIEWS
  return (
    <div className="page-wrapper">
      <div className="login-shell">
        <aside className="login-brand">
          <div>
            <h1>BookStore</h1>
            <p>{page === 'login' ? 'Đăng nhập để tiếp tục mua sách, quản lý đơn hàng và nhận ưu đãi mới nhất.' : 'Tạo tài khoản mới để khám phá sách hay và nhận ưu đãi cá nhân.'}</p>
          </div>

          <div className="book-list">
            <div className="book-card">
              <div className="book-dot">1</div>
              <div>
                <strong>Kho sách đa dạng</strong>
                <span>Tiểu thuyết, kinh doanh, kỹ năng, thiếu nhi...</span>
              </div>
            </div>
            <div className="book-card">
              <div className="book-dot">2</div>
              <div>
                <strong>Giảm giá hàng tuần</strong>
                <span>Ưu đãi sách hay, giảm đến 50% mỗi tuần.</span>
              </div>
            </div>
            <div className="book-card">
              <div className="book-dot">3</div>
              <div>
                <strong>Giao hàng nhanh</strong>
                <span>Nhận hàng tận nơi trong 1-3 ngày làm việc.</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="login-form">
          <div>
            <h2>{page === 'login' ? 'Đăng nhập tài khoản' : 'Tạo tài khoản mới'}</h2>
            <p>{page === 'login' ? 'Nhập email và mật khẩu của bạn để truy cập vào hệ thống bán sách trực tuyến.' : 'Hoàn tất các thông tin sau để đăng ký tài khoản BookStore.'}</p>
          </div>

          <form onSubmit={page === 'login' ? handleLogin : handleRegister}>
            {page === 'register' && (
              <div className="form-group">
                <label htmlFor="name">Họ và tên</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nhập họ tên"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="example@bookstore.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            {page === 'register' && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </div>
            )}

            {page === 'login' && (
              <div className="actions">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                  />
                  Nhớ đăng nhập
                </label>
                <a href="#">Quên mật khẩu?</a>
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Đang xử lý...' : page === 'login' ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </form>

          <div className="hint">
            {page === 'login' ? (
              <>
                <span>Chưa có tài khoản?</span>
                <button type="button" className="link-btn" onClick={() => switchPage('register')}>
                  Đăng ký ngay
                </button>
              </>
            ) : (
              <>
                <span>Đã có tài khoản?</span>
                <button type="button" className="link-btn" onClick={() => switchPage('login')}>
                  Đăng nhập
                </button>
              </>
            )}
          </div>

          <p className="footer-note">Chúng tôi cam kết bảo mật thông tin cá nhân và hỗ trợ bạn mọi lúc.</p>

          {message && <div className="message-box">{message}</div>}
        </section>
      </div>
    </div>
  );
}

export default App;


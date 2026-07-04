import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './pages/Store/Store';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Orders from './pages/Orders/Orders';
import FAQ from './pages/FAQ/FAQ';
import Bestsellers from './pages/Bestsellers/Bestsellers';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import Footer from './pages/Footer/Footer';
import Admin from './pages/Admin/Admin';
import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/Profile';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

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
    year: 2021,
    reviews: [],
    averageRating: 0.0,
    salesCount: 120
  },
  {
    id: 2,
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    category: 'Tiểu thuyết',
    price: 79000,
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    description: 'Một tác phẩm kinh diễn về việc theo đuổi ước mơ, lắng nghe tiếng nói của trái tim và học cách thấu hiểu các điềm báo của vũ trụ.',
    publisher: 'NXB Hội Nhà Văn',
    pages: 228,
    year: 2020,
    reviews: [],
    averageRating: 0.0,
    salesCount: 340
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
    year: 2019,
    reviews: [],
    averageRating: 0.0,
    salesCount: 210
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
    year: 2022,
    reviews: [],
    averageRating: 0.0,
    salesCount: 95
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
    year: 2021,
    reviews: [],
    averageRating: 0.0,
    salesCount: 180
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
    year: 2018,
    reviews: [],
    averageRating: 0.0,
    salesCount: 88
  },
  {
    id: 7,
    title: 'Cha Giàu Cha Nghèo',
    author: 'Robert Kiyosaki',
    category: 'Kinh tế',
    price: 125000,
    coverUrl: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=600&q=80',
    description: 'Một trong những cuốn sách hay nhất về quản lý tài chính cá nhân, giúp bạn hiểu rõ sự khác biệt giữa tài sản và tiêu sản.',
    publisher: 'NXB Trẻ',
    pages: 380,
    year: 2021,
    reviews: [],
    averageRating: 0.0,
    salesCount: 145
  },
  {
    id: 8,
    title: 'Lược Sử Thời Gian',
    author: 'Stephen Hawking',
    category: 'Khoa học',
    price: 115000,
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    description: 'Cuốn sách khám phá những bí ẩn lớn nhất của vũ trụ: hố đen, thời gian và sự khởi đầu của vạn vật.',
    publisher: 'NXB Thế Giới',
    pages: 290,
    year: 2020,
    reviews: [],
    averageRating: 0.0,
    salesCount: 75
  },
  {
    id: 9,
    title: 'Số Đỏ',
    author: 'Vũ Trọng Phụng',
    category: 'Tiểu thuyết',
    price: 65000,
    coverUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80',
    description: 'Tác phẩm trào phúng kinh điển phản ánh xã hội Việt Nam thời kỳ Âu hóa nửa thực dân nửa phong kiến.',
    publisher: 'NXB Hội Nhà Văn',
    pages: 250,
    year: 2019,
    reviews: [],
    averageRating: 0.0,
    salesCount: 290
  },
  {
    id: 10,
    title: 'Kính Vạn Hoa',
    author: 'Nguyễn Nhật Ánh',
    category: 'Thiếu nhi',
    price: 95000,
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    description: 'Những câu chuyện học đường hài hước, cảm động về tình bạn và những bài học cuộc sống đáng quý.',
    publisher: 'NXB Kim Đồng',
    pages: 340,
    year: 2022,
    reviews: [],
    averageRating: 0.0,
    salesCount: 165
  },
  {
    id: 11,
    title: 'Rừng Na Uy',
    author: 'Haruki Murakami',
    category: 'Tiểu thuyết',
    price: 135000,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    description: 'Tác phẩm nổi tiếng khắc họa những trăn trước, cô đơn và tình yêu tuổi trẻ đầy day dứt.',
    publisher: 'NXB Hội Nhà Văn',
    pages: 450,
    year: 2021,
    reviews: [],
    averageRating: 0.0,
    salesCount: 195
  },
  {
    id: 12,
    title: 'Hạt Giống Tâm Hồn',
    author: 'Nhiều tác giả',
    category: 'Kỹ năng',
    price: 45000,
    coverUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80',
    description: 'Những câu chuyện ngắn đầy ý nghĩa truyền cảm hứng vượt qua khó khăn và trân trọng cuộc sống.',
    publisher: 'NXB Tổng hợp TP.HCM',
    pages: 180,
    year: 2022,
    reviews: [],
    averageRating: 0.0,
    salesCount: 220
  }
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname === '/' ? 'store' : location.pathname.substring(1);

  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const message = '';
  const setMessage = (msg) => {
    if (!msg) return;
    const lowerMsg = msg.toLowerCase();
    if (lowerMsg.includes('thành công') || lowerMsg.includes('đã đăng xuất') || lowerMsg.includes('cảm ơn') || lowerMsg.includes('đã gửi')) {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  };

  const [books, setBooks] = useState(DEFAULT_BOOKS);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Sorting & Filtering state
  const [sortBy, setSortBy] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Book Reviews state
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  
  const reviewMessage = '';
  const setReviewMessage = (msg) => {
    if (!msg) return;
    if (msg.toLowerCase().includes('thành công')) {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  };

  // Checkout and Mock Payment state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form');
  const [orders, setOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [checkoutInfo, setCheckoutInfo] = useState(() => JSON.parse(localStorage.getItem('checkoutInfo')) || { name: '', phone: '', address: '', note: '', paymentMethod: 'COD' });

  useEffect(() => {
    localStorage.setItem('checkoutInfo', JSON.stringify(checkoutInfo));
  }, [checkoutInfo]);

  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // Mock Payment Gateway specific
  const [isPaymentGatewayOpen, setIsPaymentGatewayOpen] = useState(false);
  const [paymentGatewayTimer, setPaymentGatewayTimer] = useState(180); // 3 minutes
  const [pendingOrderDetails, setPendingOrderDetails] = useState(null);
  const [isDoubleConfirmOpen, setIsDoubleConfirmOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  
  const contactMessage = '';
  const setContactMessage = (msg) => {
    if (!msg) return;
    toast.success(msg);
  };

  // OTP Verification
  const [verifyOtpEmail, setVerifyOtpEmail] = useState(null);
  const [otpCode, setOtpCode] = useState('');

  const [newBook, setNewBook] = useState({ title: '', author: '', category: 'Kỹ năng', price: '', coverUrl: '', description: '', publisher: '', pages: '', year: '' });
  
  const adminMessage = '';
  const setAdminMessage = (msg) => {
    if (!msg) return;
    if (msg.toLowerCase().includes('thành công')) {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  };

  // Derived values
  const cartCount = cart.reduce((s, it) => s + (it.quantity || 0), 0);
  const cartTotal = cart.reduce((s, it) => s + (it.quantity || 0) * (it.price || 0), 0);
  const categories = ['Tất cả', ...Array.from(new Set(books.map((b) => b.category)))];

  // Filtering + Sorting implementation
  const filteredBooks = books
    .filter((b) => {
      const matchCat = selectedCategory === 'Tất cả' || b.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchQ = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      
      const priceNum = b.price;
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      const matchPrice = priceNum >= min && priceNum <= max;

      return matchCat && matchQ && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return (b.averageRating || 0) - (a.averageRating || 0);
      if (sortBy === 'sales-desc') return (b.salesCount || 0) - (a.salesCount || 0);
      if (sortBy === 'year-desc') return b.year - a.year;
      return 0; // default sort (in-memory list order)
    });

  async function fetchAllUsers() {
    if (!['admin', 'superadmin'].includes(user?.role)) return;
    try {
      const res = await apiFetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setAllUsers(data);
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách người dùng:", err);
    }
  }

  async function fetchOrders() {
    if (!user) return;
    try {
      const url = ['admin', 'superadmin'].includes(user.role) ? '/api/orders' : `/api/orders?email=${encodeURIComponent(user.email)}`;
      const res = await apiFetch(url);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Lỗi khi tải đơn hàng:", err);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (page === 'store') {
      fetchBooks();
    }
    if (page === 'orders' || ['admin', 'superadmin'].includes(user?.role)) {
      fetchOrders();
    }
    if (['admin', 'superadmin'].includes(user?.role)) {
      fetchAllUsers();
    }
  }, [page, user]);

  // Payment gateway countdown timer
  useEffect(() => {
    let interval = null;
    if (isPaymentGatewayOpen && paymentGatewayTimer > 0) {
      interval = setInterval(() => {
        setPaymentGatewayTimer((prev) => prev - 1);
      }, 1000);
    } else if (paymentGatewayTimer === 0 && isPaymentGatewayOpen) {
      alert("Giao dịch thanh toán đã hết hạn! Vui lòng thực hiện lại.");
      handleSimulatedPaymentCancel();
    }
    return () => clearInterval(interval);
  }, [isPaymentGatewayOpen, paymentGatewayTimer]);

  async function fetchBooks() {
    try {
      const res = await apiFetch('/api/books');
      if (res.ok) {
        const data = await res.json();
        setBooks(data);
      }
    } catch (err) {
      console.error("Lỗi tải danh mục sách:", err);
    }
  }

  function clearForm() {
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setNewBook({ title: '', author: '', category: 'Kỹ năng', price: '', coverUrl: '', description: '', publisher: '', pages: '', year: '' });
    setAdminMessage('');
    setMessage('');
  }

  function switchPage(p) {
    setMessage('');
    setIsUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(p === 'store' ? '/' : `/${p}`);
  }

  useEffect(() => {
    let timeoutId;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      if (user) {
        timeoutId = setTimeout(() => {
          setUser(null);
          setIsUserDropdownOpen(false);
          setShowSessionExpiredModal(true);
          switchPage('login');
        }, 15 * 60 * 1000); // 15 minutes
      }
    };

    if (user) {
      resetTimer();
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keydown', resetTimer);
      window.addEventListener('click', resetTimer);
      window.addEventListener('scroll', resetTimer);
    } else {
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [user]);

  async function handleGoogleLogin(token) {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setToken(data.token);
        setUser({ name: data.name, email: data.email, role: data.role, phone: data.phone, address: data.address });
        setCheckoutInfo({
          name: data.name,
          phone: data.phone || '',
          address: data.address || '',
          note: '',
          paymentMethod: 'COD'
        });
        setMessage(data.message || 'Đăng nhập Google thành công');
        if (['admin', 'superadmin'].includes(data.role)) {
          switchPage('admin');
        } else {
          switchPage('store');
        }
      } else {
        setMessage(data.message || 'Lỗi đăng nhập Google');
      }
    } catch (err) {
      console.error("Lỗi đăng nhập Google:", err);
      setMessage('Không thể kết nối đến máy chủ.');
    }
    setLoading(false);
  }

  async function handleVerifyOtp(e) {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verifyOtpEmail, otp: otpCode })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(data.message);
        setVerifyOtpEmail(null);
        setOtpCode('');
        setPage('login'); // switch to login after verification
      } else {
        setMessage(data.message || 'Lỗi xác minh OTP');
      }
    } catch (err) {
      console.error("Lỗi xác minh OTP:", err);
      setMessage('Không thể kết nối đến máy chủ.');
    }
    setLoading(false);
  }

  async function handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok && data.needsVerification) {
        setMessage(data.message);
        setVerifyOtpEmail(data.email);
      } else if (res.ok && data.success) {
        setToken(data.token);
        setUser({ name: data.name, email: data.email, role: data.role, phone: data.phone, address: data.address });
        setCheckoutInfo({
          name: data.name,
          phone: data.phone || '',
          address: data.address || '',
          note: '',
          paymentMethod: 'COD'
        });
        setMessage(data.message || 'Đăng nhập thành công');
        if (['admin', 'superadmin'].includes(data.role)) {
          switchPage('admin');
        } else {
          switchPage('store');
        }
      } else {
        setMessage(data.message || 'Email hoặc mật khẩu không đúng');
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setMessage('Không thể kết nối đến máy chủ.');
    }
    setLoading(false);
  }

  async function handleRegister(e) {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setMessage('');
    if (password.length < 6) {
      setMessage('Mật khẩu quá ngắn. Vui lòng nhập từ 6 ký tự trở lên.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Mật khẩu xác nhận không trùng khớp. Vui lòng gõ lại.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok && data.needsVerification) {
        setMessage(data.message);
        setVerifyOtpEmail(data.email);
      } else if (res.ok && data.success) {
        if (data.needsVerification) {
            setMessage(data.message);
            setVerifyOtpEmail(data.email);
        } else {
            setUser({ name: data.name, email: data.email, role: data.role, phone: '', address: '' });
            setCheckoutInfo({
              name: data.name,
              phone: '',
              address: '',
              note: '',
              paymentMethod: 'COD'
            });
            setMessage(data.message || 'Đăng ký thành công');
            switchPage('store');
        }
      } else {
        setMessage(data.message || 'Lỗi đăng ký tài khoản.');
      }
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      setMessage('Không thể kết nối đến máy chủ.');
    }
    setLoading(false);
  }

  function handleLogout() {
    setUser(null);
    setToken(null);
    setMessage('Đã đăng xuất');
    setIsUserDropdownOpen(false);
    switchPage('store');
  }

  function addToCart(book) {
    setCart((prev) => {
      const found = prev.find((i) => i.id === book.id);
      if (found) return prev.map((i) => (i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [{ ...book, quantity: 1 }, ...prev];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQuantity(id, delta) {
    setCart((prev) => prev
      .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, (i.quantity || 0) + delta) } : i))
      .filter((i) => i.quantity > 0)
    );
  }

  // Profile Edit API call
  async function handleUpdateProfile(profileData) {
    try {
      const res = await apiFetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser({
          name: data.name,
          email: data.email,
          role: data.role,
          phone: data.phone,
          address: data.address
        });
        setCheckoutInfo((prev) => ({
          ...prev,
          name: data.name,
          phone: data.phone || '',
          address: data.address || ''
        }));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      console.error("Lỗi cập nhật hồ sơ:", err);
      return { success: false, message: "Không thể kết nối đến máy chủ." };
    }
  }

  // Add Book Review API call
  async function handleAddReview(bookId, e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!user) {
      setReviewMessage("Vui lòng đăng nhập để gửi đánh giá.");
      return;
    }
    try {
      const reviewPayload = {
        userEmail: user.email,
        userName: user.name,
        rating: reviewRating,
        comment: reviewComment,
        timestamp: Date.now()
      };
      const res = await apiFetch(`/api/books/${bookId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewPayload)
      });
      if (res.ok) {
        const updatedBook = await res.json();
        // Update local books list
        setBooks((prev) => prev.map((b) => (b.id === bookId ? updatedBook : b)));
        // Update currently selected modal view
        setSelectedBook(updatedBook);
        
        setReviewComment('');
        setReviewRating(5);
        setReviewMessage("Đánh giá của bạn đã được gửi thành công!");
        setTimeout(() => setReviewMessage(''), 3000);
      } else {
        setReviewMessage("Lỗi khi lưu đánh giá.");
      }
    } catch (err) {
      console.error("Lỗi gửi đánh giá:", err);
      setReviewMessage("Không thể gửi đánh giá.");
    }
  }

  // Checkout handling (incorporates mock payments)
  async function handleCheckoutSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (cart.length === 0) { setMessage('Giỏ hàng trống'); return; }
    
    const orderItems = cart.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity
    }));

    const isMockPayment = checkoutInfo.paymentMethod === 'MOMO' || checkoutInfo.paymentMethod === 'VNPAY';

    const orderPayload = {
      date: new Date().toLocaleString('vi-VN'),
      userEmail: user?.email || 'guest@bookstore.com',
      items: orderItems,
      total: cartTotal,
      shippingInfo: checkoutInfo,
      status: isMockPayment ? 'Chờ thanh toán' : 'Chờ chuẩn bị hàng',
      paymentStatus: isMockPayment ? 'Chưa thanh toán' : (checkoutInfo.paymentMethod === 'BANK' ? 'Chờ xác nhận chuyển khoản' : 'Chưa thanh toán')
    };

    try {
      const res = await apiFetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (res.ok) {
        const savedOrder = await res.json();
        setOrders((prev) => [savedOrder, ...prev]);
        setPlacedOrderDetails(savedOrder);
        
        if (isMockPayment) {
          setPendingOrderDetails(savedOrder);
          setPaymentGatewayTimer(180);
          setIsPaymentGatewayOpen(true);
        } else {
          setCart([]);
          setCheckoutStep('success');
        }
      } else {
        setMessage('Lỗi khi gửi đơn hàng đến máy chủ.');
      }
    } catch (err) {
      console.error("Lỗi đặt hàng:", err);
      setMessage('Không thể kết nối đến máy chủ.');
    }
  }

  // Simulated Payment Handlers
  async function handleSimulatedPaymentSuccess() {
    if (!pendingOrderDetails) return;
    try {
      const res = await apiFetch(`/api/orders/${pendingOrderDetails.id}/pay`, {
        method: 'PUT'
      });
      if (res.ok) {
        const updatedOrder = await res.json();
        // Update local order lists
        setOrders((prev) => prev.map((o) => (o.id === pendingOrderDetails.id ? updatedOrder : o)));
        setPlacedOrderDetails(updatedOrder);
        setCart([]);
        setIsPaymentGatewayOpen(false);
        setCheckoutStep('success');
        setPendingOrderDetails(null);
      } else {
        alert("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.");
      }
    } catch (err) {
      console.error(err);
      alert("Không thể kết nối đến máy chủ để ghi nhận thanh toán.");
    }
  }

  function handleSimulatedPaymentCancel() {
    setIsPaymentGatewayOpen(false);
    setPendingOrderDetails(null);
    alert("Giao dịch thanh toán đã bị hủy. Bạn có thể chọn lại phương thức thanh toán khác.");
  }

  function completeCheckout() {
    setIsCheckoutOpen(false);
    setCheckoutStep('form');
    setPlacedOrderDetails(null);
    switchPage('orders');
  }

  function handleContactSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    setContactMessage('Cảm ơn góp ý của bạn — chúng tôi đã nhận được.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  }

  async function handleCreateBook(e) {
    if (e && e.preventDefault) e.preventDefault();
    setAdminMessage('');
    try {
      const bookPayload = {
        title: newBook.title,
        author: newBook.author,
        category: newBook.category,
        price: Number(newBook.price) || 0,
        coverUrl: newBook.coverUrl,
        description: newBook.description,
        publisher: newBook.publisher,
        pages: Number(newBook.pages) || 0,
        year: Number(newBook.year) || 0
      };
      const res = await apiFetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookPayload)
      });
      if (res.ok) {
        const savedBook = await res.json();
        setBooks((prev) => [savedBook, ...prev]);
        setAdminMessage('Đã thêm sách mới thành công');
        setNewBook({ title: '', author: '', category: 'Kỹ năng', price: '', coverUrl: '', description: '', publisher: '', pages: '', year: '' });
      } else {
        setAdminMessage('Lỗi khi thêm sách vào backend');
      }
    } catch (err) {
      console.error("Lỗi thêm sách:", err);
      setAdminMessage('Không thể kết nối đến máy chủ.');
    }
  }

  async function handleUpdateOrderStatus(orderId, status) {
    try {
      const res = await apiFetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
      } else {
        console.error("Lỗi khi cập nhật trạng thái đơn hàng trên backend");
      }
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái đơn:", err);
    }
  }

  async function handleDeleteOrder(orderId) {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng #${orderId} không?`)) return;
    try {
      const res = await apiFetch(`/api/orders/${orderId}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders(prev => prev.filter(o => o.id !== orderId));
        toast.success(`Đã xóa đơn hàng #${orderId}`);
      } else {
        alert('Lỗi khi xóa đơn hàng khỏi hệ thống.');
      }
    } catch (err) {
      console.error("Lỗi xóa đơn hàng:", err);
    }
  }

  async function handleDeleteBook(bookId) {
    try {
      const res = await apiFetch(`/api/books/${bookId}`, { method: 'DELETE' });
      if (res.ok) {
        setBooks(prev => prev.filter(b => b.id !== bookId));
      } else {
        alert('Lỗi khi xóa sách khỏi hệ thống.');
      }
    } catch (err) {
      console.error("Lỗi xóa sách:", err);
      alert('Không thể kết nối đến máy chủ.');
    }
  }

  async function handleUpdateUserRole(userId, role) {
    try {
      const res = await apiFetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
      if (res.ok) {
        const data = await res.json();
        setAllUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: data.user.role } : u)));
        setAdminMessage('Cập nhật quyền thành công');
      } else {
        setAdminMessage('Lỗi cập nhật quyền');
      }
    } catch (err) {
      console.error("Lỗi cập nhật quyền:", err);
    }
  }

  async function handleToggleUserStatus(userId, currentStatus) {
    try {
      const res = await apiFetch(`/api/users/${userId}/status`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (res.ok) {
        setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, active: !currentStatus } : u));
        setAdminMessage(`Đã ${!currentStatus ? 'mở khóa' : 'khóa'} tài khoản thành công`);
      } else {
        setAdminMessage('Lỗi khi thay đổi trạng thái');
      }
    } catch (err) {
      console.error("Lỗi thay đổi trạng thái user:", err);
    }
  }

  async function handleDeleteUser(userId) {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này vĩnh viễn không?")) return;
    try {
      const res = await apiFetch(`/api/users/${userId}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setAllUsers(prev => prev.filter(u => u.id !== userId));
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Lỗi khi xóa tài khoản');
      }
    } catch (err) {
      console.error("Lỗi xóa user:", err);
      toast.error('Không thể kết nối đến máy chủ.');
    }
  }

  const app = {
    page,
    setPage: switchPage,
    user,
    setUser,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    remember,
    setRemember,
    message,
    setMessage,
    loading,
    setLoading,
    books,
    setBooks,
    cart,
    setCart,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedBook,
    setSelectedBook,
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutStep,
    setCheckoutStep,
    orders,
    setOrders,
    allUsers,
    setAllUsers,
    checkoutInfo,
    setCheckoutInfo,
    placedOrderDetails,
    setPlacedOrderDetails,
    newBook,
    setNewBook,
    adminMessage,
    setAdminMessage,
    contactForm,
    setContactForm,
    contactMessage,
    setContactMessage,
    clearForm,
    fetchBooks,
    handleLogin,
    handleRegister,
    switchPage,
    handleLogout,
    addToCart,
    removeFromCart,
    updateQuantity,
    handleCheckoutSubmit,
    completeCheckout,
    handleContactSubmit,
    handleUpdateOrderStatus,
    handleDeleteOrder,
    handleCreateBook,
    handleDeleteBook,
    handleUpdateUserRole,
    handleToggleUserStatus,
    handleDeleteUser,
    cartCount,
    cartTotal,
    filteredBooks,
    categories,
    // Add sorting state & review state to app context
    sortBy,
    setSortBy,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    handleUpdateProfile,
    handleAddReview,
    reviewRating,
    setReviewRating,
    reviewComment,
    setReviewComment,
    setReviewMessage,
    isUserDropdownOpen,
    setIsUserDropdownOpen,
    verifyOtpEmail,
    setVerifyOtpEmail,
    otpCode,
    setOtpCode,
    handleVerifyOtp,
    handleGoogleLogin
  };

  // Admin dashboard: render standalone full-page layout (no user navbar/footer)
  if (['admin', 'superadmin'].includes(user?.role)) {
    return <Admin app={app} />;
  }

  return (
    <div className="store-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <header className="navbar">
        <div className="nav-brand" onClick={() => switchPage('store')}>
          <svg className="brand-logo-svg" viewBox="0 0 24 24" width="28" height="28">
            <path fill="currentColor" d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
          </svg>
          <h1>BookStore</h1>
        </div>

        <nav className="nav-menu">
          <button className={`nav-link-btn ${page === 'store' ? 'active' : ''}`} onClick={() => switchPage('store')}>
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '6px', fill: 'currentColor', verticalAlign: 'middle' }}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            Cửa hàng
          </button>
          <button className={`nav-link-btn ${page === 'bestsellers' ? 'active' : ''}`} onClick={() => switchPage('bestsellers')}>
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '6px', fill: 'currentColor', verticalAlign: 'middle' }}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            Bán chạy
          </button>
          <button className={`nav-link-btn ${page === 'about' ? 'active' : ''}`} onClick={() => switchPage('about')}>
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '6px', fill: 'currentColor', verticalAlign: 'middle' }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            Giới thiệu
          </button>
          <button className={`nav-link-btn ${page === 'faq' ? 'active' : ''}`} onClick={() => switchPage('faq')}>
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '6px', fill: 'currentColor', verticalAlign: 'middle' }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
            FAQ
          </button>
          <button className={`nav-link-btn ${page === 'contact' ? 'active' : ''}`} onClick={() => switchPage('contact')}>
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '6px', fill: 'currentColor', verticalAlign: 'middle' }}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            Liên hệ
          </button>
          <button className={`nav-link-btn ${page === 'cart' ? 'active' : ''}`} onClick={() => switchPage('cart')}>
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '6px', fill: 'currentColor', verticalAlign: 'middle' }}><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25z"/></svg>
            Giỏ hàng
            {cartCount > 0 && <span className="cart-badge-nav">{cartCount}</span>}
          </button>
        </nav>

        <div className="nav-actions">
          {user ? (
            <div className="nav-user-dropdown-container">
              <button 
                className={`nav-user-trigger ${isUserDropdownOpen ? 'active' : ''}`}
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span>Chào, {user.name.split(' ')[0]}</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="chevron-icon">
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
              </button>

              {isUserDropdownOpen && (
                <>
                  <div className="dropdown-backdrop" onClick={() => setIsUserDropdownOpen(false)} />
                  <div className="user-dropdown-menu">
                    <div className="dropdown-user-info">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                    <button 
                      className={`dropdown-item ${page === 'profile' ? 'active' : ''}`} 
                      onClick={() => switchPage('profile')}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                      Hồ sơ cá nhân
                    </button>
                    <button 
                      className={`dropdown-item ${page === 'orders' ? 'active' : ''}`} 
                      onClick={() => switchPage('orders')}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                      Đơn hàng của tôi
                      {orders.length > 0 && <span className="dropdown-badge">{orders.length}</span>}
                    </button>
                    {['admin', 'superadmin'].includes(user.role) && (
                      <button 
                        className={`dropdown-item ${page === 'admin' ? 'active' : ''}`} 
                        onClick={() => switchPage('admin')}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3-1.07-3-3s1.07-3 3-3 3 1.07 3 3-1.07 3-3 3z"/></svg>
                        Trang quản trị
                      </button>
                    )}
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16 17v-3H9v-2h7V9l5 4-5 4zm-2 1H5v-2H3v2c0 1.1.9 2 2 2h9v-2zm-9-8v6H3V7c0-1.1.9-2 2-2h9v2H5v3zm11-6H5V3h11v2z"/></svg>
                      Đăng xuất
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button className="login-nav-btn" onClick={() => switchPage('login')}>
              Đăng nhập
            </button>
          )}
        </div>
      </header>

      <div className="page-wrapper" style={(page === 'login' || page === 'register') ? { 
        padding: '20px 10px', 
        minHeight: 'calc(100vh - 90px)',
        boxSizing: 'border-box',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
      } : {}}>
        <Routes>
          <Route path="/" element={<Store app={app} />} />
          <Route path="/bestsellers" element={<Bestsellers app={app} />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ app={app} />} />
          <Route path="/contact" element={<Contact app={app} />} />
          <Route path="/orders" element={<Orders app={app} />} />
          <Route path="/cart" element={<Cart app={app} />} />
          <Route path="/profile" element={<Profile app={app} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/login" element={<LoginRegister app={app} />} />
          <Route path="/register" element={<LoginRegister app={app} />} />
          <Route path="/forgot-password" element={<ForgotPassword app={app} />} />
          <Route path="*" element={<Store app={app} />} />
        </Routes>
      </div>

      {page !== 'login' && page !== 'register' && <Footer />}

      {/* Chi tiết sách Modal */}
      {selectedBook && (
        <div className="modal-overlay" onClick={() => { setSelectedBook(null); setReviewMessage(''); }}>
          <div className="modal-content book-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => { setSelectedBook(null); setReviewMessage(''); }}>×</button>

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
                  {selectedBook.averageRating > 0 && (
                    <p>
                      <strong>Đánh giá trung bình:</strong>{' '}
                      <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>★ {selectedBook.averageRating}</span> / 5.0
                    </p>
                  )}
                </div>

                <div className="detail-desc">
                  <h4>Tóm tắt sách:</h4>
                  <p>{selectedBook.description}</p>
                </div>

                <div className="detail-actions">
                  <button 
                    className="add-to-cart-big-btn"
                    onClick={() => { addToCart(selectedBook); setSelectedBook(null); setReviewMessage(''); }}
                  >
                    Thêm vào Giỏ hàng
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Section inside modal */}
            <div className="book-reviews-section">
              <h3>Phản hồi & Đánh giá ({selectedBook.reviews?.length || 0})</h3>
              
              {/* Form gửi đánh giá */}
              {user ? (
                <form onSubmit={(e) => handleAddReview(selectedBook.id, e)} className="add-review-form">
                  <h4>Viết nhận xét của bạn</h4>
                  
                  <div className="rating-selector-row">
                    <span>Điểm đánh giá:</span>
                    <div className="stars-pick-container">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className={`star-pick-btn ${star <= reviewRating ? 'selected' : ''}`}
                          onClick={() => setReviewRating(star)}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="review-comment-box-row">
                    <textarea
                      required
                      placeholder="Viết đánh giá thực tế của bạn về cuốn sách (ví dụ: nội dung hay, giao hàng bọc cẩn thận...)"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows="3"
                    ></textarea>
                    <button type="submit" className="submit-review-btn">
                      Gửi nhận xét
                    </button>
                  </div>
                  {reviewMessage && <p className="review-response-status">{reviewMessage}</p>}
                </form>
              ) : (
                <div className="login-to-review-box">
                  Vui lòng <button className="inline-login-link" onClick={() => { setSelectedBook(null); switchPage('login'); }}>Đăng nhập</button> để viết nhận xét của bạn cho cuốn sách này.
                </div>
              )}

              {/* Reviews List */}
              <div className="reviews-cards-list">
                {selectedBook.reviews && selectedBook.reviews.length > 0 ? (
                  selectedBook.reviews.map((rev, idx) => (
                    <div key={idx} className="review-card-item">
                      <div className="review-card-header">
                        <div className="reviewer-info">
                          <strong>{rev.userName}</strong>
                          <span className="reviewer-email">({rev.userEmail})</span>
                        </div>
                        <div className="reviewer-rating">
                          {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                        </div>
                      </div>
                      <p className="reviewer-comment">{rev.comment}</p>
                      <span className="review-timestamp">
                        {new Date(rev.timestamp).toLocaleString('vi-VN')}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="empty-reviews-text">Chưa có đánh giá nào cho cuốn sách này. Hãy là người đầu tiên chia sẻ cảm nghĩ!</p>
                )}
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
                    <div className="checkout-shipping-fields">
                      <h3>1. Địa chỉ giao hàng</h3>

                      <div className="form-group">
                        <label htmlFor="checkout-name">Họ và tên người nhận</label>
                        <input id="checkout-name" type="text" required placeholder="Nhập tên người nhận" value={checkoutInfo.name} onChange={(e) => setCheckoutInfo({ ...checkoutInfo, name: e.target.value })} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="checkout-phone">Số điện thoại</label>
                        <input id="checkout-phone" type="tel" required placeholder="Nhập số điện thoại liên hệ" value={checkoutInfo.phone} onChange={(e) => setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="checkout-address">Địa chỉ nhận hàng</label>
                        <input id="checkout-address" type="text" required placeholder="Địa chỉ số nhà, ngõ ngách, phường/xã, quận/huyện..." value={checkoutInfo.address} onChange={(e) => setCheckoutInfo({ ...checkoutInfo, address: e.target.value })} />
                      </div>

                      <div className="form-group">
                        <label htmlFor="checkout-note">Ghi chú giao hàng (Tùy chọn)</label>
                        <input id="checkout-note" type="text" placeholder="Ví dụ: Giao ngoài giờ hành chính, gọi trước khi đến..." value={checkoutInfo.note} onChange={(e) => setCheckoutInfo({ ...checkoutInfo, note: e.target.value })} />
                      </div>
                    </div>

                    <div className="checkout-payment-review">
                      <h3>2. Phương thức thanh toán</h3>
                      <div className="payment-options">
                        <label className={`payment-radio-label ${checkoutInfo.paymentMethod === 'COD' ? 'checked' : ''}`}>
                          <input type="radio" name="paymentMethod" value="COD" checked={checkoutInfo.paymentMethod === 'COD'} onChange={() => setCheckoutInfo({ ...checkoutInfo, paymentMethod: 'COD' })} />
                          <div className="payment-radio-desc">
                            <strong>Thanh toán trực tiếp (COD)</strong>
                            <span>Trả tiền mặt khi nhân viên giao hàng tận nơi</span>
                          </div>
                        </label>

                        <label className={`payment-radio-label ${checkoutInfo.paymentMethod === 'BANK' ? 'checked' : ''}`}>
                          <input type="radio" name="paymentMethod" value="BANK" checked={checkoutInfo.paymentMethod === 'BANK'} onChange={() => setCheckoutInfo({ ...checkoutInfo, paymentMethod: 'BANK' })} />
                          <div className="payment-radio-desc">
                            <strong>Chuyển khoản Ngân hàng</strong>
                            <span>Quét mã QR hoặc chuyển nhanh vào tài khoản</span>
                          </div>
                        </label>

                        <label className={`payment-radio-label ${checkoutInfo.paymentMethod === 'MOMO' ? 'checked' : ''}`}>
                          <input type="radio" name="paymentMethod" value="MOMO" checked={checkoutInfo.paymentMethod === 'MOMO'} onChange={() => setCheckoutInfo({ ...checkoutInfo, paymentMethod: 'MOMO' })} />
                          <div className="payment-radio-desc">
                            <strong>Thanh toán qua Ví Momo (Mô phỏng)</strong>
                            <span>Quét mã QR Momo thanh toán tự động thời gian thực</span>
                          </div>
                        </label>

                        <label className={`payment-radio-label ${checkoutInfo.paymentMethod === 'VNPAY' ? 'checked' : ''}`}>
                          <input type="radio" name="paymentMethod" value="VNPAY" checked={checkoutInfo.paymentMethod === 'VNPAY'} onChange={() => setCheckoutInfo({ ...checkoutInfo, paymentMethod: 'VNPAY' })} />
                          <div className="payment-radio-desc">
                            <strong>Cổng thanh toán VNPAY-QR (Mô phỏng)</strong>
                            <span>Thanh toán quét mã bằng ứng dụng Ngân hàng di động</span>
                          </div>
                        </label>
                      </div>

                      {checkoutInfo.paymentMethod === 'BANK' && (
                        <div className="bank-instructions">
                          <p><strong>Thông tin chuyển khoản:</strong></p>
                          <p>Ngân hàng: <strong>Techcombank (TCB)</strong></p>
                          <p>Số tài khoản: <strong>1903 5432 9999</strong></p>
                          <p>Chủ tài khoản: <strong>CÔNG TY TNHH NHÀ SÁCH VIỆT NAM</strong></p>
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

                      <button type="submit" className="confirm-order-btn">Hoàn tất Đặt hàng</button>
                    </div>
                  </div>
                </form>
              </>
            )}

            {checkoutStep === 'success' && placedOrderDetails && (
              <div className="order-success-screen">
                <div className="success-icon">✓</div>
                <h2>Đặt hàng thành công!</h2>
                <p className="order-alert-p">Cảm ơn bạn đã lựa chọn mua sắm tại Nhà Sách. Mã đơn hàng của bạn là:</p>
                <div className="success-order-id">{placedOrderDetails.id}</div>

                <div className="success-order-recap">
                  <h3>Chi tiết nhận hàng:</h3>
                  <p><strong>Người nhận:</strong> {placedOrderDetails.shippingInfo.name}</p>
                  <p><strong>Số điện thoại:</strong> {placedOrderDetails.shippingInfo.phone}</p>
                  <p><strong>Địa chỉ giao:</strong> {placedOrderDetails.shippingInfo.address}</p>
                  <p><strong>Tổng thanh toán:</strong> <strong>{(placedOrderDetails.total + (placedOrderDetails.total >= 300000 ? 0 : 30000)).toLocaleString('vi-VN')} đ</strong></p>
                  <p><strong>Trạng thái giao hàng:</strong> {placedOrderDetails.status}</p>
                  <p><strong>Trạng thái thanh toán:</strong> <span className={`payment-status-tag ${placedOrderDetails.paymentStatus === 'Đã thanh toán' ? 'paid' : 'unpaid'}`}>{placedOrderDetails.paymentStatus}</span></p>
                </div>

                <p className="success-note">Nhân viên chăm sóc khách hàng sẽ liên hệ với bạn qua số điện thoại để xác nhận lịch trình giao hàng sớm nhất.</p>
                <button className="success-close-btn" onClick={completeCheckout}>Tiếp tục mua sắm</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOCK PAYMENT GATEWAY OVERLAY MODAL */}
      {isPaymentGatewayOpen && pendingOrderDetails && (
        <div className="modal-overlay payment-gateway-overlay">
          <div className="modal-content payment-gateway-content">
            <div className="payment-gateway-header">
              {pendingOrderDetails.shippingInfo.paymentMethod === 'MOMO' ? (
                <div className="gateway-logo momo">
                  <span className="momo-tag">momo</span>
                  <h3>CỔNG THANH TOÁN MOCK MOMO</h3>
                </div>
              ) : (
                <div className="gateway-logo vnpay">
                  <span className="vnpay-tag-vn">VN</span><span className="vnpay-tag-pay">PAY</span>
                  <h3>CỔNG THANH TOÁN MOCK VNPAY-QR</h3>
                </div>
              )}
            </div>

            <div className="gateway-body">
              <div className="gateway-info-grid">
                <div className="gateway-qr-section">
                  <div className="qr-code-illustration">
                    <svg viewBox="0 0 100 100" width="180" height="180" style={{ display: 'block', margin: '0 auto' }}>
                      <rect width="100" height="100" fill="#fff" />
                      
                      {/* Top Left Finder Pattern */}
                      <rect x="5" y="5" width="25" height="25" fill="var(--primary)" />
                      <rect x="9" y="9" width="17" height="17" fill="#fff" />
                      <rect x="13" y="13" width="9" height="9" fill="var(--primary)" />
                      
                      {/* Top Right Finder Pattern */}
                      <rect x="70" y="5" width="25" height="25" fill="var(--primary)" />
                      <rect x="74" y="9" width="17" height="17" fill="#fff" />
                      <rect x="78" y="13" width="9" height="9" fill="var(--primary)" />
                      
                      {/* Bottom Left Finder Pattern */}
                      <rect x="5" y="70" width="25" height="25" fill="var(--primary)" />
                      <rect x="9" y="74" width="17" height="17" fill="#fff" />
                      <rect x="13" y="78" width="9" height="9" fill="var(--primary)" />
                      
                      {/* Center logo background */}
                      <rect x="38" y="38" width="24" height="24" fill="var(--primary)" rx="4" />
                      <rect x="41" y="41" width="18" height="18" fill="#fff" rx="2" />
                      
                      {/* Center logo mock content (M/V) */}
                      <text x="50" y="54" fontSize="11" fontWeight="bold" textAnchor="middle" fill="var(--primary-light)">
                        {pendingOrderDetails.shippingInfo.paymentMethod === 'MOMO' ? 'M' : 'V'}
                      </text>
                      
                      {/* Mock data pixels */}
                      <rect x="35" y="10" width="10" height="5" fill="#334155" />
                      <rect x="50" y="5" width="5" height="12" fill="#334155" />
                      <rect x="60" y="15" width="5" height="10" fill="#334155" />
                      <rect x="35" y="25" width="25" height="4" fill="#334155" />
                      
                      <rect x="5" y="35" width="12" height="5" fill="#334155" />
                      <rect x="10" y="45" width="15" height="5" fill="#334155" />
                      <rect x="5" y="55" width="5" height="10" fill="#334155" />
                      
                      <rect x="80" y="35" width="15" height="5" fill="#334155" />
                      <rect x="70" y="45" width="10" height="10" fill="#334155" />
                      <rect x="85" y="60" width="10" height="5" fill="#334155" />
                      
                      <rect x="35" y="70" width="5" height="12" fill="#334155" />
                      <rect x="45" y="80" width="15" height="5" fill="#334155" />
                      <rect x="40" y="90" width="25" height="5" fill="#334155" />
                      
                      <rect x="70" y="70" width="12" height="12" fill="#334155" />
                      <rect x="85" y="85" width="10" height="10" fill="#334155" />
                    </svg>
                    <div className="qr-scan-line"></div>
                  </div>
                  <p className="scan-instruction">
                    Vui lòng mở ứng dụng {pendingOrderDetails.shippingInfo.paymentMethod === 'MOMO' ? 'Momo' : 'Ngân hàng di động'} để quét mã QR thanh toán.
                  </p>
                </div>

                <div className="gateway-details-section">
                  <div className="amount-box">
                    <span>Số tiền cần thanh toán</span>
                    <strong>{(pendingOrderDetails.total + (pendingOrderDetails.total >= 300000 ? 0 : 30000)).toLocaleString('vi-VN')} đ</strong>
                  </div>

                  <div className="details-list">
                    <div className="detail-row">
                      <span>Nhà cung cấp:</span>
                      <strong>Nhà Sách BookStore</strong>
                    </div>
                    <div className="detail-row">
                      <span>Mã đơn hàng:</span>
                      <strong>{pendingOrderDetails.id}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Nội dung:</span>
                      <span>Thanh toan don hang {pendingOrderDetails.id}</span>
                    </div>
                  </div>

                  <div className="gateway-timer-box">
                    <span>Mã QR sẽ hết hạn sau:</span>
                    <strong className="timer-text">
                      {Math.floor(paymentGatewayTimer / 60).toString().padStart(2, '0')}:
                      {(paymentGatewayTimer % 60).toString().padStart(2, '0')}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="gateway-actions">
                <button className="btn-pay-success" onClick={() => setIsDoubleConfirmOpen(true)}>
                  Xác nhận đã thanh toán (Simulate Success)
                </button>
                <button className="btn-pay-cancel" onClick={handleSimulatedPaymentCancel}>
                  Hủy thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDoubleConfirmOpen && pendingOrderDetails && (
        <div className="modal-overlay double-confirm-overlay" onClick={() => setIsDoubleConfirmOpen(false)}>
          <div className="modal-content double-confirm-content" onClick={(e) => e.stopPropagation()}>
            <div className="double-confirm-icon">⚠</div>
            <h3>Xác nhận giao dịch</h3>
            <p>
              Bạn có chắc chắn đã hoàn tất quét mã QR và thanh toán thành công số tiền{' '}
              <strong>
                {(pendingOrderDetails.total + (pendingOrderDetails.total >= 300000 ? 0 : 30000)).toLocaleString('vi-VN')} đ
              </strong>{' '}
              trên ứng dụng?
            </p>
            <div className="double-confirm-actions">
              <button 
                className="btn-confirm-yes" 
                onClick={() => {
                  setIsDoubleConfirmOpen(false);
                  handleSimulatedPaymentSuccess();
                }}
              >
                Đúng, tôi đã thanh toán
              </button>
              <button className="btn-confirm-no" onClick={() => setIsDoubleConfirmOpen(false)}>
                Quay lại kiểm tra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SESSION EXPIRED MODAL */}
      {showSessionExpiredModal && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-content" style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '400px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏰</div>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Phiên đăng nhập hết hạn</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.5' }}>
              Bạn đã không hoạt động trong 15 phút. Vì lý do bảo mật, hệ thống đã tự động đăng xuất. Vui lòng đăng nhập lại để tiếp tục.
            </p>
            <button 
              className="confirm-order-btn" 
              style={{ width: '100%' }}
              onClick={() => setShowSessionExpiredModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

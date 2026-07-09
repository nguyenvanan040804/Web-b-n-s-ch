import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

export default function SearchBar({ books = [], onBookSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const removeAccents = (str) => {
      if (!str) return '';
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    };

    const normalizedQuery = removeAccents(query.toLowerCase().trim());
    const stopWords = ['sach', 'cuon', 'quyen', 'tap', 'bo'];
    const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 0);
    
    const isOnlyStopWords = queryWords.length > 0 && queryWords.every(word => stopWords.includes(word));

    let scoredBooks = books.map(book => {
      let score = 0;
      const title = removeAccents(book.title.toLowerCase());
      const author = removeAccents(book.author.toLowerCase());
      const category = book.category ? removeAccents(book.category.toLowerCase()) : '';
      
      if (isOnlyStopWords) {
        score = 1; // Show all if only typing generic words
      } else {
        const queryWithoutStopWords = queryWords.filter(w => !stopWords.includes(w)).join(' ');
        
        // Huge boost for exact or substring match of the meaningful part
        if (queryWithoutStopWords) {
          if (title === queryWithoutStopWords) score += 1000;
          else if (title.includes(queryWithoutStopWords)) score += 500;
          
          if (author.includes(queryWithoutStopWords)) score += 300;
        }

        // Word-by-word scoring
        queryWords.forEach(word => {
          if (!stopWords.includes(word)) {
            if (title.includes(word)) score += 50;
            if (author.includes(word)) score += 30;
            if (category.includes(word)) score += 10;
          }
        });
      }

      return { ...book, searchScore: score };
    });

    // Filter and sort
    let matchedBooks = scoredBooks.filter(b => b.searchScore > 0);
    matchedBooks.sort((a, b) => b.searchScore - a.searchScore);
    matchedBooks = matchedBooks.slice(0, 5); // Limit to top 5 results

    setResults(matchedBooks);
    setIsOpen(true);
  }, [query, books]);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (book) => {
    onBookSelect(book);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="global-search-container" ref={dropdownRef}>
      <div className="global-search-input-wrapper">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
        >
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27A6.471
            6.471 0 0016 9.5
            6.5 6.5 0 109.5 16
            c1.61 0 3.09-.59
            4.23-1.57l.27.28v.79
            l5 4.99L20.49
            19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
        <input
          type="text"
          className="global-search-input"
          placeholder="Tìm kiếm sách, tác giả..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />
        {query && (
          <button className="clear-search-btn" onClick={() => setQuery('')}>
            &times;
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul className="search-dropdown-menu">
          {results.map((book) => (
            <li 
              key={book.id} 
              className="search-dropdown-item"
              onClick={() => handleSelect(book)}
            >
              <img src={book.coverUrl} alt={book.title} className="search-item-cover" />
              <div className="search-item-info">
                <div className="search-item-title">{book.title}</div>
                <div className="search-item-author">{book.author}</div>
                <div className="search-item-price">{book.price.toLocaleString("vi-VN")} đ</div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isOpen && query.trim() !== '' && results.length === 0 && (
        <div className="search-dropdown-menu empty-result">
          Không tìm thấy kết quả nào cho "{query}"
        </div>
      )}
    </div>
  );
}

package com.bookstore.service;

import com.bookstore.model.Book;
import com.bookstore.model.Review;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class BookService {

    private final List<Book> books = new ArrayList<>();

    public BookService() {

        books.add(new Book(
                1L,
                "Doraemon",
                "Fujiko",
                "Truyện mèo máy",
                50000,
                "https://picsum.photos/200",
                "Manga",
                "Kim Đồng",
                180,
                2020,
                200
        ));

        books.add(new Book(
                2L,
                "Conan",
                "Aoyama",
                "Thám tử lừng danh",
                70000,
                "https://picsum.photos/201",
                "Detective",
                "Kim Đồng",
                220,
                2022,
                250
        ));
    }

    public List<Book> getAllBooks() {
        return books;
    }

    public Book getBookById(Long id) {

        return books.stream()
                .filter(book -> book.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Book addBook(Book book) {

        book.setId((long) (books.size() + 1));

        books.add(book);

        return book;
    }

    public List<Book> searchBooks(String keyword) {

        return books.stream()
                .filter(book ->
                        book.getTitle().toLowerCase()
                                .contains(keyword.toLowerCase())
                )
                .toList();
    }

    public List<Book> sortByPrice() {

        return books.stream()
                .sorted(Comparator.comparingDouble(Book::getPrice))
                .toList();
    }

    public List<Book> sortBySales() {

        return books.stream()
                .sorted((a, b) ->
                        b.getSalesCount() - a.getSalesCount()
                )
                .toList();
    }

    public Review addReview(
            Long bookId,
            Review review
    ) {

        Book book = getBookById(bookId);

        if (book == null) {
            return null;
        }

        book.addReview(review);

        return review;
    }
    // Kiểm tra sách có tồn tại không
public boolean exists(Long id) {

    return books.stream()
            .anyMatch(book -> book.getId().equals(id));

}

// Lấy số lượng sách
public int getBookCount() {

    return books.size();

}
}

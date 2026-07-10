package com.bookstore.controller;

import com.bookstore.model.Book;
import com.bookstore.model.Review;
import com.bookstore.repository.BookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
@Transactional
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        if (book.getCoverUrl() == null || book.getCoverUrl().trim().isEmpty()) {
            book.setCoverUrl("https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80");
        }
        if (book.getImages() != null) {
            for (com.bookstore.model.BookImage image : book.getImages()) {
                image.setBook(book);
            }
        }
        Book savedBook = bookRepository.save(book);
        return ResponseEntity.ok(savedBook);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") Long id, @RequestBody Book bookDetails) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            Book existingBook = optionalBook.get();
            existingBook.setTitle(bookDetails.getTitle());
            existingBook.setAuthor(bookDetails.getAuthor());
            existingBook.setCategory(bookDetails.getCategory());
            existingBook.setPrice(bookDetails.getPrice());
            existingBook.setPublisher(bookDetails.getPublisher());
            existingBook.setPages(bookDetails.getPages());
            existingBook.setWeight(bookDetails.getWeight());
            existingBook.setDescription(bookDetails.getDescription());
            
            if (bookDetails.getCoverUrl() != null && !bookDetails.getCoverUrl().trim().isEmpty()) {
                existingBook.setCoverUrl(bookDetails.getCoverUrl());
            }

            Book updatedBook = bookRepository.save(existingBook);
            return ResponseEntity.ok(updatedBook);
        }
        return ResponseEntity.notFound().build();
    }


    @PostMapping("/{id}/reviews")
    public ResponseEntity<Book> addReview(@PathVariable("id") Long id, @RequestBody Review review) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            if (review.getTimestamp() == 0) {
                review.setTimestamp(System.currentTimeMillis());
            }
            review.setBook(book);
            book.addReview(review);
            bookRepository.save(book); // This cascades to save the review
            return ResponseEntity.ok(book);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") Long id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            bookRepository.delete(optionalBook.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
     @GetMapping("/{id}/related")
    public ResponseEntity<List<Book>> getRelatedBooks(
            @PathVariable Long id
    ) {

        Optional<Book> optionalBook = bookRepository.findById(id);

        if (optionalBook.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Book book = optionalBook.get();

        List<Book> relatedBooks =
                bookRepository.findTop6ByCategoryAndIdNot(
                        book.getCategory(),
                        book.getId()
                );

        return ResponseEntity.ok(relatedBooks);
    }
}

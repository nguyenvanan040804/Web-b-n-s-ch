package com.bookstore.service;

import com.bookstore.model.Book;
import com.bookstore.model.CartItem;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class CartService {

    private final List<CartItem> cartItems =
            new CopyOnWriteArrayList<>();

    private final BookService bookService;

    public CartService(
            BookService bookService
    ) {
        this.bookService = bookService;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public CartItem addToCart(
            Long bookId
    ) {

        Book book =
                bookService.getBookById(bookId);

        if (book == null) {
            return null;
        }

        for (CartItem item : cartItems) {

            if (
                    item.getBook()
                            .getId()
                            .equals(bookId)
            ) {

                item.setQuantity(
                        item.getQuantity() + 1
                );

                return item;
            }
        }

        CartItem newItem =
                new CartItem(book, 1);

        cartItems.add(newItem);

        return newItem;
    }

    public boolean removeCartItem(
            Long bookId
    ) {

        return cartItems.removeIf(
                item ->
                        item.getBook()
                                .getId()
                                .equals(bookId)
        );
    }

    public double getTotalPrice() {

        double total = 0;

        for (CartItem item : cartItems) {

            total +=
                    item.getBook().getPrice()
                            *
                            item.getQuantity();
        }

        return total;
    }
}
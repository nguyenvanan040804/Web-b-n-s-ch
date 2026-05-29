package com.bookstore.controller;

import com.bookstore.model.ApiResponse;
import com.bookstore.model.CartItem;

import com.bookstore.service.CartService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    public CartController(
            CartService cartService
    ) {
        this.cartService = cartService;
    }

    @GetMapping
    public ApiResponse<List<CartItem>> getCart() {

        return new ApiResponse<>(
                true,
                "Lấy giỏ hàng thành công",
                cartService.getCartItems()
        );
    }

    @PostMapping("/add/{bookId}")
    public ApiResponse<CartItem> addToCart(
            @PathVariable Long bookId
    ) {

        CartItem item =
                cartService.addToCart(bookId);

        if (item == null) {

            return new ApiResponse<>(
                    false,
                    "Không tìm thấy sách",
                    null
            );
        }

        return new ApiResponse<>(
                true,
                "Thêm vào giỏ hàng thành công",
                item
        );
    }

    @DeleteMapping("/{bookId}")
    public ApiResponse<Boolean> removeCart(
            @PathVariable Long bookId
    ) {

        boolean removed =
                cartService.removeCartItem(bookId);

        return new ApiResponse<>(
                removed,
                removed
                        ? "Xóa thành công"
                        : "Không tìm thấy sản phẩm",
                removed
        );
    }

    @GetMapping("/total")
    public ApiResponse<Map<String, Double>>
    getTotal() {

        return new ApiResponse<>(
                true,
                "Tổng tiền",
                Map.of(
                        "total",
                        cartService.getTotalPrice()
                )
        );
    }
}
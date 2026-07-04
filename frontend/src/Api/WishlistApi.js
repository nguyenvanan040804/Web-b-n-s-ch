const API = "http://localhost:8082/api/wishlist";

// Lấy danh sách yêu thích
export async function getWishlist() {

    const res = await fetch(API);

    return await res.json();

}

// Thêm vào yêu thích
export async function addToWishlist(bookId) {

    const res = await fetch(`${API}/${bookId}`, {
        method: "POST"
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return await res.json();

}

// Bỏ yêu thích
export async function removeFromWishlist(bookId) {

    const res = await fetch(`${API}/${bookId}`, {
        method: "DELETE"
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return await res.text();

}

// Xóa toàn bộ danh sách yêu thích
export async function clearWishlist() {

    const res = await fetch(`${API}/clear`, {
        method: "DELETE"
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return await res.text();

}

// Kiểm tra đã yêu thích chưa
export async function checkFavorite(bookId) {

    const res = await fetch(`${API}/check/${bookId}`);

    return await res.json();

}

// Đếm số lượng sách yêu thích
export async function getWishlistCount() {

    const res = await fetch(`${API}/count`);

    return await res.json();

}
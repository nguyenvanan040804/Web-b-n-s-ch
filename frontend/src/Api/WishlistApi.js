const API = "http://localhost:8082/api/wishlist";

const getHeaders = () => {
    const token = sessionStorage.getItem('jwtToken');
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
};

// Lấy danh sách yêu thích
export async function getWishlist() {
    const res = await fetch(API, { headers: getHeaders() });
    if (!res.ok) return [];
    return await res.json();
}

// Thêm vào yêu thích
export async function addToWishlist(bookId) {
    const res = await fetch(`${API}/${bookId}`, {
        method: "POST",
        headers: getHeaders()
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }
    return await res.json();
}

// Bỏ yêu thích
export async function removeFromWishlist(bookId) {
    const res = await fetch(`${API}/${bookId}`, {
        method: "DELETE",
        headers: getHeaders()
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }
    return await res.text();
}

// Xóa toàn bộ danh sách yêu thích
export async function clearWishlist() {
    const res = await fetch(`${API}/clear`, {
        method: "DELETE",
        headers: getHeaders()
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }
    return await res.text();
}

// Kiểm tra đã yêu thích chưa
export async function checkFavorite(bookId) {
    const res = await fetch(`${API}/check/${bookId}`, { headers: getHeaders() });
    if (!res.ok) return false;
    return await res.json();
}

// Đếm số lượng sách yêu thích
export async function getWishlistCount() {
    const res = await fetch(`${API}/count`, { headers: getHeaders() });
    if (!res.ok) return 0;
    return await res.json();
}
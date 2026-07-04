const API = "http://localhost:8082/api/coupons";

export async function applyCoupon(code, total) {

    const res = await fetch(`${API}/apply`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            code,
            total
        })
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
}

export async function getCoupons() {

    const res = await fetch(API);

    return res.json();

}
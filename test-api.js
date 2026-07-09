
// Wait, Node 18+ has built-in fetch, so we don't need require.

async function test() {
  try {
    const payload = {
      date: new Date().toLocaleString('vi-VN'),
      userEmail: 'guest@bookstore.com',
      items: [
        { id: 1, title: 'Book Title', price: 100000, quantity: 1 }
      ],
      total: 100000,
      couponCode: '',
      discount: 0,
      shippingInfo: {
        name: 'Test Name',
        phone: '0123456789',
        email: 'test@example.com',
        address: 'Hanoi',
        note: '',
        paymentMethod: 'COD'
      },
      status: 'Chờ chuẩn bị hàng',
      paymentStatus: 'Chưa thanh toán'
    };

    const res = await fetch('http://localhost:8082/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    console.log('STATUS:', res.status);
    console.log('RESPONSE:', text);
  } catch (e) {
    console.error('ERROR:', e);
  }
}

test();

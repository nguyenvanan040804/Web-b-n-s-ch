document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('loginForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var email = form.email.value.trim();
    var password = form.password.value.trim();
    var message = 'Đang xử lý đăng nhập...';

    if (!email || !password) {
      message = 'Vui lòng nhập đầy đủ email và mật khẩu.';
      alert(message);
      return;
    }

    console.log('Login submitted', { email: email });
    alert('Đăng nhập thành công! (demo)');
    form.reset();
  });
});

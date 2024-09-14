const email = document.querySelector('#email');
const password = document.querySelector('#password');
const formulario = document.querySelector('#loginForm');

formulario.addEventListener('submit', (event) => {
    // Evita el envío del formulario  
    event.preventDefault();
    // Redirige a home.html
    console.log(email.value);
    console.log(password.value);
    if (email.value.trim() === 'admin@admin.com' && password.value.trim() === 'admin123'){
      window.location.href = 'pages/stock.html';
    } else {
      window.location.href = 'pages/home.html';
    }
});
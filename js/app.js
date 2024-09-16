const email = document.querySelector('#email');
const password = document.querySelector('#password');
const formulario = document.querySelector('#loginForm');

formulario.addEventListener('submit', (event) => {
    // Evita el envío del formulario  
    event.preventDefault();
    if (email.value.trim() === 'admin@admin.com' && password.value.trim() === 'admin123'){
      window.location.href = 'stock.html';
      return;
    }
      window.location.href = '../index.html';
});
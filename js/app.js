const correo = document.querySelector('#email');
const contrasena = document.querySelector('#password');

const datos = {
  email = "",
  password = "",
};

function leerCajas(e) {
  datos[e.target.id] = e.target.value;
}
        document.getElementById('loginForm').addEventListener('submit', (event) => {
            // Evita el envío del formulario  
            event.preventDefault();
            // Redirige a home.html
            if ()
            window.location.href = 'pages/home.html';
        });
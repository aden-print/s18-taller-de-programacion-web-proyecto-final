const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const nav = document.querySelector("nav");

// Abre y cierra el menú al hacer clic en el botón de hamburguesa
menuToggle.addEventListener("click", (event) => {
  event.stopPropagation(); // Evita cerrar el menú al hacer clic en el botón
  menu.classList.toggle("showing");
  nav.classList.toggle("mostrarActiva");
});

// Cierra el menú si se hace clic fuera de él
document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
    menu.classList.remove("showing");
    nav.classList.remove("mostrarActiva");
  }
});

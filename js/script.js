const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const nav = document.querySelector("nav");

// Abre y cierra el menú al hacer clic en el botón de hamburguesa
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("showing");
  if (nav.classList.contains("mostrarActiva")) {
    nav.classList.remove("mostrarActiva");
  } else {
    nav.classList.add("mostrarActiva");
  }
});

// Cierra el menú si se hace clic fuera de él
document.addEventListener("click", (event) => {
  // Verifica si el clic no fue en el menú o en el botón de hamburguesa
  if (
    !menu.contains(event.target) &&
    !menuToggle.contains(event.target) &&
    menu.classList.contains("showing")
  ) {
    menu.classList.remove("showing");
  }
  if (
    !nav.contains(event.target) &&
    !menuToggle.contains(event.target) &&
    nav.classList.contains("mostrarActiva")
  ) {
    nav.classList.remove("mostrarActiva");
  }
});

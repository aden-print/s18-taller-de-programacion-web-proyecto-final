import { listarDatos } from "../supabase/operaciones.js";

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const nav = document.querySelector("nav");
const productosInicio = [];

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

async function cargarArchivos() {
  const dataArchivos = await listarDatos("inicio", "id", "*");
  const { data: productos, error } = dataArchivos;

  if (error) {
    console.log("Error al cargar los archivos");
    return;
  }

  console.log(productos);

  const gridProductos = document.querySelector(".services-grid");
  gridProductos.innerHTML = "";
  productos.forEach((producto) => {
    const div = document.createElement("div");

    div.innerHTML = `<img
          src="https://dibxvkunujlbynhtwbxe.supabase.co/storage/v1/object/public/imagenes-inicio/imagenes/inicio/${
            producto.imagen
          }"
          alt="${producto.descripcion}"
          />
          <h3>${producto.titulo}</h3>
          <p>S/ ${producto.precio.toFixed(2)}</
          `;
    div.classList.add("service-item");
    gridProductos.appendChild(div);
  });
}

cargarArchivos();

import { listar_archivos } from "../supabase/operaciones.js";

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

async function cargarArchivos() {
  const dataArchivos = await listar_archivos();
  const { data: archivos, error } = dataArchivos;
  console.log(archivos);
  if (error) {
    console.log("Error al cargar los archivos");
    return;
  }

  archivos.forEach((archivo) => {
    const urlPublica = `${
      supabaseClient.storage
        .from("imagenes-inicio")
        .getPublicUrl(`imagenes/inicio/${archivo.name}`).data.publicUrl
    }`;

    console.log(urlPublica);

    // Crea un elemento de imagen
    // const img = document.createElement("img");
    // img.src = urlPublica;
    // img.alt = archivo.name;
    // img.classList.add("imagen-bucket"); // Agrega clases CSS para estilos si es necesario

    // Inserta la imagen en el contenedor
    // contenedorImagenes.appendChild(img);
  });
  // const tbody = document.querySelector(".table__body");
  // tbody.innerHTML = "";
  // archivos.forEach((archivo) => {
  //   const tr = document.createElement("tr");
  //   tr.innerHTML = `
  //     <td class="table__cell">${archivo.name}</td>
  //     <td class="table__cell">${archivo.size}</td>
  //     <td class="table__cell">
  //       <a href="${archivo.url}" class="table__edit" target="_blank">
  //         Ver
  //       </a>
  //       <a href="#" class="table__delete" value="${archivo.name}">
  //         Eliminar
  //       </a>
  //     </td>
  //   `;
  //   tr.classList.add("table__row");
  //   tbody.appendChild(tr);
  // });
}

cargarArchivos();

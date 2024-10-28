import { listarDatos } from "../supabase/operaciones.js";

async function cargarColores() {
  const dataColores = await listarDatos("color", "idcolor", "*");

  function mostrarColores() {
    const { data: colores, error } = dataColores;
    if (error) {
      alert("Error al cargar los colores");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    colores.forEach((color) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="table__cell">${color.idcolor}</td>
        <td class="table__cell">${color.nombre}</td>
        <td class="table__cell">
        <button class="table__button">
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/color/48/edit--v1.png"
            alt="edit--v1"
          />
        </button>
        <button class="table__button">
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/color/48/delete.png"
            alt="delete"
          />
        </button>
      </td>
    `;
      tr.classList.add("table__row");
      tbody.appendChild(tr);
    });
  }

  mostrarColores();
}

cargarColores();

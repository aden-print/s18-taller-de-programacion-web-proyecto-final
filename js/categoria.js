import { listarDatos } from "../supabase/operaciones.js";

async function cargarCategorias() {
  const dataCategorias = await listarDatos("categoria", "idcategoria", "*");

  function mostrarCategorias() {
    const { data: categorias, error } = dataCategorias;
    if (error) {
      alert("Error al cargar las categorias");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    categorias.forEach((categoria) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="table__cell">${categoria.idcategoria}</td>
          <td class="table__cell">${categoria.nombre}</td>
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

  mostrarCategorias();
}

cargarCategorias();

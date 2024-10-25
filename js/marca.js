import { listar } from "../supabase/operaciones.js";

const dataMarcas = await listar("marca", "idmarca");
console.log(dataMarcas);

function mostrarMarcas() {
  const { data: marcas, error } = dataMarcas;
  if (error) {
    alert("Error al cargar las marcas");
    return;
  }
  const tbody = document.querySelector(".table__body");
  tbody.innerHTML = "";
  marcas.forEach((marca) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="table__cell">${marca.idmarca}</td>
        <td class="table__cell">${marca.nombre}</td>
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

mostrarMarcas();

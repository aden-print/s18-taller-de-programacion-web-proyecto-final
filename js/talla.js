import { listar } from "../supabase/operaciones.js";

const dataTallas = await listar("talla", "idtalla");
console.log(dataTallas);

function mostrarTallas() {
  const { data: tallas, error } = dataTallas;
  if (error) {
    alert("Error al cargar las tallas");
    return;
  }
  const tbody = document.querySelector(".table__body");
  tbody.innerHTML = "";
  tallas.forEach((talla) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="table__cell">${talla.idtalla}</td>
        <td class="table__cell">${talla.numero}</td>
        <td class="table__cell">${
          talla.descripcion ? talla.descripcion : ""
        }</td>
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

mostrarTallas();

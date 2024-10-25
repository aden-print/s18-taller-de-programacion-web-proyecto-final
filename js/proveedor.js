import { listarDatos } from "../supabase/operaciones.js";

const dataProveedores = await listarDatos(
  "proveedor",
  "idproveedor",
  "idproveedor, persona(nombres, apellidos, correo,telefono)"
);

console.log(dataProveedores);

function mostrarProveedores() {
  const { data: proveedores, error } = dataProveedores;
  if (error) {
    alert("Error al cargar los proveedores");
    return;
  }
  const tbody = document.querySelector(".table__body");
  tbody.innerHTML = "";
  proveedores.forEach((proveedor) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td class="table__cell">${proveedor.idproveedor}</td>
          <td class="table__cell">${proveedor.persona.nombres}</td>
          <td class="table__cell">${proveedor.persona.apellidos}</td>
          <td class="table__cell">${proveedor.persona.correo}</td>
          <td class="table__cell">${proveedor.persona.telefono}</td>
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

mostrarProveedores();

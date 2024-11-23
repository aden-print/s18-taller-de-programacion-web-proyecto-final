import { listarDatos } from "../supabase/operaciones.js";

async function cargarCompras() {
  const dataCompras = await listarDatos(
    "compra",
    "idcompra",
    "idcompra, proveedor(idproveedor, persona(nombres, apellidos, correo, telefono)), subtotal, totalimpuesto, total, fecha, hora"
  );

  function mostrarCompras() {
    const { data: compras, error } = dataCompras;
    if (error) {
      alert("Error al cargar las compras");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    compras.forEach((compra) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="table__cell">${compra.idcompra}</td>
      <td class="table__cell">${compra.fecha} ${compra.hora}</td>
      <td class="table__cell">${compra.proveedor.persona.nombres} ${compra.proveedor.persona.apellidos}</td>
      <td class="table__cell"> S/ ${compra.subtotal}</td>
      <td class="table__cell"> S/ ${compra.totalimpuesto}</td>
      <td class="table__cell"> S/ ${compra.total}</td>
      <td class="table__cell">
        <button class="table__edit">
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/color/48/edit--v1.png"
            alt="edit--v1"
          />
        </button>
        <button class="table__detele">
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

  mostrarCompras();
}

cargarCompras();

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
      console.log("Error al cargar las compras");
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
        <a class="table__edit">
          Editar
        </a>
        <a class="table__delete">
          Eliminar
        </a>
      </td>
    `;
      tr.classList.add("table__row");
      tbody.appendChild(tr);
    });
  }

  mostrarCompras();
}

cargarCompras();

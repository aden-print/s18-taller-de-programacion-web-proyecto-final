import { listarDatos } from "../supabase/operaciones.js";

async function cargarVentas() {
  const dataVentas = await listarDatos(
    "venta",
    "idventa",
    "idventa, cliente(idcliente, persona(nombres, apellidos, correo, telefono)), subtotal, totalimpuesto, total, fecha, hora"
  );

  function mostrarVentas() {
    const { data: ventas, error } = dataVentas;
    if (error) {
      console.log("Error al cargar las ventas");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    ventas.forEach((venta) => {
      const tr = document.createElement("tr");
      const cliente = venta.cliente ? venta.cliente.persona : "";

      tr.innerHTML = `
        <td class="table__cell">${venta.idventa}</td>
        <td class="table__cell">${venta.fecha} ${venta.hora}</td>
        <td class="table__cell">${cliente.nombres ? cliente.nombres : ""} 
        ${cliente.apellidos ? cliente.apellidos : ""}</td>
        <td class="table__cell"> S/ ${venta.subtotal}</td>
        <td class="table__cell"> S/ ${venta.totalimpuesto}</td>
        <td class="table__cell"> S/ ${venta.total}</td>
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

  mostrarVentas();
}

cargarVentas();

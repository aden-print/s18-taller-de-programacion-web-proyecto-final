import { listarDatos } from "../supabase/operaciones.js";

async function cargarStock() {
  const dataStock = await listarDatos(
    "contiene",
    "stock",
    "idcontiene, producto(nombre, categoria(nombre)), marca(nombre), talla(numero), color(nombre), precio, stock"
  );

  function mostrarStock() {
    const { data: stocks, error } = dataStock;
    if (error) {
      alert("Error al cargar los stocks");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    stocks.forEach((stock) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="table__cell">${stock.idcontiene}</td>
        <td class="table__cell">${stock.producto.nombre}</td>
        <td class="table__cell">${stock.producto.categoria.nombre}</td>
        <td class="table__cell">${stock.marca.nombre}</td>
        <td class="table__cell">${stock.talla.numero}</td>
        <td class="table__cell">${stock.color.nombre}</td>
        <td class="table__cell">S/ ${stock.precio}</td>
        <td class="table__cell">${stock.stock}</td>
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

  mostrarStock();
}

cargarStock();

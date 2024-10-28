import { listarDatos } from "../supabase/operaciones.js";

async function cargarProductos() {
  const dataProductos = await listarDatos(
    "producto",
    "idproducto",
    "idproducto, nombre, descripcion, categoria(idcategoria, nombre)"
  );

  function mostrarProductos() {
    const { data: productos, error } = dataProductos;
    if (error) {
      alert("Error al cargar los productos");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    productos.forEach((producto) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="table__cell">${producto.idproducto}</td>
      <td class="table__cell">${producto.categoria.nombre}</td>
      <td class="table__cell">${producto.nombre}</td>
      <td class="table__cell">${
        producto.descripcion ? producto.descripcion : ""
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

  mostrarProductos();
}

cargarProductos();
